var vt = {
  selectedId: undefined,
  dragging: false,
  items: null,
  popup: null,
  search: null,
  targetItem: null,
  tabs: [],
  tabScores: []
};

function log(value) {
  chrome.self.getBackgroundPage().console.log(value);
}

function option(key) {
  return localStorage[key];
}

window.addEventListener("load", function() {
  chrome.tabs.getAllInWindow(null, function(tabs) {
    createPopup();
    createSearchBox();
    initTabs(tabs);
    setTimeout(function() { vt.search.focus();}, 300);
  });
}, false);

function createPopup() {
  vt.popup = document.createElement("div");
  vt.popup.id = "popup";
  vt.popup.style.cssText = "width: "+ option('width') +"px;";
  document.body.appendChild(vt.popup);
}

function initTabs(tabs) {
  vt.tabs = tabs;
  showTabs(vt.tabs);
  setDragSort();
  initTabScores(vt.tabs);
}

function showTabs(tabs, tabScores) {
  initItems();
  var length = tabs.length;
  var items = vt.items;

  for (var i=0; i < length; i++) {
    var item = document.createElement("li");
    var titleText = tabs[i].title || tabs[i].url;
    item.id = tabs[i].id;
    item.className = 'item';
    item.title = titleText;

    if (tabs[i].selected) {
      item.className = 'selected item target';
      vt.selectedId = tabs[i].id;
      vt.targetItem = item;
    }

    var favicon = document.createElement("img");
    favicon.src = tabs[i].favIconUrl || "empty.png";

    var title = document.createElement("div");
    title.className = "title";
    if (tabScores) {
      var newTitle = "";
      for (var j=0; j < titleText.length; j++) {
        if (tabScores[i].scoreArray[j] == 1 && titleText[j] != ' ') {
          newTitle += '<b>'+ titleText[j] +'</b>';
        } else {
          newTitle += titleText[j];
        }
      }
      title.innerHTML = newTitle.replace(/<\/b><b>/g, '');
    } else {
      title.textContent = titleText;
    }

    title.style.cssText = "max-height: "+ (18 * option('lines')) +"px";

    var close = document.createElement("div");
    close.className = "close";
    close.addEventListener('click', function(event) {
      remove(this.parentNode.id);
      event.stopPropagation();
      event.preventDefault();
    });

    item.addEventListener('mouseover', function(event) {
      changeTarget(this);
    }, false);

    if (tabScores) {
      item.addEventListener('click', function(event) {
        focus(this.id);
        initTabsAndSearch();
      }, false);
    }

    item.appendChild(favicon);
    item.appendChild(title);
    item.appendChild(close);
    items.appendChild(item);
  }
}

function initItems() {
  if (vt.items) vt.popup.removeChild(vt.items);

  vt.items = document.createElement("ul");
  vt.items.id = "items";
  vt.popup.appendChild(vt.items);
}

function setDragSort() {
  var items = vt.items;
  var dragsort = ToolMan.dragsort();
  dragsort.makeListSortable(items, function(item) {
    var group = item.toolManDragGroup;
    var offset;
    var scroll = function(event) {
      var hiddenHeight = (items.scrollHeight + 20) - items.clientHeight;
      var diff = offset - event.y;
      offset = event.y;
      item.offsetTop = event.y;
      if (event.y < hiddenHeight && diff > 0) items.scrollTop = items.scrollTop - diff;
      if (event.y > items.clientHeight - hiddenHeight && diff < 0) items.scrollTop = items.scrollTop - diff;
    }

    group.register('dragstart', function(info) {
      vt.dragging = true;
      offset = info.event.y;
      if (items.clientHeight < items.scrollHeight)
        window.addEventListener('mousemove', scroll, false);
    });

    group.register('dragend', function(info) {
      if (vt.dragging) {
        window.removeEventListener('mousemove', scroll);
        move(item.id, items);
      } else if (info.event.target.className != 'close') {
        info.event.preventDefault();
        focus(item.id);
      }
      vt.dragging = false;
    });
  });
}

function initTabScores(tabs) {
  vt.tabScores = tabs.map(function(tab) {
    return { title: tab.title, score: 0.0, scoreArray: [], index: tab.index };
  });
}

function sortByScore(tabScores) {
  return tabScores.sort(function(a, b) { return b.score - a.score; });
}

function focus(id) {
  try {selectItem(id);} catch(e) {};
  chrome.tabs.update(Number(id), {selected: true});
}

function selectItem(id) {
  var selected = document.getElementById(vt.selectedId);
  if (selected) selected.className = 'item';

  var target = document.getElementById(id);
  target.className = 'selected item';
  vt.selectedId = id;
  changeTarget(target);
}

function remove(id) {
  chrome.tabs.remove(Number(id), function() {
    var items = document.getElementById("items");
    var target = document.getElementById(id);
    items.removeChild(target);
  });
}

function move(id, items) {
  var tabId = Number(id);
  var tabs = items.childNodes;
  var n = 0;
  while (tabs[n].id != tabId) {
    n++;
  }
  chrome.tabs.move(tabId, {index: n});
}

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
  if (vt.selectedId != tabId) try {selectItem(tabId);} catch(e) {};
});


function createSearchBox() {
  vt.search = document.createElement("input");
  vt.search.type = 'text';
  vt.search.id = 'search';
  vt.search.autocomplete = 'off';
  vt.search.addEventListener("keyup", searchKeyUp, false);

  var searchBox = document.createElement("div");
  searchBox.id = "search-box";
  searchBox.appendChild(vt.search);
  vt.popup.appendChild(searchBox);
}

function initTabsAndSearch() {
  vt.search.value = '';
  chrome.tabs.getAllInWindow(null, function(tabs) {
    initTabs(tabs);
  });
}

function changeTargetPosition(node, position) {
  if (node) {
    changeTarget(node);
  } else if (position == 'next') {
    changeTarget(document.querySelector("li.item"));
  } else if (position == 'previous') {
    changeTarget(document.querySelector("li.item:last-child"));
  }
}

function changeTarget(node) {
  if (vt.targetItem) vt.targetItem.className = vt.targetItem.className.replace(/target/, '');
  vt.targetItem = node;
  vt.targetItem.className += ' target';
}


function searchKeyUp(event) {
  if (event.ctrlKey && event.keyCode != 72) {
    return;
  }
  var search = vt.search;

  switch (event.keyCode) {
  case 13:
    initTabsAndSearch();
    break;
  case 38: break;
  case 40: break;
  case 17: break;

  default:
    event.preventDefault();
    var text = search.value;
    if (text == "") return initTabsAndSearch();

    var tabScores = [];
    for (var i=0; i < vt.tabScores.length; i++) {
      if (vt.tabScores[i].title) {
        vt.tabScores[i].score = LiquidMetal.score(vt.tabScores[i].title, text);
        if (vt.tabScores[i].score > 0) {
          vt.tabScores[i].scoreArray = LiquidMetal.buildScoreArray(vt.tabScores[i].title, text);
          tabScores.push(vt.tabScores[i]);
        }
      }
    }
    if (tabScores.length > 0) {
      tabScores = sortByScore(tabScores);
      var tabs = tabScores.map(function(score) { return vt.tabs[score.index] });
      showTabs(tabs, tabScores);
      changeTarget(document.querySelector("li.item"));
    } else {
      initItems();
    }

    break;
  }
}

window.addEventListener('keydown', function(event) {
  if (!vt.targetItem) return;

  switch (event.keyCode) {
    case 13: // return
      event.preventDefault();
      focus(vt.targetItem.id);
      break;
    case 38: // Up
      event.preventDefault();
      changeTargetPosition(vt.targetItem.previousSibling, 'previous');
      break;
    case 40: // Down
      event.preventDefault();
      changeTargetPosition(vt.targetItem.nextSibling, 'next');
      break;
    case 78: // n
      if (event.ctrlKey) {
        event.preventDefault();
        changeTargetPosition(vt.targetItem.nextSibling, 'next');
      }
      break;
    case 74: // j
      if (event.ctrlKey) {
        event.preventDefault();
        changeTargetPosition(vt.targetItem.nextSibling, 'next');
      }
      break;
    case 80: // p
      if (event.ctrlKey) {
        event.preventDefault();
        changeTargetPosition(vt.targetItem.previousSibling, 'previous');
      }
      break;
    case 75: // k
      if (event.ctrlKey) {
        event.preventDefault();
        changeTargetPosition(vt.targetItem.previousSibling, 'previous');
      }
      break;
    case 68: // d
      if (event.ctrlKey) {
        event.preventDefault();
        var target = vt.targetItem.previousSibling;
        remove(vt.targetItem.id);
        changeTargetPosition(target, 'previous');
      }
      break;
    default:
      break;
  }
}, false);
