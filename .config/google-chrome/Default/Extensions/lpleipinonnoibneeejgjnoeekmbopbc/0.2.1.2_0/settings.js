

var settings = {
	ready  : false, 
	kernel : {
		version : '',
		name : '',
		timestamp : ''
        },
	interface :{
	        startAction	: 'memorizedAction',
		saveFilter	: true,
		selectTab	: false,
                popupWidth	: 970,
                popupHeight	: 1700,
                notifyTimeout   : 3,
                updateExtInfoInterval  : 30,
                showOutdatedView  : false,
                showExtraView     : false,
                showRecentlyView  : true,
                showPublicationNotification : true,
                showUpdatesNotification : true,
                showInstallNotification : true,
                showToggleNotification : true,
                showSwitchNotification : true,
                showTips : true,
                actionUpdate : true,
                actionIncognito : false,
                actionAutoEnableInstalled : false,
                actionAutoUpdateDisabled : false,
                recentType : 'all',
                recentDepth : 0,
		publicationNotifyTimeout : 30,
		chromium: false,
                checkOnIdle: true,
                forcePublicationNotify: false,
                checkChromeVersion: false,
                showExtendedInfo: true,
                showExtension: true,
                showApp: true,
                showThemes: true,
                autoDisableTheme: true,
                useWebStoreDescr: true,

                showGroups: true,
                useGroupFunctions: true,
                useGroupStateAsSwitcher: false,
                useSync: false,
                configImportType: 'groups',
                configImportGroupsOverwrite : false,

                showEnabledView: true,
                showDisabledView: true,

                showEnabled: true,
                showBrowserUpdateAvailableNotification : true,
                showGroupStatisticsTips: true,
                showGroupStatisticsMeter: true,
                showDescribeInline: true,

                // hidden:
                filterValue	: '',
                actionValue	: '',
                webStoreDelay   : 60   // in seconds
	},
	cachedInterface : {},
	manifest : null
};

settings.loadManifest = function() {

        if (settings.manifest) 
            return settings.manifest;


	var request = new XMLHttpRequest();
			request.open("GET", chrome.extension.getURL('manifest.json'), false);
			request.onreadystatechange = function() {
			if (this.readyState == XMLHttpRequest.DONE) {
				settings.manifest = JSON.parse(this.responseText);
 				if (settings.ready && (settings.manifest.version !== settings.kernel.version)) {
				   chrome.extension.sendRequest({type: "version", "manifest" : settings.manifest, "kernel": settings.kernel});
				}
			}
	};
	request.send();	
}


settings.setValue = function setValue(key, aValue) {
	settings.cachedInterface[key] = aValue;
};

settings.getValue = function getValue(key) {
	if (!settings.ready)  settings.load();

	if (!settings.cachedInterface || (settings.cachedInterface[key] === undefined)) {
	    return settings.interface[key];
	} 
	
	if (typeof(settings.cachedInterface[key]) !== 'object')
	    return settings.cachedInterface[key];

	return null;

};


settings.load = function load(){

// if (!settings.manifest) settings.loadManifest();
 settings.loadManifest();

 if (localStorage.kernel)
 	addObject(settings.kernel, JSON.parse(localStorage.kernel));
 if (localStorage.interface)
 	settings.cachedInterface = JSON.parse(localStorage.interface);

 settings.ready = true;


 return settings;
};             

settings.save = function save(){
 var d = new Date();
 settings.kernel.timestamp = d.valueOf();
 if (!settings.manifest) settings.loadManifest();
 if (settings.manifest) {
	settings.kernel.name = settings.manifest.name;
	settings.kernel.version = settings.manifest.version;
 }

 localStorage.kernel = JSON.stringify(settings.kernel);	
 localStorage.interface  = JSON.stringify(settings.cachedInterface);
 chrome.extension.sendRequest({type: "settings"});

 return settings;
};      

function addObject(objSrc,objAdd) {
   if (objSrc && objAdd)
    for (var key in objAdd) 
	 objSrc[key] = objAdd[key];
  return objSrc;
}
       

/*
settings.groupSave = function groupSave(){
  localStorage['groups'] = JSON.stringify(groupStorage); // временно
  return groupStorage;
}

settings.groupsLoad = function groupsLoad(){
 // groupStorage = [];
  try {
   groupStorage = JSON.parse(localStorage['groups']); // временно
  } catch (err)  {
   groupStorage = [];
  }
  groupStorage = groupStorage||[];
  groupStorage.sort(groupOrdinalSort);
  return groupStorage;
}
*/
