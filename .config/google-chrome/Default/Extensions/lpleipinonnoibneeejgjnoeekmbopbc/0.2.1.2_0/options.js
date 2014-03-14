
var init = function(){

  window.dragIcon = document.createElement('img');
  window.dragIcon.src = chrome.extension.getURL('icons/ext-32.png');
  window.dragIcon.width = 24;

    initWidthSlider();


    //chrome.extension.getURL(document.location.);
    var optionsUrl = document.location.href ;
   settings.load();

   if (chrome.extension.getBackgroundPage().fixUpdateExtInfoInterval)
      chrome.extension.getBackgroundPage().fixUpdateExtInfoInterval();


   for(items in settings.interface) {
      var value = settings.getValue(items);
      if (!value || (value === undefined)) continue;	
//      setInputValue( document.querySelector('#'+items), value);
      setInputValue( document.querySelector('#'+items), value.toString());
   }

   // temp on ###
   setInputValue(document.querySelector('#updateExtInfoInterval'), '0');
   // temp off ###


   var main = document.querySelector('#main');
   main.style.opacity = 1.0;
  
   var title = document.querySelector('#title');
   title.innerHTML = settings.manifest.name;
   title.style.opacity = 1.0;

   var version = document.querySelector('#version');
   version.innerHTML = "Version: "+settings.manifest.version;
   version.style.opacity = 1.0;

   window.onbeforeunload = bind( function() {
    if (isOptionsChanged())  {
      return  ("The '"+settings.manifest.name+"' settings changes are not saved!");
     }
     else {
      return undefined;
    }
  },this); 

   // temp on ###
   document.querySelector('#popupWidthText').textContent = document.querySelector('#popupWidth').value+' px';
   // temp off ###
   $id('btnSave').addEventListener('click', saveOptions, false);
   $id('btnClose').addEventListener('click', closeOption, false);
   $id('popupWidth').addEventListener('load', initWidthSlider, false);
   $id('popupWidth').addEventListener('change', changeWidthSlider, false);

   initConfigExport();


   //$id('btnTest').addEventListener('click', test, false);


}

var saveOptions = function(){
 
  for(items in settings.interface) {
      var input = document.querySelector('#'+items);
      if (input) 
	  settings.setValue(items,getInputValue(input));
  };
  settings.save();                   
  chrome.extension.sendRequest({type: 'settings' });
 /*
  var status = document.querySelector('#optionsStatus');
  status.innerHTML = "Options have been saved.";
  status.style.opacity = 1.0;
  setTimeout(function() { status.style.opacity = 0.0;}, 1000);
*/
  fadeStatus('optionsStatus',"Options have been saved.");

}



var closeOption = function()
{
  window.close();
}


function  getInputValue(input){

 var rc = null;  // undefined
    if (input) 
      switch( input.nodeName.toLowerCase()) {
        case 'input':
                 if (/text|password|number|range/.test(input.type)) {
                     rc = input.value;
                 } else if (input.type === 'checkbox')  {
                     rc = input.checked ;
                 } 
                 //else alert(input.type);
                 break;
        case 'select': 
	default:
                 rc = input.value;
                 break;
   }
   return rc;

}

function  setInputValue(input, value){
      if (input) {
          switch(input.nodeName.toLowerCase()) {
              case 'input':
                  if (/text|password|number|range/.test(input.type)) {
                      input.value = value;
                  } else if (input.type == 'checkbox')  {
                      input.checked = value; 
                  }
                  break;
              case 'select':
                  for(var i = 0, len = input.options.length; i < len; i++) {
                      if (input.options[i].value == value) {
                          input.options[i].selected = 'selected';
                      }
                  }
                  break;
              default:
                  input.value = value;
                  break;
          }
      }
}

var isOptionsChanged = function(){
   var input;
   for(it in settings.interface) {
             var input = document.querySelector('#'+it);
             if (input)  {
		if ((settings.getValue(it) != getInputValue(input))) { 
		  return true;
                }
             }
   };
   return false;
}


function initWidthSlider(){
               document.querySelector('#popupWidth').max = screen.availWidth;
}
function changeWidthSlider(event) {
	       document.querySelector('#popupWidthText').textContent = ' ' +document.querySelector('#popupWidth').value+' px';
		//+event.target.value+' px';
}

function loadFile( xFile) {
 var oFReader = new FileReader();

 fadeStatus('configStatus',"File loading...");

 oFReader.onprogress = function (e) { //onload
   fadeStatus('configStatus',"File loading...(wait, please...)");
 }

 oFReader.onloadend = function (e) { //onload
  //console.log('loadend file reading:',this,e);
  var mess = "", rcc;

  if (!this.error) {
    rcc = setConfig(this.result);
    mess = rcc.message;
  } else 
    mess += "An error occurred while file reading: "+this.error.name;
    fadeStatus('configStatus',mess);
 };

 oFReader.readAsText(xFile);
}

function  initConfigExport()  {


  //var dcfg = $id('exchangeConfig');
  var dcfg = $id('exchangeConfig');
  if (!dcfg) return;
  var btnUpload  = $id('btnUpload');
  var uploadConfig = $id('uploadConfig');
  btnUpload.addEventListener('click',function(e){
    fadeStatus('configStatus',"File selecting by user....",true);
    uploadConfig.click();
  },false);
  window.addEventListener('focus',function(e){
    fadeStatus('configStatus',"");
  },false);



  uploadConfig.addEventListener('change',function(e){
    fadeStatus('configStatus',"");
    if (!this.value)  return false;
    var files = this.files;
    if (files) for (var i = 0, f; f = files[i]; i++) {
       loadFile(f);
    }
    this.value = '';
  },false);



//  dcfg.href = 'data:text;charset=utf-8,'+encodeURIComponent(JSON.stringify(localStorage['groups']));
//  dcfg.dataset.downloadurl="application/octet-stream:Eadui2.ttf:http://thecssninja.come/demo/gmail_dragout/Eadui.ttf"

  var blob = new Blob([getConfig()], {type: "application/octet-binary"});
  var cURL = window.webkitURL.createObjectURL(blob);
  if (!blob || !cURL) return;

  dcfg.href = cURL;
  dcfg.download = 'em-config.txt'; 
  dcfg.draggable = true;

  dcfg.dataset.downloadurl= cURL;
  dcfg.addEventListener('dragstart',function(e){
//console.log('dragstart fired');
         e.dataTransfer.effectAllowed = 'move';
	 e.dataTransfer.setData('DownloadURL','text/plain:emConfig.txt:'+this.dataset.downloadurl);
	},false);
   dcfg.addEventListener('dragend', function (e) {
//console.log('dragend fired',e);
   // e.stopPropagation(); e.preventDefault();
    return false;
   },false);

  dcfg.addEventListener('dragend',function(e){
    fadeStatus('configStatus',"Config file downloaded succefully.");
   },false);

  dcfg.addEventListener('click',function(e){
    fadeStatus('configStatus',"Config file downloaded succefully.");
   },false);

  //try { dcfg.download_url= cURL; } catch(e) {};
  dcfg.draggable = true;

   window.addEventListener('drop',function (e) {
    e.stopPropagation(); 
    e.preventDefault();
    var files = e.dataTransfer.files;
    for (var i = 0, f; f = files[i]; i++) {
       loadFile(f);
    }  
    e.returnValue  = false;
    return false;
   },false);
  
  window.addEventListener('dragover', function (e) {
    e.stopPropagation(); 
    e.preventDefault();
    e.dataTransfer.dropEffect  = 'move';   // 'none'
    e.returnValue  = false;
    return false;
   },false);
 

}



function test() {
}

function fadeStatus(xId, xMess, nonefadeIt) {
  var status = $id(xId);
  if (status){
   nonefadeIt = !!!nonefadeIt; // fade by default
   status.innerHTML = xMess;
   status.style.opacity = 1.0;
   if (nonefadeIt)
    setTimeout( function() { status.style.opacity = 0.0;}, 1000) ;
  }
}

function setConfig(xText){    //
  var rc, result = {};
  var mess = '';
  rc = readConfig(xText);
  if (rc.result && confirm("Are you sure you want to import configuration?")) {
     if (rc.data.groups) {  // add groups
        var grp = JSON.parse(localStorage['groups']);
        // localStorage['groups'] = ;
        if (!settings.getValue('configImportGroupsOverwrite')) {
           //  ### добавление в текущую конфигурацию импортируемых групп с учетом id
           // если по id совпадает имя - записываем в эту группу 
           // иначе переносим эту группу на новый id и ставим в конец
        } else
           grp = JSON.parse(rc.data.groups);  // ### временно , но синхро с getConfig 
        localStorage['groups'] = JSON.stringify(grp); // 
     }
     if (rc.data.interface && ( /all/i.test(settings.getValue('configImportType')))  ) {
        settings.cachedInterface = rc.data.interface;
        settings.save();
        // ### reload this page by event or func ini calling
     }
     mess = "Configuration imported successfully.";
  }  else {
     if (rc) 
        mess = "The import was canceled by user." 
     else
        mess = result + "The import was canceled.";
      rc = false;
  }
  //fadeStatus('configStatus',mess);
  return {result:rc,message:mess};
}


function readConfig(xText) {   // read fromimported
  var rc = false, mess= '';
  if (!xText) {
      return {result:false, message: "File is empty."};
  }
  var rc = JSON.parse(xText);
  if (rc.id) {
    var hashStored = rc.hash;
    rc.hash = null;
    if (hashStored !== JSON.stringify(rc).hashCode()) {
      return {result:false, message: "File is corrupted."};
    }

    // do import
    groupsLoad();

    var igrp = JSON.parse(rc.groups);
    for (var i=0; i<igrp.length; i++) {
        var reName = new RegExp(igrp[i].name,"i");
        var found =-1;
        // find same
        for (var j=0; j<groupStorage.length; j++) {
          if (groupStorage[j].imported) continue; // skip previous imported
          if (reName.test(groupStorage[j].name)) { // same name
            found = groupStorage[j].id;
            break;
          } 
        }
        // or create new
        if (found < 0){
            found = groupGetFreeId();
            groupAdd( found,igrp[i].name);
        }
        for (var j=0; j<igrp[i].list.length; j++) {
            groupAddItem(found,igrp[i].list[j].id);
        }
        var grp = groupGet(found);
        grp.imported = true;

    }
    for (var j=0; j<groupStorage.length; j++) {
       groupStorage[j].imported = false;
       delete groupStorage[j].imported;
    }
    groupSave();


    //
    return {result:true, data:rc, message: "File is imported."};
  } else {
    return false;
    return {result:false,  message: "File is wrong version or corrupted."};
  }
  // The import was canceled.
  return {result:false, message: ''};
}


function getConfig() { // serialize for export
  var now = new Date();
  var rc = {
  id: thisExtensionId,
  version: settings.manifest.version,
  timestamp: now.valueOf(),
  groups: localStorage['groups'],
  interface: settings.interface,
  hash: null
  };
  var rcs = JSON.stringify(rc);
  rc.hash = rcs.hashCode();
  rcs = JSON.stringify(rc);
  return rcs;
}





window.onload = init; 