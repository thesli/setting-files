window.addEventListener("keydown", function(event) { 
	var element;
	if(event.target) element=event.target;
	else if(event.srcElement) element=event.srcElement;
	if(element.nodeType==3) element=element.parentNode;

	if(element.tagName == 'INPUT' || element.tagName == 'TEXTAREA') return;

	if ((event.ctrlKey ||event.metaKey) && event.keyCode==90 ){
		chrome.extension.sendMessage("ctrlZ"); 
	  event.preventDefault();
    event.stopPropagation();
	}
});
