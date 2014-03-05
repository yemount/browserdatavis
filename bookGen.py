import sqlite3
import urllib
from bs4 import BeautifulSoup
from urlparse import urlparse
import re
import codecs
import datetime
import sys

CHROMESECOND = 1000000

books = {}
lasttstamp = None
favicons = {}
baseFaviconId = int(sys.argv[3])
count = 0

# urls: { id : url}
urls = {}

# urlentry structure: [url, title, bytecount, duration, faviconId, last_visit_time]
class Url:
    def __init__(self, _id, _url, _title, _lastVisitTime):
        self.id = _id
        self.url = _url
        self.title = _title
        self.lastVisitTime = _lastVisitTime
        self.bytecount = 0
        self.faviconId = 0

# books: [ date, [urls], totalDuration, totalByteCount, title, cover ]        
class Book:
    def __init__(self):
        self.urls = {}
        self.totalByteCount = 0
        self.totalDuration = 0
        self.title = ""
        self.cover = ""

def chromeToEpochTime(chromeTime):
    return datetime.datetime.fromtimestamp(chromeTime/CHROMESECOND-11644473600)

conn = sqlite3.connect('History')
conn1 = sqlite3.connect('History')
c = conn.cursor()
c1 = conn.cursor()
for row in c.execute('SELECT * from urls ORDER BY id ASC'):
    if row[0] < int(sys.argv[1]) or row[0] > int(sys.argv[2]):
        continue
    # convert timestamp
    url = Url(row[0], row[1], row[2], chromeToEpochTime(row[5]))

    # compute duration
    for vRow in c1.execute('SELECT * from visits WHERE visit_duration!=0 AND url='+str(row[0])):
        date = chromeToEpochTime(vRow[2]).date()
        if date not in books:
            books[date] = Book()
        if vRow[1] not in books[date].urls:
            books[date].urls[vRow[1]] = [0, None]   # duration, lastvisittime
        books[date].urls[vRow[1]][0] += vRow[7]*1.0 / CHROMESECOND
        lastTime = books[date].urls[vRow[1]][1]
        if lastTime is None or lastTime < chromeToEpochTime(vRow[2]):
            books[date].urls[vRow[1]][1] = chromeToEpochTime(vRow[2])

    urls[url.id] = url

# count num words by scraping the page
for url in urls.values():
    try:
        soup = BeautifulSoup(urllib.urlopen(url.url))
        url.bytecount = len(unicode(soup))
    except:
        continue
    domain = str(urlparse(str(url.url)).netloc)
    if domain not in favicons:
        favicons[domain] = len(favicons)+baseFaviconId
    url.faviconId = favicons[domain]
    count += 1
    print str(url.id) + " done... total " + str(count) + " complete"

for book in books.values():
    book.totalDuration = 0
    book.totalByteCount = 0
    for id in book.urls.keys():
        book.totalDuration += book.urls[id][0]
        book.totalByteCount += urls[id].bytecount

booksOut = codecs.open('booksOut'+sys.argv[1]+"-"+sys.argv[2], 'w', "utf-8")
booksOut.write("books = {")
for date, book in sorted(books.items()):
    booksOut.write("\""+str(date)+"\": {\n")
    booksOut.write("\"totalByteCount\": " + str(book.totalByteCount) + ",\n")
    booksOut.write("\"totalDuration\": " + str(book.totalDuration) + ",\n")
    booksOut.write("\"title\": \"" + book.title + "\",\n")
    booksOut.write("\"cover\": \"" + book.cover + "\",\n")
    booksOut.write("\"urls\": {")
    for id, v in sorted(book.urls.items()):
        booksOut.write(str(id) + ": (" + str(v[0]) + ", \"" + str(v[1])+ "\"), \n")
    booksOut.write("}, \n")
    booksOut.write("}, \n")
booksOut.write("};\n")

urlsOut = codecs.open("urlsOut"+sys.argv[1]+"-"+sys.argv[2], 'w', "utf-8")
urlsOut.write("urls = {")
for id, url in sorted(urls.items()):
    urlsOut.write("\""+str(id)+"\": {\n")
    urlsOut.write("\"id\": " + str(id) + ",\n")
    urlsOut.write("\"url\": \"" + url.url + "\",\n")
    urlsOut.write("\"title\": \"" + url.title + "\",\n")
    urlsOut.write("\"lastVisitTime\": \"" + str(url.lastVisitTime) + "\",\n")
    urlsOut.write("\"bytecount\": " + str(url.bytecount) + ",\n")
    urlsOut.write("\"faviconId\": " + str(url.faviconId) + ",\n")
    urlsOut.write("}, \n")
urlsOut.write("};\n")

for fav in favicons.keys():
    print fav
    urllib.urlretrieve("http://www.google.com/s2/favicons?domain="+fav, str(favicons[fav]) + ".png")