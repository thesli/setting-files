function createContent () {
  var title = document.createElement('div');
  title.id = "title";
  title.innerHTML = chrome.i18n.getMessage('VKBD_NAME');
  document.body.appendChild(title);
  var description = document.createElement('div');
  description.id = "description";
  description.innerHTML = chrome.i18n.getMessage('VKBD_DESCRIPTION').replace('http://goo.gl/lzCPo',
    '<a href="https://chrome.google.com/webstore/detail/google-input-tools-by-goo/mclkkofklkfljcocdinagocijmpgbhab" target="_blank">http://goo.gl/lzCPo</a>');
  document.body.appendChild(description);
}

createContent();
