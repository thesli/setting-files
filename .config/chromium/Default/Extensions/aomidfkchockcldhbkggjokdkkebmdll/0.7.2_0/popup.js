var RPATH = chrome.extension.getBackgroundPage().RPATH;

chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tab)
{
	var currentTab = tab[0];

	var tabInformation = RPATH.getTab(currentTab.id);

	//RPATH.copyTabPath(currentTab.id);

	RPATH.log('PATH FOR CURRENT TAB '+currentTab.id, tabInformation);

	$(document).ready(function() {
		// Bind, first.
		if (tabInformation)
		{
			$('.pathContainer').on("click", ".pathItem", function()
			{
				RPATH.log($(this));

				if ($('.pathResponseHeaders', this).not(':visible').length > 0)
				{
					$('.pathItem').removeClass('expanded');
					$(this).addClass('expanded');
					$('.pathResponseHeaders').hide('fast');
					$('.pathResponseHeaders', this).show('fast');
				}
			});

			$(tabInformation.path).each(function(idx, val)
			{
				var template = $('.template').clone();


				template.find('h2').html(val.url);

				var pageType = val.type;

				if (pageType == 'redirect')
				{
					var redirectType = 'Temporary';
					if (val.statusCode == 301)
					{
						redirectType = 'Permanent';
					}

					template.find('h3').html(val.statusCode+': '+redirectType+' redirect to '+val.redirectUrl);
					template.addClass('redirect');
				}
				else if (val.statusCode == 404)
				{
					template.find('h3').html(val.statusCode+': This page is NOT FOUND');
					template.addClass('notfound');
				}
				else if (val.statusCode == 503)
				{
					// Search the headers for a retry-after.
					var retryAfter = '';
					if (typeof(val.responseHeaders) != 'undefined')
					{
						$(val.responseHeaders).each(function(idx, val) {
							if (val.name == 'Retry-After')
							{
								retryAfter = ' Retry after '+val.value+' seconds.';
							}
						});
					}

					template.find('h3').html(val.statusCode+': Page temporarily unavailable.'+retryAfter);
					template.addClass('error');
				}
				else if (val.statusCode >= 500)
				{
					template.find('h3').html(val.statusCode+': '+val.statusLine);
					template.addClass('error');
				}
				else if (val.statusCode >= 400)
				{
					template.find('h3').html(val.statusCode+': '+val.statusLine);
					template.addClass('notfound');
				}
				else if (val.statusCode >= 200)
				{
					template.find('h3').html(val.statusCode+': '+val.statusLine);
				}
				else
				{
					template.find('h3').remove(); // Nope. Chuck Testa.
				}


				var responseTemplate = template.find('.pathResponseHeaders li').clone();
				template.find('.pathResponseHeaders li').remove();


				// Add the IP first.
				var ipResponseTemplate = responseTemplate.clone();

				ipResponseTemplate.find('.responseKey').html('Server IP Address');
				ipResponseTemplate.find('.responseValue').html(val.ip);
				ipResponseTemplate.appendTo(template.find('.pathResponseHeaders'));


				if (typeof(val.responseHeaders) != 'undefined')
				{
					$(val.responseHeaders).each(function(idx, val) {

						// Strip cookie data from the response headers, unless this is a redirect.
						if (val.name != 'Set-Cookie' && pageType != 'redirect')
						{
							var thisResponseTemplate = responseTemplate.clone();

							thisResponseTemplate.find('.responseKey').html(val.name);
							thisResponseTemplate.find('.responseValue').html(val.value);

							thisResponseTemplate.appendTo(template.find('.pathResponseHeaders'));
						}
					});
				}

				template.removeClass('template').appendTo('.pathContainer');
			});
		}
		else
		{
			var template = $('.template').clone();

			template.find('h2').html('Sorry, there is currently no information available for this tab.');
			template.find('h3').html('Please load a URL to gather information on your path.');
			template.addClass('error');

			template.removeClass('template').appendTo('.pathContainer');
		}

		var outLink = $('#ayimaOutLink').attr('href');
		outLink = outLink.replace('[CURRENT_VERSION]', chrome.app.getDetails().version);
		$('#ayimaOutLink').attr('href', outLink);

		if (typeof(localStorage.showRecruitmentBanner) == 'undefined' || localStorage.showRecruitmentBanner === true)
		{
			$('.recruitment').show();
		}

		$('#hiderecruitement').on('click', function(e)
		{
			localStorage.showRecruitmentBanner = false;
			$('.recruitment').hide();

			e.preventDefault();
		});

		$('.banner').on('click', function(e)
		{
			chrome.tabs.create({'url': "http://www.ayima.com/bethebest/?utm_source=redirectpath&utm_medium=ayimalabs&utm_campaign=recruitment-banner"});
		});

		//localStorage['showRecruitmentBanner'] = false;

		$('#closewindow').on('click', function() { window.close(); self.close(); });
	});
});


