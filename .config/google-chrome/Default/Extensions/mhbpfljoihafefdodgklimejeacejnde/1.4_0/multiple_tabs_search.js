var logging = false;
var allSelected = false;
var gAllSelectedOption = stringToBool(getValueFromSession("allSelectedOption", false));
var gSurroundByQuotesOption = stringToBool(getValueFromSession("surroundByQuotesOption", false));
var gTrimEachLineOption = stringToBool(getValueFromSession("trimEachLineOption", true));
var gClearFormAfterSearchOption = stringToBool(getValueFromSession("clearFormAfterSearchOption", true));
var gSearchOption = stringToBool(getValueFromSession("searchOption", true));

var gSavedFormData = getValueFromSession("SavedFormData", "");

var defaultKeyValues = new Array();
defaultKeyValues["youtube.com"] = false;
defaultKeyValues["soundcloud.com"] = true;
defaultKeyValues["residentadvisor.net"] = true;
defaultKeyValues["facebook.com"] = true;
defaultKeyValues["discogs.com"] = true;
defaultKeyValues["djtunes.com"] = true;
defaultKeyValues["itunes.apple.com"] = true;
defaultKeyValues["beatport.com"] = true;
defaultKeyValues["trackitdown.net"] = true;
defaultKeyValues["djDownload.com"] = true;
defaultKeyValues["myspace.com"] = true;
defaultKeyValues["last.fm"] = true;
defaultKeyValues["junodownload.com"] = true;
defaultKeyValues["mixcloud.com"] = true;
defaultKeyValues["amazon.com"] = true;
defaultKeyValues["mrtzcmp3.net"] = true;
defaultKeyValues["traxsource.com"] = true;			

String.prototype.trim = function() { return this.replace(/^[\s\n\t\r]+|[\s\n\t\r]+$/g, ''); }

function stringToBool(value) 
{ 
	if (value == "true" || value == true)
		return true;
	
	return false; 
}


function getChecksRemove() 
{
	return document.getElementsByName("ckRemove");
}

function isOpen()
{
	return document.getElementById("rbOpen").checked;
}

function setIsOpen(value)
{
	if (value)
		document.getElementById("rbOpen").checked = true;
	else
		document.getElementById("rbSearchGoogle").checked = true;		
}

function setSurroundByQuotes(selected)
{
	document.getElementById("ckSurroundByQuotes").checked = selected;
}

function getSurroundByQuotes()
{
	return stringToBool(document.getElementById("ckSurroundByQuotes").checked);
}

function getTrimEachLine()
{
	return stringToBool(document.getElementById("ckTrimEachLine").checked);
}

function setTrimEachLine(selected)
{
	document.getElementById("ckTrimEachLine").checked = selected;
}			

function getClearFormAfterSearch()
{
	return stringToBool(document.getElementById("ckClearFormAfterSearch").checked);
}

function setClearFormAfterSearch(selected)
{
	document.getElementById("ckClearFormAfterSearch").checked = selected;
}

function getFormDataText()
{
	var text = document.getElementById("textboxWords").value;
	return text;
}

function openTabs()
{
	var txtObj = document.getElementById("textboxWords");
	var open = isOpen();

	var allWords = txtObj.value;
	if (allWords.length == 0)
		return;

	var wordsList = allWords.split("\n");

	var checksRemove = getChecksRemove();
	var trim = getTrimEachLine();
	var removeQuery = "";

	if (!open)
	{
		for (c=0; c<checksRemove.length;c++)
		{
			if (checksRemove[c].checked)
				removeQuery += encodeURIComponent(" -" + checksRemove[c].value);
		}
	}

	var surroundByQuotes = getSurroundByQuotes();				
	
	for (i = 0; i < wordsList.length; i++)
	{
		var searchWord = wordsList[i];

		if (trim)
			searchWord = searchWord.trim();
		
		if (surroundByQuotes)
			searchWord = '"' + searchWord + '"';

		var url = searchWord;
		
		var tmp = url.trim();
		if (tmp.length <= 0)
			continue;
		
		if (!open)
		{
			url = 'http://www.google.com.br/search?ie=UTF-8&q=' + encodeURIComponent(url);
			url += removeQuery;
		}				
		
		// Open the tab without making it active. This is important so that several tabs
		// can be opened, not only some 3 or 4....
		chrome.tabs.create( { 'url' : url, 'active' : false } );
	}
	
	if (getClearFormAfterSearch())
		clearForm();
	else
		saveForm();
	
}

function saveForm()
{
	setItem("SavedFormData", getFormDataText());
}

function clearForm()
{
	document.getElementById("textboxWords").value = "";
	setItem("SavedFormData", "");
	
	clearFormAfterSearchOption
}

function selectAll() 
{
	if (allSelected) 
	{
		allSelected = false;
		checkAll(false);
	}
	else 
	{
		allSelected = true;
		checkAll(true);
	}
	
	setItem("allSelected", allSelected);
}

function checkAll(check) 
{
	var bCheck = stringToBool(check);
	var checksRemove = getChecksRemove();
	
	for (c in checksRemove)
	{
		checksRemove[c].checked = bCheck;				
		storeElementValueSession(checksRemove[c]);
	}
}

function storeElementValueSession(element)
{
	var key = element.value;
	var isChecked = element.checked;
	
	setItem(key, stringToBool(isChecked));
}

function getElementIsCheckedFromSession(element, defaultValue)
{
	var key = element.value;
	
	return stringToBool(getValueFromSession(key, defaultValue));			
}

function getValueFromSession(key, defaultValue)
{				
	var ret = getItem(key);	
	
	if (ret == null)
		return defaultValue;
	
	return ret;			
}

function clearSettings()
{
	allSelected = false;
	setItem("gAllSelectedOption", allSelected);
	
	setSurroundByQuotes(false);
	setIsOpen(false);
	
	clearStrg();
	setupPage();
}

//sets the item in the localstorage
function setItem(key, value) 
{
	try 
	{
		log("Inside setItem:" + key + ":" + value);
		window.localStorage.removeItem(key);
		window.localStorage.setItem(key, value);
		
		var v = window.localStorage.getItem(key);		
		log("Inside setItem: KEY TEST / " + v);
	}
	catch(e)
	{
		log("Error inside setItem");
		log(e);
	}

	log("Return from setItem" + key + ":" +  value);
}

//Gets the item from local storage with the specified key
function getItem(key) 
{
	var value;
	log('Get Item:' + key);
	try 
	{
		value = window.localStorage.getItem(key);	  
	}
	catch(e) 
	{
		log("Error inside getItem() for key:" + key);
		log(e);
		value = null;
	}

	log("Returning value: " + value);
	return value;
}

//Clears all the key value pairs in the local storage
function clearStrg() 
{
	log('about to clear local storage');
	window.localStorage.clear();
	log('cleared');
}

function log(txt) 
{
	if (logging)
	{
		console.log(txt);
	}
}

function hookUpEvents()
{
	document.getElementById("ckCheckAll").onclick = selectAll;
	document.getElementById("btnClear").onclick = clearSettings;
	document.getElementById("btnSearch").onclick = openTabs;
}

function setupPage()
{	
	var textArea = document.getElementById("textboxWords");
	
	if (textArea != null)
		textArea.focus();
		
	if (gSavedFormData != null && gSavedFormData.lenght > 0)
		textArea.value = gSavedFormData;
		
	var checksRemove = getChecksRemove();
	for (c = 0; c < checksRemove.length; c++) 
	{
		var check = getElementIsCheckedFromSession(checksRemove[c], defaultKeyValues[checksRemove[c].value]);
		checksRemove[c].checked = stringToBool(check);
	}	
	
	allSelected = stringToBool(getItem("allSelected"));
	document.getElementById("ckCheckAll").checked = stringToBool(allSelected);
}


// Run our things as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () 
{
	setupPage();
	hookUpEvents();
});