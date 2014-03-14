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
	var currentRuulBlue = 'ruulBlue'
	var targetBlue = '#ruulBlue';
	var targetBlueTextDrop = '#ruulBlueTextDrop';
	var targetBlueRotate = '#ruulBlueRotate';
	var targetBlueClose = '#ruulBlueClose';

	// horizontal = 1, vertical = 2
	var ruulRotateBlue = 1;

	// closed = 1, open = 2
	var ruulTextDropOpenBlue = 1;

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
	var ruul = '<div id="ruulBlue" class="ruulHorizontal"><a id="ruulBlueRotate" class="ruulHorizontalButton"></a><a id="ruulBlueTextDrop" class="ruulTextDropHorizontal"></a><a id="ruulBlueClose" class="ruulCloseHorizontal"></a></div>';

	// Ruul advert panels
	var ruulBlueAdverts = '<div id="ruulBlueHorizontalAdvert"></div><div id="ruulBlueVerticalAdvert"></div><div id="ruulBluePanelAdvert" class="start"><iframe src="about:blank" width="125" height="125" frameborder="0" scrolling="no" id="ruulBluePanelAdvertFrame"></iframe></div>';

	var ruulBlueAdvertsLoaded = false;

	//FUNCTIONS BELOW

	//set variables for page size
	function ruulBrowser() {
		ruulBrowserWidth = $(document).width();
		ruulBrowserHeight = $(document).height();
		ruulBrowserWidthScreen = $(window).width();
		ruulBrowserHeightScreen = $(window).height();
	};

	//reset position of top when opening horizontal panel to prevent open panel being off screen
	function ruulOpenLostBlue() {
		// get position of ruul
		var ruulPosition = $(targetBlue);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + height is not more than browser area
		if ( position.top + ruulOpen > ruulBrowserHeight ) {
			newPosition = ruulBrowserHeight - ruulOpen;
			$(targetBlue).css('top', newPosition + 'px');
			ruulDataSaveBlue();
		};
	};

	//reset position of top when opening vertical panel to prevent open panel being off screen
	function ruulOpenLostBlueVertical() {
		// get position of ruul
		var ruulPosition = $(targetBlue);
		var position = ruulPosition.position();
		var newPosition;
		//check that position + width is not more than browser area
		if ( position.left + ruulOpen > ruulBrowserWidth ) {
			newPosition = ruulBrowserWidth - ruulOpen;
			$(targetBlue).css('left', newPosition + 'px');
			ruulDataSaveBlue();
		};
	};

	// define start ruul, whether open or not
	function ruulDefineStartBlue() {
			if (ruulRotateBlue == 1) {
				// horizontal
				if (ruulTextDropOpenBlue == 2) {
					// panel open
					$(targetBlue).addClass('ruulHorizontalOpen');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulBlueHorizontalAdvert').show();
					$('#ruulBlueVerticalAdvert').hide();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
				} else if (ruulTextDropOpenBlue == 1) {
					// panel closed
					//advert control
					$('#ruulBlueHorizontalAdvert').show();
					$('#ruulBlueVerticalAdvert').hide();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				// don't need to do anything here as this is how the CSS positions it
			} else if (ruulRotateBlue == 2) {
				// vertical
				if (ruulTextDropOpenBlue == 2) {
					// panel open
					$(targetBlue).removeClass('ruulHorizontal').addClass('ruulVerticalOpen');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulBlueHorizontalAdvert').hide();
					$('#ruulBlueVerticalAdvert').show();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
				} else if (ruulTextDropOpenBlue == 1) {
					// panel closed
					$(targetBlue).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulBlueHorizontalAdvert').hide();
					$('#ruulBlueVerticalAdvert').show();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').hide(); };
				};
				// position the rotate button and the Close button
				$(targetBlueRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetBlueClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
			};
		};

	// rotate ruul
	function ruulRotateBlueRound() {
			if (ruulRotateBlue == 1) {
				if (ruulTextDropOpenBlue == 2) {
					// panel open
					$(targetBlue).removeClass('ruulHorizontalOpen').addClass('ruulVerticalOpen');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulBlueHorizontalAdvert').hide();
					$('#ruulBlueVerticalAdvert').show();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostBlueVertical();
				} else if (ruulTextDropOpenBlue == 1) {
					// panel closed
					$(targetBlue).removeClass('ruulHorizontal').addClass('ruulVertical');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulBlueHorizontalAdvert').hide();
					$('#ruulBlueVerticalAdvert').show();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').hide(); };
				};
				$(targetBlueRotate).removeClass('ruulHorizontalButton').addClass('ruulVerticalButton');
				$(targetBlueClose).removeClass('ruulCloseHorizontal').addClass('ruulCloseVertical');
				ruulRotateBlue = 2;
				ruulDataSaveBlue();
				return false;
			} else if (ruulRotateBlue == 2) {
				if (ruulTextDropOpenBlue == 2) {
					// panel open
					$(targetBlue).removeClass('ruulVerticalOpen').addClass('ruulHorizontalOpen');
					$(targetBlueTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulBlueHorizontalAdvert').show();
					$('#ruulBlueVerticalAdvert').hide();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostBlue();
				} else if (ruulTextDropOpenBlue == 1) {
					// panel closed
					$(targetBlue).removeClass('ruulVertical').addClass('ruulHorizontal');
					$(targetBlueTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulBlueHorizontalAdvert').show();
					$('#ruulBlueVerticalAdvert').hide();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').hide(); };
				};
				$(targetBlueRotate).removeClass('ruulVerticalButton').addClass('ruulHorizontalButton');
				$(targetBlueClose).removeClass('ruulCloseVertical').addClass('ruulCloseHorizontal');
				ruulRotateBlue = 1;
				ruulDataSaveBlue();
				return false;
			};
		};

	// open ruul panel
	function ruulShowTextPanelBlue() {
			if (ruulRotateBlue == 1) {
				if (ruulTextDropOpenBlue == 1) {
					$(targetBlue).removeClass('ruulHorizontal').addClass('ruulHorizontalOpen');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontal').addClass('ruulTextDropHorizontalDown');
					//advert control
					$('#ruulBlueHorizontalAdvert').show();
					$('#ruulBlueVerticalAdvert').hide();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').removeClass('vertical').addClass('horizontal').show(); };
					ruulOpenLostBlue();
					ruulTextDropOpenBlue = 2;
					ruulDataSaveBlue();
					return false;
				} else if (ruulTextDropOpenBlue == 2) {
					$(targetBlue).removeClass('ruulHorizontalOpen').addClass('ruulHorizontal');
					$(targetBlueTextDrop).removeClass('ruulTextDropHorizontalDown').addClass('ruulTextDropHorizontal');
					//advert control
					$('#ruulBlueHorizontalAdvert').show();
					$('#ruulBlueVerticalAdvert').hide();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').hide(); };
					ruulTextDropOpenBlue = 1;
					ruulDataSaveBlue();
					return false;
				};
			} else if (ruulRotateBlue == 2) {
				if (ruulTextDropOpenBlue == 1) {
					$(targetBlue).removeClass('ruulVertical').addClass('ruulVerticalOpen');
					$(targetBlueTextDrop).removeClass('ruulTextDropVertical').addClass('ruulTextDropVerticalDown');
					//advert control
					$('#ruulBlueHorizontalAdvert').hide();
					$('#ruulBlueVerticalAdvert').show();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').removeClass('horizontal').addClass('vertical').show(); };
					ruulOpenLostBlueVertical();
					ruulTextDropOpenBlue = 2;
					ruulDataSaveBlue();
					return false;
				} else if (ruulTextDropOpenBlue == 2) {
					$(targetBlue).removeClass('ruulVerticalOpen').addClass('ruulVertical');
					$(targetBlueTextDrop).removeClass('ruulTextDropVerticalDown').addClass('ruulTextDropVertical');
					//advert control
					$('#ruulBlueHorizontalAdvert').hide();
					$('#ruulBlueVerticalAdvert').show();
					if ( ruulBlueAdvertsLoaded = true ) { $('#ruulBluePanelAdvert').hide(); };
					ruulTextDropOpenBlue = 1;
					ruulDataSaveBlue();
					return false;
				};
			};
		};


	// position ruul to saved data on body tag
	function ruulStartPositionBlue() {
		//get width and height of viewport
		ruulBrowser();
		// console position saved on local storage
		var storedX = localStorage.getItem(currentRuulBlue + 'x') || 50;
		var storedY = localStorage.getItem(currentRuulBlue + 'y') || 50;

		$(targetBlue).css('top',  storedX + 'px');
		$(targetBlue).css('left', storedY + 'px');

		if (localStorage.getItem(currentRuulBlue + 'rotate') == 2) {
			//Make ruul vertical
			ruulRotateBlue = 2;
		} else {
			ruulRotateBlue = 1;
		}
		if (localStorage.getItem(currentRuulBlue + 'openruul') == 2) {
			//Make ruul open
			ruulTextDropOpenBlue = 2;
		} else {
			ruulTextDropOpenBlue = 1;
		}
		ruulDefineStartBlue();
		ruulDataSaveBlue();
	}

	var old_css = $.fn.css;
	$.fn.css = function() {
		console.log(arguments);
		old_css.apply(this, arguments);
	}
	var ctr = 0;

	// add ruul state data to local storage to use in reload, uses unique name per ruul type
	function ruulDataSaveBlue() {
		//debugger;
		if (ctr++ > 100) {
			return;
		}
		// get position of ruul
		var ruulPosition = $(targetBlue);
		var position = ruulPosition.position();
		var x = position.x;
		var y = position.y;

		// check to see if ruul has been dropped off screen
		if (y > ruulBrowserHeight - 20) {
			console.log('y > ' + ruulBrowserHeight +' - 20')
			//ruul is below the page
			var newPosition;
			if (ruulRotateBlue == 2) {
				// vertical
				newPosition = ruulBrowserHeight - ruulLength;
			} else if (ruulTextDropOpenBlue == 2) {
					// horizontal open
					newPosition = ruulBrowserHeight - ruulOpen;
			} else {
				//horizontal closed
				newPosition = ruulBrowserHeight - ruulClosed;
			};
			y = newPosition;
			$(targetBlue).css('top', newPosition + 'px');
			//ruulDataSaveBlue();
		};
		// check to see if ruul has been dropped off screen
		if (x > ruulBrowserWidth - 20) {
			console.log('x > width - 20')
			//ruul is to the right of the page
			var newPosition;
			if (ruulRotateBlue == 2) {
				// veritcal
				if (ruulTextDropOpenBlue == 2) {
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
			x = newPosition;
			$(targetBlue).css('left', newPosition + 'px');
			//ruulDataSaveBlue();
		};
		if (y < 0 - ruulNegative) {
			console.log('y < 0 - neg')
			//ruul is above the page
			y = 0;
			$(targetBlue).css('top', '0px');
			//ruulDataSaveBlue();
		};
		if (x < 0 - ruulNegative) {
			console.log('x < 0 - neg')
			//ruul is to the left of the page
			x = 0;
			$(targetBlue).css('left', '0px');
			//ruulDataSaveBlue();
		};

		// add to local storage
		localStorage.setItem(currentRuulBlue + 'x', x);
		localStorage.setItem(currentRuulBlue + 'y', y);
		localStorage.setItem(currentRuulBlue + 'rotate', ruulRotateBlue);
		localStorage.setItem(currentRuulBlue + 'openruul', ruulTextDropOpenBlue);
	};

	//function to define the highest z-index, and make ruul the top item - not working, try saving ruul z-index to local storage and setting it to plus one at start
	function ruulOnTop() {
		console.log('ruulOnTop')
		return;///


		if (localStorage.getItem('zRuul') > 1) {
			//ruul z-index is stored, get top ruul and add to variable
			topRuul = parseInt(localStorage.getItem('zRuul'));
			var newTopRuul = topRuul + 1;
			$(targetBlue).css('z-index', newTopRuul);
			localStorage.setItem('zRuul', newTopRuul);
		} else {
			//set local storage as the bottom ruul position
			localStorage.setItem('zRuul', 100000);
		};
	};

	//function to start ruul on site, need to add code to hide object to try that (update CSS for new test extension
	function startRuulBlue() {
		var ruulGetter1 = $(targetBlue);
		var ruulGetter2 = ruulGetter1.length;
		// if ruul already exists
		if (ruulGetter2 > 0) {
			//remove ruul
			$(targetBlue).remove();
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
			$(targetBlue).append(ruulBlueAdverts);
			//check for advert load
			$('iframe#ruulBluePanelAdvertFrame').load(function() {
				ruulBlueAdvertsLoaded = false;
				//listen for message to confirm advert
				window.addEventListener("message", ruulBlueMessage, false);
    		});
			*/
			$('input').blur();
			$(targetBlue).focus();
			//position ruul on page based on any saved position
			ruulOnTop();
			ruulStartPositionBlue();
			ruulCheckIsOnScreenBlue();
		};
	};

	//function to make sure ruul is on screen
	function ruulCheckIsOnScreenBlue() {
			//get width and height of viewport
			ruulBrowser();
			var screenTopBlue = document.body.scrollTop;
			var screenTopNewBlue = screenTopBlue + 50;
			var screenBottomBlue = screenTopBlue + ruulBrowserHeightScreen;
			//If ruul is below screen this puts it back on screen
			if (localStorage.getItem(currentRuulBlue + 'y') > screenBottomBlue) {
				$(targetBlue).css('top', screenTopNewBlue + 'px');
				ruulDataSaveBlue();
			}
			//If ruul is above screen this puts it back on screen
			if (localStorage.getItem(currentRuulBlue + 'y') < screenTopBlue) {
				$(targetBlue).css('top', screenTopNewBlue + 'px');
				ruulDataSaveBlue();
			}
	};

	//function to check message from iframe to confirm advert
	function ruulBlueMessage (evt) {
			if (evt.data == "ruulAdvert") {
				ruulBlueAdvertsLoaded = true;
				$('#ruulBluePanelAdvert').removeClass('start');
			};
	};

	//function to close ruul
	function closeRuulBlue() {
			$(targetBlue).remove();
			return false;
	};


	//RUN SCRIPT BELOW
	startRuulBlue();

	//remove ruul on clicking close button
	$(targetBlueClose).click(function() { closeRuulBlue() });

	//drag and drop ruul
	///$(targetBlue).draggable({ cursor: 'pointer' });
  new Draggable(document.getElementById(targetBlue.slice(1)));

	//set position of ruul on mouse release
	$(targetBlue).mouseup(function() { ruulDataSaveBlue() });

	//rotate ruul
	$(targetBlueRotate).click(function() { ruulRotateBlueRound() });

	//move ruul with keys
	$('body').keydown(function(event) {
		//check for any other ruuls on stage
		var addTop = function(diff) {
			$(targetBlue).css("top", ($(targetBlue).position().top + diff) + "px");
		};
   		var addLeft = function(diff) {
			$(targetBlue).css("left", ($(targetBlue).position().left + diff) + "px");
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
		ruulDataSaveBlue();
		return false;
	});

	//Show text panel
	$(targetBlueTextDrop).click(function() { ruulShowTextPanelBlue() });

	//Act on browser resize
	$(window).resize(function() {
		ruulStartPositionBlue();
	});

//END OF RUUL
