// JavaScript Document

window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame)

// Draggable
function Draggable(target) {

    var offsetX, offsetY, clientX, clientY;
    var style = target.style;
    var mouse_is_moving = false;

    function onMouseDown(e) {
    		mouse_is_moving = true;
        window.addEventListener("mousemove", saveMouseCoordinates, false)
        window.addEventListener("mouseup", onMouseUp, false);
        var top  = parseInt(style.top, 10)   || 50;
    		var left = parseInt(style.left, 10)  || 50;
        offsetX = left - e.clientX;
        offsetY = top  - e.clientY;
        e.preventDefault(); // prevent text selection
        saveMouseCoordinates(e);
        requestAnimationFrame(update);
    }

    function onMouseUp(e) {
    		mouse_is_moving = false;
    		saveMouseCoordinates(e);
        window.removeEventListener("mousemove", saveMouseCoordinates, false);
        window.removeEventListener("mouseup", onMouseUp, false);
    }

    function saveMouseCoordinates(e) {
    		clientX = e.clientX;
    		clientY = e.clientY;
    }

    function update(e) {
        style.left = (clientX + offsetX) + 'px';
        style.top  = (clientY + offsetY) + 'px';
        if (mouse_is_moving) requestAnimationFrame(update);
    }

    style.cursor = "pointer";
    target.addEventListener("mousedown", onMouseDown, false);
}


/*
// JavaScript Document

// Draggable
function Draggable(target) {

    var offsetX, offsetY;
    var style = target.style;

    function onMouseDown(e) {
        window.addEventListener("mousemove", onMouseMove, false);
        window.addEventListener("mouseup", onMouseUp, false);
        offsetX = parseInt(style.left, 10) - e.clientX;
        offsetY = parseInt(style.top, 10)  - e.clientY;
        e.preventDefault(); // prevent text selection
    }

    function onMouseUp(e) {
        onMouseMove(e);
        window.removeEventListener("mousemove", onMouseMove, false);
        window.removeEventListener("mouseup", onMouseUp, false);
    }

    function onMouseMove(e) {
        style.left = (e.clientX + offsetX) + 'px';
        style.top  = (e.clientY + offsetY) + 'px';
    }

    style.cursor = "pointer";
    target.addEventListener("mousedown", onMouseDown, false);
}
*/


$.fn.position = $.fn.offset;

	//GLOBAL VARIABLES BELOW

	// change to reflect different ruul types target div for use when multiple ruuls are active
	var currentRuul = 'ruul'
	var target = '#ruul';
	var targetTextDrop = '#ruulTextDrop';
	var targetRotate = '#ruulRotate';
	var targetClose = '#ruulClose';

	// horizontal = 1, vertical = 2
	var ruulRotate = 1;

	// closed = 1, open = 2
	var ruulTextDropOpen = 1;

	// browser width and height
	var ruulBrowserWidth;
	var ruulBrowserHeight;
	var ruulBrowserWidthScreen;
	var ruulBrowserHeightScreen;

	// size of ruul
	var ruulLength = 600;
	var ruulOpen = 400;
	var ruulClosed = 100;
	var ruulNegative = ruulClosed - 20;

	// latest ruul z-index, set to 1 initially to fool an if statement below
	var topRuul = 1;

	// HTML to insert on page change to reflect ruul type
	var ruul = '<div id="ruul" class="ruulHorizontal"><a id="ruulRotate" class="ruulHorizontalButton"></a><a id="ruulTextDrop" class="ruulTextDropHorizontal"></a><a id="ruulClose" class="ruulCloseHorizontal"></a></div>';

	// Ruul advert panels
	var ruulAdverts = '<div id="ruulHorizontalAdvert"></div><div id="ruulVerticalAdvert"></div><div id="ruulPanelAdvert" class="start"><iframe src="about:blank" width="125" height="125" frameborder="0" scrolling="no" id="ruulPanelAdvertFrame"></iframe></div>';

	var ruulAdvertsLoaded = false;


	//FUNCTIONS BELOW

	//set variables for page size
	function ruulBrowser() {
		ruulBrowserWidth = $(document).width();
		ruulBrowserHeight = $(document).height();
		ruulBrowserWidthScreen = $(window).width();
		ruulBrowserHeightScreen = $(window).height();
	};

	//reset position of top when opening horizontal panel to prevent open panel being off screen
	function ruulOpenLost() {
		// get position of ruul
		var ruulPosition = $(target);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + height is not more than browser area
		if ( position.top + ruulOpen > ruulBrowserHeight ) {
			newPosition = ruulBrowserHeight - ruulOpen;
			$(target).css('top', newPosition + 'px');
			ruulDataSave();
		};
	};

	//reset position of top when opening vertical panel to prevent open panel being off screen
	function ruulOpenLostVertical() {
		// get position of ruul
		var ruulPosition = $(target);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + width is not more than browser area
		if ( position.left + ruulOpen > ruulBrowserWidth ) {
			newPosition = ruulBrowserWidth - ruulOpen;
			$(target).css('left', newPosition + 'px');
			ruulDataSave();
		};
	};

	// define start ruul, whether open or not
	function ruulDefineStart() {
			if (ruulRotate == 1) {
				// horizontal
				if (ruulTextDropOpen == 2) {
					// panel open
					$(target).addClass('ruulHorizontalOpen');
					$(targetTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulHorizontalAdvert').show();
					$('#ruulVerticalAdvert').hide();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
				} else if (ruulTextDropOpen == 1) {
					// panel closed
					//advert control
					$('#ruulHorizontalAdvert').show();
					$('#ruulVerticalAdvert').hide();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				// don't need to do anything here as this is how the CSS positions it
			} else if (ruulRotate == 2) {
				// vertical
				if (ruulTextDropOpen == 2) {
					// panel open
					$(target).removeClass('ruulHorizontal').addClass('ruulVerticalOpen');
					$(targetTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulHorizontalAdvert').hide();
					$('#ruulVerticalAdvert').show();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
				} else if (ruulTextDropOpen == 1) {
					// panel closed
					$(target).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulHorizontalAdvert').hide();
					$('#ruulVerticalAdvert').show();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				$(targetRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
			};
		};

	// rotate ruul
	function ruulRotateRound() {
			if (ruulRotate == 1) {
				if (ruulTextDropOpen == 2) {
					// panel open
					$(target).removeClass('ruulHorizontalOpen').addClass('ruulVerticalOpen');
					$(targetTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulHorizontalAdvert').hide();
					$('#ruulVerticalAdvert').show();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostVertical();
				} else if (ruulTextDropOpen == 1) {
					// panel closed
					$(target).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulHorizontalAdvert').hide();
					$('#ruulVerticalAdvert').show();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').hide(); };
				};
				$(targetRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
				ruulRotate = 2;
				ruulDataSave();
				return false;
			} else if (ruulRotate == 2) {
				if (ruulTextDropOpen == 2) {
					// panel open
					$(target).removeClass('ruulVerticalOpen').addClass('ruulHorizontalOpen');
					$(targetTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulHorizontalAdvert').show();
					$('#ruulVerticalAdvert').hide();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLost();
				} else if (ruulTextDropOpen == 1) {
					// panel closed
					$(target).removeClass('ruulVertical').addClass('ruulHorizontal');
					$(targetTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulHorizontalAdvert').show();
					$('#ruulVerticalAdvert').hide();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').hide(); };
				};
				$(targetRotate).removeClass('ruulVerticalButton').addClass('ruulHorizontalButton');
				$(targetClose).removeClass('ruulCloseVertical').addClass('ruulCloseHorizontal');
				ruulRotate = 1;
				ruulDataSave();
				return false;
			};
		};

	// open ruul panel
	function ruulShowTextPanel() {
			if (ruulRotate == 1) {
				if (ruulTextDropOpen == 1) {
					$(target).removeClass('ruulHorizontal').addClass('ruulHorizontalOpen');
					$(targetTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulHorizontalAdvert').show();
					$('#ruulVerticalAdvert').hide();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLost();
					ruulTextDropOpen = 2;
					ruulDataSave();
					return false;
				} else if (ruulTextDropOpen == 2) {
					$(target).removeClass('ruulHorizontalOpen').addClass('ruulHorizontal');
					$(targetTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulHorizontalAdvert').show();
					$('#ruulVerticalAdvert').hide();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').hide(); };
					ruulTextDropOpen = 1;
					ruulDataSave();
					return false;
				};
			} else if (ruulRotate == 2) {
				if (ruulTextDropOpen == 1) {
					$(target).removeClass('ruulVertical').addClass('ruulVerticalOpen');
					$(targetTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulHorizontalAdvert').hide();
					$('#ruulVerticalAdvert').show();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostVertical();
					ruulTextDropOpen = 2;
					ruulDataSave();
					return false;
				} else if (ruulTextDropOpen == 2) {
					$(target).removeClass('ruulVerticalOpen').addClass('ruulVertical');
					$(targetTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulHorizontalAdvert').hide();
					$('#ruulVerticalAdvert').show();
					if ( ruulAdvertsLoaded = true ) { $('#ruulPanelAdvert').hide(); };
					ruulTextDropOpen = 1;
					ruulDataSave();
					return false;
				};
			};
		};



	// position ruul to saved data on body tag
	function ruulStartPosition() {
		//get width and height of viewport
		ruulBrowser();
		//console.log("Start position is " + localStorage.getItem(currentRuul + 'x') + "X " + localStorage.getItem(currentRuul + 'y') + "Y");
		//console.log("Page size is " + ruulBrowserWidth + "X " + ruulBrowserHeight + "Y");
		//console.log("Browser size is " + ruulBrowserWidthScreen + "X " + ruulBrowserHeightScreen + "Y");
		//console.log("H(1) or V(2) = " + localStorage.getItem(currentRuul + 'rotate'));
		//console.log("Closed(1) or Open(2) = " + localStorage.getItem(currentRuul + 'openruul'));
		// console position saved on local storage
		var storedX = localStorage.getItem(currentRuul + 'x') || 50;
		var storedY = localStorage.getItem(currentRuul + 'y') || 50;

		$(target).css('top',  storedX + 'px');
		$(target).css('left', storedY + 'px');

		if (localStorage.getItem(currentRuul + 'rotate') == 2) {
			//Make ruul vertical
			ruulRotate = 2;
		} else {
			ruulRotate = 1;
		}
		if (localStorage.getItem(currentRuul + 'openruul') == 2) {
			//Make ruul open
			ruulTextDropOpen = 2;
		} else {
			ruulTextDropOpen = 1;
		}
		ruulDefineStart();
		ruulDataSave();
	}

	// add ruul state data to local storage to use in reload, uses unique name per ruul type
	function ruulDataSave() {
		// get position of ruul
		var ruulPosition = $(target);
		var position = ruulPosition.position();
		// add to local storage
		localStorage.setItem(currentRuul + 'x', position.left);
		localStorage.setItem(currentRuul + 'y', position.top);
		localStorage.setItem(currentRuul + 'rotate', ruulRotate);
		localStorage.setItem(currentRuul + 'openruul', ruulTextDropOpen);
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuul + 'y') > ruulBrowserHeight - 20) {
			//ruul is below the page
			var newPosition;
			if (ruulRotate == 2) {
				// vertical
				newPosition = ruulBrowserHeight - ruulLength;
			} else if (ruulTextDropOpen == 2) {
					// horizontal open
					newPosition = ruulBrowserHeight - ruulOpen;
			} else {
				//horizontal closed
				newPosition = ruulBrowserHeight - ruulClosed;
			};
			$(target).css('top', newPosition + 'px');
			ruulDataSave();
		};
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuul + 'x') > ruulBrowserWidth - 20) {
			//ruul is to the right of the page
			var newPosition;
			if (ruulRotate == 2) {
				// veritcal
				if (ruulTextDropOpen == 2) {
					// vertical open
					newPosition = ruulBrowserWidth - ruulOpen;
				} else {
					// vertical closed
					newPosition = ruulBrowserWidth - ruulClosed;
				};
			} else {
				//horizontal
				newPosition = ruulBrowserWidth - ruulLength;
			};
			$(target).css('left', newPosition + 'px');
			ruulDataSave();
		};
		if (localStorage.getItem(currentRuul + 'y') < 0 - ruulNegative) {
			//ruul is above the page
			$(target).css('top', '0px');
			ruulDataSave();
		};
		if (localStorage.getItem(currentRuul + 'x') < 0 - ruulNegative) {
			//ruul is to the left of the page
			$(target).css('left', '0px');
			ruulDataSave();
		};
	};

	//function to define the highest z-index, and make ruul the top item - not working, try saving ruul z-index to local storage and setting it to plus one at start
	function ruulOnTop() {
		if (localStorage.getItem('zRuul') > 1) {
			//ruul z-index is stored, get top ruul and add to variable
			topRuul = parseInt(localStorage.getItem('zRuul'));
			var newTopRuul = topRuul + 1;
			$(target).css('z-index', newTopRuul);
			localStorage.setItem('zRuul', newTopRuul);
		} else {
			//set local storage as the bottom ruul position
			localStorage.setItem('zRuul', 100000);
		};
	};

	//function to start ruul on site, need to add code to hide object
	function startRuul() {
		var ruulGetter1 = $(target);
		var ruulGetter2 = ruulGetter1.length;
		// if ruul already exists
		if (ruulGetter2 > 0) {
			//remove ruul
			$(target).remove();
			// replace any removed objects
			var ruulFlash1 = $('object');
			var ruulFlash2 = ruulFlash1.length;
			if (ruulFlash2 > 0) {
				//check for any other ruuls on stage
				var ruulTest1 = $('#ruul');
				var ruulTest1a = ruulTest1.length;
				var ruulTest2 = $('#ruulBlue');
				var ruulTest2a = ruulTest2.length;
				var ruulTest3 = $('#ruulGreen');
				var ruulTest3a = ruulTest3.length;
				var ruulTest4 = $('#ruulPink');
				var ruulTest4a = ruulTest4.length;
				var ruulTest5 = $('#ruulSteel');
				var ruulTest5a = ruulTest5.length;
				var ruulTest6 = $('#ruulWood');
				var ruulTest6a = ruulTest6.length;
				var ruulTest7 = $('#ruulCarbon');
				var ruulTest7a = ruulTest7.length;
				var ruulTest8 = $('#ruulLong');
				var ruulTest8a = ruulTest8.length;
				var ruulTestForOthers = ruulTest1a + ruulTest2a + ruulTest3a + ruulTest4a + ruulTest5a + ruulTest6a + ruulTest7a + ruulTest8a;
				//only show object if no ruuls on stage
				if (ruulTestForOthers == 0) {
					$('object').show();
				};
			};
		} else {
			//find any objects and remove them
			var ruulFlash1 = $('object');
			var ruulFlash2 = ruulFlash1.length;
			if (ruulFlash2 > 0) {
				$('object').hide();
			};
			//add HTML to page and add focus to it (to avoid problems with text fields on pages, eg. google
			$('body').append(ruul);
      /*
			//add adverts to ruul
			$(target).append(ruulAdverts);
			//check for advert load
			$('iframe#ruulPanelAdvertFrame').load(function() {
				ruulAdvertsLoaded = false;
				//listen for message to confirm advert
				window.addEventListener("message", ruulMessage, false);
    		});
      */
			$('input').blur();
			$(target).focus();
			//position ruul on page based on any saved position
			ruulOnTop();
			ruulStartPosition();
			ruulCheckIsOnScreen();
		};
	};

	//function to make sure ruul is on screen
	function ruulCheckIsOnScreen() {
			//get width and height of viewport
			ruulBrowser();
			var screenTop = document.body.scrollTop;
			var screenTopNew = screenTop + 50;
			var screenBottom = screenTop + ruulBrowserHeightScreen;
			//If ruul is below screen this puts it back on screen
			if (localStorage.getItem(currentRuul + 'y') > screenBottom) {
				$(target).css('top', screenTopNew + 'px');
				ruulDataSave();
			}
			//If ruul is above screen this puts it back on screen
			if (localStorage.getItem(currentRuul + 'y') < screenTop) {
				$(target).css('top', screenTopNew + 'px');
				ruulDataSave();
			}
	};


	//function to check message from iframe to confirm advert
	function ruulMessage (evt) {
			if (evt.data == "ruulAdvert") {
				ruulAdvertsLoaded = true;
				$('#ruulPanelAdvert').removeClass('start');
			};
	};

	//function to close ruul
	function closeRuul() {
			$(target).remove();
			//return false;
	};


	//RUN SCRIPT BELOW
	startRuul();

	//remove ruul on clicking close button
	$(targetClose).click(function() { closeRuul() });

	//drag and drop ruul
	///$(target).draggable({ cursor: 'pointer' });
	new Draggable(document.getElementById(target.slice(1)));



	//set position of ruul on mouse release
	$(target).mouseup(function() { ruulDataSave() });

	//rotate ruul
	$(targetRotate).click(function() { ruulRotateRound() });

	//move ruul with keys
	$('body').keydown(function(event) {
		//check for any other ruuls on stage
		var addTop = function(diff) {
			$(target).css("top", ($(target).position().top + diff) + "px");
		};
   		var addLeft = function(diff) {
			$(target).css("left", ($(target).position().left + diff) + "px");
    	};
     	switch(event.keyCode) {
        case 37: //left
            addLeft(-1); break;
        case 38: //up
            addTop(-1); break;
        case 39: //right
            addLeft(1); break;
        case 40: //down
            addTop(1); break;
    	};
		ruulDataSave();
		return false;
	});

	//Show text panel
	$(targetTextDrop).click(function() { ruulShowTextPanel() });

	//Act on browser resize
	$(window).resize(function() {
		ruulStartPosition();
	});

//END OF RUUL
