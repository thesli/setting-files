var players = {};

document.addEventListener('beforeload', function(event) {
	chrome.extension.sendRequest({canLoad:event.url}, function(response) {
		if(response.shouldLoad===true){ 
			
			event.preventDefault();
			var playerId = Math.floor(Math.random()*1000000000);

			players[playerId] = newPlayer(event.target, event.target.scrollWidth, event.target.scrollHeight);
			var flashvars = event.target.getAttribute('flashvars');
			if (!flashvars) {
				if (flashvars = event.target.querySelector('param[name=flashvars]')) {
					flashvars = flashvars.getAttribute('value');
				}
			}
		    var video = new Object();
			video.url = event.url;
		    video.playerId = playerId;
			video.flashvars = flashvars;
			chrome.extension.sendRequest({loadVideo: video});
		}		
	});
}, true);

var injectVideo = function(video) {
	var playerId = video.playerId;
	var meta = video.meta;	
	// these messages are sent to iframes as well, so check if the requested video actually belongs to this frame
	if (players[playerId]) {
		players[playerId].injectVideo(meta);
	}
};

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.injectVideo) {
		injectVideo(request.injectVideo);
	}
	sendResponse({});
 });
