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
	var currentRuulLong = 'ruulLong'
	var targetLong = '#ruulLong';
	var targetLongTextDrop = '#ruulLongTextDrop';
	var targetLongRotate = '#ruulLongRotate';
	var targetLongClose = '#ruulLongClose';

	// horizontal = 1, vertical = 2
	var ruulRotateLong = 1;

	// closed = 1, open = 2
	var ruulTextDropOpenLong = 1;

	// browser width and height
	var ruulBrowserWidth;
	var ruulBrowserHeight;
	var ruulBrowserWidthScreen;
	var ruulBrowserHeightScreen;

	// size of ruul
	var ruulLengthLong = 1140;
	var ruulOpenLong = 400;
	var ruulClosedLong = 100;
	var ruulNegativeLong = ruulClosedLong - 20;

	// latest ruul z-index, set to 1 initially to fool an if statement below
	var topRuul = 1;

	// HTML to insert on page change to reflect ruul type
	var ruul = '<div id="ruulLong" class="ruulHorizontal"><a id="ruulLongRotate" class="ruulHorizontalButton"></a><a id="ruulLongTextDrop" class="ruulTextDropHorizontal"></a><a id="ruulLongClose" class="ruulCloseHorizontal"></a></div>';

	// Ruul advert panels
	var ruulLongAdverts = '<div id="ruulLongHorizontalAdvert"></div><div id="ruulLongVerticalAdvert"></div><div id="ruulLongPanelAdvert" class="start"><iframe src="about:blank" width="125" height="125" frameborder="0" scrolling="no" id="ruulLongPanelAdvertFrame"></iframe></div>';

	var ruulLongAdvertsLoaded = false;

	//FUNCTIONS BELOW

	//set variables for page size
	function ruulBrowser() {
		ruulBrowserWidth = $(document).width();
		ruulBrowserHeight = $(document).height();
		ruulBrowserWidthScreen = $(window).width();
		ruulBrowserHeightScreen = $(window).height();
	};

	//reset position of top when opening horizontal panel to prevent open panel being off screen
	function ruulOpenLostLong() {
		// get position of ruul
		var ruulPosition = $(targetLong);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + height is not more than browser area
		if ( position.top + ruulOpenLong > ruulBrowserHeight ) {
			newPosition = ruulBrowserHeight - ruulOpenLong;
			$(targetLong).css('top', newPosition + 'px');
			ruulDataSaveLong();
		};
	};

	//reset position of top when opening vertical panel to prevent open panel being off screen
	function ruulOpenLostLongVertical() {
		// get position of ruul
		var ruulPosition = $(targetLong);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + width is not more than browser area
		if ( position.left + ruulOpenLong > ruulBrowserWidth ) {
			newPosition = ruulBrowserWidth - ruulOpenLong;
			$(targetLong).css('left', newPosition + 'px');
			ruulDataSaveLong();
		};
	};

	// define start ruul, whether open or not
	function ruulDefineStartLong() {
			if (ruulRotateLong == 1) {
				// horizontal
				if (ruulTextDropOpenLong == 2) {
					// panel open
					$(targetLong).addClass('ruulHorizontalOpen');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulLongHorizontalAdvert').show();
					$('#ruulLongVerticalAdvert').hide();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
				} else if (ruulTextDropOpenLong == 1) {
					// panel closed
					//advert control
					$('#ruulLongHorizontalAdvert').show();
					$('#ruulLongVerticalAdvert').hide();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				// don't need to do anything here as this is how the CSS positions it
			} else if (ruulRotateLong == 2) {
				// vertical
				if (ruulTextDropOpenLong == 2) {
					// panel open
					$(targetLong).removeClass('ruulHorizontal').addClass('ruulVerticalOpen');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulLongHorizontalAdvert').hide();
					$('#ruulLongVerticalAdvert').show();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
				} else if (ruulTextDropOpenLong == 1) {
					// panel closed
					$(targetLong).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulLongHorizontalAdvert').hide();
					$('#ruulLongVerticalAdvert').show();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				$(targetLongRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetLongClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
			};
		};

	// rotate ruul
	function ruulRotateLongRound() {
			if (ruulRotateLong == 1) {
				if (ruulTextDropOpenLong == 2) {
					// panel open
					$(targetLong).removeClass('ruulHorizontalOpen').addClass('ruulVerticalOpen');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulLongHorizontalAdvert').hide();
					$('#ruulLongVerticalAdvert').show();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostLongVertical();
				} else if (ruulTextDropOpenLong == 1) {
					// panel closed
					$(targetLong).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulLongHorizontalAdvert').hide();
					$('#ruulLongVerticalAdvert').show();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').hide(); };
				};
				$(targetLongRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetLongClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
				ruulRotateLong = 2;
				ruulDataSaveLong();
				return false;
			} else if (ruulRotateLong == 2) {
				if (ruulTextDropOpenLong == 2) {
					// panel open
					$(targetLong).removeClass('ruulVerticalOpen').addClass('ruulHorizontalOpen');
					$(targetLongTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulLongHorizontalAdvert').show();
					$('#ruulLongVerticalAdvert').hide();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostLong();
				} else if (ruulTextDropOpenLong == 1) {
					// panel closed
					$(targetLong).removeClass('ruulVertical').addClass('ruulHorizontal');
					$(targetLongTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulLongHorizontalAdvert').show();
					$('#ruulLongVerticalAdvert').hide();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').hide(); };
				};
				$(targetLongRotate).removeClass('ruulVerticalButton').addClass('ruulHorizontalButton');
				$(targetLongClose).removeClass('ruulCloseVertical').addClass('ruulCloseHorizontal');
				ruulRotateLong = 1;
				ruulDataSaveLong();
				return false;
			};
		};

	// open ruul panel
	function ruulShowTextPanelLong() {
			if (ruulRotateLong == 1) {
				if (ruulTextDropOpenLong == 1) {
					$(targetLong).removeClass('ruulHorizontal').addClass('ruulHorizontalOpen');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulLongHorizontalAdvert').show();
					$('#ruulLongVerticalAdvert').hide();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostLong();
					ruulTextDropOpenLong = 2;
					ruulDataSaveLong();
					return false;
				} else if (ruulTextDropOpenLong == 2) {
					$(targetLong).removeClass('ruulHorizontalOpen').addClass('ruulHorizontal');
					$(targetLongTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulLongHorizontalAdvert').show();
					$('#ruulLongVerticalAdvert').hide();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').hide(); };
					ruulTextDropOpenLong = 1;
					ruulDataSaveLong();
					return false;
				};
			} else if (ruulRotateLong == 2) {
				if (ruulTextDropOpenLong == 1) {
					$(targetLong).removeClass('ruulVertical').addClass('ruulVerticalOpen');
					$(targetLongTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulLongHorizontalAdvert').hide();
					$('#ruulLongVerticalAdvert').show();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostLongVertical();
					ruulTextDropOpenLong = 2;
					ruulDataSaveLong();
					return false;
				} else if (ruulTextDropOpenLong == 2) {
					$(targetLong).removeClass('ruulVerticalOpen').addClass('ruulVertical');
					$(targetLongTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulLongHorizontalAdvert').hide();
					$('#ruulLongVerticalAdvert').show();
					if ( ruulLongAdvertsLoaded = true ) { $('#ruulLongPanelAdvert').hide(); };
					ruulTextDropOpenLong = 1;
					ruulDataSaveLong();
					return false;
				};
			};
		};


	// position ruul to saved data on body tag
	function ruulStartPositionLong() {
		//get width and height of viewport
		ruulBrowser();
		// console position saved on local storage
		var storedX = localStorage.getItem(currentRuulLong + 'x') || 50;
		var storedY = localStorage.getItem(currentRuulLong + 'y') || 50;

		$(targetLong).css('top',  storedX + 'px');
		$(targetLong).css('left', storedY + 'px');

		if (localStorage.getItem(currentRuulLong + 'rotate') == 2) {
			//Make ruul vertical
			ruulRotateLong = 2;
		} else {
			ruulRotateLong = 1;
		}
		if (localStorage.getItem(currentRuulLong + 'openruul') == 2) {
			//Make ruul open
			ruulTextDropOpenLong = 2;
		} else {
			ruulTextDropOpenLong = 1;
		}
		ruulDefineStartLong();
		ruulDataSaveLong();
	}



	// add ruul state data to local storage to use in reload, uses unique name per ruul type
	function ruulDataSaveLong() {
		// get position of ruul
		var ruulPosition = $(targetLong);
		var position = ruulPosition.position();
		// add to local storage
		localStorage.setItem(currentRuulLong + 'x', position.left);
		localStorage.setItem(currentRuulLong + 'y', position.top);
		localStorage.setItem(currentRuulLong + 'rotate', ruulRotateLong);
		localStorage.setItem(currentRuulLong + 'openruul', ruulTextDropOpenLong);
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulLong + 'y') > ruulBrowserHeight - 20) {
			//ruul is below the page
			var newPosition;
			if (ruulRotateLong == 2) {
				// vertical
				newPosition = ruulBrowserHeight - ruulLengthLong;
			} else if (ruulTextDropOpenLong == 2) {
					// horizontal open
					newPosition = ruulBrowserHeight - ruulOpenLong;
			} else {
				//horizontal closed
				newPosition = ruulBrowserHeight - ruulClosedLong;
			};
			$(targetLong).css('top', newPosition + 'px');
			ruulDataSaveLong();
		};
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulLong + 'x') > ruulBrowserWidth - 20) {
			//ruul is to the right of the page
			var newPosition;
			if (ruulRotateLong == 2) {
				// veritcal
				if (ruulTextDropOpenLong == 2) {
					// vertical open
					newPosition = ruulBrowserWidth - ruulOpenLong;
				} else {
					// vertical closed
					newPosition = ruulBrowserWidth - ruulClosedLong;
				};
			} else {
				//horizontal
				newPosition = ruulBrowserWidth - ruulLengthLong;
			};
			$(targetLong).css('left', newPosition + 'px');
			ruulDataSaveLong();
		};
		if (localStorage.getItem(currentRuulLong + 'y') < 0 - ruulNegativeLong) {
			//ruul is above the page
			$(targetLong).css('top', '0px');
			ruulDataSaveLong();
		};
		if (localStorage.getItem(currentRuulLong + 'x') < 0 - ruulNegativeLong) {
			//ruul is to the left of the page
			$(targetLong).css('left', '0px');
			ruulDataSaveLong();
		};
	};

	//function to define the highest z-index, and make ruul the top item - not working, try saving ruul z-index to local storage and setting it to plus one at start
	function ruulOnTop() {
		if (localStorage.getItem('zRuul') > 1) {
			//ruul z-index is stored, get top ruul and add to variable
			topRuul = parseInt(localStorage.getItem('zRuul'));
			var newTopRuul = topRuul + 1;
			$(targetLong).css('z-index', newTopRuul);
			localStorage.setItem('zRuul', newTopRuul);
		} else {
			//set local storage as the bottom ruul position
			localStorage.setItem('zRuul', 100000);
		};
	};

	//function to start ruul on site, need to add code to hide object to try that (update CSS for new test extension
	function startRuulLong() {
		var ruulGetter1 = $(targetLong);
		var ruulGetter2 = ruulGetter1.length;
		// if ruul already exists
		if (ruulGetter2 > 0) {
			//remove ruul
			$(targetLong).remove();
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
			$(targetLong).append(ruulLongAdverts);
			//check for advert load
			$('iframe#ruulLongPanelAdvertFrame').load(function() {
				ruulLongAdvertsLoaded = false;
				//listen for message to confirm advert
				window.addEventListener("message", ruulLongMessage, false);
    		});
			*/
			$('input').blur();
			$(targetLong).focus();
			//position ruul on page based on any saved position
			ruulOnTop();
			ruulStartPositionLong();
			ruulCheckIsOnScreenLong();
		};
	};

	//function to make sure ruul is on screen
	function ruulCheckIsOnScreenLong() {
			//get width and height of viewport
			ruulBrowser();
			var screenTopLong = document.body.scrollTop;
			var screenTopNewLong = screenTopLong + 50;
			var screenBottomLong = screenTopLong + ruulBrowserHeightScreen;
			//If ruul is below screen this puts it back on screen
			if (localStorage.getItem(currentRuulLong + 'y') > screenBottomLong) {
				$(targetLong).css('top', screenTopNewLong + 'px');
				ruulDataSaveLong();
			}
			//If ruul is above screen this puts it back on screen
			if (localStorage.getItem(currentRuulLong + 'y') < screenTopLong) {
				$(targetLong).css('top', screenTopNewLong + 'px');
				ruulDataSaveLong();
			}
	};

	//function to check message from iframe to confirm advert
	function ruulLongMessage (evt) {
			if (evt.data == "ruulAdvert") {
				ruulLongAdvertsLoaded = true;
				$('#ruulLongPanelAdvert').removeClass('start');
			};
	};

	//function to close ruul
	function closeRuulLong() {
			$(targetLong).remove();
			return false;
	};


	//RUN SCRIPT BELOW
	startRuulLong();

	//remove ruul on clicking close button
	$(targetLongClose).click(function() { closeRuulLong() });

	//drag and drop ruul
	///$(targetLong).draggable({ cursor: 'pointer' });
  new Draggable(document.getElementById(targetLong.slice(1)));

	//set position of ruul on mouse release
	$(targetLong).mouseup(function() { ruulDataSaveLong() });

	//rotate ruul
	$(targetLongRotate).click(function() { ruulRotateLongRound() });

	//move ruul with keys
	$('body').keydown(function(event) {
		//check for any other ruuls on stage
		var addTop = function(diff) {
			$(targetLong).css("top", ($(targetLong).position().top + diff) + "px");
		};
   		var addLeft = function(diff) {
			$(targetLong).css("left", ($(targetLong).position().left + diff) + "px");
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
		ruulDataSaveLong();
		return false;
	});

	//Show text panel
	$(targetLongTextDrop).click(function() { ruulShowTextPanelLong() });

	//Act on browser resize
	$(window).resize(function() {
		ruulStartPositionLong();
	});

//END OF RUUL
