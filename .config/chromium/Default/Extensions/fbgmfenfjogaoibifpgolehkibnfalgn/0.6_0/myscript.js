function selectionStuff() {
  console.log("from selectionStuff");
}

var storageForSelectionVars = new Object();
var prevDocument = new Object();

function correctSpecialKey(event) {
  if (storageForSelectionVars['fav_specialKey'] == 0) {
    return event.altKey;
  } else {
    return event.ctrlKey;
  }
}

function correctKeyCode(event) {
  return (event.which == storageForSelectionVars['fav_selectionKeyCode']);
}

function IsValid(x) {
    return (!(x.which < 32 || (x.which >32 && x.which < 47) ||
              (x.which > 111 && x.which < 124)));
}

var DownArrow = 40;
var UpArrow = 38;

function lengthOfObject(myObject) {
    count = 0;
    for (x in myObject) {
        count = count + 1;
    }
    return count;
}

function copyTabListWithAnnotation(myObj) {
    var w = new Object;
    for (x in myObj) {
        w[x] = new Object;
        w[x].title = myObj[x].title;
        w[x].id = myObj[x].id;
        w[x].winid = myObj[x].winid;
        // w[x].title = "(" + idx + ") " + w[x].title;
        // idx = idx + 1;
    }

    for (x in w) {
        for (y in w) {
            if ((x != y) && (w[x].title == w[y].title) &&
                (w[x].iscopy != 1)) {
                w[y].iscopy = 1;
            }
        }
    }

    var idx = 1;
    for (x in w) {
        w[x].title = "(" + idx + ") " + w[x].title;
        idx = idx + 1;
    }
                
    return w;
}


function optionSet(response) {
    var eta = document.getElementById('selectId');
    if (eta != null) {
        document.getElementById("mydiv").removeChild(document.getElementById('selectId'));
    }
    var selectText = document.createElement('select');
    selectText.id = 'selectId';
    selectText.size = 40;
     // Math.ceil(lengthOfObject(response.tabList) / 2);
    selectText.style.position = 'fixed';
    selectText.style.fontSize = '9pt';
    // selectText.style.fontWeight = 'bold';
  
    selectText.style.top = '20px';
    // selectText.style.height = '120px';
    selectText.style.left = '0px';
    selectText.style.width = '500px';
    selectText.style.visibility = "visible";
    selectText.style.padding = '0px';
    selectText.style.margin = '0px';
    selectText.style.zIndex = '100000';
  
    selectText.onkeyup = function (xab) {
        console.log('in selectText ' + xab.which + ' ' + 
                    document.getElementById('selectId').selectedIndex);
        // Enter key
        if (xab.which == 13) {
            var tabId = document.getElementById('selectId').value;
            console.log("pqr " + tabId);
            chrome.extension.sendRequest(
               {'operation' :'switchTab', 'tabId' : tabId});
            document.body.removeChild(document.getElementById("mydiv"));
            return;
        }
        // UpArrow should switch back to searchInput
        if (xab.which == UpArrow &&
            document.getElementById('selectId').selectedIndex == 0) {
            document.getElementById('selectId').blur();
            document.getElementById('searchInput').focus();
            return;
        }
    }
    document.getElementById("mydiv").appendChild(selectText);
    var w = copyTabListWithAnnotation(response.tabList);

    count = 0;
    var textVal = document.getElementById('searchInput').value;
    var regex = new RegExp(textVal, 'i');
    for (x in w) {
        var a = textVal.length;
        if (textVal.length == 0 ||
            w[x].title.search(regex) != -1) {
            var y = document.createElement('option');
            y.text = w[x].title;
            y.value = w[x].id;
            if (count == 0) {
                y.onkeyup = function (abc) {
                    if (abc.which == UpArrow) {
                        document.getElementById('selectId').blur();
                        document.getElementById('searchInput').focus();
                    }
                }
                count = count + 1;
            }
            if (w[x].iscopy != undefined &&
                w[x].iscopy == 1) {
                y.style.backgroundColor = "lightgray";
            }
            document.getElementById("selectId").add(y);
  
        }
    }
    document.getElementById("mydiv").appendChild(selectText);
}


window.addEventListener('keyup', function(event) {
  console.log('event ' + String(event.which) + ' ' + event.altKey);
  if (event.which == 27) {
      document.body.removeChild(document.getElementById("mydiv"));
      return;
  }

  chrome.extension.sendRequest(
      {'operation' : 'shortcutForTabExplorer'},
      function(response2) {
          console.log(
            response2.fav_specialKey + ' ' + response2.fav_selectionKeyCode);
          storageForSelectionVars = response2;
          if (correctSpecialKey(event) && correctKeyCode(event)) {
          console.log('event ' + String(event.which) + ' ' + event.altKey);
          chrome.extension.sendRequest({'operation' : 'tabList'},
          function(response) {
            var searchDiv = document.createElement("div");
            searchDiv.id = "mydiv";
            searchDiv.style.position = "fixed";
            searchDiv.style.top = '0px';
            searchDiv.style.left = '0px';
            //searchDiv.style.height = '160px';
            searchDiv.style.width = '100px';
            searchDiv.style.visibility = "visible";
            searchDiv.style.zIndex = '2147483647';

            document.body.appendChild(searchDiv);

            var searchInput = document.createElement('input');
            searchInput.type = 'text';
            searchInput.name = 'searchInput';
            searchInput.id = 'searchInput';

            searchInput.style.position = 'fixed';
            searchInput.style.top = '0px';
            // searchInput.style.height = '30px';
            searchInput.style.left = '0px';
            searchInput.style.width = '495px';
            searchInput.style.padding = '0px';
            searchInput.style.margin = '0px';
            searchInput.style.zIndex = '2147483647';

            searchInput.style.visibility = "visible";

            searchDiv.appendChild(searchInput);
            document.getElementById('searchInput').focus();
            optionSet(response);

            searchInput.onkeyup = function (pqr) {
                // searchDiv.removeChild(document.getElementById('selectId'));
                if (pqr.which == DownArrow) {
                    document.getElementById('selectId').focus();
                    document.getElementById('selectId').selectedIndex = 0;
                    return;
                } else {
                    if (pqr.which == 13) {
                        // send the first index.
                        if (document.getElementById('selectId').childElementCount > 0) {
                            var tabSelectedByEnter = document.getElementById('selectId')[0].value;
                            chrome.extension.sendRequest(
                                {'operation' :'switchTab', 'tabId' : tabSelectedByEnter});
                            document.body.removeChild(document.getElementById("mydiv"));
                            return;
                        }
                    } else {
                        if (IsValid(pqr.which)) {
                            optionSet(response);
                        }
                    }
                }
            }
           });
          }
      });
}, true);
