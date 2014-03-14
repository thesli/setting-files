(function()
{ 
	var docEl = document.documentElement;

	if( docEl.hasAttribute( "__fvdSurfCanyonInserted" ) ){
		return;
	}
	docEl.setAttribute( "__fvdSurfCanyonInserted", 1 );
	
	var waitImg = "data:image/png;base64,R0lGODlhGAAYAKUAAPwmJPyWlPzOzPxeXPyytPzq7PxCRPx6fPw2NPze3PzCxPympPxubPz29PyGhPwuLPzW1PxmZPy6vPxSVPyenPzy9Pw+PPzm5PzKzPyurPz+/PyOjPxaXPwqLPzS1PxiZPy2tPzu7Px+fPw6PPzi5PzGxPyqrPx2dPz6/PyKjPwyNPza3PxqbPy+vPxWVPyipP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQICQAAACwAAAAAGAAYAAAG/kCYcAi7UCIGlcoQoVyI0OHl9ABYr9bH6RkVShDW0WGRMS0OIytC0qWETShYQkmCNUzpDgUK6gAGBUMtVi1DBQMAHSBSYAMZA4UwgwCRBRgJiAh1MCcAIwUfFhZsEoRFCgoCBWknRX4mkgYjBhICVqoKLQqBGYlGng1CLQYWLhoEICglqIF2aRQfAAdELRwvRCQYzUIHAKEAJhclJRgeGlEaBRckFxUmABYqACAcE/YTbFAJJvwmBKVK5n24N0FBFBImyvgr9cACgAUhPEhMEAeKhhAFMqJYAC/atCEYDmQgUoLCCiLdPrgZUbEECxYHUGDAoOFFgAAQhKB4duEVbgwMLxkIICFCBIkENwOcfNfhSadPKV4KgAGhaM4VN02sAtCqiLwBClJ4EFJVRE45GTxk2gSDgB9AQ1ZYNYQIAAEobjzBgREiRYoKdvAk2hPlS5gxIECcSQMAwaIuRahgwaKFC2QhRkIpsdDEMpEgACH5BAgJAAAALAAAAAAYABgAhfwmJPyWlPzOzPxeXPyytPzq7PxCRPx6fPw2NPze3PxubPzCxPympPz29PxSVPyKjPwuLPzW1PxmZPy6vPyenPzy9PxKTPyChPw+PPzm5Px2dPzKzPyurPz+/PwqLPyanPzS1PxiZPy2tPzu7PxGRPx+fPw6PPzi5PxydPzGxPyqrPz6/PxWVPyOjPwyNPza3PxqbPy+vP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+QJlwKMtQJAaXyyChZIjQYUYDAVivVojmGRVOEFbTgcHhMDQmK2LSpYRVK9mJRDrJVqq0hwIVeQADBUMpJhgLQwUDAB4iUmADIgopQgsmJpMyBBYMigh2MhoAJgUoDiyHhJcyHH8OBWkaRX8qMhsspgsgGCYgBH8ebByLRqINQim3MCsTMSsGi40yDWkUIQAHRCkKHEQfFmxDBwAhGAAqBQLpL3FQHSMF8A0qABguACIoEjAwEodQGQtiBEwxAYCSexokKISxIUqBgAMLQijHoMKLiyc6RFlRYcSICisY0LOGbQiIBzGI9PokRFwTUewEXCjRogOICCtEcFCRQMh1CmoZZskAMfNChAwBAmQ4UUaFHWEenoQa9aFEiQgyEiTtyZTDhFcAYhWxN2DDB6xZtwo5EeOFIhdcMv0JNERrgJ5CEi0iAMWNKDgyKnz4UOFOnkV8onwJM2bCBAYH0gBAEK3LlCpYrnjY0uVftXouMIRw0iUIACH5BAgJAAAALAAAAAAYABgAhfwmJPyWlPzOzPxaXPyytPzq7Px2dPw+PPze3PzCxPwyNPympPxmZPz29PyChPzW1Py6vPwuLPyenPxiZPzy9Px+fPxSVPzm5PzKzPw6PPyurPxubPz+/PyKjPwqLPzS1PxeXPy2tPzu7Px6fPxCRPzi5PzGxPw2NPyqrPxqbPz6/PyGhPza3Py+vPyipP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAb+wJdw+LpIGCSFgsSQXIjQ4cUQAViv1ojhGRVCTtbMaKHRLEYZ6wnSlYRRquJgUHg1UGmPBBryAEB1QhgWFhhDBSAAHiFSYCAtDoYvg4VeAxqJJyVCBgAZBSspKYaUhiEkBxMFaQZFfigvAqKjLIQPECQZJAkvKIpGng2CGykjHAkJKhYHJC1CDWkSEwAjRAIVbEMuj0QjABMHACgFD+UIHFEqJhAhEAi+BwoAISsV9hUCUb5XCgQASvM6VBhh70MUf1cy+FMQDgUFBBAvoIPC4QEGExgKwJtWbQgLCSaIIDDBRYi3CW4yxHnxIEAAFxxYnMOAjIuKaBdevWDhMgBnAo3jCiBLUMeXhyedPmlwyaIICg1PhCYQsApAqyLyQHzQgEDIBRQouBQQUCLTJiEE/ACSArYkIisEoLjxBOcFhRAEhKnAo2hPlC9hxkCAcCYNgBOMuhShggWLhy2KiRgBpySVky5BAAAh+QQICQAAACwAAAAAGAAYAIX8JiT8lpT8Xlz8zsz8QkT86uz8srT8enz8NjT8bmz83tz8wsT8UlT89vT8pqT8joz8Liz8ZmT81tT8urz8Skz88vT8goT8Pjz8dnT85uT8ysz8Wlz8/vz8rqz8Kiz8npz8YmT80tT87uz8trT8fnz8Ojz8cnT84uT8xsT8VlT8+vz8qqz8kpT8MjT8amz82tz8vrz8Tkz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCZcCjLfCKEVosQ+WSI0GEGAwFYr1YI5hkVThDW0sFhMDgwJSti0v2EVypZwZQoyFSrtOcDHXkAAnZCIREuIUMFAgAeI1JgAigBEoMuEYcyCwkjiggnQhgAJQUBJBaHhIYyMCkMGAVpGEV/KzISFqUhCoUKC6wpKDIdi0ahDUK2JA8cGhoqEQy/Qg1pHyAAB0QSLAtEHQnAQwcAIBcAKyIK6SccUcsLMAsnKwAXLQAjHywB+pNQBiUAS1AwAEAJgAn59gV4EWXChRIPKYwoWM5BgwwnMhRgB0XFiwEDQohwQM8atiEnRlwS8uCCASLiQLgpEUeGghUrRnDIkEEFeYFFHaRRyzBLxokOKzpkEPGuwoQ/jGTM8/AElCgYST2JgGfHDwAGrwDEKmJPwAsYXAq8E+FlQwdOnoQY+BNoyNYFguQoAvCSyIc/JeDIaIAChTE8evhEGQEm1JgJExwcSAMAQaMuRahgwaKFC2YhRiLUa3FBpmciQQAAIfkECAkAAAAsAAAAABgAGACF/CYk/JaU/M7M/F5c/LK0/Ors/EJE/HZ0/DY0/Kak/N7c/MLE/Pb0/Gps/IKE/C4s/J6c/NbU/Lq8/GZk/PL0/FJU/H58/D48/K6s/Obk/MrM/P78/Cos/Jqc/NLU/GJk/La0/O7s/Hp8/Do8/Kqs/OLk/MbE/Pr8/G5s/IaE/DI0/KKk/Nrc/L68/FZU////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7Al3D4ykAmBpXKMIFkiNBh5vAAWK/Wx+EZFUoQ1pEoQSAkRCMrQtKFhEmnVyiVKrxOpDQHAgVxAAN2QhEWFhFDBQMAHCBSYAMCCSxCLCIWky8aFi2KCCVCBwAjBSQBAZOEhi8mDQ11aQdFfyQvCqanJYUlGq0NHi8ki0aiDJSmKxseHhsiDSgCQgxpEB8AIkQKCdBDIA7bQiIAHxcAJBQZJRkFcVDJJu8ZwRcqABIYJPgkClESFf4VAwgAUFKPwL17n6As+AcQxEByCRgUmBhiQ5QTCpRFCCGv2jVEJvYN6VCBzZBwH9yMYJdhwQINJxIkOOFihIFGL6QBcDLrRWwBlwsKaLCiYYEBm2wwCHsRapQAl3ZaWGnxooWBCx8KwBKSgd6AEgIESQVA9cWCBgQUqeDygsCfQEPGlvWpiAMBKG5EwXlRYsSIJwzyLOLDD4yoMWXOpAGAAGeXKVWwXNHCtgvXI/NUYHXSJQgAIfkECAkAAAAsAAAAABgAGACF/CYk/JaU/M7M/F5c/LK0/Ors/EJE/Hp8/DY0/N7c/MLE/Kak/HJ0/Pb0/FJU/I6M/C4s/NbU/GZk/Lq8/J6c/PL0/IKE/D48/Obk/MrM/K6s/P78/Fpc/Cos/Jqc/NLU/GJk/La0/O7s/E5M/H58/Do8/OLk/MbE/Kqs/HZ0/Pr8/FZU/JKU/DI0/Nrc/Gps/L68////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABv7AmHAYw1AkhlbLIKFgiNAhJgUBWK9WSOoZFU4Q1tJhQSAsDiUrYtKlhFGqWMXjqcQaqHSHAg11AAMFQwkBLAlDBQMAHSFSYAMREyZChAGHMR8BJ4oIkzEpACUFExookwksljECFiQBBWkpRX8oRaUaJhiFGB8WBxYRMRqLRqENQialIRsuLhsPJBYfQg1pFCAAB0QYE8FDCizeQgcAIBcAKA0F6yIbURsRAvIFKAAXLQATJzAK/FxECl5IEMggBAAl+U706ycISgaBEiSkMAjhHBwRGCvEgaLCRDMXFRbYw6ZtCIELD4gsAKGACLkmoTZq+GNAhQYNKl44WAFDiHQKaxhoxfCzaMKHCxcEnFixs+WwDk9AiXKwqJGCEiVOxFjqIAUsALKK4BuAgkPPrVi1xshwYIKiFv8I/An07UJWRIo6EIBC4U8JOEVGjHiiIs8iPlFCgAk1JkSIM2kAIGjUpQgVLFg6bKm87ci9FhdAOOkSBAAh+QQICQAAACwAAAAAGAAYAIX8JiT8lpT8zsz8Xlz8srT86uz8enz8QkT8NjT8pqT83tz8wsT8bmz8+vz8hoT8Liz8npz81tT8ZmT8urz88vT8UlT8Pjz8rqz85uT8ysz8joz8Kiz8mpz80tT8YmT8trT87uz8fnz8Ojz8qqz84uT8xsT8dnT8/vz8ioz8MjT8oqT82tz8amz8vrz8VlT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/sCXcPjCQCSHVOoggWCI0CHG9ABYr9aH6RkVThBWkSHx+SRMIiti0oWER40X5XKhvBqj9AYC/WwAAwVSFyNcLwUDABsfUmADChmCRSOFQisJAokIJEImACIFAgsLghiUTxEBASMFaSZFfyOHCy2kBSMXBSuqASsvF4pGn3GzCyUnJCQnKqq+d2AQHgAGRAUZnEMCCc5CIQAeFgAjChMfE8dRDQoR7LcAFikABPFXslACIfkhDh8ASvJprhCI0iGfgRAo+qUIxypDiQwRiBFpgEGBRQoj3kmjNmRCBQ5ECBjIQMTANzciiH04IMJFgwkTGhhgwaKEkAZpnMR6MYHlaYEFESpUiCCAJguSwDY88QQK3IEWLzIIJVmUhYNWAF4ViTeAAIsFQqRWIPlCgIYFiVIYIvAn0BCxZA8l2jCQCIQ/IuDI9SAIjx4+UT6A+TSmTAIDAREw6lKEChYsWgwxLnIE3kIPTroEAQAh+QQICQAAACwAAAAAGAAYAIX8JiT8lpT8zsz8Xlz8srT86uz8QkT8enz8NjT83tz8wsT8pqT89vT8dnT8Tkz8ioz8Liz81tT8ZmT8urz8npz88vT8goT8Pjz85uT8ysz8rqz8/vz8VlT8Kiz8mpz80tT8YmT8trT87uz8Skz8fnz8Ojz84uT8xsT8qqz8+vz8UlT8joz8MjT82tz8amz8vrz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG/kCYcAjDUCQGFssgoWCI0CGmAQFYr1ZI4xkVThDW0mERCi0OJSti0qWEUSkY46RgwFKodIcCDXUAAwVDBQovIoMDAB0hUmADCyOMMCIvCoIwJhMRiQgmQg0AJQUOihqTlYIJGigTBWkNRX8oMBNVHQQVCgoVJqsaTyiKRqF2MH4dBhsYBSkhKBqed2kUIAAHRBMjHkQRE1xCBwAgFwAoJoUKGXFQGyYJ7yILABcsAAQjJfkXBFERAf8BPEwAoARAiBEX9LGB0gJgwIEQyC0QIUDAhxbriKQoYKIjA3kXql0bokDCAiIvHnwgEg6EmxLrXnBQ4SKFrhQrSFgQIITBdDQMsmAomMnhRAsXElpEsECCxEoNwmCAEtVARVEYHyS4WPmBqQdXAGAVqTdgwoEMQj4gXQkjAoUMiVh8I/An0BC1EtjCKJDIHhQKf0rAmdSgwSE8aQDwiRICTKgxZc4kRiCpy5QqWK5o+dZFiJFxSkI66RIEADs=";
	
	const SUGGESTIONS_SOURCE = "google"; // sc or google

	const EXTENSION_NAME = "FVD Downloader";
	
    var partner = { 
        partnerCode: 'fvdcrvd', 
        authCode: 'vkm78923'
    };     
	
    var _xhr = [];    
    
    function _cancelAllXHR(){
    	_xhr.forEach(function( x ){
    		x.abort();
    	});
    	
    	_xhr = [];
    }
    
	function getGooglePageType(){
		
		var searchIn = document.location.href;
		if( document.location.hash ){
			searchIn = document.location.hash;
		}
		
		var m = searchIn.match(/tbm=([^&]+)/i);
		
		if( !m ){
			
			m = document.location.host.match(/^(.+?)\.google\./i);
			if(!m ||  m[1].toLowerCase() == "www" ){
				
				if( document.location.pathname == "/" || document.location.pathname == "/search" || document.location.pathname == "/webhp" ){
					return "text";	
				}
								
				return document.location.pathname.substr(1);					
							
			}
			else{				
				return m[1];
			}

		}
		
		return m[1];
		
	}
    
    function getSuggestions( query, callback ){
    	
    	if( SUGGESTIONS_SOURCE == "google" ){
    		_getGoogleSuggestions( query, callback );
    	}
    	else if( SUGGESTIONS_SOURCE == "sc" ){
    		_getSCSuggestions( query, callback );
    	}
    	
    }
    
    
    
    function _getSCSuggestions( queryTerms, callback ){
        	
        $.get(document.location.protocol + '//' + partner.authCode + '.surfcanyon.com/queryReformulation', 
                    {"partner": partner.partnerCode,
                     "authCode": partner.authCode,
                     "format": "json",
                     "q": escape(queryTerms.replace(/( |<|>)/g, '+'))}, function(data)
        {  
        	
        	try{
				var related_terms = data['data'];
	            if(related_terms == null || related_terms.length == 0) {
	                related_terms = [{
	                	search: queryTerms,
	                	display: queryTerms
	                }];
	            }
	            else{            	
	            	for( var i = 0; i != related_terms.length; i++ ){
	            		related_terms[i] = {
	            			search: queryTerms + ' ' + related_terms[i],	            			
	            			display: related_terms[i]
	            		};
	            	}
	            }
        	}
        	catch( ex ){
   
        	}
        	
        	callback( related_terms );
        	  
        });	

    }
	
		
	function _escapeRegExp(str) {
		return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
	}

	function _getGoogleSuggestions( query, callback ){
		
		_cancelAllXHR();
		
		var url = "http://google.com/complete/search?output=toolbar&q="+encodeURIComponent(query);
		
		//console.log("Check refinements: " + url + "\n");
		
        var ajax = new XMLHttpRequest();
        ajax.open('GET', url, true);

		_xhr.push( ajax );

        ajax.onload = function(){				
			
			var index = _xhr.indexOf( ajax );
			if( index != -1 ){
				_xhr.splice( index, 1 );
			}
				
			var r = ajax.responseXML;
			if( r ){
				var data = [];
				
				var elems = r.getElementsByTagName( "suggestion" );
				for( var i = 0; i != elems.length; i++ ){
					if( elems[i].getAttribute("data") == query ){
						continue;
					}
					
					var suggestion = elems[i].getAttribute("data");
					suggestion = suggestion.replace( new RegExp( "^" + _escapeRegExp(query) + "\\b" ), "" ).trim();
					//suggestion = suggestion.replace( query, "" );
												
					data.push( {
						search: elems[i].getAttribute("data"),
						display: suggestion
					} );
				}	
				
				data = data.slice( 0, 3 );			
				
				callback( data );					
			}
			
		}
		
		ajax.onerror = function(){
			var index = _xhr.indexOf( ajax );
			if( index != -1 ){
				_xhr.splice( index, 1 );
			}
			
			//console.log("!!!ERROR");
			//console.log( ajax.responseXML );
			//console.log( ajax.responseText );				
		}
		
        ajax.send(null);
		
	}

	function getBoolPref( name, callback ){
		
		if( name == "add_search_refinements" ){
					
			chrome.extension.sendMessage({
				action: "isSurfCanyonEnabled"
			}, function( result ){				
				callback( result );
			});
			
		}
		else{
			callback( true );
		}
		
	}
	function getStringPref( name, callback ){
		callback( "" );
	}
	
    var add_search_refinements_to_google = function(queryTerms)
    {
        add_search_refinements(queryTerms, "google", function($related_search_results)
        {
            var google_results = $("#res ol li");
            $(google_results[0]).before($related_search_results);
        }, "em");
    };

	function waitForElement( selector, maxTimeout, callback, _elapsed ){
		var startTime = new Date().getTime();
		var interval = setInterval(function _check(){
			
			var now = new Date().getTime();
			
			var cleanUp = false;
			
			if( $(selector).length != 0 ){
				cleanUp = true;				
			}
			else if( now - startTime > maxTimeout ){
				cleanUp = true;
			}
			
			if( cleanUp ){
				callback( $(selector) );	
				clearInterval(interval);
			}			
			
		}, 500);
	}

    var add_search_refinements_to_yahoo = function(queryTerms)
    {
        add_search_refinements(queryTerms, "yahoo", function($related_search_results)
        {

        	new waitForElement( $("#web > ol li"), 2000, function(){
	            var yahoo_results = $("#web > ol li");
	 			            
	            $(yahoo_results[0]).before($related_search_results);
        	} );        	      	

        }, "b");
    };

    var add_search_refinements_to_bing = function(queryTerms)
    {
        add_search_refinements(queryTerms, "bing", function($related_search_results)
        {        	
			new waitForElement( $("#b_results li,#results li"), 2000, function(){
	            var bing_results = $("#b_results li,#results li");
	            $(bing_results[0]).before($related_search_results);
        	} );     
        	 
        }, "strong");
    };

	function buildSuggestionUrl( num, term ){
		var url = 'http://search.surfcanyon.com/search?f=nrl' + num + 
        	'&q=' + term.search + '&p=' + partner.partnerCode;
        	
        return url;
	}

    var add_search_refinements = function(unsafe_queryTerms, search_engine_name, add_div, bold_tag)
    {
        var escapeHTML = function(str) {
            return str.replace(/[&"<>]/g, function(m) {
                return "&" + ({"&": "amp", '"': "quot", "<": "lt", ">": "gt" })[m] + ";"
            });
        };
        var queryTerms = escapeHTML(unsafe_queryTerms);
        if($("#scTopOfPageRefinementLinks").length == 0)
        {   
            if(/Chrome/.test(navigator.userAgent)) {
                partner.uiLabel = EXTENSION_NAME + ' Refinements';
            }
            getSuggestions( queryTerms, function(related_terms)
            {            	
                
                if($("#scTopOfPageRefinementLinks").length != 0)
                {
                    return;
                }
                var $refinements = $('<div id="scTopOfPageRefinementLinks" style="margin-top: 7px; margin-bottom: 7px;" partner="'+partner.partnerCode+'" sctoppos="1">' + 
                '<font size=-1><span class="refinementResultsContainer"></span>&nbsp;<font size =-1 color=green>' + partner.uiLabel +
                ' <a id="disableRefinements" href="#" style="text-decoration: none;color: green;">[x]</a> </font></font></div>');
                for(var i = 0; i < related_terms.length; i++) {
                	                	
                	var link = $('<a>').attr('href', buildSuggestionUrl( i, related_terms[i] ) )
                                            .text(related_terms[i].display);
                                            
                    link.attr("title", related_terms[i].search);
                    
                	var linkContainer = $("<span>");
                	linkContainer.append( link );
                	
                	if( search_engine_name == "google" ){
                		var arrowContainer = $("<div>").addClass("action-menu ab_ctl");
                		var arrow = $("<a>").addClass("clickable-dropdown-arrow ab_button");
                		arrow.append( $("<span>").addClass("mn-dwn-arw") );
                		
                		arrowContainer.append(arrow);
                		
                		linkContainer.append(arrowContainer);
                		
                		(function(arrowContainer, term){
                			
	                		arrow.click(function(){
	                			
	                			arrowContainer.find(".action-menu-panel").remove();
	                			
	                			var menu = $("<div>").addClass("action-menu-panel ab_dropdown").css({
	                				visibility: "inherit"
	                			});
	                			
	                			var img = $("<img>");
	                			img.attr("src", waitImg).css({
	                				margin: "10px"
	                			});
	                			
	                			menu.append( img );
	                			
	                			getSuggestions( term.search, function( suggestions ){
	                				
		                			menu.empty();
		                		
		                			suggestions.splice( 0, 0, term );
		                				
		                			var ul = $("<ul>");
		                			
		                			suggestions.forEach(function( s, i ){
		                				
			                			var li = $("<li>").addClass("action-menu-item ab_dropdownitem");
			                			var a = $("<a>").addClass("fl");		                					                			
			                			a.attr("href", buildSuggestionUrl( i, s ));
			                			
			                			a.text( s.search );		                				
		                				
										li.append( a );
			                			ul.append( li );
		                				
		                			});		                			
		                			
		                			menu.append( ul );	
	                				
	                			} );	                 			

	                			arrowContainer.append( menu );
	                			
	                			setTimeout(function(){	                				
									$(document).one( "mouseup", function(){
										setTimeout(function(){
											menu.remove();
										}, 0);		                					                				
		                			} );	                				
	                			}, 0);	                			
	                			
	                		});
                			
                		})(arrowContainer, related_terms[i]);

                	}
                	
                    $refinements.find('.refinementResultsContainer')
                        .append(linkContainer);
                    $refinements.find('.refinementResultsContainer')
                        .append($('<span> &nbsp;</span>'));
                }
                if($refinements.find(".refinementResultsContainer a").length == 0)
                {
                    return;
                }
                add_div($refinements);
                //$refinements.find("#disableRefinements").click(function(event)

                $('#disableRefinements').bind('click', function(e) //ddg uses innerHTML :/
                {
					chrome.extension.sendMessage({	action: "RefinementsDisabled"
													}, function( result ){	
												});
					location.reload(); 
                	//alert( "You can Enable or Disable Refinements in Tools > Extensions > "+EXTENSION_NAME+" Options" );
                	e.preventDefault();
                });
 
            }, 'json');
        } 
    };

    var do_add_search_refinements = function()
    {        
        var googleURLRegExp = new RegExp("^http(?:|s)://(?:www|encrypted).google.(?:com|ca|co.uk|com.au|co.in|co.id|com.ph)/(?:(?:search\\?|webhp\\?|#)(?:.*&)?q=([^&=]*)(.*)$)?");
        var match = googleURLRegExp.exec(document.location.href);

        if(match)
        {
        	
        	var __prevGoogleQuery = "";
        	
            getBoolPref("add_search_refinements", function(pref_value)
            {
                if(pref_value) {
                	
                	$(window).bind("hashchange", function(){
                		console.log("Hash change");
                		$("#scTopOfPageRefinementLinks").empty();
                		$("#res ol").data("are_refinements_already_inserted", false);
                	});
                	
                    var try_insert_google = function()
                    {
                           
                        var match = googleURLRegExp.exec(document.location.href); //url can change   
                                                                                
                        var matchForHash = null;                            
                        if( document.location.hash ){
                        	matchForHash = document.location.hash.match( /q=([^?&]+)/ );
                        }       
                        
                        if( !matchForHash ){
                        	var queryTerms = match[1];	
                        }
                        else{                            	
                        	var queryTerms = matchForHash[1];
                        }
                        
                        if( !queryTerms ){
                        	return;
                        }
                        
                        queryTerms = decodeURIComponent(queryTerms).replace(/\+/g, " ").split("#")[0];
                                       
                        if( __prevGoogleQuery && __prevGoogleQuery != queryTerms ){
                        	$("#scTopOfPageRefinementLinks").empty();
                        	$("#res ol").data("are_refinements_already_inserted", false);
                        }

                        if($("#res ol li").length > 0 
                            //&& $("#scTopOfPageRefinementLinks").length == 0
                            && !$("#res ol").data("are_refinements_already_inserted"))
                        { 
                        	$("#scTopOfPageRefinementLinks").remove();
                        	                         
                            if( getGooglePageType() == "text" ){
                            	$("#res ol").data("are_refinements_already_inserted", true);
                          
                            	__prevGoogleQuery = queryTerms;
                            	// show only for text search
                            	add_search_refinements_to_google(queryTerms);	
                            }
                        }
                        else{
         
                        }
                    };
                    try_insert_google();
                    window.setInterval(try_insert_google, 1000);
                }
            });
        }


        var yahooURLRegExp = new RegExp("^http://search.yahoo.com/search[^?]*\\?(?:.*&)?p=([^&=]*)(.*)$");
        match = yahooURLRegExp.exec(document.location.href);
        if(match)
        {
            queryTerms = decodeURIComponent(match[1]).replace(/\+/g, " ");
            getBoolPref("add_search_refinements", function(pref_value)
            {
                if(pref_value) {
                    add_search_refinements_to_yahoo(queryTerms);
                }
            });
        }
        
        var bingURLRegExp = new RegExp("^http://www.bing.com/search[^?]*\\?(?:.*&)?q=([^&=]*)(.*)$");
        match = bingURLRegExp.exec(document.location.href);
        if(match)
        {        	
            queryTerms = decodeURIComponent(match[1]).replace(/\+/g, " ");
            getBoolPref("add_search_refinements", function(pref_value)
            {
                if(pref_value) {
                    add_search_refinements_to_bing(queryTerms);
                }
            });
        }
    };


    do_add_search_refinements();  
}());