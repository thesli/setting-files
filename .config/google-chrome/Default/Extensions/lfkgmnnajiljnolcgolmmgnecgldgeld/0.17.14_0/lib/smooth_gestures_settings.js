var bg = chrome.extension.getBackgroundPage();
document.body.innerText = "{\"\":\"== INTRUCTIONS ==\n\n  This page contains all of your Smooth Gestures Settings.\n\n  To save your settings, save this page by right-clicking and selecting 'Save as'.\n\n\n  == END OF INSTRUCTIONS ==\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\","
  +"\"title\":\"Smooth Gestures Settings\","
  +"\"version\":\""+bg.extVersion+"\","
  +"\"gestures\":"+JSON.stringify(bg.gestures)+","
  +"\"settings\":"+JSON.stringify(bg.settings)+","
  +"\"customActions\":"+JSON.stringify(bg.customActions)+"}";
