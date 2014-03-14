chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
	if (message.setFocus != null) {
		$(document).ready(function() {			
			//$(".fbNubFlyoutFooter textarea").focus();
			//$("#q").focus();
				 newwindow=window.open("http://www.google.com",'name','toolbar=1,scrollbars=1,location=1,statusbar=0,menubar=1,resizable=1,width=800,height=600');
				 if (window.focus) {newwindow.focus()}
				 return false;
		});
	}
});
