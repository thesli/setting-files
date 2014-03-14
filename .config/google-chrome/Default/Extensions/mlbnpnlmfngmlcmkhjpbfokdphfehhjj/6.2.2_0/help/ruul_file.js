

function go_to_extensions_url(url) {
  chrome.tabs.create({
    url: 'chrome://extensions/#mlbnpnlmfngmlcmkhjpbfokdphfehhjj',
    active: true
  });
}

document.getElementById('doit').onclick = go_to_extensions_url;
