/* Set up the key commands based on the keycode setting */
chrome.extension.sendMessage({settings:"keycode"},function(e){var t=e&&parseInt(e.value,0);window.addEventListener("keydown",function(e){var n=e.ctrlKey||e.metaKey;n&&e.shiftKey&&e.keyCode==t&&(document.getElementById("LiveCSSEditor-panel")?chrome.extension.sendMessage({stop:!0},function(e){}):chrome.extension.sendMessage({start:!0},function(e){}))},!1)}),function(){var e=document.location,t=window.localStorage.getItem("livecsseditor-cache-"+e);t&&t!==""&&chrome.extension.sendMessage({modify:"true"},function(e){})}();