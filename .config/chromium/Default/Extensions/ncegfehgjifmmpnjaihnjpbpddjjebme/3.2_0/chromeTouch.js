(function(){
    if (window.chromeTouch) {
        // load twice
        return;
    }
    window.chromeTouch = true;
    
    /**
     *  mouse state variable.
     *     -1: uninitialized
     *      0: mouse is up
     *      1: mouse is down
     *      2: mouse is down and moving(drag)
     */
    var mousestate = -1;

    /**
     *  mouse position & move size variables.
     */
    var startX = 0;
    var startY = 0;
    var mouseX = 0;
    var mouseY = 0;
    var moveX = 0;
    var moveY = 0;
    var restX = 0;
    var restY = 0;
	var moved = 0;

    /**
     *  glide variables.
     */
    var scrollTimer;
    var glideTimer;

    /**
     *  bounce variables.
     */
    var bodyX = 0;
    var bodyY = 0;
    var bodyMoveMaxHorizontal = 50;
    var bodyMoveMaxVertical = 50;
    var bounceTimer;
    var backups = {
        html: {},
        body: {},
        document: {}
    };

    /**
     * mouse track history
     */
    var trackHistory;
    var totalDist;
    var dragLeft;
    var dragRight;

    /**
     *  other variable.
     */
    var initTimer;
    var mousestate_forclick = 0;
    var mousestate_forclick_threshold = 10;
    var featureEnabled = {noScrollbar: false};
    var lastMovedTime = 0;
    var easyKey = {"ctrlKey":true,"altKey":false,"shiftKey":true,"keyCode":67};

    /**
     * global objects.
     */
    var scrollHeightObject;
    var scrollTopObject;
    var scrollLeftObject;
    var scrollWidthObject;
    var clientHeightObject;
    var clientWidthObject;
    var currentClientHeight;
    
    /**
     * site check
     */
    var checksitesFunctions = {
        f1: "Touch Mode",
        f2: "Bounce Effect",
        f3: "No Scrollbar mode"
    };
    var currentChecker = null;
    var defaultChecksites = '[{"host": "http://mail.google.com/*","f3": 0},{"host": "https://mail.google.com/*","f3": 0},{"host": "http://www.youtube.com/*","f3": 0}]';
    var allowIframeSits = '["mail.google.com"]';
    
    /**
     *  settings valiable.
     */
    var setting = {
        switchTouchMode: 1,
        switchTouchModeKeys: "Ctrl+Shift+C",
        switchTouchModeEasyKey: '{"ctrlKey":true,"altKey":false,"shiftKey":true,"keyCode":67}',
        hideIcon: 0,
        touchMode: 2,
        useButton: 1,
        dragSpeed: 3,
        dragDirection: 1,
        glideDistance: 3,
        glideFactor: 3,
        timerInterval: 3,
        glideTimeover: 100,
        featureBounce: 1,
        featureNoScrollbar: 0,
        featureNoScrollbarUseKeyboard: 1,
        featureNoScrollbarUseMousewheel: 1,
        featureMousegesture: 0,
        featureMousegestureReverseBackForward: 0,
        checksites: defaultChecksites
    };
    var settingForce = {
        timerInterval: 3,
        checksites: defaultChecksites
    };

    var setting_value = {};
    setting_value["touchMode"] = {
        1: 1,    // Auto (scroll with non-text area)
        2: 2,    // Full (scroll at any time)
        3: 3     // Off (don't scroll)
    };
    setting_value["useButton"] = {
        1: 1,    // Left Click
        2: 2,    // Middle Click
        3: 3     // Right Click
    };
    setting_value["dragSpeed"] = {
        1: 0.6,
        2: 0.8,
        3: 1.0,
        4: 1.2,
        5: 1.5
    };
    setting_value["dragDirection"] = {
        1: 1,    // Normal
        2: -1    // Reverse
    };
    setting_value["glideDistance"] = {
        1: 40,
        2: 30,
        3: 20,
        4: 10,
        5: 0
    };
    setting_value["glideFactor"] = {
        0: 30,
        1: 100,
        2: 80,
        3: 60,
        4: 40,
        5: 20
    };
    setting_value["glideEndPixel"] = {
        0: 1,
        1: 3,
        2: 5,
        3: 8,
        4: 12,
        5: 16
    };

    /**
     *  init Touch interface
     */
    function initChromeTouch() {
        document.removeEventListener("mousedown", handleMousedown, false);
        document.removeEventListener("mouseup",   handleMouseup, false);
        document.removeEventListener("mousemove", handleMousemove, false);
        document.removeEventListener("mouseover", handleMouseover, false);
        document.removeEventListener("click",     handleMouseclick, false);
        document.removeEventListener("mousewheel", handleMousewheel, false);
        document.removeEventListener("contextmenu", handleContextMenu, false);
        document.removeEventListener("keydown",   handleKeydown, false);
//        window.removeEventListener("load",        handleWindowLoad, false);

        document.addEventListener("mousedown", handleMousedown, false);
        document.addEventListener("mouseup",   handleMouseup, false);
        document.addEventListener("mousemove", handleMousemove, false);
        document.addEventListener("mouseover", handleMouseover, false);
        document.addEventListener("click",     handleMouseclick, false);
        document.addEventListener("mousewheel", handleMousewheel, false);
        document.addEventListener("contextmenu", handleContextMenu, false);
        document.addEventListener("keydown",   handleKeydown, false);
//        window.addEventListener("load",        handleWindowLoad, false);

        // load settings
        var port = chrome.runtime.connect({name: "chromeTouch.loadSetting"});
        port.postMessage(setting);

        // listener from background
        chrome.runtime.onConnect.addListener(function(port){
            if (port.name == "chromeTouch.refleshSetting") {
                port.onMessage.removeListener(refleshSetting);
                port.onMessage.addListener(refleshSetting);
//            } else if (port.name == "chromeTouch.captureTab") {
//                port.onMessage.removeListener(captureTab);
//                port.onMessage.addListener(captureTab);
            }
        });
        
        if (document.body && document.body.style) {
            scrollHeightObject = (document.documentElement && document.documentElement.scrollHeight ? document.documentElement : document.body);
            scrollWidthObject = (document.documentElement && document.documentElement.scrollWidth ? document.documentElement : document.body);
            scrollTopObject = (document.documentElement && document.documentElement.scrollTop ? document.documentElement : document.body);
            scrollLeftObject = (document.documentElement && document.documentElement.scrollLeft ? document.documentElement : document.body);
            clientHeightObject = (document.compatMode && document.compatMode != "BackCompat" ? document.documentElement : document.body);
            clientWidthObject = (document.compatMode && document.compatMode != "BackCompat" ? document.documentElement : document.body );
        }
    }

    /**
     *  reflesh chromeTouch settings
     */
    function refleshSetting(newSettings) {
	    for (var key in newSettings) {
            if (!newSettings.hasOwnProperty(key)) {
                continue;
            }
            setting[key] = newSettings[key];
            if (String(setting[key]).match(/^\d+$/)) {
                setting[key] = parseInt(setting[key]);
            }
        }
	    for (var key in settingForce) {
            if (!newSettings.hasOwnProperty(key)) {
                continue;
            }
            setting[key] = settingForce[key];
        }
        if (setting.switchTouchModeEasyKey) {
            try {
                easyKey = JSON.parse(setting.switchTouchModeEasyKey);
            } catch (e) {
            }
        }
        switchNoScrollbar();
    }

    /**
     *  'mousedown' event handler
     */
    function handleMousedown(event) {
        endGlide();

        // check moouse button
        if (setting.useButton != event.which) {
            return;
        }

        // sitecheck
        var touchMode = setting.touchMode;
        var fourceTouchMode = sitecheck('f1');
        if (fourceTouchMode !== null) {
            touchMode = fourceTouchMode;
        }

        if (setting.useButton == 1) {
            // Check for left click only.
            switch (touchMode) {
                case 1: // auto detect
                    if (!isDraggable(event, false) || isTextNode(event)) {
                        return true;
                    }
                    break;
                case 2: // scroll at any time
                    if (!isDraggable(event, true)) {
                        return true;
                    }
                    break;
                case 3: // scroll off
                    return true;
            }
        }

        var bodyStyle = getComputedStyle(document.body, "");
        backups.body.marginTop = bodyStyle.marginTop;
        backups.body.top = bodyStyle.top;
        backups.body.position = bodyStyle.position;
        backups.body.left = bodyStyle.left;
        backups.body.backgroundPositionX = bodyStyle.backgroundPositionX;
        backups.body.backgroundPositionY = bodyStyle.backgroundPositionY;
        backups.document.scrollLeft = scrollLeftObject.scrollLeft;
        backups.document.scrollTop = scrollTopObject.scrollTop;
        updatePageInfo();

        trackHistory = {
            x: 0,
            y: 0,
            dist: [],
            angle: [],
            distTotal: 0
        };
        dragLeft = dragRight = true;
        
        mousestate_forclick = 0;
        mousestate_forclick_threshold = setting.useButton == 1 ? 10 : 1;
        mousestate = 1;
        mouseX = event.clientX;
        mouseY = event.clientY;
        startX = mouseX;
        startY = mouseY;
        bodyX = 0;
        bodyY = 0;

        var selection = window.getSelection();
        if (setting.useButton == 3 && selection && selection.toString()) {
            // Don't stop event in case of using right mouse button and select a text.
            // a context menu will show.
            mousestate = 0;
        } else {
            event.stopPropagation();
            event.preventDefault();
        }
    }
    
    function handleContextMenu(event) {
        // disable context menu when using right mouse button
        if (setting.useButton == 3 && mousestate_forclick) {
            event.stopPropagation();
            event.preventDefault();
            mousestate_forclick = 0;
            return false;
        }
    }

    /**
     *  Check draggable or not
     */
    function isDraggable(event, fulldrag) {
        var nodeName = event.target.nodeName.toUpperCase();
        var target = event.target;
        var style = getComputedStyle(target, "");
        if (nodeName == "SELECT") {
            // close pulldown options.
            event.target.addEventListener("change", unselect, false);
        }
        if (event.ctrlKey
                || event.shiftKey
                || style.cursor.toUpperCase() != "AUTO"
                || target.nodeType == Node.TEXT_NODE
                || target.getAttribute('contenteditable')
                || event.clientX > clientWidthObject.clientWidth
                || event.clientY > clientHeightObject.clientHeight) {
            return false;
        }

        for (var e = target; e && e != document.body; e = e.parentNode) {
            var styleE = getComputedStyle(e, "");
            if (e.getAttribute('contenteditable')) {
            	return false;
            }
            if (styleE == null) {
                continue;
            }
            if ((styleE.overflowX == "auto" || styleE.overflowY == "auto"
                    || styleE.overflowX == "scroll" || styleE.overflowY == "scroll")){
                // check if on scrollbar or not.
                if (event.layerX > e.scrollWidth
                        || event.layerY > e.scrollHeight) {
                    return false;
                }
                // add scrollBy function and event handler to this scrollable element.
                if (!e.scrollBy && (e.scrollWidth != e.clientWidth || e.scrollHeight != e.clientHeight)) {
                    e.scrollBy = scrollByElement;
                    e.draggingElement = draggingElement;
                    e.endDragElement = endDragElement;
                    e.glideElement = glideElement;
                    e.nextGlideElement = nextGlideElement;
//                    e.addEventListener("mousedown", handleElementMousedown, false);
                    e.addEventListener("mouseup",   handleElementMouseup, false);
                    e.addEventListener("mousemove", handleElementMousemove, false);
                }
                break;
            }
        }

        if (fulldrag) {
            if (nodeName == "INPUT"
                    || nodeName == "TEXTAREA"
                    || nodeName == "SELECT"
                    || nodeName == "OPTION") {
                return false;
            }
        } else {
            if (nodeName == "INPUT"
                    || nodeName == "TEXTAREA"
                    || nodeName == "SELECT"
                    || nodeName == "OPTION"
                    || nodeName == "EMBED"
                    || nodeName == "OBJECT"
                    || nodeName == "APPLET") {
                return false;
            }
        }
        return true;
    }
    
    /**
     *  Check it's TEXT_NODE or not
     */
    function isTextNode(event){
        var style = getComputedStyle(event.target);
        if (event.target.childNodes) {
            var isText = false;
            var zoom = getZoomLevel();

            for (var i = 0; i < event.target.childNodes.length; i++) {
                var node = event.target.childNodes[i];
                // ignore non-TEXT_NODE
                if (node.nodeType != Node.TEXT_NODE
                        || node.textContent.replace(/^[\s\t\r\n]+|[\s\t\r\n]+$/g, "") == "") {
                    continue;
                }

                // clicked point is TEXT_NODE?
                // * chrome(weblit) has not event.explicitOriginalTarget, so check step-by-step..
                var wrap = document.createElement("span");
                wrap.appendChild(node.cloneNode());
                wrap.style.position = "absolute";
                wrap = node.parentNode.insertBefore(wrap, node);
                var mx = event.clientX / zoom + window.pageXOffset;
                var my = event.clientY / zoom + window.pageYOffset;
                var pos = position(wrap);
                var pos_x = pos.x / zoom;
                var pos_y = pos.y / zoom;
                var padding = 10;
                if (pos_x - padding > mx || pos_x + wrap.offsetWidth + padding < mx
                        || pos_y - padding > my || pos_y + wrap.offsetHeight + padding < my) {
//console.log("out pos_x=" + pos_x + ", pos_y=" + pos_y + ", mx=" + mx + ", my=" + my + ", wrap.offsetWidth=" + wrap.offsetWidth + ", wrap.offsetHeight=" + wrap.offsetHeight);
//wrap.style.backgroundColor = "green";
                    node.parentNode.removeChild(wrap);
                    continue;
                }
                node.parentNode.removeChild(wrap);

                isText = true;
                break;
            }
            if (isText) {
                return true;
            }
        }
        return false;
    }

    /**
     *  'mouseup' event handler
     */
    function handleMouseup(event) {
        if (mousestate == 2 && getTime() - lastMovedTime < setting.glideTimeover) {
            endDrag(event);
        } else if (mousestate == 2) {
            turnbackBody();
        } else if (mousestate == 1) {
            window.getSelection().removeAllRanges();
        }
        if (mousestate > 1 && Math.abs((mouseX - startX) + (startY - mouseY)) > mousestate_forclick_threshold) {
            mousestate_forclick = 1;
        }
        mousestate = 0;
    }

    /**
     *  'click' event handler
     */
    function handleMouseclick(event) {
        if (mousestate_forclick) {
            event.stopPropagation();
            event.preventDefault();
        }
        mousestate_forclick = 0;
    }

    /**
     *  'mousemove' event handler
     */
    function handleMousemove(event) {
        if (mousestate <= 0) {
            return;
        } else if (mousestate == 1) {
            mousestate = 2;
        }
        dragging(event);
        lastMovedTime = getTime();
        event.stopPropagation();
        event.preventDefault();
    }

    /**
     *  'mouseover' event handler
     */
    function handleMouseover(event) {
        // if dragging over iframe, stop drag.
        if (event.target.tagName.toLowerCase() === "iframe") {
            handleMouseup(event);
        }
    }

    /**
     *  mouse dragging (called by handleMousemove)
     */
    function dragging(event) {
    	if (mouseX - event.clientX == 0 && mouseY - event.clientY == 0) {
    		// Nothing happend.
    		return;
    	}
        moveX = (mouseX - event.clientX) * setting_value["dragSpeed"][setting.dragSpeed];
        moveY = (mouseY - event.clientY) * setting_value["dragSpeed"][setting.dragSpeed];
        moveX *= setting_value["dragDirection"][setting.dragDirection];
        moveY *= setting_value["dragDirection"][setting.dragDirection];

        if (setting.featureBounce) {
/*
            var scrollLeft = scrollLeftObject.scrollLeft;
            var goLeft = scrollLeft + moveX < 0;
            var goRight = clientWidthObject.clientWidth + scrollLeft + moveX > scrollWidthObject.scrollWidth;
            if (((moveX != 0 && (bodyX != 0 || bodyY != 0)) || Math.abs(moveX) > 6) && (goLeft || goRight)) {
                // left or right
                moveDocumentBody(moveX, 0);
            }
*/
            
            var scrollTop = scrollTopObject.scrollTop;
            var goTop = scrollTop + moveY < 0;
            var goBottom = clientHeightObject.clientHeight + scrollTop + moveY > scrollHeightObject.scrollHeight;
            if (Math.abs(moveY) > 0 && (goTop || goBottom)) {
                // top or bottom
                moveDocumentBody(0, moveY);
            }
        }

        saveTrack(moveX, moveY);

        window.scrollBy(moveX, moveY);
//        scrollWindow(moveX, moveY, 0.8);
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    /**
     * Scroll window smoothly
     */
    function scrollWindow(moveX, moveY, easing) {
    	if (scrollTimer) {
        	clearInterval(scrollTimer);
    	}
    	moveX += restX;
    	moveY += restY;
    	if (moveX == 0 && moveY == 0) {
    		// don't move. finish here.
			restX = 0;
			restY = 0;
    		return;
    	}
    	
    	restX = moveX;
    	restY = moveY;
    	var x = 0;
    	var y = 0;
    	var bx1 = -1;
    	var by1 = -1;
    	var bx2 = -2;
    	var by2 = -2;
    	scrollTimer = setInterval(function(){
    		var x1 = moveX - x;
    		var y1 = moveY - y;
    		if (Math.abs(x1) > 1) {
    			x1 /= easing;
    		}
    		if (Math.abs(y1) > 1) {
    			y1 /= easing;
    		}
//    		console.log(scrollLeftObject.scrollLeft, scrollTopObject.scrollTop, bx2, by2);
    		if (scrollLeftObject.scrollLeft == bx2 && scrollTopObject.scrollTop == by2) {
    			// didn't move
    			restX = 0;
    			restY = 0;
    			clearInterval(scrollTimer);
    			return;
    		}
    		bx2 = bx1;
    		by2 = by1;
    		bx1 = scrollLeftObject.scrollLeft;
    		by1 = scrollTopObject.scrollTop;
			// scroll a bit.
    		window.scrollBy(x1, y1);
            if (setting.glideFactor != 0) {
        		x += x1;
        		y += y1;
            }
    		restX = moveX - x;
    		restY = moveY - y;
    		if (Math.abs(restX) < 1 && Math.abs(restY) < 1) {
    			// scroll rest of all and finish.
    			restX = 0;
    			restY = 0;
        		window.scrollBy(restX, restY);
    			clearInterval(scrollTimer);
    		}
    	}, setting.timerInterval);
    }
    
    /**
     *  end drag (called by handleMouseup)
     */
    function endDrag(event) {
        // Glide away
        var glideX = moveX * setting_value["glideDistance"][setting.glideDistance];
        var glideY = moveY * setting_value["glideDistance"][setting.glideDistance];
        var glideFactor = setting_value["glideFactor"][setting.glideFactor];
        scrollWindow(glideX, glideY, glideFactor);
//        glideWindow(glideY, 0);
    }

    /**
     *  glide after mousedrag and mouseup
     *  @deprecated
     */
    function glideWindow(lastY, currentY) {
        var glideFactor = setting_value["glideFactor"][setting.glideFactor];
        var glideEndPixel = setting_value["glideEndPixel"][setting.glideFactor];
        moved = 0;
        glideTimer = setTimeout(function(){
            var nextY = (lastY - currentY) / glideFactor;
            var nextY2 = 0;
            var scrollTop = scrollTopObject.scrollTop;
            var scrollHeight = scrollHeightObject.scrollHeight;

            if (setting.glideFactor != 0) {
                currentY += nextY;
            }
            moved += nextY;
            
            if (setting.featureBounce
                    && nextY < 0
                    && scrollTop + nextY < 0) {
                // move document.body for top
                nextY2 = bodyY + Math.abs(nextY);
                if (nextY2 > bodyMoveMaxVertical) {
                    // real top end.
                    endGlide();
                    turnbackBody();
                    return;
                }
                scrollTopObject.scrollTop = 0;
                var result = moveDocumentBody(0, nextY);
                if (!result) {
                    // maxover bottom end.
                    endGlide();
                    turnbackBody();
                    return;
                }
            } else if (setting.featureBounce
                    && nextY > 0
                    && scrollTop + currentClientHeight + nextY > scrollHeight) {
                // move document.body for bottom
                nextY2 = bodyY - Math.abs(nextY);
                if (-nextY2 > bodyMoveMaxVertical) {
                    // real bottom end.
                    endGlide();
                    turnbackBody();
                    return;
                }
                scrollTopObject.scrollTop = scrollHeight - currentClientHeight;
                var result = moveDocumentBody(0, nextY);
                if (!result) {
                    // maxover bottom end.
                    endGlide();
                    turnbackBody();
                    return;
                }
            } else {
                // normal glide.
                nextGlide(nextY);
            }

            scrollTop = scrollTopObject.scrollTop;
            if (Math.abs(nextY) <= glideEndPixel || (nextY2 && Math.abs(nextY2) <= glideEndPixel)) {
                // break
                endGlide();
                turnbackBody();
                return;
            }

            glideTimer = setTimeout(arguments.callee, setting.timerInterval);
        }, setting.timerInterval);
    }

    /**
     *  glide a bit
     */
    function nextGlide(nextY) {
/*
        if (setting.featureBounce && bodyX != 0) {
            // adjust traverse direction
            var nextX = 8 * (bodyX < 0 ? 1 : -1);
            if (Math.abs(bodyX) < 8) {
                nextX = -bodyX;
            }
            moveDocumentBody(nextX, 0);
        }
*/
        window.scrollBy(0, nextY);
    }

    /**
     *  finish glide
     */
    function endGlide() {
        if (glideTimer) {
            clearTimeout(glideTimer);
            glideTimer = null;
        }
    }

    /**
     *  'keydown' event handler
     */
    function handleKeydown(event) {
        var keyCode = event.keyCode;
        if (easyKey.keyCode === keyCode
                && easyKey.ctrlKey === event.ctrlKey
                && easyKey.altKey === event.altKey
                && easyKey.shiftKey === event.shiftKey) {
            shiftTouchMode();
        } else if (featureEnabled.noScrollbar
                 && setting.featureNoScrollbarUseKeyboard === 1) {
            if (keyCode >= 32 && keyCode <= 40
                    && isDraggable(event, false)) {
                // arrow key
                scrollByKeyboard(event);
            }
        }
    }
    
    /**
     *  'keydown' event handler
     */
    function handleMousewheel(event) {
        if (featureEnabled.noScrollbar
                && setting.featureNoScrollbarUseMousewheel === 1) {
            scrollByMousewheel(event);
        }
    }
    
    function scrollByKeyboard(event) {
        var keyCode = event.keyCode;
        if (keyCode === 32) {
            // space
            window.scrollBy(0, clientHeightObject.clientHeight * 0.9);
        } else if (keyCode === 33) {
            // page up
            window.scrollBy(0, clientHeightObject.clientHeight * 0.9 * -1);
        } else if (keyCode === 34) {
            // page down
            window.scrollBy(0, clientHeightObject.clientHeight * 0.9);
        } else if (keyCode === 35) {
            // end
            window.scrollBy(0, scrollHeightObject.scrollHeight);
        } else if (keyCode === 36) {
            // home
            window.scrollBy(0, scrollHeightObject.scrollHeight * -1);
        } else if (keyCode === 37) {
            // arrow left
            window.scrollBy(-50, 0);
        } else if (keyCode === 38) {
            // arrow up
            window.scrollBy(0, -50);
        } else if (keyCode === 39) {
            // arrow right
            window.scrollBy(50, 0);
        } else if (keyCode === 40) {
            // arrow down
            window.scrollBy(0, 50);
        }
    }
    
    function scrollByMousewheel(event) {
        window.scrollBy(event.wheelDeltaX * -1, event.wheelDeltaY * -1);
    }
    
    function moveDocumentBody(nextX, nextY) {
        if (!setting.featureBounce) {
            return;
        }
        document.body.style.position = "relative";
/*
        if (nextX != 0) {
            // for left & right
            var body_left = getNumeric(document.body.style.left);
            if (Math.abs(body_left - nextX) < bodyMoveMaxHorizontal) {
                if (backups.body.backgroundPositionX !== null) {
                    document.body.style.backgroundPositionX = (body_left - nextX) + "px";
                }
                document.body.style.left = (body_left - nextX) + "px";
                bodyX += nextX;
            } else {
                // maxover
                return false;
            }
        }
*/
        if (nextY != 0) {
            // for top & bottom
            var body_top = getNumeric(document.body.style.top);
            if (Math.abs(body_top - nextY) < bodyMoveMaxVertical) {
                if (backups.body.backgroundPositionY !== null) {
                    document.body.style.backgroundPositionY = (body_top - nextY) + "px";
                }
                document.body.style.top = (body_top - nextY) + "px";
                bodyY += nextY;
            } else {
                // maxover
                return false;
            }
        }
        return true;
    }
    
    function getNumeric(obj) {
        var ret = obj ? parseInt(obj) : 0;
        if (isNaN(ret)) {
            // maybe it was 'auto' or so on
            ret = 0;
        }
        return ret;
    }

    /**
     *  finish bounce
     */
    function endBounce() {
        document.body.style.top = backups.body.top;
        document.body.style.left = backups.body.left;
        document.body.style.marginTop = backups.body.marginTop;
        document.body.style.position = backups.body.position;
        document.body.style.backgroundPositionX = backups.body.backgroundPositionX;
        document.body.style.backgroundPositionY = backups.body.backgroundPositionY;
        if (bounceTimer) {
            clearInterval(bounceTimer);
            bounceTimer = null;
        }
        if (scrollTimer) {
        	clearInterval(scrollTimer);
        	scrollTimer = null;
        }
        bodyX = 0;
        bodyY = 0;
    }

    function turnbackBody() {
        if (setting.featureMousegesture === 1 && trackHistory.distTotal > 50) {
            // go back or left
            if (dragLeft) {
                if (setting.featureMousegestureReverseBackForward) {
                    history.forward();
                } else {
                    history.back();
                }
            } else if (dragRight) {
                if (setting.featureMousegestureReverseBackForward) {
                    history.back();
                } else {
                    history.forward();
                }
            }
        }
        if (!setting.featureBounce) {
            return;
        }
        var lastX = 0;
        var lastY = 0;
        bounceTimer = setInterval(function(){
//            var nextX = Math.abs(Math.floor(bodyX)) < 8 ? 0 : (bodyX > 0 ? -8 : 8);
            var nextX = 0;
            var nextY = Math.abs(Math.floor(bodyY)) < 8 ? 0 : (bodyY > 0 ? -8 : 8);
            if (nextX == 0 && nextY == 0) {
                // break
                endBounce();
                return;
            }
            moveDocumentBody(nextX, nextY);
//            scrollLeftObject.scrollLeft = scrollLeftObject.scrollLeft - nextX;
            scrollTopObject.scrollTop = scrollTopObject.scrollTop - nextY;
        }, setting.timerInterval);
    }
    
    /**
     * no scrollbar mode
     */
    function switchNoScrollbar() {
        // sitecheck
        var featureNoScrollbar = setting.featureNoScrollbar;
        var fourceFeatureNoScrollbar = sitecheck('f3');
        if (fourceFeatureNoScrollbar !== null
                && typeof fourceFeatureNoScrollbar !== "undefined") {
            featureNoScrollbar = fourceFeatureNoScrollbar;
        }
        var html = (document.getElementsByTagName("html"))[0];
        if (featureNoScrollbar === 1) {
            if (getComputedStyle(html, "").overflow != "hidden") {
                backups.html.overflow = html.style.overflow;
//                backups.body.overflow = document.body.style.overflow;
                html.style.overflow = "hidden";
//                document.body.style.overflow = "hidden";
                featureEnabled.noScrollbar = true;
            }
        } else {
            if (typeof backups.html.overflow != "undefined") {
                html.style.overflow = backups.html.overflow;                    
//                document.body.style.overflow = backups.body.overflow;                    
                delete backups.html.overflow;
//                delete backups.body.overflow;
            } else if (html.style.overflow == "hidden") {
                html.style.overflow = "";
//                document.body.style.overflow = "";
                delete backups.html.overflow;
//                delete backups.body.overflow;
            }
            featureEnabled.noScrollbar = false;
        }
    }

    function sitecheck(func) {
        if (currentChecker === false) {
            // no checker
            return null;
        }
        if (currentChecker === null) {
            // search checker
            currentChecker = getSiteChecker();
        }
        if (currentChecker) {
            // get it
            var val = currentChecker[func];
            if (typeof currentChecker[func] === "undefined") {
                return null;
            } else {
                return false;
            }
        }
    }

    function getSiteChecker() {
        var site = location.href;
        var check, found;
        var checksites = JSON.parse(setting.checksites);
        for (var i = 0; i < checksites.length; i++) {
            check = checksites[i];
            if (check.host) {
                var sitestr = site;
                var hostparts = check.host.split(/\*/);
                found = true;
                for (var j = 0; j < hostparts.length; j++) {
                    var pos = sitestr.indexOf(hostparts[j]);
                    if (pos < 0 || (j == 0 && pos !== 0)) {
                        found = false;
                        break;
                    }
                    sitestr = sitestr.substring(pos + hostparts[j].length);
                }
                // find
                if (found) {
                    return check;
                }
            }
        }
        return false;
    }

    /**
     *  Change Touch mode AUTO -> FULL -> OFF -> ...
     */
    function shiftTouchMode() {
        if (setting.switchTouchMode != "1") {
            return;
        }
        setting.touchMode++;
        if (setting.touchMode > 3) {
            setting.touchMode = 1;
        }
        var port = chrome.runtime.connect({name: "chromeTouch.shiftTouchMode"});
        port.postMessage({touchMode: setting.touchMode});
    }

    /**
     *  event handler for closing select options.
     */
    function unselect(event) {
    	if (!this.multiple) {
            this.size = 2;
            this.multiple = "multiple";
            this.size = 1;
            this.multiple = false;
    	}
        this.removeEventListener(arguments.callee);
    }

    /**
     *  get element's position utility
     */
    function position(element) {
        var x = 0, y = 0;
        for (var e = element; e; e = e.offsetParent) {
            x += e.offsetLeft;
            y += e.offsetTop;
        }
        for (e = element.parentNode; e && e != document.body; e = e.parentNode) {
            if (e.scrollLeft) {
                x -= e.scrollLeft;
            }
            if (e.scrollTop) {
                y -= e.scrollTop;
            }
        }
        return {x: x, y: y};
    }

    function updatePageInfo() {
        currentClientHeight = clientHeightObject.clientHeight;
    }

    /**
     *  UNIX timestamp util
     */
    function getTime() {
        return (new Date()).getTime();
    }
    
    /**
     *  get Current Zoom Level
     */
    function getZoomLevel() {
        var d = document.createElement("div");
        var styles = {position:"fixed", left:"0", top: "0", height: "100%", width: "1px"};
        for (var i in styles) {
            d.style[i] = styles[i];
        }
        d = document.documentElement.appendChild(d);
        var style = getComputedStyle(d);
        var height = style.height;
        d.style.position = "absolute";    // if don't reset here, glide scroll would be no-smooth.
        document.documentElement.removeChild(d);
        var clientHeight = clientHeightObject.clientHeight;
        zoom = parseInt(height) / parseInt(clientHeight);
        return zoom;
    }
    
    function setStyle(element, styles) {
        for (var i in styles) {
            element.style[i] = styles[i];
        }
    }
    
    /**
     * scroll function for scrollable element(overflow:auto)
     * @param x
     * @param y
     */
    function scrollByElement(x, y) {
        this.scrollLeft += x;
        this.scrollTop += y;
    }
    
    /**
     *  'mouseup' event handler for scrollable element
     */
    function handleElementMouseup(event) {
        if (mousestate == 2 && getTime() - lastMovedTime < setting.glideTimeover) {
            this.endDragElement(event);
        } else if (mousestate == 1) {
            window.getSelection().removeAllRanges();
        }
        if (mousestate > 1 && Math.abs((mouseX - startX) + (startY - mouseY)) > mousestate_forclick_threshold) {
            mousestate_forclick = 1;
        }
        mousestate = 0;
    }
    
    /**
     *  'mousemove' event handler for scrollable element
     */
    function handleElementMousemove(event) {
        if (mousestate <= 0) {
            return;
        } else if (mousestate == 1) {
            mousestate = 2;
        }
        this.draggingElement(event);
        lastMovedTime = getTime();
        event.stopPropagation();
        event.preventDefault();
    }
    
    function draggingElement(event) {
        moveX = (mouseX - event.clientX) * setting_value["dragSpeed"][setting.dragSpeed];
        moveY = (mouseY - event.clientY) * setting_value["dragSpeed"][setting.dragSpeed];
        moveX *= setting_value["dragDirection"][setting.dragDirection];
        moveY *= setting_value["dragDirection"][setting.dragDirection];
        this.scrollBy(moveX, moveY);
        mouseX = event.clientX;
        mouseY = event.clientY;
    }

    /**
     *  end drag scrollable element (called by handleElementMouseup)
     */
    function endDragElement(event) {
        // Glide away(only for Y)
        var glideY = moveY * setting_value["glideDistance"][setting.glideDistance];
        this.glideElement(glideY, 0);
    }

    /**
     *  glide after mousedrag and mouseup for scrollable element
     */
    function glideElement(lastY, currentY) {
//        var diff = Math.pow(lastY - currentY, 2);
        var glideEndPixel = setting_value["glideEndPixel"][setting.glideFactor];
        var element = this;
        moved = 0;
        glideTimer = setTimeout(function(){
            var nextY = element.nextGlideElement(lastY, currentY);
            currentY += nextY;
            moved += nextY;
            if (Math.abs(nextY) <= glideEndPixel) {
                endGlideElement();
                return;
            }
            glideTimer = setTimeout(arguments.callee, setting.timerInterval);
        }, setting.timerInterval);
    }

    /**
     *  glide a bit for scrollable element
     */
    function nextGlideElement(lastY, currentY) {
        var nextY = (lastY - currentY) / setting_value["glideFactor"][setting.glideFactor];
        this.scrollTop += nextY;
        if (this.scrollTop <= 0 || this.scrollTop >= this.scrollHeight - this.clientHeight) {
            nextY = 0;
        }
        return nextY;
    }

    /**
     *  finish glide for scrollable element
     */
    function endGlideElement() {
        if (glideTimer) {
            clearTimeout(glideTimer);
            glideTimer = null;
        }
    }
    
/*
    function handleWindowLoad() {
        if (window.parent !== window.self) {
            // in frame
            return;
        }
        // capture tab image
        var port = chrome.runtime.connect({name: "chromeTouch.captureTab"});
        port.postMessage(window.location.href);
    }
*/
    
    /**
     * save mouse track history
     */
    function saveTrack(moveX, moveY){
        if (!dragLeft && !dragRight) {
            // check only left and right.
            return;
        }
        var dist = Math.sqrt(Math.pow(moveX, 2) + Math.pow(moveY, 2));
        var angle = Math.atan2(moveX, moveY) * 180 / Math.PI; // flip y and x.
        trackHistory.distTotal += dist;
        if (trackHistory.angle.length) {
            var pos = trackHistory.angle.length - 1;
            var p_angle = trackHistory.angle[pos];
            var angle_diff = Math.abs(p_angle - angle);
            if (angle > 120 || angle < 60) {
                // over range of angle for left direction(90 +- 30)
                dragLeft = false;
            }
            if (angle < -120 || angle > -60) {
                // over range of angle for right direction(-90 +- 30)
                dragRight = false;
            }
            if (angle_diff > 20) {
                // turn off
                trackHistory.dist.push(dist);
                trackHistory.angle.push(angle);
            } else {
                // go straight
                trackHistory.dist[pos] = trackHistory.dist[pos] + dist;
                trackHistory.angle[pos] = angle;
            }
        } else {
            // first track
            trackHistory.dist.push(dist);
            trackHistory.angle.push(angle);
        }
    }
    
/*
    function captureTab(data) {
        var canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        var ctx = canvas.getContext("2d");
        var img = new Image();
        img.src = data.dataUrl;
        img.onload = function() {
            setStyle(canvas, {
                position: "absolute"
                , top: "0px"
                , left: parseInt(img.width) * -1 - 20 + "px"
            });
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            console.log(canvas.width);
        }
    }
*/
    
    if (window.parent !== window.self) {
        // in frame
        window.addEventListener("load", function(){
            var allowsites = JSON.parse(allowIframeSits);
            var allowIframe = false;
            for (var i = 0; i < allowsites.length; i++) {
                if (allowsites[i] == location.host) {
                    allowIframe = true;
                    break;
                }
            }

            // ADs check start.
            if (!allowIframe) {
                var frame_width = document.body.clientWidth;
                var frame_height = document.body.clientHeight;
                if (frame_width <= 100 || frame_height <= 100) {
                    // this frame must be a ads! ignore it.
                    return;
                }
                if (document.images && document.images.length == 1
                        && document.body.innerText.length == 0
                        && (document.images[0].width <= 200
                            || document.images[0].height <= 200)) {
                    // this frame must be a ads! ignore it.
                }
            }

            initChromeTouch();
        }, false);
        return;
    } else {
        // Top window
        initTimer = setInterval(function(){
            if (document && document.body) {
                initChromeTouch();
                clearInterval(initTimer);
                return true;
            }
        }, 200);
    }
})();
