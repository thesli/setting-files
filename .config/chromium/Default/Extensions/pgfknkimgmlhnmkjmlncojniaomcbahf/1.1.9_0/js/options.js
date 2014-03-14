	window.addEventListener('DOMContentLoaded', function()
	{
		var pref = new preferences();

		document.title = chrome.i18n.getMessage('op_page_title');

		var localization = {'page_title' : 'op_page_header', 'page_title_settings' : 'op_page_settings', 'auto_rating_title' : 'op_autorating_title', 'auto_rating_description' : 'op_autorating_description', 'chache_period_label' : 'op_chache_title', 'save-button' : 'op_save_button', 'cancel-button' : 'op_cancel_button'};
		localization_simple_load(localization);

		var select = document.getElementById('cache_period');
		var o = select.getElementsByTagName('option');
		for (var i = 0, j = o.length; i < j; i++)
		{
			var opt = o[i];
			var txt = chrome.i18n.getMessage('op_chache_interval_' + opt.value);
			if (txt) opt.textContent = txt;
		}
	});
