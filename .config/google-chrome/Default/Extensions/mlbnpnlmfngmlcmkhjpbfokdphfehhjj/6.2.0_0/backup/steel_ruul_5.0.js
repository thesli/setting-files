// JavaScript Document

window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame)

// Draggable
function Draggable(target) {

    var offsetX, offsetY, clientX, clientY;
    var style = target.style;
    var top  = parseInt(style.top, 10)   || 0;
    var left = parseInt(style.left, 10)  || 0;
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
        update(e);
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


$.fn.position = $.fn.offset;

	//GLOBAL VARIABLES BELOW

	// change to reflect different ruul types target div for use when multiple ruuls are active
	var currentRuulSteel = 'ruulSteel'
	var targetSteel = '#ruulSteel';
	var targetSteelTextDrop = '#ruulSteelTextDrop';
	var targetSteelRotate = '#ruulSteelRotate';
	var targetSteelClose = '#ruulSteelClose';

	// horizontal = 1, vertical = 2
	var ruulRotateSteel = 1;

	// closed = 1, open = 2
	var ruulTextDropOpenSteel = 1;

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
	var ruul = '<div id="ruulSteel" class="ruulHorizontal"><a id="ruulSteelRotate" class="ruulHorizontalButton"></a><a id="ruulSteelTextDrop" class="ruulTextDropHorizontal"></a><a id="ruulSteelClose" class="ruulCloseHorizontal"></a></div>';

	// Ruul advert panels
	var ruulSteelAdverts = '<div id="ruulSteelHorizontalAdvert"></div><div id="ruulSteelVerticalAdvert"></div><div id="ruulSteelPanelAdvert" class="start"><iframe src="about:blank" width="125" height="125" frameborder="0" scrolling="no" id="ruulSteelPanelAdvertFrame"></iframe></div>';

	var ruulSteelAdvertsLoaded = false;

	//FUNCTIONS BELOW

	//set variables for page size
	function ruulBrowser() {
		ruulBrowserWidth = $(document).width();
		ruulBrowserHeight = $(document).height();
		ruulBrowserWidthScreen = $(window).width();
		ruulBrowserHeightScreen = $(window).height();
	};

	//reset position of top when opening horizontal panel to prevent open panel being off screen
	function ruulOpenLostSteel() {
		// get position of ruul
		var ruulPosition = $(targetSteel);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + height is not more than browser area
		if ( position.top + ruulOpen > ruulBrowserHeight ) {
			newPosition = ruulBrowserHeight - ruulOpen;
			$(targetSteel).css('top', newPosition + 'px');
			ruulDataSaveSteel();
		};
	};

	//reset position of top when opening vertical panel to prevent open panel being off screen
	function ruulOpenLostSteelVertical() {
		// get position of ruul
		var ruulPosition = $(targetSteel);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + width is not more than browser area
		if ( position.left + ruulOpen > ruulBrowserWidth ) {
			newPosition = ruulBrowserWidth - ruulOpen;
			$(targetSteel).css('left', newPosition + 'px');
			ruulDataSaveSteel();
		};
	};

	// define start ruul, whether open or not
	function ruulDefineStartSteel() {
			if (ruulRotateSteel == 1) {
				// horizontal
				if (ruulTextDropOpenSteel == 2) {
					// panel open
					$(targetSteel).addClass('ruulHorizontalOpen');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulSteelHorizontalAdvert').show();
					$('#ruulSteelVerticalAdvert').hide();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
				} else if (ruulTextDropOpenSteel == 1) {
					// panel closed
					//advert control
					$('#ruulSteelHorizontalAdvert').show();
					$('#ruulSteelVerticalAdvert').hide();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				// don't need to do anything here as this is how the CSS positions it
			} else if (ruulRotateSteel == 2) {
				// vertical
				if (ruulTextDropOpenSteel == 2) {
					// panel open
					$(targetSteel).removeClass('ruulHorizontal').addClass('ruulVerticalOpen');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulSteelHorizontalAdvert').hide();
					$('#ruulSteelVerticalAdvert').show();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
				} else if (ruulTextDropOpenSteel == 1) {
					// panel closed
					$(targetSteel).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulSteelHorizontalAdvert').hide();
					$('#ruulSteelVerticalAdvert').show();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				$(targetSteelRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetSteelClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
			};
		};

	// rotate ruul
	function ruulRotateSteelRound() {
			if (ruulRotateSteel == 1) {
				if (ruulTextDropOpenSteel == 2) {
					// panel open
					$(targetSteel).removeClass('ruulHorizontalOpen').addClass('ruulVerticalOpen');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulSteelHorizontalAdvert').hide();
					$('#ruulSteelVerticalAdvert').show();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostSteelVertical();
				} else if (ruulTextDropOpenSteel == 1) {
					// panel closed
					$(targetSteel).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulSteelHorizontalAdvert').hide();
					$('#ruulSteelVerticalAdvert').show();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').hide(); };
				};
				$(targetSteelRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetSteelClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
				ruulRotateSteel = 2;
				ruulDataSaveSteel();
				return false;
			} else if (ruulRotateSteel == 2) {
				if (ruulTextDropOpenSteel == 2) {
					// panel open
					$(targetSteel).removeClass('ruulVerticalOpen').addClass('ruulHorizontalOpen');
					$(targetSteelTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulSteelHorizontalAdvert').show();
					$('#ruulSteelVerticalAdvert').hide();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostSteel();
				} else if (ruulTextDropOpenSteel == 1) {
					// panel closed
					$(targetSteel).removeClass('ruulVertical').addClass('ruulHorizontal');
					$(targetSteelTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulSteelHorizontalAdvert').show();
					$('#ruulSteelVerticalAdvert').hide();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').hide(); };
				};
				$(targetSteelRotate).removeClass('ruulVerticalButton').addClass('ruulHorizontalButton');
				$(targetSteelClose).removeClass('ruulCloseVertical').addClass('ruulCloseHorizontal');
				ruulRotateSteel = 1;
				ruulDataSaveSteel();
				return false;
			};
		};

	// open ruul panel
	function ruulShowTextPanelSteel() {
			if (ruulRotateSteel == 1) {
				if (ruulTextDropOpenSteel == 1) {
					$(targetSteel).removeClass('ruulHorizontal').addClass('ruulHorizontalOpen');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulSteelHorizontalAdvert').show();
					$('#ruulSteelVerticalAdvert').hide();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostSteel();
					ruulTextDropOpenSteel = 2;
					ruulDataSaveSteel();
					return false;
				} else if (ruulTextDropOpenSteel == 2) {
					$(targetSteel).removeClass('ruulHorizontalOpen').addClass('ruulHorizontal');
					$(targetSteelTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulSteelHorizontalAdvert').show();
					$('#ruulSteelVerticalAdvert').hide();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').hide(); };
					ruulTextDropOpenSteel = 1;
					ruulDataSaveSteel();
					return false;
				};
			} else if (ruulRotateSteel == 2) {
				if (ruulTextDropOpenSteel == 1) {
					$(targetSteel).removeClass('ruulVertical').addClass('ruulVerticalOpen');
					$(targetSteelTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulSteelHorizontalAdvert').hide();
					$('#ruulSteelVerticalAdvert').show();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostSteelVertical();
					ruulTextDropOpenSteel = 2;
					ruulDataSaveSteel();
					return false;
				} else if (ruulTextDropOpenSteel == 2) {
					$(targetSteel).removeClass('ruulVerticalOpen').addClass('ruulVertical');
					$(targetSteelTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulSteelHorizontalAdvert').hide();
					$('#ruulSteelVerticalAdvert').show();
					if ( ruulSteelAdvertsLoaded = true ) { $('#ruulSteelPanelAdvert').hide(); };
					ruulTextDropOpenSteel = 1;
					ruulDataSaveSteel();
					return false;
				};
			};
		};



	// position ruul to saved data on body tag
	function ruulStartPositionSteel() {
		//get width and height of viewport
		ruulBrowser();
		// console position saved on local storage
		var storedX = localStorage.getItem(currentRuulSteel + 'x') || 50;
		var storedY = localStorage.getItem(currentRuulSteel + 'y') || 50;

		$(targetSteel).css('top',  storedX + 'px');
		$(targetSteel).css('left', storedY + 'px');

		if (localStorage.getItem(currentRuulSteel + 'rotate') == 2) {
			//Make ruul vertical
			ruulRotateSteel = 2;
		} else {
			ruulRotateSteel = 1;
		}
		if (localStorage.getItem(currentRuulSteel + 'openruul') == 2) {
			//Make ruul open
			ruulTextDropOpenSteel = 2;
		} else {
			ruulTextDropOpenSteel = 1;
		}
		ruulDefineStartSteel();
		ruulDataSaveSteel();
	}


	// add ruul state data to local storage to use in reload, uses unique name per ruul type
	function ruulDataSaveSteel() {
		// get position of ruul
		var ruulPosition = $(targetSteel);
		var position = ruulPosition.position();
		// add to local storage
		localStorage.setItem(currentRuulSteel + 'x', position.left);
		localStorage.setItem(currentRuulSteel + 'y', position.top);
		localStorage.setItem(currentRuulSteel + 'rotate', ruulRotateSteel);
		localStorage.setItem(currentRuulSteel + 'openruul', ruulTextDropOpenSteel);
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulSteel + 'y') > ruulBrowserHeight - 20) {
			//ruul is below the page
			var newPosition;
			if (ruulRotateSteel == 2) {
				// vertical
				newPosition = ruulBrowserHeight - ruulLength;
			} else if (ruulTextDropOpenSteel == 2) {
					// horizontal open
					newPosition = ruulBrowserHeight - ruulOpen;
			} else {
				//horizontal closed
				newPosition = ruulBrowserHeight - ruulClosed;
			};
			$(targetSteel).css('top', newPosition + 'px');
			ruulDataSaveSteel();
		};
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulSteel + 'x') > ruulBrowserWidth - 20) {
			//ruul is to the right of the page
			var newPosition;
			if (ruulRotateSteel == 2) {
				// veritcal
				if (ruulTextDropOpenSteel == 2) {
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
			$(targetSteel).css('left', newPosition + 'px');
			ruulDataSaveSteel();
		};
		if (localStorage.getItem(currentRuulSteel + 'y') < 0 - ruulNegative) {
			//ruul is above the page
			$(targetSteel).css('top', '0px');
			ruulDataSaveSteel();
		};
		if (localStorage.getItem(currentRuulSteel + 'x') < 0 - ruulNegative) {
			//ruul is to the left of the page
			$(targetSteel).css('left', '0px');
			ruulDataSaveSteel();
		};
	};

	//function to define the highest z-index, and make ruul the top item - not working, try saving ruul z-index to local storage and setting it to plus one at start
	function ruulOnTop() {
		if (localStorage.getItem('zRuul') > 1) {
			//ruul z-index is stored, get top ruul and add to variable
			topRuul = parseInt(localStorage.getItem('zRuul'));
			var newTopRuul = topRuul + 1;
			$(targetSteel).css('z-index', newTopRuul);
			localStorage.setItem('zRuul', newTopRuul);
		} else {
			//set local storage as the bottom ruul position
			localStorage.setItem('zRuul', 100000);
		};
	};

	//function to start ruul on site, need to add code to hide object to try that (update CSS for new test extension
	function startRuulSteel() {
		var ruulGetter1 = $(targetSteel);
		var ruulGetter2 = ruulGetter1.length;
		// if ruul already exists
		if (ruulGetter2 > 0) {
			//remove ruul
			$(targetSteel).remove();
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
			$(targetSteel).append(ruulSteelAdverts);
			//check for advert load
			$('iframe#ruulSteelPanelAdvertFrame').load(function() {
				ruulSteelAdvertsLoaded = false;
				//listen for message to confirm advert
				window.addEventListener("message", ruulSteelMessage, false);
    		});
    	*/
			$('input').blur();
			$(targetSteel).focus();
			//position ruul on page based on any saved position
			ruulOnTop();
			ruulStartPositionSteel();
			ruulCheckIsOnScreenSteel();
		};
	};

	//function to make sure ruul is on screen
	function ruulCheckIsOnScreenSteel() {
			//get width and height of viewport
			ruulBrowser();
			var screenTopSteel = document.body.scrollTop;
			var screenTopNewSteel = screenTopSteel + 50;
			var screenBottomSteel = screenTopSteel + ruulBrowserHeightScreen;
			//If ruul is below screen this puts it back on screen
			if (localStorage.getItem(currentRuulSteel + 'y') > screenBottomSteel) {
				$(targetSteel).css('top', screenTopNewSteel + 'px');
				ruulDataSaveSteel();
			}
			//If ruul is above screen this puts it back on screen
			if (localStorage.getItem(currentRuulSteel + 'y') < screenTopSteel) {
				$(targetSteel).css('top', screenTopNewSteel + 'px');
				ruulDataSaveSteel();
			}
	}

	//function to check message from iframe to confirm advert
	function ruulSteelMessage (evt) {
			if (evt.data == "ruulAdvert") {
				ruulSteelAdvertsLoaded = true;
				$('#ruulSteelPanelAdvert').removeClass('start');
			};
	};

	//function to close ruul
	function closeRuulSteel() {
			$(targetSteel).remove();
			return false;
	};


	//RUN SCRIPT BELOW
	startRuulSteel();

	//remove ruul on clicking close button
	$(targetSteelClose).click(function() { closeRuulSteel() });

	//drag and drop ruul
	///$(targetSteel).draggable({ cursor: 'pointer' });
  new Draggable(document.getElementById(targetSteel.slice(1)));

	//set position of ruul on mouse release
	$(targetSteel).mouseup(function() { ruulDataSaveSteel() });

	//rotate ruul
	$(targetSteelRotate).click(function() { ruulRotateSteelRound() });

	//move ruul with keys
	$('body').keydown(function(event) {
		//check for any other ruuls on stage
		var addTop = function(diff) {
			$(targetSteel).css("top", ($(targetSteel).position().top + diff) + "px");
		};
   		var addLeft = function(diff) {
			$(targetSteel).css("left", ($(targetSteel).position().left + diff) + "px");
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
		ruulDataSaveSteel();
		return false;
	});

	//Show text panel
	$(targetSteelTextDrop).click(function() { ruulShowTextPanelSteel() });

	//Act on browser resize
	$(window).resize(function() {
		ruulStartPositionSteel();
	});

//END OF RUUL
