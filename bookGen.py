import sqlite3
import urllib
from urlparse import urlparse
import re
import codecs
import datetime
import sys

CHROMESECOND = 1000000

books = {}
lasttstamp = None
favicons = {}
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
        self.urls = []
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
count = 0
for row in c.execute('SELECT * from urls ORDER BY id ASC'):
    # convert timestamp
    url = Url(row[0], row[1], row[2], chromeToEpochTime(row[5]))

    # compute duration
    for vRow in c1.execute('SELECT * from visits WHERE visit_duration!=0 AND url='+str(row[0])):
        date = chromeToEpochTime(vRow[2]).date()
        if date not in books:
            books[date] = Book()
        books[date].urls.append([vRow[1], 0, chromeToEpochTime(vRow[2])])

    urls[url.id] = url

# count num words by scraping the page
for url in urls.values():
    domain = unicode(urlparse(unicode(url.url)).netloc)
    if domain not in favicons:
        favicons[domain] = len(favicons)
    url.faviconId = favicons[domain]
    count += 1
    print str(url.id) + " done... total " + str(count) + " complete"

booksOut = codecs.open('booksOut', 'w', "utf-8")
booksOut.write("books = {")
for date, book in sorted(books.items()):
    booksOut.write("\""+str(date)+"\": {\n")
    booksOut.write("\"totalByteCount\": " + str(book.totalByteCount) + ",\n")
    booksOut.write("\"totalDuration\": " + str(book.totalDuration) + ",\n")
    booksOut.write("\"title\": \"" + book.title + "\",\n")
    booksOut.write("\"cover\": \"" + book.cover + "\",\n")
    booksOut.write("\"urls\": [")
    for url in book.urls:
        booksOut.write('['+str(url[0]) + ", " + str(url[1]) + ", \"" + str(url[2])+ "\"], \n")
    booksOut.write("], \n")
    booksOut.write("}, \n")
booksOut.write("};\n")

urlsOut = codecs.open("urlsOut", 'w', "utf-8")
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