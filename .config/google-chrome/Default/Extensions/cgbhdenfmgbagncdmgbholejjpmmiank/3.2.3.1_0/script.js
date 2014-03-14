/*
YouTube(TM) Ratings Preview
Copyright (C) 2011 Cristian Perez <http://www.cpr.name>
All rights reserved.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL CRISTIAN PEREZ BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

// VERIFY INJECTION //////////////////////////////////////////////////////////////////////////////

var inGoogle = false;
if (getDomainName(getHostName(window.location.href)).indexOf("google.") == 0)
{
	inGoogle = true;
}

if (!inGoogle)
{
	if (window.location.href.indexOf("https://www.youtube.com/tv#/") == 0 || window.location.href.indexOf("http://www.youtube.com/tv#/") == 0)
	{
		throw "YTRP: Script is being injected into the TV version, stop execution";
	}
	chrome.extension.sendMessage({name:"injectionDone"});
}

// STYLESHEET ////////////////////////////////////////////////////////////////////////////////////

// Retrieve the stylesheet path and add it
chrome.extension.sendMessage({name:"getStylesheet"}, function (stylesheetPath)
{
	var stylesheet = document.createElement("link");
	stylesheet.setAttribute("rel", "stylesheet");
	stylesheet.setAttribute("href", stylesheetPath);
	stylesheet.setAttribute("type", "text/css");
	document.getElementsByTagName("head")[0].appendChild(stylesheet);
});

// Retrieve the style of the bars and apply it
chrome.extension.sendMessage({name:"storage_get_style"}, function (value)
{
	// This value must be the one corresponding to the style used in the default stylesheet
	// It could be different from the default style declared in the background script
	if (value != 1)
	{
		var style = document.createElement("style");
		style.setAttribute("type", "text/css");
		var css = document.createTextNode(getBarStyleCSS(value));
		style.appendChild(css);
		document.getElementsByTagName("head")[0].appendChild(style);
	}
});

// Retrieve the thickness of the bars and apply it
chrome.extension.sendMessage({name:"storage_get_thickness"}, function (value)
{
	// This value must be the thickness used in the default stylesheet
	// It could be different from the default thickness declared in the background script
	if (value != 4)
	{
		var style = document.createElement("style");
		style.setAttribute("type", "text/css");
		var css = document.createTextNode(getBarThicknessCSS(value));
		style.appendChild(css);
		document.getElementsByTagName("head")[0].appendChild(style);
	}
});

// Retrieve the opacity of the bars and apply it
chrome.extension.sendMessage({name:"storage_get_opacity"}, function (value)
{
	// This value must be the one corresponding to the opacity used in the default stylesheet
	// It could be different from the default opacity declared in the background script
	if (value != 0)
	{
		var style = document.createElement("style");
		style.setAttribute("type", "text/css");
		var css = document.createTextNode(getBarOpacityCSS(value));
		style.appendChild(css);
		document.getElementsByTagName("head")[0].appendChild(style);
	}
});

// Retrieve the maximum videos that will be highlighted for future use
var highlightedVideos = 0; 
chrome.extension.sendMessage({name:"storage_get_highlighted"}, function (value)
{
	highlightedVideos = value;
});

// INITIALIZATION ////////////////////////////////////////////////////////////////////////////////

// Timer used for observing mutations
var timerMutations = null;

// Flag used to disable onclick events when a history push/pop event just took place
var disableOnClickEvent = false;

// Timer used for preparing the video-wall at the end of the HTML5 videos
var timerVideoWall;
var timerVideoWallTrial = -1;

// Variables used to detect scrolling related events
var lastScrollHeight = null;
var lastScrollOnBottom = false;

// Hashtable holding for every video id, an array of:
// An array of the html clip or clips [0], views [1], likes [2], dislikes [3], totalScore [4], highlight [5]
// Note that [0] is also an array, because sometimes the same video appears in two html clips
var hashtable = {};

// Setup mutation observer
var mutationObserver = new MutationObserver(function (mutations)
{
	//console.debug(new Date().toISOString() + ": " + mutations.length + " mutations observed");
	
	if (timerMutations == null)
	{
		timerMutations = setTimeout(mutationObserved, 100);
	}
});
function observeMutations(observe)
{
	//console.debug(new Date().toISOString() + ": " + "Observing mutations: " + observe);
	
	if (observe)
	{
		mutationObserver.observe(document.body, { childList: true, subtree: true });
	}
	else
	{
		mutationObserver.disconnect();
	}
}
function mutationObserved()
{
	//console.debug(new Date().toISOString() + ": Delayed mutation observed");
	
	timerMutations = null;
	
	// Check if the page is still loading asynchronously and only showBars() if not, to avoid retrieving old page videos
	var progress = document.getElementById("progress");
	if (progress == null)
	{
		//console.debug(new Date().toISOString() + ": Delayed mutation observed !!! !!! !!!");
		
		showBars();
	}
}
if (inGoogle) observeMutations(true);

// Re-start detecting bars, for use in case new videos could have appeared on the page
function reShowBars()
{
	if (inGoogle) return;
	
	//console.debug(new Date().toISOString() + ": " + "reShowBars()");
	
	observeMutations(true);
};

if (!inGoogle)
{
	// reShowBars() after a click event (video player clicks are not detected)
	document.onclick = function (ev)
	{
		if (!disableOnClickEvent)
		{
			//console.debug(new Date().toISOString() + ": onclick");
			
			if (ev.target.tagName != "VIDEO") // Don't take into account clicks in HTML5 video tags.
			{
				observeMutations(false);
				if (!showBars())
				{
					reShowBars();
				}
			}
		}
	};
	
	// Directly showBars() after scrolling down to the bottom of the page if page size increases
	window.onscroll = function ()
	{
		var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
		
		if (lastScrollHeight != null && lastScrollOnBottom && scrollHeight > lastScrollHeight)
		{
			showBars();
			window.onscroll = null; // Do it only once (new content due to scrolling down is only loaded once)
		}
		else
		{
			lastScrollHeight = scrollHeight;
			lastScrollOnBottom = scrollHeight - window.pageYOffset < 600; // In bottom 600 pixels 
		}
	};
}

function reEnableOnClickEvent()
{
	disableOnClickEvent = false;
}

// reShowBars() after a pushstate event (needed because video player clicks are not detected)
window.addEventListener("pushstate", function ()
{
	//console.debug(new Date().toISOString() + ": onpushstate");
	
	if (!inGoogle)
	{
		disableOnClickEvent = true;
		setTimeout(reEnableOnClickEvent, 200);
	}
	
	hashtable = {}; // First clear hashtable
	reShowBars();
});

// Programmantically fire the custom pushstate event when the pushstate History API method is used by YouTube
var pushStateHandlerScript = document.createElement("script");
pushStateHandlerScript.type = "text/javascript";
pushStateHandlerScript.innerHTML = "" +
"var originalPushState = window.history.pushState;" +
"window.history.pushState = function ()" +
"{" +
	"if (typeof originalPushState == 'function') originalPushState.apply(window.history, arguments);" +
	"var pushStateEvent = new Event('pushstate');" +
	"window.dispatchEvent(pushStateEvent);" +
"};";
document.getElementsByTagName("head")[0].appendChild(pushStateHandlerScript);

// reShowBars() after back/forward browser actions are triggered
window.onpopstate = function (ev)
{
	if (ev.state) // Avoid firing when page just loaded (ev.state == null)
	{
		//console.debug(new Date().toISOString() + ": onpopstate");
		
		if (!inGoogle)
		{
			disableOnClickEvent = true;
			setTimeout(reEnableOnClickEvent, 200);
		}
		
		hashtable = {}; // First clear hashtable
		reShowBars();
	}
};

// MAIN SCRIPT ///////////////////////////////////////////////////////////////////////////////////

showBars();

// Show all the bars that need to be shown. Returns true if retrievePageVideos() is successful.
function showBars()
{
	if (!inGoogle) showMainBar();
	
	// Save current hashtable length in order to only ask data for the new ones later
	var previousHashtableLength = Object.keys(hashtable).length;
	
	// Fill the hashtable with the videos found in the page
	var success = retrievePageVideos();
	
	// If the operation was successful, prepare video-wall and make request
	if (success)
	{
		if (!inGoogle)
		{
			observeMutations(false);
			prepareVideoWall();
		}
		
		// Get just the ids of the new videos of the hashtable
		var _ids = Object.keys(hashtable);
		var ids = [];
		for (var i = previousHashtableLength; i < _ids.length; i++)
		{
			ids.push(_ids[i]);
		}
		
		// Send a message to fetch videos info from YouTube's API to the background script
		if (!inGoogle) chrome.extension.sendMessage({name:"injectionDone"});
		chrome.extension.sendMessage({name:"getVideosData", message:ids}, onMessageResponse);
	}
	
	//console.debug(new Date().toISOString() + ": " + "showBars(): " + success);
	
	return success;
}

// Show the main video bar
function showMainBar()
{
	var viewsElement = document.getElementsByClassName("watch-view-count")[0];
	if (viewsElement && !viewsElement.getAttribute("ytrp"))
	{
		viewsElement.setAttribute("ytrp", "true");
		
		var likesElement = document.getElementsByClassName("likes-count")[0];
		var dislikesElement = document.getElementsByClassName("dislikes-count")[0];
		if (likesElement && dislikesElement && viewsElement.textContent && likesElement.textContent && dislikesElement.textContent)
		{
			var views = parseInt(viewsElement.textContent.replace(/\D/g, ""));
			var likes = parseInt(likesElement.textContent.replace(/\D/g, ""));
			var dislikes = parseInt(dislikesElement.textContent.replace(/\D/g, ""));
			var total = likes + dislikes;
			if (total > 0)
			{
				var score = totalScore(views, likes, dislikes);
				var sparkbars = document.getElementsByClassName("video-extras-sparkbars")[0];
				if (sparkbars)
				{
					sparkbars.setAttribute("title", (Math.round((likes / total) * 10000) / 100) + "% likes (" + ts(total) + " ratings)\x0AYTRP score: " + (Math.round(score * 100) / 100));
				}
				if (dislikes == 0)
				{
					var sparkbarlikes = document.getElementsByClassName("video-extras-sparkbar-likes")[0];
					if (sparkbarlikes)
					{
						sparkbarlikes.setAttribute("style", sparkbarlikes.getAttribute("style") + "; margin-left: 0 !important;");
					}
				}
			}
			else
			{
				var sparkbars = document.getElementsByClassName("video-extras-sparkbars")[0];
				if (sparkbars)
				{
					sparkbars.setAttribute("title", "No ratings");
				}
			}
		}
	}
}

// Prepare video-wall that is shown at the end of HTML5 videos so that the bars can be shown for those related videos
function prepareVideoWall()
{
	if (timerVideoWallTrial == -1)
	{
		timerVideoWallTrial = 0;
		timerVideoWall = setInterval(function ()
		{
			timerVideoWallTrial++;
			// reShowBars() after html5 video end event
			var html5video = document.getElementsByTagName("video")[0];
			if (html5video != undefined)
			{
				clearInterval(timerVideoWall);
				timerVideoWallTrial = -1;
				html5video.removeEventListener("ended", reShowBars);
				html5video.addEventListener("ended", reShowBars);
			}
			else if (timerVideoWallTrial >= 5) // 2000*5 results in about 10 seconds
			{
				clearInterval(timerVideoWall);
				timerVideoWallTrial = -1;
			}
		}, 2000);
	}
	else
	{
		timerVideoWallTrial = 0;
	}
}

// Finds all html clips and their video id and saves them in the hashtable. Several html clips could correspond to the same video id.
// If it encounters an html clip whose data was previously retrieved, shows the bar inmediately for that clip.
// Returns true if the operation was successful (new video ids retrieved or attached bars to existing ones).
function retrievePageVideos()
{
	var success = false;
	
	// Get all the html clips
	var clips;
	if (inGoogle)
	{
		clips = document.querySelectorAll(".thbb");
	}
	else
	{
		clips = document.querySelectorAll(".video-thumb, .videowall-still");
	}
	
	// Process each one
	var clipsLength = clips.length;
	for (var i = 0; i < clipsLength; i++)
	{
		try
		{
			var clip = clips[i];
			
			// Check if the rating bar is not currently attached
			if (!clip.getAttribute("ytrp"))
			{
				// Check if the clip is big enough (to avoid thumbnails like the tiny ones for playlists)
				if (clip.offsetWidth > 60)
				{
					// Check if the clip is visible (if it is not for some reason the rating bar cannot be attached)
					if (isVisible(clip))
					{
						// Find video id
						var id;
						var found = false;
						if (inGoogle)
						{
							// Extract video id from the outer html, which will usually include an anchor
							var outerHTML = clip.outerHTML;
							var match = outerHTML.match(/https?:\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9-_]{11})/);
							if (match)
							{
								id = match[1];
								if (id)
								{
									found = true;
								}
							}
							else
							{
								match = outerHTML.match(/https?%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3D([a-zA-Z0-9-_]{11})/);
								if (match)
								{
									id = match[1];
									if (id)
									{
										found = true;
									}
								}
							}
						}
						else if (clip.getAttribute("class").indexOf("videowall-still") > -1)
						{
							// Extract video id from video-wall html clip
							var style = clip.getAttribute("style");
							var match = style.match(/\/vi\/([a-zA-Z0-9-_]{11})\//);
							if (match)
							{
								id = match[1];
								if (id)
								{
									found = true;
								}
							}
						}
						else
						{
							// Find link to video in regular html clip
							var anchor;
							if (clip.parentNode.tagName == "A") // Link to video is in parent node (most probable)
							{
								anchor = clip.parentNode;
							}
							else if (clip.parentNode.parentNode.tagName == "A") // Link to video is in parent^2 node (very probable)
							{
								anchor = clip.parentNode.parentNode;
							}
							else if (clip.tagName == "A") // Link to video is in current node
							{
								anchor = clip;
							}
							else if (clip.parentNode.parentNode.parentNode.tagName == "A") // Link to video is in parent^3 node
							{
								anchor = clip.parentNode.parentNode.parentNode;
							}
							else if (clip.parentNode.parentNode.parentNode.parentNode.tagName == "A") // Link to video is in parent^4 node
							{
								anchor = clip.parentNode.parentNode.parentNode.parentNode;
							}
							else if (clip.parentNode.parentNode.parentNode.parentNode.parentNode.tagName == "A") // Link to video is in parent^5 node
							{
								anchor = clip.parentNode.parentNode.parentNode.parentNode.parentNode;
							}
							
							// Get anchor params
							var href = anchor.getAttribute("href");
							var params = href.split("?")[1] ? (href.split("?")[1]).split("&") : [];
							
							if (params.length > 0)
							{
								// Try to extract video id from regular link
								for (var j = 0; j < params.length; j++)
								{
									if (params[j].substr(0, 2).toLowerCase() == "v=")
									{
										id = params[j].substr(2);
										if (id.length == 11) // ids must be 11 chars length
										{
											found = true;
											break;
										}
									}
								}
								
								// Try to extract video id from link in an ordered list <http://www.youtube.com/channel/HC7Dr1BKwqctY>
								if (!found)
								{
									var ids = [];
									var ids_index = -1;
									for (var j = 0; j < params.length; j++)
									{
										if (params[j].substr(0, 10).toLowerCase() == "video_ids=")
										{
											ids = params[j].substr(10).split("%2C");
											if (ids.length > 0)
											{
												break;
											}
										}
									}
									for (var j = 0; j < params.length; j++)
									{
										if (params[j].substr(0, 6).toLowerCase() == "index=")
										{
											ids_index = parseInt(params[j].substr(6));
											if (ids_index >= 0)
											{
												break;
											}
										}
									}
									if (ids.length > 0)
									{
										// Default to 0 if no index is found
										if (ids_index < 0)
										{
											ids_index = 0;
										}
										id = ids[ids_index];
										if (id.length == 11) // ids must be 11 chars length
										{
											found = true;
										}
									}
								}
							}
							
							// Try to extract video id from link with a custom url <http://www.youtube.com/movie/aranmanaikaran>,
							// Can be found in some results of movie searches <http://www.youtube.com/results?search_query=lady+gaga&filters=movie&lclk=movie>
							if (!found)
							{
								// Avoid false-positives (can be found in the right watch-card in https://www.youtube.com/results?search_query=lady%20gaga&sm=3) 
								var skip = false;
								var checkParents = 3;
								var watchCard = clip;
								for (var j = 0; j <= checkParents; j++)
								{
									if (watchCard.className.indexOf("watch-card") != -1)
									{
										skip = true;
										break;
									}
									watchCard = watchCard.parentNode;
								}

								if (!skip)
								{
									var outerHTML = clip.outerHTML;
									var match = outerHTML.match(/\/vi\/([a-zA-Z0-9-_]{11})\//);
									if (match)
									{
										id = match[1];
										if (id)
										{
											found = true;
										}
									}
								}
							}
						}
						// End of find video id
						
						if (found)
						{
							// Video correctly retrieved, update the hashtable accordingly (new id or in an existing id)
							if (!(id in hashtable))
							{
								hashtable[id] = [[clip]];
								success = true;
							}
							else
							{
								hashtable[id][0].push(clip);
								// If the added clip corresponds to a video whose data was previously retrieved, show the bar directly
								if (hashtable[id].length == 6)
								{
									attachBar(clip, hashtable[id][1], hashtable[id][2], hashtable[id][3], hashtable[id][4], hashtable[id][5]);
									success = true;
								}
							}
						}
					}
				}
			}
		}
		catch (err)
		{
			// Video omitted, try next video
		}
	}
	
	return success;
}

// Receive the videos info
function onMessageResponse(ht)
{
	// Fill the hashtable with the ht data (which is another hashtable with just views, likes and dislikes) and the computed score, plus highlight initially set to false
	var ids = Object.keys(ht);
	for (var i = 0; i < ids.length; i++)
	{
		if (ids[i] in hashtable)
		{
			var score = totalScore(ht[ids[i]][0], ht[ids[i]][1], ht[ids[i]][2]);
			hashtable[ids[i]] = [hashtable[ids[i]][0], ht[ids[i]][0], ht[ids[i]][1], ht[ids[i]][2], score, false];
		}
	}
	
	// Mark videos to be highlighted
	markHighlighted();
	
	// Try to attach all retrieved bars
	var success = attachBars(ids);
	
	// If successful, notify the background script about it
	if (success && !inGoogle)
	{
		chrome.extension.sendMessage({name:"wasSuccessful"});
	}
}

// Attaches the rating bar to all the clips with the given ids. Returns true if at least one bar was attached.
function attachBars(ids)
{
	var success = false;
	for (var i = 0; i < ids.length; i++)
	{
		try
		{
			if (ids[i] in hashtable && hashtable[ids[i]].length == 6)
			{
				for (var j = 0; j < hashtable[ids[i]][0].length; j++)
				{
					try
					{
						attachBar(hashtable[ids[i]][0][j], hashtable[ids[i]][1], hashtable[ids[i]][2], hashtable[ids[i]][3], hashtable[ids[i]][4], hashtable[ids[i]][5]);
						success = true;
					}
					catch (_err)
					{
						// Could not attach bar to video
					}
				}
			}
		}
		catch (err)
		{
			// Could not attach bar to video or videos
		}
	}
	return success;
}

// Attaches the rating bar to the clip
function attachBar(clip, views, likes, dislikes, score, hl)
{
	if (clip && !clip.getAttribute("ytrp"))
	{
		clip.setAttribute("ytrp", "true");
		
		var total = likes + dislikes;
		var totalWidth = clip.offsetWidth;
		
		if (totalWidth > 0)
		{
			var wrapperDiv = document.createElement("div");
			wrapperDiv.setAttribute("class", "ytrp_wrapper");
			var tooltipDiv = document.createElement("div");
			tooltipDiv.setAttribute("class", "ytrp_tooltip");
			
			if (hl)
			{
				// If the video should BE highlighted, add highlight bars
				
				var ratingDiv1 = document.createElement("div");
				var ratingDiv2 = document.createElement("div");
				var ratingDiv3 = document.createElement("div");
				var ratingDiv4 = document.createElement("div");
				ratingDiv1.setAttribute("class", "ytrp_rb_bg ytrp_rb_bg_bottom");
				if (total > 0)
				{
					tooltipDiv.setAttribute("title", (Math.round((likes / total) * 10000) / 100) + "% likes (" + ts(total) + " ratings)\x0AYTRP score: " + (Math.round(score * 100) / 100));
				}
				else
				{
					tooltipDiv.setAttribute("title", "No ratings");
				}
				ratingDiv2.setAttribute("class", "ytrp_rb_bg ytrp_rb_bg_top");
				ratingDiv3.setAttribute("class", "ytrp_rb_bg ytrp_rb_bg_left");
				ratingDiv4.setAttribute("class", "ytrp_rb_bg ytrp_rb_bg_right");
				
				innerDiv1 = document.createElement("div");
				innerDiv2 = document.createElement("div");
				innerDiv3 = document.createElement("div");
				innerDiv4 = document.createElement("div");
				innerDiv1.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_hl ytrp_rb_fg_hl_bottom");
				innerDiv2.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_hl ytrp_rb_fg_hl_top");
				innerDiv3.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_hl ytrp_rb_fg_hl_left");
				innerDiv4.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_hl ytrp_rb_fg_hl_right");
				ratingDiv1.appendChild(innerDiv1);
				ratingDiv2.appendChild(innerDiv2);
				ratingDiv3.appendChild(innerDiv3);
				ratingDiv4.appendChild(innerDiv4);
				
				wrapperDiv.appendChild(ratingDiv1);
				wrapperDiv.appendChild(ratingDiv2);
				wrapperDiv.appendChild(ratingDiv3);
				wrapperDiv.appendChild(ratingDiv4);
				wrapperDiv.appendChild(tooltipDiv);
			}
			else
			{
				// If the video should NOT be highlighted, add normal bars
				
				var likesWidth = 0;
				var dislikesWidth = 0;
				if (total > 0)
				{
					if (likes >= dislikes)
					{
						likesWidth = Math.floor((likes / total) * totalWidth);
						dislikesWidth = Math.ceil((dislikes / total) * totalWidth);
					}
					else
					{
						likesWidth = Math.ceil((likes / total) * totalWidth);
						dislikesWidth = Math.floor((dislikes / total) * totalWidth);
					}
				}
				
				// Keep spacing between bars
				if (likesWidth > 0 && dislikesWidth > 0)
				{
					if (likesWidth >= dislikesWidth)
					{
						likesWidth -= 1;
					}
					else
					{
						dislikesWidth -= 1;
					}
				}
				
				var ratingDiv = document.createElement("div");
				ratingDiv.setAttribute("class", "ytrp_rb_bg ytrp_rb_bg_bottom");
				if (total > 0)
				{
					tooltipDiv.setAttribute("title", (Math.round((likes / total) * 10000) / 100) + "% likes (" + ts(total) + " ratings)\x0AYTRP score: " + (Math.round(score * 100) / 100));
				}
				else
				{
					tooltipDiv.setAttribute("title", "No ratings");
				}
				
				if (total > 0)
				{
					if (likesWidth > 0)
					{
						var likesDiv = document.createElement("div");
						likesDiv.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_like");
						likesDiv.setAttribute("style", "width: " + likesWidth + "px;");
						ratingDiv.appendChild(likesDiv);
					}
					if (dislikesWidth > 0)
					{
						var dislikesDiv = document.createElement("div");
						dislikesDiv.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_dislike");
						dislikesDiv.setAttribute("style", "width: " + dislikesWidth + "px;");
						ratingDiv.appendChild(dislikesDiv);
					}
				}
				else
				{
					var noRatingsDiv = document.createElement("div");
					noRatingsDiv.setAttribute("class", "ytrp_rb_fg ytrp_rb_fg_norating");
					ratingDiv.appendChild(noRatingsDiv);
				}
				
				wrapperDiv.appendChild(ratingDiv);
				wrapperDiv.appendChild(tooltipDiv);
			}
			
			if (inGoogle)
			{
				var subAnchor = clip.querySelector("a");
				if (subAnchor)
				{
					subAnchor.appendChild(wrapperDiv);
				}
			}
			else
			{
				clip.appendChild(wrapperDiv);
			}
		}
	}
}

// Sets the highlight boolean variable to true to the required videos in the hashtable
function markHighlighted()
{
	if (highlightedVideos > 0)
	{
		// Get all the scores into an array and sort it (descending)
		var allScores = [];
		var ids = Object.keys(hashtable);
		for (var i = 0; i < ids.length; i++)
		{
			if (hashtable[ids[i]].length == 6)
			{
				allScores.push({id : ids[i], score : hashtable[ids[i]][4]}); 
			}
		}
		allScores.sort(function (a, b)
		{
			return b.score - a.score;
		});
		
		// Take the first half "highlightedVideos" scores and set those videos to be highlighted (if score is 5 or more)
		for (var i = 0; i < highlightedVideos && i < allScores.length / 2 - 1; i++)
		{
			if (allScores[i].score >= 5)
			{
				hashtable[allScores[i].id][5] = true;
			}
		}
	}
}

// UTILS FUNCTIONS ///////////////////////////////////////////////////////////////////////////////

// Gets the host name (for example code.google.com) from a url
function getHostName(url)
{
	if (url != null)
	{
		var matches = url.match(/^https?\:\/\/([^\/?#]+)/i);
		return matches && matches[1];
	}
	else
	{
		return null;
	}
}

// Gets the domain name (for example google.com) from a host name
function getDomainName(hostName)
{
	return hostName.substring(hostName.lastIndexOf(".", hostName.lastIndexOf(".") - 1) + 1);
}

// Formats the number with thousand separators
function ts(v)
{
	var val = v.toString();
	var result = "";
	var len = val.length;
	while (len > 3)
	{
		result = "," + val.substr(len - 3, 3) + result;
		len -= 3;
	}
	return val.substr(0, len) + result;
}

// Returns if an html element is visible, checking a variety of things
function isVisible(obj)
{
	if (obj == document) return true;
	
	if (!obj) return false;
	if (!obj.parentNode) return false;
	
	if (obj.style)
	{
		if (obj.style.display == "none") return false;
		if (obj.style.visibility == "hidden") return false;
	}
	
	var style = window.getComputedStyle(obj, "");
	if (style.display == "none") return false;
	if (style.visibility == "hidden") return false;
	
	return isVisible(obj.parentNode);
}

// Computes the total score of a video based on an inteligent algorithm
function totalScore(views, likes, dislikes)
{
	var votes = likes + dislikes;
	
	if (votes > 0 && views > 0)
	{
		var likesPer1 = (likes / votes);
		
		var likesScore = likesPer1 * 10 * Math.min(Math.log(votes) / Math.log(100), 1) + 5 * (1 - Math.min(Math.log(votes) / Math.log(100), 1));
	
		var viewsScore = Math.min(Math.log(views) / Math.log(1000000000), 1) * 10;
		
		var votesScore = Math.max(10 - (votes / views) * 100, 0);
		
		var totalScore = Math.min(likesScore * 0.8 + viewsScore * 0.125 + votesScore * 0.125, 10);
		
		return totalScore;
	}
	else
	{
		return 0;
	}
}

// Ads a rule (class, element, and value) to a CSS text
function addRuleToCSS(_class, _element, _value, _css)
{
	return _css + "\n" + _class + " { " + _element + ": " + _value + "; }\n";
}

// Gets the CSS text corresponding to the new bar style
function getBarStyleCSS(newValue)
{
	var css = "";
	newValue = parseInt(newValue); // Otherwise it is considered a string
	if (newValue == 0)
	{
		// Classic style
		css = addRuleToCSS(".ytrp_rb_bg", "background", "#FFF", css);
		css = addRuleToCSS(".ytrp_rb_fg_like", "background", "#060", css);
		css = addRuleToCSS(".ytrp_rb_fg_dislike", "background", "#C00", css);
		css = addRuleToCSS(".ytrp_rb_fg_dislike", "border-left", "1px solid #FFF", css);
		css = addRuleToCSS(".ytrp_rb_fg_norating", "background", "#AAA", css);
		css = addRuleToCSS(".ytrp_rb_fg_hl", "background", "#00F", css);
		css = addRuleToCSS(".video-extras-sparkbar-likes", "background", "#060 !important", css);
		css = addRuleToCSS(".video-extras-sparkbar-dislikes", "background", "#C00 !important", css);
		css = addRuleToCSS(".video-extras-sparkbar-dislikes", "border-left", "1px solid #FFF !important", css);
	}
	else if (newValue == 1)
	{
		// Modern style
		css = addRuleToCSS(".ytrp_rb_bg", "background", "#CCC", css);
		css = addRuleToCSS(".ytrp_rb_fg_like", "background", "#2793e6", css);
		css = addRuleToCSS(".ytrp_rb_fg_dislike", "background", "#CCC", css);
		css = addRuleToCSS(".ytrp_rb_fg_dislike", "border-left", "1px solid #CCC", css);
		css = addRuleToCSS(".ytrp_rb_fg_norating", "background", "#CCC", css);
		css = addRuleToCSS(".ytrp_rb_fg_hl", "background", "#cc181e", css);
		css = addRuleToCSS(".video-extras-sparkbar-likes", "background", "#2793e6 !important", css);
		css = addRuleToCSS(".video-extras-sparkbar-dislikes", "background", "#CCC !important", css);
		css = addRuleToCSS(".video-extras-sparkbar-dislikes", "border-left", "1px solid #CCC !important", css);
	}
	return css;
}

// Gets the CSS text corresponding to the new bar thickness
function getBarThicknessCSS(newValue)
{
	var css = "";
	newValue = parseInt(newValue); // Otherwise it is considered a string
	css = addRuleToCSS(".ytrp_rb_bg_bottom", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_top", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_left", "top", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_left", "bottom", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_left", "width", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_right", "top", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_right", "bottom", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_bg_right", "width", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_like", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_dislike", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_norating", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_hl_bottom", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_hl_top", "height", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_hl_left", "width", newValue + "px", css);
	css = addRuleToCSS(".ytrp_rb_fg_hl_right", "width", newValue + "px", css);
	css = addRuleToCSS(".video-extras-sparkbars", "height", newValue + "px !important", css);
	css = addRuleToCSS(".video-extras-sparkbar-likes", "height", newValue + "px !important", css);
	css = addRuleToCSS(".video-extras-sparkbar-dislikes", "height", newValue + "px !important", css);
	css = addRuleToCSS(".video-time", "bottom", (newValue+2) + "px !important", css);
	css = addRuleToCSS(".video-actions", "bottom", (newValue+2) + "px !important", css);
	css = addRuleToCSS(".vdur", "bottom", (newValue+2) + "px !important", css);
	return css;
}

// Get the CSS text corresponding to the new bar opacity
function getBarOpacityCSS(newValue)
{
	var css = "";
	newValue = parseInt(newValue); // Otherwise it is considered a string
	if (newValue == 0)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0", css);
	}
	else if (newValue == 1)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.2", css);
	}
	else if (newValue == 2)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.4", css);
	}
	else if (newValue == 3)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.5", css);
	}
	else if (newValue == 4)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.6", css);
	}
	else if (newValue == 5)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.7", css);
	}
	else if (newValue == 6)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.8", css);
	}
	else if (newValue == 7)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "0.9", css);
	}
	else if (newValue == 8)
	{
		css = addRuleToCSS(".ytrp_wrapper", "opacity", "1", css);
	}
	return css;
}
