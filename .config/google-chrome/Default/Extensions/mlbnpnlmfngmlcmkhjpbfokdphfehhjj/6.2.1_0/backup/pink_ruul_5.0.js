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
	var currentRuulPink = 'ruulPink'
	var targetPink = '#ruulPink';
	var targetPinkTextDrop = '#ruulPinkTextDrop';
	var targetPinkRotate = '#ruulPinkRotate';
	var targetPinkClose = '#ruulPinkClose';

	// horizontal = 1, vertical = 2
	var ruulRotatePink = 1;

	// closed = 1, open = 2
	var ruulTextDropOpenPink = 1;

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
	var ruul = '<div id="ruulPink" class="ruulHorizontal"><a id="ruulPinkRotate" class="ruulHorizontalButton"></a><a id="ruulPinkTextDrop" class="ruulTextDropHorizontal"></a><a id="ruulPinkClose" class="ruulCloseHorizontal"></a></div>';

	// Ruul advert panels
	var ruulPinkAdverts = '<div id="ruulPinkHorizontalAdvert"></div><div id="ruulPinkVerticalAdvert"></div><div id="ruulPinkPanelAdvert" class="start"><iframe src="about:blank" width="125" height="125" frameborder="0" scrolling="no" id="ruulPinkPanelAdvertFrame"></iframe></div>';

	var ruulPinkAdvertsLoaded = false;

	//FUNCTIONS BELOW

	//set variables for page size
	function ruulBrowser() {
		ruulBrowserWidth = $(document).width();
		ruulBrowserHeight = $(document).height();
		ruulBrowserWidthScreen = $(window).width();
		ruulBrowserHeightScreen = $(window).height();
	};

	//reset position of top when opening horizontal panel to prevent open panel being off screen
	function ruulOpenLostPink() {
		// get position of ruul
		var ruulPosition = $(targetPink);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + height is not more than browser area
		if ( position.top + ruulOpen > ruulBrowserHeight ) {
			newPosition = ruulBrowserHeight - ruulOpen;
			$(targetPink).css('top', newPosition + 'px');
			ruulDataSavePink();
		};
	};

	//reset position of top when opening vertical panel to prevent open panel being off screen
	function ruulOpenLostPinkVertical() {
		// get position of ruul
		var ruulPosition = $(targetPink);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + width is not more than browser area
		if ( position.left + ruulOpen > ruulBrowserWidth ) {
			newPosition = ruulBrowserWidth - ruulOpen;
			$(targetPink).css('left', newPosition + 'px');
			ruulDataSavePink();
		};
	};

	// define start ruul, whether open or not
	function ruulDefineStartPink() {
			if (ruulRotatePink == 1) {
				// horizontal
				if (ruulTextDropOpenPink == 2) {
					// panel open
					$(targetPink).addClass('ruulHorizontalOpen');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulPinkHorizontalAdvert').show();
					$('#ruulPinkVerticalAdvert').hide();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
				} else if (ruulTextDropOpenPink == 1) {
					// panel closed
					//advert control
					$('#ruulPinkHorizontalAdvert').show();
					$('#ruulPinkVerticalAdvert').hide();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				// don't need to do anything here as this is how the CSS positions it
			} else if (ruulRotatePink == 2) {
				// vertical
				if (ruulTextDropOpenPink == 2) {
					// panel open
					$(targetPink).removeClass('ruulHorizontal').addClass('ruulVerticalOpen');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulPinkHorizontalAdvert').hide();
					$('#ruulPinkVerticalAdvert').show();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
				} else if (ruulTextDropOpenPink == 1) {
					// panel closed
					$(targetPink).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulPinkHorizontalAdvert').hide();
					$('#ruulPinkVerticalAdvert').show();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				$(targetPinkRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetPinkClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
			};
		};

	// rotate ruul
	function ruulRotatePinkRound() {
			if (ruulRotatePink == 1) {
				if (ruulTextDropOpenPink == 2) {
					// panel open
					$(targetPink).removeClass('ruulHorizontalOpen').addClass('ruulVerticalOpen');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulPinkHorizontalAdvert').hide();
					$('#ruulPinkVerticalAdvert').show();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostPinkVertical();
				} else if (ruulTextDropOpenPink == 1) {
					// panel closed
					$(targetPink).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulPinkHorizontalAdvert').hide();
					$('#ruulPinkVerticalAdvert').show();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').hide(); };
				};
				$(targetPinkRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetPinkClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
				ruulRotatePink = 2;
				ruulDataSavePink();
				return false;
			} else if (ruulRotatePink == 2) {
				if (ruulTextDropOpenPink == 2) {
					// panel open
					$(targetPink).removeClass('ruulVerticalOpen').addClass('ruulHorizontalOpen');
					$(targetPinkTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulPinkHorizontalAdvert').show();
					$('#ruulPinkVerticalAdvert').hide();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostPink();
				} else if (ruulTextDropOpenPink == 1) {
					// panel closed
					$(targetPink).removeClass('ruulVertical').addClass('ruulHorizontal');
					$(targetPinkTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulPinkHorizontalAdvert').show();
					$('#ruulPinkVerticalAdvert').hide();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').hide(); };
				};
				$(targetPinkRotate).removeClass('ruulVerticalButton').addClass('ruulHorizontalButton');
				$(targetPinkClose).removeClass('ruulCloseVertical').addClass('ruulCloseHorizontal');
				ruulRotatePink = 1;
				ruulDataSavePink();
				return false;
			};
		};

	// open ruul panel
	function ruulShowTextPanelPink() {
			if (ruulRotatePink == 1) {
				if (ruulTextDropOpenPink == 1) {
					$(targetPink).removeClass('ruulHorizontal').addClass('ruulHorizontalOpen');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulPinkHorizontalAdvert').show();
					$('#ruulPinkVerticalAdvert').hide();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostPink();
					ruulTextDropOpenPink = 2;
					ruulDataSavePink();
					return false;
				} else if (ruulTextDropOpenPink == 2) {
					$(targetPink).removeClass('ruulHorizontalOpen').addClass('ruulHorizontal');
					$(targetPinkTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulPinkHorizontalAdvert').show();
					$('#ruulPinkVerticalAdvert').hide();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').hide(); };
					ruulTextDropOpenPink = 1;
					ruulDataSavePink();
					return false;
				};
			} else if (ruulRotatePink == 2) {
				if (ruulTextDropOpenPink == 1) {
					$(targetPink).removeClass('ruulVertical').addClass('ruulVerticalOpen');
					$(targetPinkTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulPinkHorizontalAdvert').hide();
					$('#ruulPinkVerticalAdvert').show();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostPinkVertical();
					ruulTextDropOpenPink = 2;
					ruulDataSavePink();
					return false;
				} else if (ruulTextDropOpenPink == 2) {
					$(targetPink).removeClass('ruulVerticalOpen').addClass('ruulVertical');
					$(targetPinkTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulPinkHorizontalAdvert').hide();
					$('#ruulPinkVerticalAdvert').show();
					if ( ruulPinkAdvertsLoaded = true ) { $('#ruulPinkPanelAdvert').hide(); };
					ruulTextDropOpenPink = 1;
					ruulDataSavePink();
					return false;
				};
			};
		};



	// position ruul to saved data on body tag
	function ruulStartPositionPink() {
		//get width and height of viewport
		ruulBrowser();
		// console position saved on local storage
		var storedX = localStorage.getItem(currentRuulPink + 'x') || 50;
		var storedY = localStorage.getItem(currentRuulPink + 'y') || 50;

		$(targetPink).css('top',  storedX + 'px');
		$(targetPink).css('left', storedY + 'px');

		if (localStorage.getItem(currentRuulPink + 'rotate') == 2) {
			//Make ruul vertical
			ruulRotatePink = 2;
		} else {
			ruulRotatePink = 1;
		}
		if (localStorage.getItem(currentRuulPink + 'openruul') == 2) {
			//Make ruul open
			ruulTextDropOpenPink = 2;
		} else {
			ruulTextDropOpenPink = 1;
		}
		ruulDefineStartPink();
		ruulDataSavePink();
	}



	// add ruul state data to local storage to use in reload, uses unique name per ruul type
	function ruulDataSavePink() {
		// get position of ruul
		var ruulPosition = $(targetPink);
		var position = ruulPosition.position();
		// add to local storage
		localStorage.setItem(currentRuulPink + 'x', position.left);
		localStorage.setItem(currentRuulPink + 'y', position.top);
		localStorage.setItem(currentRuulPink + 'rotate', ruulRotatePink);
		localStorage.setItem(currentRuulPink + 'openruul', ruulTextDropOpenPink);
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulPink + 'y') > ruulBrowserHeight - 20) {
			//ruul is below the page
			var newPosition;
			if (ruulRotatePink == 2) {
				// vertical
				newPosition = ruulBrowserHeight - ruulLength;
			} else if (ruulTextDropOpenPink == 2) {
					// horizontal open
					newPosition = ruulBrowserHeight - ruulOpen;
			} else {
				//horizontal closed
				newPosition = ruulBrowserHeight - ruulClosed;
			};
			$(targetPink).css('top', newPosition + 'px');
			ruulDataSavePink();
		};
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulPink + 'x') > ruulBrowserWidth - 20) {
			//ruul is to the right of the page
			var newPosition;
			if (ruulRotatePink == 2) {
				// veritcal
				if (ruulTextDropOpenPink == 2) {
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
			$(targetPink).css('left', newPosition + 'px');
			ruulDataSavePink();
		};
		if (localStorage.getItem(currentRuulPink + 'y') < 0 - ruulNegative) {
			//ruul is above the page
			$(targetPink).css('top', '0px');
			ruulDataSavePink();
		};
		if (localStorage.getItem(currentRuulPink + 'x') < 0 - ruulNegative) {
			//ruul is to the left of the page
			$(targetPink).css('left', '0px');
			ruulDataSavePink();
		};
	};

	//function to define the highest z-index, and make ruul the top item - not working, try saving ruul z-index to local storage and setting it to plus one at start
	function ruulOnTop() {
		if (localStorage.getItem('zRuul') > 1) {
			//ruul z-index is stored, get top ruul and add to variable
			topRuul = parseInt(localStorage.getItem('zRuul'));
			var newTopRuul = topRuul + 1;
			$(targetPink).css('z-index', newTopRuul);
			localStorage.setItem('zRuul', newTopRuul);
		} else {
			//set local storage as the bottom ruul position
			localStorage.setItem('zRuul', 100000);
		};
	};

	//function to start ruul on site, need to add code to hide object to try that (update CSS for new test extension
	function startRuulPink() {
		var ruulGetter1 = $(targetPink);
		var ruulGetter2 = ruulGetter1.length;
		// if ruul already exists
		if (ruulGetter2 > 0) {
			//remove ruul
			$(targetPink).remove();
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
			$(targetPink).append(ruulPinkAdverts);
			//check for advert load
			$('iframe#ruulPinkPanelAdvertFrame').load(function() {
				ruulPinkAdvertsLoaded = false;
				//listen for message to confirm advert
				window.addEventListener("message", ruulPinkMessage, false);
    		});
    	*/
			$('input').blur();
			$(targetPink).focus();
			//position ruul on page based on any saved position
			ruulOnTop();
			ruulStartPositionPink();
			ruulCheckIsOnScreenPink();
		};
	};

	//function to make sure ruul is on screen
	function ruulCheckIsOnScreenPink() {
			//get width and height of viewport
			ruulBrowser();
			var screenTopPink = document.body.scrollTop;
			var screenTopNewPink = screenTopPink + 50;
			var screenBottomPink = screenTopPink + ruulBrowserHeightScreen;
			//If ruul is below screen this puts it back on screen
			if (localStorage.getItem(currentRuulPink + 'y') > screenBottomPink) {
				$(targetPink).css('top', screenTopNewPink + 'px');
				ruulDataSavePink();
			}
			//If ruul is above screen this puts it back on screen
			if (localStorage.getItem(currentRuulPink + 'y') < screenTopPink) {
				$(targetPink).css('top', screenTopNewPink + 'px');
				ruulDataSavePink();
			}
	}

	//function to check message from iframe to confirm advert
	function ruulPinkMessage (evt) {
			if (evt.data == "ruulAdvert") {
				ruulPinkAdvertsLoaded = true;
				$('#ruulPinkPanelAdvert').removeClass('start');
			};
	};

	//function to close ruul
	function closeRuulPink() {
			$(targetPink).remove();
			return false;
	};


	//RUN SCRIPT BELOW
	startRuulPink();

	//remove ruul on clicking close button
	$(targetPinkClose).click(function() { closeRuulPink() });

	//drag and drop ruul
	///$(targetPink).draggable({ cursor: 'pointer' });
  new Draggable(document.getElementById(targetPink.slice(1)));

	//set position of ruul on mouse release
	$(targetPink).mouseup(function() { ruulDataSavePink() });

	//rotate ruul
	$(targetPinkRotate).click(function() { ruulRotatePinkRound() });

	//move ruul with keys
	$('body').keydown(function(event) {
		//check for any other ruuls on stage
		var addTop = function(diff) {
			$(targetPink).css("top", ($(targetPink).position().top + diff) + "px");
		};
   		var addLeft = function(diff) {
			$(targetPink).css("left", ($(targetPink).position().left + diff) + "px");
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
		ruulDataSavePink();
		return false;
	});

	//Show text panel
	$(targetPinkTextDrop).click(function() { ruulShowTextPanelPink() });

	//Act on browser resize
	$(window).resize(function() {
		ruulStartPositionPink();
	});

//END OF RUUL
