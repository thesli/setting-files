(function(){


window.requestAnimationFrame || (window.requestAnimationFrame = window.webkitRequestAnimationFrame)
var stored = localStorage;


// Draggable
function Draggable(target) {

    var offsetX, offsetY, clientX, clientY;
    var style = target.style;
    var top  = parseInt(style.top, 10)   || 0;
    var left = parseInt(style.left, 10)  || 0;
    var mouse_is_moving = false;

    var self = {};

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

    function fireDragEnd(x, y) {
    	if (typeof self.onDragEnd == 'function') 
    		self.onDragEnd(x, y);
    }

    function update(e) {
        style.left = (clientX + offsetX) + 'px';
        style.top  = (clientY + offsetY) + 'px';
        if (mouse_is_moving) requestAnimationFrame(update);
        else fireDragEnd(clientX + offsetX, clientY + offsetY);
    }

    style.cursor = "move"; // pointer
    target.addEventListener("mousedown", onMouseDown, false);


    return self;
}

function isScrolledIntoView(elem) {
    var docViewTop = document.body.scrollTop;
    var docViewBottom = docViewTop + window.innerHeight;

    var elemTop = elem.offsetTop;
    var elemBottom = elemTop + elem.offsetHeight;

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function scrollIntoView(root) {
	setTimeout(function(){
		root.scrollIntoView();
		root.style.webkitTransition = "";
		root.style.borderColor = "yellow";
		setTimeout(function(){
			root.style.webkitTransition = "border .5s";
			root.style.borderColor = "transparent";
		}, 500)
	}, 10);
}


function Ruul(color) {

	var old = document.getElementById('ruul' + color);
	if (old) {
		old.parentNode.removeChild(old);
		return;
	}
	
	var id = 'ruul' + color;

	var root = document.createElement('div');
	root.id = id;
	root.className = 'ruul ruulHorizontal';

	var rotator = document.createElement('a');
	rotator.className = 'ruulRotate ruulHorizontalButton';

	var text = document.createElement('a');
	text.className = 'ruulTextDrop ruulTextDropHorizontal';

	var removeb = document.createElement('a');
	removeb.className = 'ruulClose ruulCloseHorizontal';

	root.appendChild(rotator);
	root.appendChild(text);
	root.appendChild(removeb);


	var rotated = 0;
	var opened  = 0;

	if (stored[id + 'rotated'] == '1') {
		rotate();
	}
	if (stored[id + 'opened']  == '1') {
		open();
	}
	


	// state changers
	function rotate() {
		rotated = rotated ? 0 : 1;
		stored[id + 'rotated'] = rotated; 
	
		var from = rotated ? 'Horizontal' : 'Vertical';
		var to   = rotated ? 'Vertical'   : 'Horizontal';

		root.className = root.className.replace(from, to);
		text.className = text.className.replace(from, to);
		removeb.className = removeb.className.replace(from, to);
	}

	function open() {

		opened = opened ? 0 : 1;
		stored[id + 'opened'] = opened; 

		if (opened) {
			root.className += 'Open';
			text.className += 'Down';
		} else {
			root.className = root.className.replace('Open', '');
			text.className = text.className.replace('Down', '');
		}
	}

	function remove() {
		root.parentNode.removeChild(root);
	}

	
	// event handlers
	rotator.onclick = rotate;
	text.onclick    = open;
	removeb.onclick = remove;


	// restore previous state
	if (stored[id + 'x']) {
		root.style.left = stored[id + 'x'] + 'px';
		root.style.top  = stored[id + 'y'] + 'px';
	}

	// append to document
	document.body.appendChild(root);
	document.body.style.overflowX = 'hidden';

	// save new state when draging ends
	var drag = Draggable(root);
	drag.onDragEnd = function(x, y) {
		stored[id + 'x'] = x;
		stored[id + 'y'] = y;
		stored[id + 'opened']  = opened;  // ruulTextDropOpenBlue
	}

	if (!isScrolledIntoView(root)) {
		scrollIntoView(root);
	}

}


new Ruul('Green');

})();