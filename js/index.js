var faviconInfo;
var maxInfoStrLen = 128;
var urlTitle;
var urlTimestamp;
var selectedDate;
var divs = {};
var times = {};
var showRange = false;

$(window).ready(function(){
	genFavicons();
	faviconInfo = document.getElementById("faviconInfo");
	urlTitle = document.getElementById("urlTitle");
	urlTimestamp = document.getElementById("urlTimestamp");
});

var m_names = new Array("Jan", "Feb", "Mar", 
"April", "May", "June", "July", "Aug", "Sep", 
"Oct", "Nov", "Dec");

function printDate(dstr){
	var d = new Date(dstr);
	var curr_date = d.getDate();
	var curr_month = d.getMonth();
	var curr_year = d.getFullYear().toString().substring(2, 4);
	return m_names[curr_month] + " " + curr_date + ", " + curr_year;
}

var count = 0;
function genFavicons(){
	var count = 0;
	for(var date in books){
		var _div = document.createElement('div');
		_div.innerHTML = printDate(date);
		_div.className += "dateDiv";
		document.getElementById('faviconHolder').appendChild(_div);
		for(var i = 0; i < books[date]["urls"].length; i++){
			count++;
			var urlId = books[date]["urls"][i][0];
			var visitTime = books[date]["urls"][i][2];
			var div = document.createElement('div');
			div.setAttribute('id', count);
			div.className = "faviconDiv";
			times[count] = visitTime;
			div.innerHTML += '<a href="' + urls[urlId]["url"] + '"><img title="Title: ' + urls[urlId]["title"] + '&#10;Visited on: ' + times[count] + '" class="favicon" src="favicons/' + urls[urlId]["faviconId"] + '.png"></img></a>'
			if(!(date in divs)){
				divs[date] = [];
			}
			divs[date].push([div, visitTime]);
			document.getElementById('faviconHolder').appendChild(div);

			// create overlay
			/*var overlay = document.createElement('div');
			overlay.style.position = 'absolute';
			overlay.style.width = '16px';
			overlay.style.height = '16px';
			overlay.style.zIndex = '100';
			//overlay.className = "faviconOverlay";
			var dateobj = new Date(visitTime);
			var hour = dateobj.getHours() + dateobj.getMinutes()/60.0 + dateobj.getSeconds()/3600.0;
			if(hour > 5 && hour < 7){
				var value = Math.floor(((hour-5)*1.0/2.0)*300);
				overlay.style.backgroundColor = 'rgba(' + value + ', ' + (value+100) + ', 255, 0.8)';
			}
			if(hour > 2 && hour < 5){
				var value = Math.floor(((5-hour)*1.0/3.0)*300);
				overlay.style.backgroundColor = 'rgba(255, ' + value + ', ' + value + ', 0.8)';
			}
			div.appendChild(overlay);*/
			// div.onmouseover = function(){
			// 	var curDate = times[parseInt(this.getAttribute('id'))].split(" ")[0];
			// 	if(selectedDate == undefined || selectedDate != curDate){
			// 		if(selectedDate != undefined){
			// 			for(var j = 0; j < divs[selectedDate].length; j++){
			// 				divs[selectedDate][j].className = "";
			// 			}
			// 		}
			// 		selectedDate = curDate;
			// 		console.log(curDate)
			// 		for(var j = 0; j < books[curDate].length; j++){
			// 			divs[curDate][j].className += "deselected";
			// 		}
			// 	}
			// }
			document.onkeypress = function(e) {
		    	e = e || window.event;
    			if(e.keyCode == 104){
    				showRange = !showRange;
    				if(showRange){
	    				for(var date in divs){
	    					for(var i = 0; i < divs[date].length; i++){
	    						var _div = divs[date][i][0];
	    						var visitTime = divs[date][i][1];
	    						var dateobj = new Date(visitTime);
								var hour = dateobj.getHours() + dateobj.getMinutes()/60.0 + dateobj.getSeconds()/3600.0;
								if(hour > 0 && hour < 7){
									var opacity = (hour)*0.8/5.0+0.2;
									_div.style.opacity = opacity.toString();
								}
								else{
									_div.style.opacity = 0;
								}
	    					}
	    				}
    				}
    				else{
    					console.log("here");
    					for(var date in divs){
	    					for(var i = 0; i < divs[date].length; i++){
	    						var _div = divs[date][i][0];
	    						_div.style.opacity = 1;
	    					}
	    				}
    				}
    			}
			};
		}
	}
}