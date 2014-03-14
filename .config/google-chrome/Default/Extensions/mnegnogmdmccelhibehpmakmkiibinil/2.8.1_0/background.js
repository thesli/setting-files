/*chrome.tabs.getSelected(null, function(tab) {
  //properties of tab object
  tabId = tab.id;
  tabUrl = tab.url;

  //rest of the save functionality.
});
*/
chrome.browserAction.onClicked.addListener(function(tab) {
  parameter = tab.url;
  target = 'http://online-calculator.marketpanel.net/';

  chrome.tabs.create({'url': target }, function(tab) {
  });
});