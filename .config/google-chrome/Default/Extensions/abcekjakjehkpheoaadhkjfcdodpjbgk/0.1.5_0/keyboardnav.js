/*
	Copyright 2010 xnoreq
	
*/

const HINT_CLASS = "chrome_keyboardnav_hint",
	HINT_CLASS_A = "chrome_keyboardnav_hinta",
	HINTS_ID = "chrome_keyboardnav_hints";

const KEY_ESC = 27, KEY_COMMA = 188, KEY_RETURN = 13;
	
const DEF_CHARS = "0123456789abcdefghijklmnopqrstuvwxyz";

var hintChars = localStorage["hintchars"];
if (!hintChars) {
	hintChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}

var mode = undefined;


function isTextInput(e) {
	return ((e.tagName == "INPUT" && (e.type == "text" || e.type == "password")) ||
			e.tagName == "TEXTAREA");
}

function emulateMouseClick(target, ctrlKey, altKey, shiftKey, metaKey){
	if (isTextInput(target) || target.tagName == "SELECT") {
		target.focus();
	} else {
		var event = document.createEvent("MouseEvents");
		event.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, ctrlKey, altKey, shiftKey, metaKey, 0, null);
		target.dispatchEvent(event);
	}
}


function HintMode() {
	var nodes, hints, hintsDiv, input;
	
	this.init = function() {
		hints = [];
		input = "";
		
		var i, j, sel, elem;
		nodes = [document.getElementsByTagName("a"),
				document.getElementsByTagName("input"),
				document.getElementsByTagName("textarea"),
				document.getElementsByTagName("textarea"),
				document.getElementsByTagName("select"),
				document.getElementsByTagName("img"),
				document.getElementsByTagName("button")];
		sel = [];
		for (i = 0; i < nodes.length; i++) {
			elem = nodes[i];
			for (j = 0; j < elem.length; j++) {
				sel.push(elem[j]);
			}
		}
		nodes = [];
		for (i = 0; i < sel.length; i++) {
			elem = sel[i];
			if ((elem.tagName == "A" && !elem.href) ||
				(elem.tagName == "INPUT" && elem.type == "hidden") ||
				(elem.tagName == "IMG" && !elem.onclick)) {
				
				continue;
			}
			
			if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
				nodes.push(elem);
			}
		}
		
		hintsDiv = document.createElement("div");
		hintsDiv.id = HINTS_ID;
		document.body.appendChild(hintsDiv);
		
		var node, cr, span, hint;
		for (var i = 0; i < nodes.length; i++) {
			node = nodes[i];
			cr = node.getBoundingClientRect();
			span = document.createElement("span");
			hint = hints[i] = {"str": nts(i), "node": node, "span": span};
			
			span.innerText = hint["str"];
			span.className = HINT_CLASS;
			hintsDiv.appendChild(span);
			
			span.style.top = Math.max(window.pageYOffset + cr.top, 0) + "px";
			span.style.left = Math.max(window.pageXOffset + cr.left - span.offsetWidth, 0) + "px";
		}
	}
	
	this.handleKeyDown = function(e, modifier) {
		switch (e.keyCode) {
			case KEY_ESC:
				if (!modifier) {
					e.preventDefault();
					this.hide();
					mode = undefined;
				}
				break;
			case KEY_COMMA:
				if (!modifier) {
					e.preventDefault();					
					if (input == "") {
						this.hide();
						mode = undefined;
					} else {
						setHintClass.call(this, input, HINT_CLASS);
						input = "";
					}
				}
				break;
			case KEY_RETURN:
				var hint = setHintClass.call(this, input, HINT_CLASS);
				if (hint) {
					e.preventDefault();
					emulateMouseClick(hint["node"], e.ctrlKey, e.altKey, e.shiftKey, e.metaKey);
				}
				input = "";
				break;
		}
		
		var c = String.fromCharCode(e.keyCode);
		if (!modifier && hintChars.indexOf(c) >= 0) {
			e.preventDefault();
			setHintClass.call(this, input, HINT_CLASS);
						
			input += c;
			var hint = setHintClass.call(this, input, HINT_CLASS + " " + HINT_CLASS_A);
		}
	}
	
	this.hide = function() {
		document.body.removeChild(hintsDiv);
		hints = hintsDiv = null;
		input = "";
	}
	
	function setHintClass(str, cls) {
		var num = stn(str);
		if (!isNaN(num)) {
			var hint = hints[num];
			if (hint) {
				hint["span"].className = cls;
				return hint;
			}
		}
		return null;
	}
	
	function nts(num) {
		var tmp = num.toString(hintChars.length);
		var str = "";
		for (var i = 0; i < tmp.length; i++) {
			str += hintChars[DEF_CHARS.indexOf(tmp.charAt(i))];
		}
		return str;
	}
	
	function stn(tmp) {
		var str = "";
		for (var i = 0; i < tmp.length; i++) {
			str += DEF_CHARS[hintChars.indexOf(tmp.charAt(i))];
		}
		var num = parseInt(str, hintChars.length);
		return num;
	}
}


document.addEventListener('keydown', function(e) {
	var modifier = (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey);
	var active = document.activeElement;
	if (active && isTextInput(active)) {
		if (e.keyCode == KEY_ESC && !modifier) {
			e.preventDefault();
			active.blur();
		}
	}
	else if (mode == undefined) {
		if (e.keyCode == KEY_COMMA && !modifier) {
			e.preventDefault();
			mode = new HintMode();
			mode.init();
		}
	} else {
		mode.handleKeyDown(e, modifier);
	}
}, true);