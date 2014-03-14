
var stored = localStorage;

if ("undefined" == typeof stored.remember)
    stored.remember = "true";

window.addEventListener("DOMContentLoaded", function() {
    document.getElementById("remember").checked = (stored.remember == "true")
}, false);

window.onclick = function (e) {
	var id = e.target.id;
    if (id) {
        chrome.tabs.getSelected(null, function (tab) {
            if (!tab) return;

            var color = id.replace('ruul', '');

            if (color == 'Remove') {
                chrome.tabs.sendMessage(
                    tab.id, {'ruulRemove': true}
                );
            } else if (e.target.nodeName == 'LI' && 
                       e.target.classList.contains('active')) {
                chrome.tabs.sendMessage(
                    tab.id, {'ruulColor': color, 'remember': stored.remember == "true" }
                );
                //chrome.tabs.insertCSS(null, {
                //    file: "ruulAll.css"
                //});
            }    
        });
    }
}
 
document.getElementById("remember").onchange = function(e) {
    stored.remember = e.target.checked;
}


// if the current tab doesn't respond in a second we display
// a message to the user
var communicationTimeout = setTimeout(function () {
    var error = document.getElementById("error");
    error.style.display = 'block';
    error.innerHTML = "<b>Error:</b> Can't add rulers to the current tab.";
}, 500);

// send message to current tab to see if we're able to communicate
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {check: true}, function(response) {
        if (response) {
            clearTimeout(communicationTimeout);
        }
    });
});