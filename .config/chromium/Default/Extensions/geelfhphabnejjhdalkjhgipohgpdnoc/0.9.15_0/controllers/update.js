window.addEventListener("load",function(){var metaData=chrome.extension.getBackgroundPage().tinyHippos.Background.metaData(),title=metaData.justInstalled?"Welcome to Ripple":"Ripple has been updated",body="";document.getElementById("title").innerText=title;if(metaData.justInstalled){body='Visit our <a href="http://developer.blackberry.com/html5/documentation" target="_blank">documentation site</a> to get started.'}else{body='See what\'s new in <a href="https://github.com/blackberry/Ripple-UI/blob/master/doc/CHANGELOG.md"'+' target="_blank">v'+metaData.version+"</a>."}document.getElementById("body").innerHTML=body});