

chrome.omnibox.onInputEntered.addListener(
  function(text) {
 chrome.tabs.getSelected(null, function(tab) {
var queryUrl = "http://www.google.com/search?source=ig&hl=en&rlz=1G1GGLQ_ENUS264&q="+ text+"&btnI=I%27m+Feeling+Lucky";
    chrome.tabs.update(tab.id, {url:queryUrl});
  });
   
  });