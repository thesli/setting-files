
function saveShowFormats(options){

    console.log('saveShowFormats');
	
    for (var i in options) 
	{
		console.log(i + "   " + options[i]);
	
	
	}
	
	
}


window.addEventListener( "load", function(){

	try{
		fvdSingleDownloader.Options.init();		
	}
	catch( ex ){

	}
	
	fvdSingleDownloader.Locale.localizeCurrentPage();

//	document.getElementById("settingsContent").addEventListener( "scroll", function( event ){			
//		document.getElementById("settingsContent").scrollLeft = 0;		
	//}, false );
	
	// -------- события на Click
	document.getElementById("applyChangesButton").addEventListener( "click", function( event ){			
		fvdSingleDownloader.Options.applyChanges( saveShowFormats );
	}, false );
	
	document.getElementById("buttonCloseButton").addEventListener( "click", function( event ){			
		fvdSingleDownloader.Options.close();
	}, false );

	// -------- кнопки в меню
//	document.getElementById("buttonBigSettings").addEventListener( "click", function(){	
//		fvdSingleDownloader.Options.setType('global');
//	}, false );
//	document.getElementById("buttonBigSdGetSatisfaction").addEventListener( "click", function(){		
//		console.log('buttonBigSdGetSatisfaction');
//	}, false );

	document.getElementById("mainMail").addEventListener( "click", function(){		
		fvdSingleDownloader.Options.openGetSatisfactionSuggestions();
	}, false );
	
	
	
	
	
}, false );

