$(document).ready(function(e){
	// default PDF edit as being used
	chrome.extension.sendRequest({
				type: 'check_defaults',
				key: 'ugdv_pdfEdit',
				value: true
			},
			function(response){}
		);
	if (!/^https?:\/\/docs.google.com\/viewer/.test(document.URL.toString())){
		// xls|xlsx|ods|csv|tsv|txt|tsb|rtf|sxw
		// set regex defaults
		var ugdv_valid_exp = new RegExp('^[^\\?#]+\\.(doc|docx|pdf|ppt|pps|tiff")((#|\\?).*)?$', 'i');
		var open_newTab = true;
		var docs_viewer_url = "http://docs.google.com/viewer?url=";
		var edit_pdf_url = "http://www.pdfescape.com/url/?";
		
		$("<div />")
			.addClass("ugdv_contextMenu")
			.attr('id', "ugdv_myMenu")
			.html("<ul id='ugdv_contextMenu'></ul>")
			.appendTo($("body"))
			.hide();
			
		$("<li />")
			.attr('id', "ugdv_menuItem_google_docs")
			.html("Open in Google Docs Viewer")
			.appendTo($("#ugdv_contextMenu"));
			
		$("<li />")
			.attr('id', "ugdv_menuItem_new_tab")
			.html("Open link in new tab")
			.appendTo($("#ugdv_contextMenu"));
		
		$("<li />")
			.attr('id', "ugdv_menuItem_new_window")
			.html("Open link in new window")
			.appendTo($("#ugdv_contextMenu"));
			
		$("<li />")
			.attr('id', "ugdv_menuItem_new_incognito")
			.html("Open link in new incognito window")
			.appendTo($("#ugdv_contextMenu"));
		
		$("<li />")
			.addClass("ugdv_seperator")
			.appendTo($("#ugdv_contextMenu"));

		$("<li />")
			.attr('id', "ugdv_menuItem_download_file")
			.html("Download file")
			.appendTo($("#ugdv_contextMenu"));
		
		$("<li />")
			.attr('id', "ugdv_menuItem_copy")
			.html("Copy link address")
			.appendTo($("#ugdv_contextMenu"));
		
		$("<li />")
			.attr('id', "ugdv_menuItem_editpdf")
			.html("Edit PDF File on PDFescape.com")
			.appendTo($("#ugdv_contextMenu"));
		
		chrome.extension.sendRequest({
				type: 'get_ext'
			},
			function(response) {
				var used_ext = [];
				var prefs = response.split(",");
				if (response.length > 0){					
					for (var i = 0; i < prefs.length - 1; i++){
						var pref = prefs[i].split(":");
						if (pref[1] !== "false") used_ext.push(pref[0]);
					}
					ugdv_valid_exp = new RegExp('^[^\\?#]+\\.(' + used_ext.join('|') + ')((#|\\?).*)?$', 'i');
				}
				// get new tab
				var pref = prefs[prefs.length-1].split(":");
				open_newTab = pref[1] === "false" ? false : true;
				parsePageLinks();
				
			}
		);
		
		function getParametersAsObject(url){
			var urlParams = new Object();
			var paramStr = url;
			
			// check if we are parsing a partial URL or the start of a valid url -- ensure that this reference doesn't contain the docs_viewer_url
			if (url.indexOf('http') == 0 && url.indexOf(docs_viewer_url) != 0){
				return {'url': url};
			}
			
			// check for key/value pairs
			if (url.indexOf('=') == -1){
				return {'url': url};	
			}
			
			// remove fragments from the URL
			if (url.indexOf('#') != -1){
				paramStr = url.split('#')[0];
			}
			
			// we want only the parameters
			if (paramStr.indexOf('?') != -1){
				var chunks = paramStr.split('?');
				if (chunks.length > 1)
					paramStr = paramStr.split('?')[1];
				else
					paramStr = paramStr;
			}

			// check for null
			if (paramStr != null){
				var params = paramStr.split('&');
				for (var i = 0; i < params.length; i++)	{
					var kv = params[i].split('=');
					urlParams[kv[0]] = kv[1];
				}
			} 
			return urlParams;
		}
		
		function parsePageLinks(){
			$("a").each(function(e){
				var link_href = this.href;
				// test link to see if valid
				if (ugdv_valid_exp.test(link_href)) {
					// change target to new window if option was selected on options menu
					if (open_newTab) $(this).attr('target', "_blank");
					$(this).addClass("ugdv_link");
					this.href = docs_viewer_url + link_href;
				}
			});
			
			// attach context menu
			$(".ugdv_link").contextMenu("ugdv_myMenu",
				{
					bindings: {
						'ugdv_menuItem_google_docs': function(t) {
							var target_url = $(t).attr('href');
							var parse_result = getParametersAsObject(target_url);
							parse_result['url'] = decodeURIComponent(parse_result['url']);
							// check to make sure the google docs url wasn't removed
							if (parse_result['url'].indexOf("http://docs.google.com/viewer?url=") == -1) parse_result['url'] = "http://docs.google.com/viewer?url=" + parse_result['url'];
							
							if (open_newTab){
								chrome.extension.sendRequest({
										type: 'open_tab',
										url: parse_result['url']
									},
									function(response) {}
								);
							}else{
								window.location = parse_result['url'];
							}
						},
						'ugdv_menuItem_new_tab': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							var parse_result = getParametersAsObject(target_url);
							parse_result = getParametersAsObject(decodeURIComponent(parse_result['url']));
							chrome.extension.sendRequest({
									type: 'open_tab',
									url: parse_result['url']
								},
								function(response) {}
							);
						},
						'ugdv_menuItem_new_window': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							var parse_result = getParametersAsObject(target_url);
							parse_result = getParametersAsObject(decodeURIComponent(parse_result['url']));
							chrome.extension.sendRequest({
									type: 'open_win',
									url: parse_result['url']
								},
								function(response) {}
							);
						},
						'ugdv_menuItem_new_incognito': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							var parse_result = getParametersAsObject(target_url);
							parse_result = getParametersAsObject(decodeURIComponent(parse_result['url']));
							chrome.extension.sendRequest({
									type: 'open_incognito',
									url: parse_result['url']
								},
								function(response) {}
							);
						},
						'ugdv_menuItem_download_file': function(t) {
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							var parse_result = getParametersAsObject(target_url);
							parse_result = getParametersAsObject(decodeURIComponent(parse_result['url']));
							chrome.extension.sendRequest({
									type: 'track_action',
									ref: 'download_file',
									value: 'clicked'
								},
								function(response){}
							);
							window.location.href = decodeURIComponent(parse_result['url']);
						},
						'ugdv_menuItem_copy': function (t){
							/*
								My secret to copy text with programming!
								
								Copy is restricted to input fields only. To bypass this for HTML without using Adobe Flash the following steps are needed.
								
								1. Build an input form control on the fly with css making the input difficult to see but not invisible
								2. Add text to be copied to clipboard to the form input
								3. Select the text in the form input
								4. Execute a copy command with that text
								5. Cleanup things no longer needed
								
								NOTICE: Do not hide the input with CSS or it will not be able to be focused or selected.
								
								Text should now be copied!
							*/
							var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
							var parse_result = getParametersAsObject(target_url);
							parse_result = getParametersAsObject(decodeURIComponent(parse_result['url']));
							
							$("<input/>")
								.attr('id','ugdv_input')
								.css({width:'1px', height:'1px', border:'none', backgroundColor:'#FFF', 'position':'absolute'})
								.prependTo($(t).parent())
								.val(parse_result['url'])
								.focus()
								.select();
							
							document.execCommand("copy", false, null); // copy input value
							
							chrome.extension.sendRequest({
									type: 'track_action',
									ref: 'link_copy',
									value: 'copied'
								},
								function(response){}
							);
							
							$('#ugdv_input').hide(1, function(e){$(this).remove();});
						},
						'ugdv_menuItem_editpdf': function (t, r){
							// verify that this item is available
							if (!$(r).hasClass('ugdv_disabled')){
								
								chrome.extension.sendRequest({
										type: 'track_action',
										ref: 'PDF_Edit',
										value: 'clicked'
									},
									function(response){}
								);
								
								// bound logic
								var target_url = $(t).attr('href').substring(docs_viewer_url.length, $(t).attr('href').length);
								var parse_result = getParametersAsObject(target_url);
								parse_result = getParametersAsObject(decodeURIComponent(parse_result['url']));
								chrome.extension.sendRequest({
										type: 'open_tab',
										url:   edit_pdf_url + encodeURIComponent(parse_result['url'])
									},
									function(response) {}
								);
							}
						}
					}
				}							
			);
		}
	}
});