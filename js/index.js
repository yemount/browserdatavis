$(window).ready(function(){
	genFavicons();
});

function genFavicons(){
	var count = 0;
	for(var date in books){
		for(var i = 0; i < books[date]["urls"].length; i++){
			var urlId = books[date]["urls"][i][0];
			if(urls[urlId] == undefined){
				console.log(urlId);
			}
			$("#faviconHolder").append($('<img class="favicon" src="favicons/' + urls[urlId]["faviconId"] + '.png"></img>'));
					count++;
		}
		console.log(count);
	}
}