function init()
{
	
	getPage_url();
	
	setInterval(function(){  getPage_url()  }, 1000);
	
}

// ----------------------------------
function getPage_url()
{

	var url = document.location.href;
	var title = document.title;
	
	if (curHref != url) 
	{
		curHref = url;
		chrome.extension.sendRequest({akce:"Page_URL",  url: url  },	
										function( response ){ 	
											if ( response.command == 'Get_Links')
											{
												getAll_URLs( response.tip, response.answer, response.tabId );
											}
											else if ( response.command == 'Get_VK_Audio')
											{
												getVK_Audio_URLs( response.tip, response.answer, response.tabId );
											}
											else if ( response.command == 'Get_VK_Video')
											{
												getVK_Video_URLs( response.tip, response.answer, response.tabId );
											}
									} );
	}								
}


// ---------------------------------------------------------------------------
function getVK_Video_URLs( tip, answer, tabId ) {

	var url = document.location.href;
	
	aURLs.length = 0;
	
	var embeds = new Array(document.embeds.length);
	for (var i = 0; i < document.embeds.length; i++) 
	{
		embeds.push(document.embeds[i]);
	}			
	addEmbedsToArray( embeds, url );	
	
	chrome.extension.sendRequest({akce:"Get_VK_Video", answer: answer, tabId: tabId, url: url, link: aURLs   },	
												function( response ){ 	
											} );
}
// ---------------------------------------------------------------------------
function getVK_Audio_URLs( tip, answer, tabId ) {

	var lurl = document.location.href;
	aURLs.length = 0;

	var elements = document.querySelectorAll( ".audio" );

	for (var i = 0; i < elements.length; i++) 
	{
		var m = elements[i];

		var url = "";
		var title = "";
		var duration = "";
		var id = "";
		
		var input = null;
		var inputs = m.getElementsByTagName("input");
		if (inputs) input = inputs[0];
		if( input && input.id && input.id.indexOf( "audio_info" ) != -1 )
		{
			var v = input.value;
			if ( !v) continue;
			var t = v.split(",");
			if ( !t) continue;
			url = t[0]
			
			id = input.id.substr(10, input.id.length);
		}
		
		if ( url.length < 4) continue;
		
		var div_title = m.getElementsByClassName("title_wrap")[0];
		if (div_title)
		{
			title = div_title.textContent;	
		}
		

		var div_duration = m.getElementsByClassName("duration")[0];
		if (div_duration)
		{
			duration = div_duration.textContent;	
		}
		
		aURLs.push({
					'url': url,
					'title': title,
					'value': id,
					'type': 'audio'
					});
	}
	
	
	chrome.extension.sendRequest({akce:"Get_VK_Audio", answer: answer, tabId: tabId, url: lurl, link: aURLs   },	
												function( response ){ 	
											} );
	
}
// ---------------------------------------------------------------------------
function getAll_URLs( tip, answer, tabId ) {

	var url = document.location.href;
	
	aURLs.length = 0;
	if ( (tip.indexOf('all') != -1) || (tip.indexOf('link') != -1) )
	{
		var links = new Array(document.links.length);
		for (var i = 0; i < document.links.length; i++) 
		{
			links.push(document.links[i]);
		}
		addLinksToArray(links, url );
	}	
			
	if ( (tip.indexOf('all') != -1) || (tip.indexOf('image') != -1) )
	{
		var images = new Array(document.images.length);
		for (var i = 0; i < document.images.length; i++) 
		{
			images.push(document.images[i]);
		}	
		addImagesToArray(images, url, "image");			
	}	
	
	if ( (tip.indexOf('all') != -1) || (tip.indexOf('embed') != -1) )
	{
		var embeds = new Array(document.embeds.length);
		for (var i = 0; i < document.embeds.length; i++) 
		{
			embeds.push(document.embeds[i]);
		}			
		addEmbedsToArray( embeds, url );			
	}	
			
	if ( (tip.indexOf('all') != -1) || (tip.indexOf('video') != -1) )
	{
		var videos = [];
		var x = document.getElementsByTagName('video');
		if (x)
		{
			for (var i = 0; i < x.length; i++) 
			{
				videos.push(x[i]);
			}			
			addImagesToArray(videos, url, "video");			
		}	
	}	
			
	if ( (tip.indexOf('all') != -1) || (tip.indexOf('audio') != -1) )
	{
		var audios = [];
		var x = document.getElementsByTagName('audio');
		if (x)
		{
			for (var i = 0; i < x.length; i++) 
			{
				audio.push(x[i]);
			}			
			addImagesToArray(audios, url, "audio");			
		}	
	}	

	if ( tip.indexOf('input') != -1 )
	{
		var x = document.getElementsByTagName('input');
		if (x)
		{
			var inputs = [];
			for (var i = 0; i < x.length; i++) 
			{
				inputs.push(x[i]);
			}
			addInputsToArray( inputs, url );			
		}	
	}	
	
	if ( (tip.indexOf('all') != -1) || (tip.indexOf('object') != -1) )
	{
		var x = document.getElementsByTagName('param');
		if (x)
		{
			var params = [];
			for (var i = 0; i < x.length; i++) 
			{
				params.push(x[i]);
			}
			addParamsToArray( params, url );	
		}	
	}	
	
	chrome.extension.sendRequest({akce:"Get_Links", answer: answer, tabId: tabId, url: url, link: aURLs   },	
												function( response ){ 	
											} );
	
}			

// ---------------------------------------------------------------------------
function addLinksToArray(lnks, ref) {
			
	if (!lnks || !lnks.length) 	return;

	lnks.forEach(function( link ){

							var url = getURL(link.href, ref);
							
							if ( url != "") 
							{
								var title = '';
								if (link.hasAttribute('title')) 
								{
									title = trimMore(link.getAttribute('title'));
								}
								if (!title && link.hasAttribute('alt')) 
								{
									title = trimMore(link.getAttribute('alt'));
								}
								if (!title) 
								{
									title = trimMore(link.innerText);
								}
								var cl = "";
								if (link.hasAttribute('class')) 
								{
									cl = trimMore(link.getAttribute('class'));
								}

								aURLs.push({
											'url': url,
											'title': title,
											'class': cl,
											'id': (link.id ? link.id : ""),
											'value': '',
											'type': 'link'
										});
							}			
			
						});
						
}
// ---------------------------------------------------------------------------
function addImagesToArray(lnks, ref, tip)	{

	if (!lnks || !lnks.length) 	return;
	
	lnks.forEach(function( link ){
		
							var u = "";
							if (link.src) u = link.src;
							if (link.hasAttribute('data-thumb'))
							{
								u = trimMore(link.getAttribute('data-thumb'));
								if (u.indexOf("http") == -1) u = "http:" + u;
							}	

							var url = getURL(u, ref);
							if ( url != "") 
							{
							
								var desc = '';
								if (link.hasAttribute('alt')) 
								{
									desc = trimMore(link.getAttribute('alt'));
								}
								else if (link.hasAttribute('title')) 
								{
									desc = trimMore(link.getAttribute('title'));
								}
								var cl = "";
								if (link.hasAttribute('class')) 
								{
									cl = trimMore(link.getAttribute('class'));
								}
								
								aURLs.push({
											'url': url,
											'title': desc,
											'class': (link.class ? link.class : ""),
											'id': (link.id ? link.id : ""),
											'value': (link.value ? link.value : ""),
											'type': tip
										});
							}			
									
						});
}
// ---------------------------------------------------------------------------
function addInputsToArray(lnks, ref)	{
		
	if (!lnks || !lnks.length) 	return;
	
	lnks.forEach(function( link ){

							var url = getURL(link.src, ref);
							
							var desc = '';
							if (link.hasAttribute('alt')) 
							{
								desc = trimMore(link.getAttribute('alt'));
							}
							else if (link.hasAttribute('title')) 
							{
								desc = trimMore(link.getAttribute('title'));
							}
							var cl = "";
							if (link.hasAttribute('class')) 
							{
								cl = trimMore(link.getAttribute('class'));
							}
							var v = "";
							if (link.hasAttribute('value')) 
							{
								v = trimMore(link.getAttribute('value'));
							}

							aURLs.push({
											'url': url,
											'title': desc,
											'class': cl,
											'id': (link.id ? link.id : ""),
											'value': (link.value ? link.value : ""),
											'type': "input"
										});
									
						});
}
// ---------------------------------------------------------------------------
function addEmbedsToArray(lnks, ref)	{
		
	if (!lnks || !lnks.length) 	return;
	
	lnks.forEach(function( link ){

							var url = getURL(link.src, ref);
							
							var desc = '';
							if (link.hasAttribute('alt')) 
							{
								desc = trimMore(link.getAttribute('alt'));
							}
							else if (link.hasAttribute('title')) 
							{
								desc = trimMore(link.getAttribute('title'));
							}
							var cl = "";
							if (link.hasAttribute('class')) 
							{
								cl = trimMore(link.getAttribute('class'));
							}
							var v = "";
							if (link.hasAttribute('flashvars')) 
							{
								v = trimMore(link.getAttribute('flashvars'));
							}

							aURLs.push({
											'url': url,
											'title': desc,
											'class': cl,
											'id': (link.id ? link.id : ""),
											'value': v,
											'type': "embed"
										});
									
						});
}
// ---------------------------------------------------------------------------
function addParamsToArray(lnks, ref)	{
		
	if (!lnks || !lnks.length) 	return;
	
	lnks.forEach(function( link ){

							var url ="";
							var id ="";
							var cl = "";
							var v = "";
							var name = '';
							if (link.hasAttribute('name')) 
							{
								name = trimMore(link.getAttribute('name'));
							}
							if (link.hasAttribute('value')) 
							{
								v = trimMore(link.getAttribute('value'));
							}
							
							var parent = link.parentNode;
							if ( parent)
							{
								url = parent.getAttribute('data');
								if (parent.id) id = parent.id;
							}
							
							aURLs.push({
											'url': url,
											'title': name,
											'class': cl,
											'id': id,
											'value': v,
											'type': "object"
										});
									
						});
}
// ---------------------------------------------------------------------------
function trimMore(t) {
	if (t == null) return '';
	return t.replace(/^[\s_]+|[\s_]+$/gi, '').replace(/(_){2,}/g, "_");
}
		
// ---------------------------------------------------------------------------
function getURL( url, ref) {
		
	if ( (url.toLowerCase().indexOf('javascript:') != -1) || (url.toLowerCase().indexOf('javascript :') != -1) )
	{
		url = "";
	}
	if ( (url.toLowerCase().indexOf('mailto:') != -1) || (url.toLowerCase().indexOf('mailto :') != -1) )
	{
		url = "";
	}
	if (url.indexOf("data:image") != -1)  url="";
		
		
	return url;
}

var aURLs = [];
var curHref = null;

// ================================================================================================ 
window.addEventListener("load",function( e ) {

						init()
						
					},false);
// ---------------------------------------------------------
	
	