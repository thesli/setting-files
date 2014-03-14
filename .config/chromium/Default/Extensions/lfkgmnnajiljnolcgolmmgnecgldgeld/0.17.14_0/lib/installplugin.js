document.getElementById('doubleclick').addEventListener('click', function() {
  chrome.extension.sendMessage({rightclick:'doubleclick'}, function(resp) {
    window.close();
  });
});