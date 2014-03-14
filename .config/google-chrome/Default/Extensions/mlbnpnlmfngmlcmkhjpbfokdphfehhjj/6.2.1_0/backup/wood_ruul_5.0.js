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
	var currentRuulWood = 'ruulWood'
	var targetWood = '#ruulWood';
	var targetWoodTextDrop = '#ruulWoodTextDrop';
	var targetWoodRotate = '#ruulWoodRotate';
	var targetWoodClose = '#ruulWoodClose';

	// horizontal = 1, vertical = 2
	var ruulRotateWood = 1;

	// closed = 1, open = 2
	var ruulTextDropOpenWood = 1;

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
	var ruul = '<div id="ruulWood" class="ruulHorizontal"><a id="ruulWoodRotate" class="ruulHorizontalButton"></a><a id="ruulWoodTextDrop" class="ruulTextDropHorizontal"></a><a id="ruulWoodClose" class="ruulCloseHorizontal"></a></div>';

	// Ruul advert panels
	var ruulWoodAdverts = '<div id="ruulWoodHorizontalAdvert"></div><div id="ruulWoodVerticalAdvert"></div><div id="ruulWoodPanelAdvert" class="start"><iframe src="about:blank" width="125" height="125" frameborder="0" scrolling="no" id="ruulWoodPanelAdvertFrame"></iframe></div>';

	var ruulWoodAdvertsLoaded = false;

	//FUNCTIONS BELOW

	//set variables for page size
	function ruulBrowser() {
		ruulBrowserWidth = $(document).width();
		ruulBrowserHeight = $(document).height();
		ruulBrowserWidthScreen = $(window).width();
		ruulBrowserHeightScreen = $(window).height();
	};

	//reset position of top when opening horizontal panel to prevent open panel being off screen
	function ruulOpenLostWood() {
		// get position of ruul
		var ruulPosition = $(targetWood);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + height is not more than browser area
		if ( position.top + ruulOpen > ruulBrowserHeight ) {
			newPosition = ruulBrowserHeight - ruulOpen;
			$(targetWood).css('top', newPosition + 'px');
			ruulDataSaveWood();
		};
	};

	//reset position of top when opening vertical panel to prevent open panel being off screen
	function ruulOpenLostWoodVertical() {
		// get position of ruul
		var ruulPosition = $(targetWood);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + width is not more than browser area
		if ( position.left + ruulOpen > ruulBrowserWidth ) {
			newPosition = ruulBrowserWidth - ruulOpen;
			$(targetWood).css('left', newPosition + 'px');
			ruulDataSaveWood();
		};
	};

	// define start ruul, whether open or not
	function ruulDefineStartWood() {
			if (ruulRotateWood == 1) {
				// horizontal
				if (ruulTextDropOpenWood == 2) {
					// panel open
					$(targetWood).addClass('ruulHorizontalOpen');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulWoodHorizontalAdvert').show();
					$('#ruulWoodVerticalAdvert').hide();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
				} else if (ruulTextDropOpenWood == 1) {
					// panel closed
					//advert control
					$('#ruulWoodHorizontalAdvert').show();
					$('#ruulWoodVerticalAdvert').hide();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				// don't need to do anything here as this is how the CSS positions it
			} else if (ruulRotateWood == 2) {
				// vertical
				if (ruulTextDropOpenWood == 2) {
					// panel open
					$(targetWood).removeClass('ruulHorizontal').addClass('ruulVerticalOpen');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulWoodHorizontalAdvert').hide();
					$('#ruulWoodVerticalAdvert').show();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
				} else if (ruulTextDropOpenWood == 1) {
					// panel closed
					$(targetWood).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulWoodHorizontalAdvert').hide();
					$('#ruulWoodVerticalAdvert').show();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				$(targetWoodRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetWoodClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
			};
		};

	// rotate ruul
	function ruulRotateWoodRound() {
			if (ruulRotateWood == 1) {
				if (ruulTextDropOpenWood == 2) {
					// panel open
					$(targetWood).removeClass('ruulHorizontalOpen').addClass('ruulVerticalOpen');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulWoodHorizontalAdvert').hide();
					$('#ruulWoodVerticalAdvert').show();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostWoodVertical();
				} else if (ruulTextDropOpenWood == 1) {
					// panel closed
					$(targetWood).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulWoodHorizontalAdvert').hide();
					$('#ruulWoodVerticalAdvert').show();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').hide(); };
				};
				$(targetWoodRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetWoodClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
				ruulRotateWood = 2;
				ruulDataSaveWood();
				return false;
			} else if (ruulRotateWood == 2) {
				if (ruulTextDropOpenWood == 2) {
					// panel open
					$(targetWood).removeClass('ruulVerticalOpen').addClass('ruulHorizontalOpen');
					$(targetWoodTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulWoodHorizontalAdvert').show();
					$('#ruulWoodVerticalAdvert').hide();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostWood();
				} else if (ruulTextDropOpenWood == 1) {
					// panel closed
					$(targetWood).removeClass('ruulVertical').addClass('ruulHorizontal');
					$(targetWoodTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulWoodHorizontalAdvert').show();
					$('#ruulWoodVerticalAdvert').hide();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').hide(); };
				};
				$(targetWoodRotate).removeClass('ruulVerticalButton').addClass('ruulHorizontalButton');
				$(targetWoodClose).removeClass('ruulCloseVertical').addClass('ruulCloseHorizontal');
				ruulRotateWood = 1;
				ruulDataSaveWood();
				return false;
			};
		};

	// open ruul panel
	function ruulShowTextPanelWood() {
			if (ruulRotateWood == 1) {
				if (ruulTextDropOpenWood == 1) {
					$(targetWood).removeClass('ruulHorizontal').addClass('ruulHorizontalOpen');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulWoodHorizontalAdvert').show();
					$('#ruulWoodVerticalAdvert').hide();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostWood();
					ruulTextDropOpenWood = 2;
					ruulDataSaveWood();
					return false;
				} else if (ruulTextDropOpenWood == 2) {
					$(targetWood).removeClass('ruulHorizontalOpen').addClass('ruulHorizontal');
					$(targetWoodTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulWoodHorizontalAdvert').show();
					$('#ruulWoodVerticalAdvert').hide();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').hide(); };
					ruulTextDropOpenWood = 1;
					ruulDataSaveWood();
					return false;
				};
			} else if (ruulRotateWood == 2) {
				if (ruulTextDropOpenWood == 1) {
					$(targetWood).removeClass('ruulVertical').addClass('ruulVerticalOpen');
					$(targetWoodTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulWoodHorizontalAdvert').hide();
					$('#ruulWoodVerticalAdvert').show();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostWoodVertical();
					ruulTextDropOpenWood = 2;
					ruulDataSaveWood();
					return false;
				} else if (ruulTextDropOpenWood == 2) {
					$(targetWood).removeClass('ruulVerticalOpen').addClass('ruulVertical');
					$(targetWoodTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulWoodHorizontalAdvert').hide();
					$('#ruulWoodVerticalAdvert').show();
					if ( ruulWoodAdvertsLoaded = true ) { $('#ruulWoodPanelAdvert').hide(); };
					ruulTextDropOpenWood = 1;
					ruulDataSaveWood();
					return false;
				};
			};
		};


	// position ruul to saved data on body tag
	function ruulStartPositionWood() {
		//get width and height of viewport
		ruulBrowser();
		// console position saved on local storage
		var storedX = localStorage.getItem(currentRuulWood + 'x') || 50;
		var storedY = localStorage.getItem(currentRuulWood + 'y') || 50;

		$(targetWood).css('top',  storedX + 'px');
		$(targetWood).css('left', storedY + 'px');

		if (localStorage.getItem(currentRuulWood + 'rotate') == 2) {
			//Make ruul vertical
			ruulRotateWood = 2;
		} else {
			ruulRotateWood = 1;
		}
		if (localStorage.getItem(currentRuulWood + 'openruul') == 2) {
			//Make ruul open
			ruulTextDropOpenWood = 2;
		} else {
			ruulTextDropOpenWood = 1;
		}
		ruulDefineStartWood();
		ruulDataSaveWood();
	}

	// add ruul state data to local storage to use in reload, uses unique name per ruul type
	function ruulDataSaveWood() {
		// get position of ruul
		var ruulPosition = $(targetWood);
		var position = ruulPosition.position();
		// add to local storage
		localStorage.setItem(currentRuulWood + 'x', position.left);
		localStorage.setItem(currentRuulWood + 'y', position.top);
		localStorage.setItem(currentRuulWood + 'rotate', ruulRotateWood);
		localStorage.setItem(currentRuulWood + 'openruul', ruulTextDropOpenWood);
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulWood + 'y') > ruulBrowserHeight - 20) {
			//ruul is below the page
			var newPosition;
			if (ruulRotateWood == 2) {
				// vertical
				newPosition = ruulBrowserHeight - ruulLength;
			} else if (ruulTextDropOpenWood == 2) {
					// horizontal open
					newPosition = ruulBrowserHeight - ruulOpen;
			} else {
				//horizontal closed
				newPosition = ruulBrowserHeight - ruulClosed;
			};
			$(targetWood).css('top', newPosition + 'px');
			ruulDataSaveWood();
		};
		// check to see if ruul has been dropped off screen
		if (localStorage.getItem(currentRuulWood + 'x') > ruulBrowserWidth - 20) {
			//ruul is to the right of the page
			var newPosition;
			if (ruulRotateWood == 2) {
				// veritcal
				if (ruulTextDropOpenWood == 2) {
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
			$(targetWood).css('left', newPosition + 'px');
			ruulDataSaveWood();
		};
		if (localStorage.getItem(currentRuulWood + 'y') < 0 - ruulNegative) {
			//ruul is above the page
			$(targetWood).css('top', '0px');
			ruulDataSaveWood();
		};
		if (localStorage.getItem(currentRuulWood + 'x') < 0 - ruulNegative) {
			//ruul is to the left of the page
			$(targetWood).css('left', '0px');
			ruulDataSaveWood();
		};
	};

	//function to define the highest z-index, and make ruul the top item - not working, try saving ruul z-index to local storage and setting it to plus one at start
	function ruulOnTop() {
		if (localStorage.getItem('zRuul') > 1) {
			//ruul z-index is stored, get top ruul and add to variable
			topRuul = parseInt(localStorage.getItem('zRuul'));
			var newTopRuul = topRuul + 1;
			$(targetWood).css('z-index', newTopRuul);
			localStorage.setItem('zRuul', newTopRuul);
		} else {
			//set local storage as the bottom ruul position
			localStorage.setItem('zRuul', 100000);
		};
	};

	//function to start ruul on site, need to add code to hide object to try that (update CSS for new test extension
	function startRuulWood() {
		var ruulGetter1 = $(targetWood);
		var ruulGetter2 = ruulGetter1.length;
		// if ruul already exists
		if (ruulGetter2 > 0) {
			//remove ruul
			$(targetWood).remove();
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
			$(targetWood).append(ruulWoodAdverts);
			//check for advert load
			$('iframe#ruulWoodPanelAdvertFrame').load(function() {
				ruulWoodAdvertsLoaded = false;
				//listen for message to confirm advert
				window.addEventListener("message", ruulWoodMessage, false);
    		});
    	*/
			$('input').blur();
			$(targetWood).focus();
			//position ruul on page based on any saved position
			ruulOnTop();
			ruulStartPositionWood();
			ruulCheckIsOnScreenWood();
		};
	};

	//function to make sure ruul is on screen
	function ruulCheckIsOnScreenWood() {
			//get width and height of viewport
			ruulBrowser();
			var screenTopWood = document.body.scrollTop;
			var screenTopNewWood = screenTopWood + 50;
			var screenBottomWood = screenTopWood + ruulBrowserHeightScreen;
			//If ruul is below screen this puts it back on screen
			if (localStorage.getItem(currentRuulWood + 'y') > screenBottomWood) {
				$(targetWood).css('top', screenTopNewWood + 'px');
				ruulDataSaveWood();
			}
			//If ruul is above screen this puts it back on screen
			if (localStorage.getItem(currentRuulWood + 'y') < screenTopWood) {
				$(targetWood).css('top', screenTopNewWood + 'px');
				ruulDataSaveWood();
			}
	}

	//function to check message from iframe to confirm advert
	function ruulWoodMessage (evt) {
			if (evt.data == "ruulAdvert") {
				ruulWoodAdvertsLoaded = true;
				$('#ruulWoodPanelAdvert').removeClass('start');
			};
	};

	//function to close ruul
	function closeRuulWood() {
			$(targetWood).remove();
			return false;
	};


	//RUN SCRIPT BELOW
	startRuulWood();

	//remove ruul on clicking close button
	$(targetWoodClose).click(function() { closeRuulWood() });

	//drag and drop ruul
	///$(targetWood).draggable({ cursor: 'pointer' });
  new Draggable(document.getElementById(targetWood.slice(1)));

	//set position of ruul on mouse release
	$(targetWood).mouseup(function() { ruulDataSaveWood() });

	//rotate ruul
	$(targetWoodRotate).click(function() { ruulRotateWoodRound() });

	//move ruul with keys
	$('body').keydown(function(event) {
		//check for any other ruuls on stage
		var addTop = function(diff) {
			$(targetWood).css("top", ($(targetWood).position().top + diff) + "px");
		};
   		var addLeft = function(diff) {
			$(targetWood).css("left", ($(targetWood).position().left + diff) + "px");
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
		ruulDataSaveWood();
		return false;
	});

	//Show text panel
	$(targetWoodTextDrop).click(function() { ruulShowTextPanelWood() });

	//Act on browser resize
	$(window).resize(function() {
		ruulStartPositionWood();
	});

//END OF RUUL
