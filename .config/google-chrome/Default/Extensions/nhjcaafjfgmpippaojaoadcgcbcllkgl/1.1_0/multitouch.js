/*
 *	Copyright (c) 2008, Thomas L. Robinson
 *	
 *	All rights reserved.
 *	
 *	Redistribution and use in source and binary forms, with or without
 *	modification, are permitted provided that the following conditions
 *	are met:
 *	
 *	Redistributions of source code must retain the above copyright
 *	notice, this list of conditions and the following disclaimer.
 *	Redistributions in binary form must reproduce the above copyright
 *	notice, this list of conditions and the following disclaimer in the
 *	documentation and/or other materials provided with the distribution.
 *	Neither the name of the tlrobinson.net nor the names of its contributors
 *	may be used to endorse or promote products derived from this software
 *	without specific prior written permission.
 *	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 *	"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 *	LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 *	A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
 *	CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *	EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 *	PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *	PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 *	LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *	NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 *	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

var dot = null,
    touchId = 1,
    touchA = null,
    touchB = null,
    touchBStart = null,
    mouseIsDown = false;
    
var mouse2TouchMap = {
    "mouseup" : "touchend",
    "mousedown" : "touchstart",
    "mousemove" : "touchmove"
};

function fakeTouchHandler(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type == "mousedown")
        touchId++;
    
    var touch = {
        identifier: touchId,
        target:        e.target,
        clientX:     e.clientX,
        clientY:      e.clientY,
        pageX:         e.clientX,
        pageY:         e.clientY,
        screenX:     e.screenX,
        screenY:      e.screenY
    }
    
    if (e.type == "mouseup") {
        touchA = touchB;
        mouseIsDown = false;
    }
    if (e.type == "mousedown") {
        touchBStart = touch;
        mouseIsDown = true;
    }
    touchB = touch;
    
    if (e.type == "mousemove" && !mouseIsDown)
        return;
    
    var scale = 1.0;
    var rotation = 0.0;
    
    var touches = [];
    if (touchA) {
        touches.push(touchA);
/*        
        if (!dot) {
            dot = document.createElement("div");
            document.body.appendChild(dot);
        }
        dot.setAttribute("style", "position: absolute; z-index: 10000; width: 20px; height: 20px; -webkit-border-radius: 10px; background-color: rgba(255,255,0,0.25); top: "+(touchA.clientY-10)+"px; left: "+(touchA.clientX-10)+"px; ");
*/

        var x1 = touchA.clientX - touchBStart.clientX,
            y1 = touchA.clientY - touchBStart.clientY,
            x2 = touchA.clientX - touchB.clientX,
            y2 = touchA.clientY - touchB.clientY;
            
        scale = Math.sqrt(x2 * x2 + y2 * y2) / Math.sqrt(x1 * x1 + y1 * y1);
        
        rotation = Math.atan(x1 / y1) - Math.atan(x2 / y2);
        if ((y1 > 0 && y2 < 0) || (y1 < 0 && y2 > 0))
            rotation += Math.PI;
        rotation *= (180 / Math.PI);
    }
    touches.push(touchB);

    var touchEvent = document.createEvent("MouseEvents");
    touchEvent.initMouseEvent(
        mouse2TouchMap[e.type], 
        true, 
        true, 
        e.view, 
        e.detail, 
        e.screenX, 
        e.screenY, 
        e.clientX, 
        e.clientY, 
        e.ctrlKey, 
        e.altKey, 
        e.shiftKey, 
        e.metaKey,
        0,
        null
    );
    touchEvent.touches = touches;
    touchEvent.targetTouches = touches;
    touchEvent.changedTouches = touches;
    touchEvent.scale = scale;
    touchEvent.rotation = rotation;
    
    document.dispatchEvent(touchEvent);
}

var zIndexCount = 1000;
var moving = {};

function touchHandler(e) {
	if (e.type == "touchstart") {
		for (var i = 0; i < e.touches.length; i++) {
			// for each "movable" touch event:
			//if (e.touches[i].target.className == "movable") {
				var id = e.touches[i].identifier;
				
				// record initial data in the "moving" hash
				moving[id] = {
					identifier: id,
					target:   	e.touches[i].target,
					mouse:		{ x: e.touches[i].clientX, y: e.touches[i].clientY },
					position:	{ x: e.touches[i].target.xfmTX, y: e.touches[i].target.xfmTY },
					rotation: 	e.touches[i].target.xfmR,
					scale: 		e.touches[i].target.xfmS
				};
				
				// move to the front
				if(moving[id].target.style.position == '' || moving[id].target.style.position == 'static')
					moving[id].target.style.position = 'relative';
				moving[id].target.style.zIndex = zIndexCount++;
				
				// reset rotate/scale mode to off
				moving[id].rotateScaleMode = false;
			//}
		}
	}
	else if (e.type == "touchmove") {
		// if there are two touchs and both are on the *same* element, we're in rotate/scale mode
		if (e.touches.length == 2 && e.touches[0].target == e.touches[1].target) {
			var idA = e.touches[0].identifier,
				idB = e.touches[1].identifier;
			
			// if we've previously recorded initial rotate/scale mode data:
			if (moving[idA].rotateScaleMode && moving[idB].rotateScaleMode) {
				// calculate translation, rotation, and scale
				moving[idA].target.xfmTX = ((moving[idA].positionCenter.x - moving[idA].mouseCenter.x) + ((e.touches[0].clientX + e.touches[1].clientX) / 2));
				moving[idA].target.xfmTY = ((moving[idA].positionCenter.y - moving[idA].mouseCenter.y) + ((e.touches[0].clientY + e.touches[1].clientY) / 2));
				moving[idA].target.xfmR = moving[idA].rotation + e.rotation;
				moving[idA].target.xfmS = moving[idA].scale * e.scale;
				
				updateTransform(moving[idA].target);
			}
			else {
				// set rotate/scale mode to on
				moving[idA].rotateScaleMode	= moving[idB].rotateScaleMode	= true;
				// record initial rotate/scale mode data
				moving[idA].mouseCenter		= moving[idB].mouseCenter		= {
					x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
					y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
				}
				moving[idA].positionCenter	= moving[idB].positionCenter	= {
					x: moving[idA].target.xfmTX,
					y: moving[idA].target.xfmTY
				}
			}
		}
		else {
			for (var i = 0; i < e.touches.length; i++) {
				var id = e.touches[i].identifier;
				
				// for each touch event:
				if (moving[id]) {
					// reset rotate/scale mode to off
					moving[id].rotateScaleMode = false;
					// calculate translation, leave rotation and scale alone
					moving[id].target.xfmTX = ((moving[id].position.x - moving[id].mouse.x) + e.touches[i].clientX);
					moving[id].target.xfmTY = ((moving[id].position.y - moving[id].mouse.y) + e.touches[i].clientY);
					updateTransform(moving[id].target);
				}
			}
		}
	}
	else if (e.type == "touchend" || e.type == "touchcancel") {
		// clear each from the "moving" hash
		for (var i = 0; i < e.touches.length; i++)
			delete moving[e.touches[i].identifier];
	}
	
	e.preventDefault();
}

// set the transform style property based on xfm element properties
function updateTransform(element) {
	element.style['-webkit-transform'] =
		'translate('+element.xfmTX+'px,'+element.xfmTY+'px) '+
		'scale('+element.xfmS+') '+
		'rotate('+element.xfmR+'deg)';
}

document.addEventListener("mousedown", fakeTouchHandler, false);
document.addEventListener("mousemove", fakeTouchHandler, false);
document.addEventListener("mouseup",   fakeTouchHandler, false);
document.addEventListener("touchstart", touchHandler, false);
document.addEventListener("touchmove", touchHandler, false);
document.addEventListener("touchend", touchHandler, false);
document.addEventListener("touchcancel", touchHandler, false);

var els = document.getElementsByTagName('*');
for (var i = 0; i < els.length; i++) {
	els[i].xfmTX = 0;
	els[i].xfmTY = 0;
	els[i].xfmR = 0;
	els[i].xfmS = 1;
	els[i].onclick = function() { return false; }
}