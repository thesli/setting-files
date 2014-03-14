
// global variables 
var updatenow;  //interval for updates
var all,found,matched,lastsearch;
var focustab = true;
var lasthtml = '';

// get current window
var currentWindow = false;
chrome.windows.getCurrent(function(w){ currentWindow = w;});

// get current tab
var currentTab = false;
chrome.tabs.getSelected(null,function(t){ currentTab = t;});

// -----------------------------------------------------------
// ui action functions

// focus selected tab
function opentab(num){

	var wincur = currentWindow.id;
	var wintab = found[num].windowId;

	if(wintab != wincur) {

    	// switch tabs in these windows	  
         chrome.extension.getBackgroundPage().switchWindows(wintab,wincur,all,found[num].id);
 

	}
	else {
	  chrome.tabs.update(Number(found[num].id), {selected: true});
	}
	
	if(localStorage['closechange'] !== undefined && localStorage['closechange'] == 1){
	      window.close();
	}
}


// group selected tabs
function group(found){

	var firstindex = Number((found[0]).index)+1;
	var firstWindow = found[0].windowId;

	for(i=1; i<found.length; i++){
		chrome.tabs.move(found[i].id,{index: firstindex, windowId: firstWindow});
		firstindex++;
	}

	window.setTimeout('init(true);',100);	
}


// close selected tabs
function closefound(){
	chrome.extension.getBackgroundPage().closefound(found);
	window.setTimeout('init(true);',100);
}


// bookmark selected tabs
function bookmark(){
	   chrome.extension.getBackgroundPage().bookmark(found,document.f.s.value);
        window.setTimeout('init(true);',100);

}

function openBookmarks(id){
       chrome.bookmarks.getChildren(String(id), function(bookmarks){

	   for(i=0;i<bookmarks.length;i++)                 
	                chrome.tabs.create({url : bookmarks[i].url});


	});
}

// -------------------------------------------------------
// ui drawing functions

// render one tab
function renderTab(tab,index){
	
	var img = '';
	if(localStorage['thumb'+tab.id]) img = localStorage['thumb'+tab.id];
	else img = "1.gif";

	var icon = '';
	if(tab.favIconUrl) icon = tab.favIconUrl;
	var selected = '';
	if(tab.selected) selected = 'selected';

	return '<li id="'+tab.id+'"><a href="'+tab.url+'" onclick="if(focustab) opentab('+(index)+'); else focustab=true; return false;" onmouseover="this.focus();"><img class="icon" src="'+icon+'"><div class="'+selected+'"><img class="screen" src="'+img+'"></div><span>'+tab.title+'</span></a></li>';
}


// render all selected tabs
function renderAll(){

			var html = '';
	for(i=0; i<found.length; i++) {
		if(i>0 && found[i].windowId != found[i-1].windowId) html += '<li class="separator"></li>';
		html += renderTab(found[i],i);
	}	


	$('#tabs2').html(html);
	$('#tabs').quicksand( $('#tabs2 li'),{ attribute: 'id' } );

	var dowith = 'All';
        if(found.length <all.length) dowith = 'Selected';

        html 	= found.length+' tabs found:'
		+' <a href="#" accesskey="o" onclick="opentab(0);" onmouseover="this.focus();"><u>O</u>pen First</a>';

	if(found.length < all.length && found.length>1)
		html += ' <a href="#" accesskey="g" onclick="group(found);" onmouseover="this.focus();"><u>G</u>roup</a>'
	
		html +=	' <a href="#" accesskey="w" onclick="chrome.extension.getBackgroundPage().moveToNewWindow(found);" onmouseover="this.focus();">'+dowith+' to new <u>W</u>indow</a>'
		+' <a href="#" accesskey="b" onclick="bookmark();" onmouseover="this.focus();"><u>B</u>ookmark '+dowith+'</a>'
		+' <a href="#" accesskey="c" onclick="closefound();" onmouseover="this.focus();"><u>C</u>lose '+dowith+'</a>';

document.getElementById('results').innerHTML = html;

}


// init window, get tabs, etc.
function init(select){
	chrome.windows.getAll({populate: true}, function (windows){
			var isopen = [];
			found = [];
			all = [];

			if(document.f.s.value != lastsearch) matched = [];
			lastsearch = document.f.s.value;		

			var requests = 0;
			for (w=0; w < windows.length; w++){


			windowId = windows[w].id;
			tabs = windows[w].tabs; 

			for (i=0; i < tabs.length; i++){

			var tab = tabs[i];
			all.push(tab);
			if(tab.url != chrome.extension.getURL("tabs.html")){

				var q = document.f.s.value.toLowerCase();
				if(q == '' || 
						tab.title.toLowerCase().match(q) ||
						tab.url.toLowerCase().match(q)  ||
						matched[tab.id]
				  ){
					found.push(tab);
				}
				else {
					requests++;
					chrome.tabs.sendRequest(tab.id, {query: q, tabid: tab.id}, function(response) {

							if(response.found){
							matched[response.tabid] = true; 
							window.clearInterval(updatenow);
							updatenow = window.setTimeout("init();",200);

							}
							else requests--;
							});
				}


				isopen[tab.id] =true;
			}
			}
			}

			window.setTimeout('renderAll()',200);


			// housekeeping
			for(key in localStorage){

				if(key.match(/^thumb/) && !isopen[key.substr(5)]) delete localStorage[key];
			}


	});


	// get bookmarks

	chrome.bookmarks.getChildren("0", function(children){
			var otherid = (children[1]).id;

			chrome.bookmarks.getChildren(otherid, function(bookmarks){
				var html = "";
				for(i=0;i<bookmarks.length;i++){
				  bm = bookmarks[i];
				  if(bm.title.match(/\(Tabs\+\)/) && 
				     bm.title.toLowerCase().match(document.f.s.value.toLowerCase()))
				     html += "<li><a onmouseover='this.focus();' href='#' onClick='openBookmarks("+bm.id+"); return false;'>"+bm.title.replace(/\(Tabs\+\)/,' +')+"</a></li>";
				}

				document.getElementById('bookmarks').innerHTML = html;
				});
			});
	if(select) document.f.s.select();

}

//-----------------------------------------------------------------------
// Event handlers

chrome.tabs.onSelectionChanged.addListener(function(tabId, selectInfo) {
		window.clearInterval(updatenow);
		updatenow = window.setTimeout("init();",200);
		});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if(Number(tabId) != Number(currentTab.id) && currentTab.id != undefined){
		window.clearInterval(updatenow);
		updatenow = window.setTimeout("init();",200);
		}
		});


chrome.tabs.onRemoved.addListener(function(tabId) {
		window.clearInterval(updatenow);
		updatenow = window.setTimeout("init();",200);
		});


// jquery init for drag and drop

$(document).ready(function(){
			$("#tabs").sortable({
					stop: function(e, ui) { 
						var tabs = $('#tabs').sortable('toArray');
						var dragged = ui.item[0].id;
						var pos = 0;
						var i=0;
						while(i<tabs.length && tabs[i]!= dragged){
							if(tabs[i] != '') pos++;
							i++;
						}

				
					var offset =0;	
					if(i>0 && tabs[i-1]=='') {pos++; offset =0;}
					else if(i < tabs.length-2 && tabs[i+1]=='') {pos--; offset=1;}
					var next = found[pos];
					chrome.tabs.move(Number(dragged),{index: next.index+offset, windowId: next.windowId});

					focustab = false;
					}
					,scroll: false
					});
		});
