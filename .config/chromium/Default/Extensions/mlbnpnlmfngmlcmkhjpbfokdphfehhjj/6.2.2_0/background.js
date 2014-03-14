
// add content script manually upon first run (just installed/enabled)
chrome.tabs.query({}, function (tabs) {
	tabs.forEach(includeRuul);
});

function includeRuul(tab) {
	if (/^chrome/.test(tab.url)) return;
	chrome.tabs.insertCSS(tab.id, {
	    file: "ruulAll.css"
	});
	chrome.tabs.executeScript(tab.id, {
	    file: "ruulAll.js"
	});
}
