
chrome.runtime.sendMessage("isCtrlZEnabled", function (isCtrlZEnabled) {
	if (isCtrlZEnabled) {
		window.addEventListener("keydown", onKeyDown);
	}
});

function onKeyDown(event) { 
	var element = event.target || event.srcElement;
	if (isTextNode(element)) element = element.parentNode;

	// make sure the user isn't typing
	if (isElementTypeInput(element)) return;

	// if the correct combination of keys are pressed
	if (isKeyProperCtrl(event) && isKeyZ(event)) {
		// report back to the background page
		chrome.extension.sendMessage("ctrlZ"); 
		// and stop any other event listener
	  event.preventDefault();
    event.stopPropagation();
	}
}

function isKeyProperCtrl(event) {
  return (event.ctrlKey || isKeyMacCmd(event)) && !isKeyAltGr(event);
}

function isKeyMacCmd(event) {
	return /mac/i.test(navigator.platform) && event.metaKey;
}

function isKeyAltGr(event) {
	return event.ctrlKey && event.altKey;
}

function isKeyZ(event) {
	return event.keyCode == 90;
}

function isTextNode(node) {
	return node.nodeType == 3;
}

function isElementTypeInput(el) {
	return /input|textarea/i.test(el.nodeName) || el.isContentEditable;
}

