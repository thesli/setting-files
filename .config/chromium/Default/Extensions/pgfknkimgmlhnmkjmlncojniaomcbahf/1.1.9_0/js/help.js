function Help(title_key, content_key)
{
	var self = this;
	this.localization = function()
	{
		localization_simple_load({'page_title':'seo_page_header'});
		localization_simple_load({'copywriter':'seo_copywriter_menu', 'sp_analyser': 'seo_sp_analyser_menu', 'sr_analyser': 'seo_sr_analyser_menu'});

		if (title_key)
		{
			var title = chrome.i18n.getMessage(title_key);
			document.title = title;

			var header = document.getElementById('help_caption');
			if (header != null) header.innerHTML = title;
		}

		if (content_key)
		{
			var content = document.getElementById('help_text');
			if (content != null) content.innerHTML = chrome.i18n.getMessage(content_key);
		}
	};

	this.init = function()
	{
		// do nothing loop
	};

	this.localization();
	this.init();
}


window.addEventListener('DOMContentLoaded', function()
{
	var title_key = '';
	var content_key = '';

	var url = document.location.href;
	if (url.indexOf('?') != -1)
	{
		var s = url.substr(url.indexOf('?') + 1);
		var params = s.split('&');
		for (var i =0, j = params.length; i < j; i++)
		{
			var pn = params[i].split('=');
			if (pn.length > 1)
			{
				switch (pn[0].toLowerCase())
				{
					case 'title':
					{
						title_key = decodeURIComponent(pn[1]);
						break;
					}

					case 'content':
					{
						content_key = decodeURIComponent(pn[1]);
						break;
					}
				}
			}
		}
	}

	var hlp = new Help(title_key, content_key);

}, false);
