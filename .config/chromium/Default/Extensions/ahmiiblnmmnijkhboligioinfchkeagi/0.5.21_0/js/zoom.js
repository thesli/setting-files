// ==UserScript==
// @name             Minimalist for Facebook
// @author           Ansel Santosa
// @namespace        http://chrome.google.com/webstore
// @description      Photo zoom
// ==/UserScript==

chrome.extension.sendRequest({elements: "o"}, function(response) {
	if (response.o.zoom) {
	
		var loaded = false;
		var running = false;
			
		function init() {		
			var zoomed = document.createElement('div');
				zoomed.setAttribute('id', 'zoom');
				zoomed.setAttribute('style','visibility: hidden;')
			document.body.appendChild(zoomed);
			refresh();
			if (!loaded) {
				try {
					document.getElementById("globalContainer").addEventListener("DOMSubtreeModified", refresh, false);
					loaded = true;
				} catch(e) {}
			}
		}

		function refresh() {
			if (!running) {
				running = true;
				console.log("MINIMALIST FOR FACEBOOK: Finding new images...");
				var images = document.getElementsByTagName('img');
				for (var i = 0; i < images.length; i++) {
					if (images[i].getAttribute("set") == null && (images[i].src.contains('s.jpg') || images[i].src.contains('q.jpg') || images[i].src.contains('safe_image.php'))) {
						images[i].addEventListener('mouseover', retrieve, true);
						images[i].addEventListener('mousemove', function(e) { display(e.clientX, e.clientY, document.getElementById('zoom').clientHeight, document.getElementById('zoom').clientWidth); }, true);
						images[i].addEventListener('mouseout', function() { document.getElementById('zoom').style.visibility = 'hidden'; }, true);
						images[i].setAttribute("set","");
					}
				}

				var images2 = document.getElementsByTagName('i');
				for (var j = 0; j < images2.length; j++) {
					var srcT = images2[j].style.backgroundImage;
					if (images2[j].getAttribute("set") == null && (srcT.substring(4, srcT.indexOf(".jpg") + 4).contains('a.jpg') || srcT.substring(4, srcT.indexOf(".jpg") + 4).contains('s.jpg'))) {
						images2[j].addEventListener('mouseover', retrieve, true);
						images2[j].addEventListener('mousemove', function(e) { display(e.clientX, e.clientY, document.getElementById('zoom').offsetHeight, document.getElementById('zoom').offsetWidth); }, true);
						images2[j].addEventListener('mouseout', function() { document.getElementById('zoom').style.visibility = 'hidden'; }, true);
						images2[j].setAttribute("set","");
					}
				}
				running = false;
			}
		}

		function retrieve(e) {
			console.log("MINIMALIST FOR FACEBOOK: Loading photo...");
			var t = e.target;
			var src;
			var srcN;
			var title = "";
			var name = "";
			
			if (t.tagName == "IMG") {
				src = t.src;
			} else {
				var srcT = t.style.backgroundImage;
				src = srcT.substring(4, srcT.indexOf(".jpg") + 4)
			}

			if (t.parentNode.tagName == "A") {
				title = t.parentNode.title;
			} else {
				title = t.parentNode.parentNode.title;
			}

			if (t.nextSibling != null && t.nextSibling.tagName != 'I') {
				if (t.nextSibling.getAttribute('class').indexOf('uiTooltipWrap') > -1) {
					name = t.nextSibling.firstChild.innerHTML;
				} else if (t.nextSibling.nextSibling != null && t.nextSibling.nextSibling.getAttribute('class').indexOf('uiTooltipWrap') > -1) {
					name = t.nextSibling.nextSibling.firstChild.innerHTML;
				}
			}
			
			if (src.contains('s.jpg'))
				srcN = src.replace("s.jpg","n.jpg");
			else if (src.contains('a.jpg'))
				srcN = src.replace("a.jpg","n.jpg");
			else if (src.contains('q.jpg'))
				srcN = src.replace("q.jpg","n.jpg");
			else if (src.contains('safe_image.php'))
				srcN = "/safe_image.php?" + src.substr(src.indexOf("url="));
			else
				srcN = src;

			if (title != "")
				document.getElementById('zoom').innerHTML = '<img src="'+ srcN +'"/><div><span>' + title + '</span></div>';
			else if (name != "")
				document.getElementById('zoom').innerHTML = '<img src="'+ srcN +'"/><div><span>' + name + '</span></div>';
			else document.getElementById('zoom').innerHTML = '<img src="'+ srcN +'"/>';
		}

		function display(x, y, h, w) {
			console.log("MINIMALIST FOR FACEBOOK: Re-positioning tooltip");
			var left;
			var top = "auto";
            var l = false;
            var r;
            
            left = (x + window.scrollX + 20);
            
            // enough space on right?
            r = ((x + 20) + (w + (10 * 2))) < document.body.clientWidth - 10;
            // if not, more on left?
            if (!r)
                l = x - 20 - (w + (10 * 2)) > 10;
            document.getElementById('zoom').firstChild.setAttribute("height", "auto");
            document.getElementById('zoom').firstChild.setAttribute("width", "auto");
            // shrink it
            if (l)
            	left = (x + window.scrollX) - 20 - (w + (10 * 2))
           	else if (!r) {
                if (x <= (document.body.clientWidth / 2)) {
                    document.getElementById('zoom').firstChild.setAttribute("height", "auto");
            		document.getElementById('zoom').firstChild.setAttribute("width", (document.body.clientWidth - (x + 20 + (10 * 2) + 10)) + "px");
                } else {
                    left = window.scrollX + 10;
                    document.getElementById('zoom').firstChild.setAttribute("height", "auto");
            		document.getElementById('zoom').firstChild.setAttribute("width", (x - 20 - (10 * 2) - 10) + "px");
                }
            }
            // display it
            top = (y + window.scrollY - (h / 2));
            if (top > window.innerHeight + window.scrollY - h)
                top = window.innerHeight + window.scrollY - h;
            if (top < window.scrollY + 10) {
                top = window.scrollY + 10;
                if (h > window.innerHeight - (10 * 2)) {
                    document.getElementById('zoom').firstChild.setAttribute("height", (window.innerHeight - (10 * 2) - (10 * 2)) + "px");
                	document.getElementById('zoom').firstChild.setAttribute("width", "auto");
                    r = ((x + 20) + document.getElementById('zoom').offsetWidth) < document.body.clientWidth;
                    if (r)
                        left = (x + window.scrollX) + 20;
                    else left = (x + window.scrollX) - document.getElementById('zoom').offsetWidth - 20;
                }
            }
			document.getElementById('zoom').style.top = top + 'px';
			document.getElementById('zoom').style.left = left + 'px';
			document.getElementById('zoom').style.visibility = 'visible';
		}

		String.prototype.contains = function(pattern) { return this.indexOf(pattern) > -1 }
		init();
	}
});