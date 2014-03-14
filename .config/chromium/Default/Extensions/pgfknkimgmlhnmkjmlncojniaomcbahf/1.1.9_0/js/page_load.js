(function(){

	var html = document.documentElement.outerHTML;
	var doc_ref = ('referrer' in document) ? document.referrer : '';
	chrome.runtime.sendMessage({command:'page_loaded', page_size:html.length, page_referrer:doc_ref, counter:(html.indexOf('counter.yadro.ru/hit') != -1)}, function(response){});

})();