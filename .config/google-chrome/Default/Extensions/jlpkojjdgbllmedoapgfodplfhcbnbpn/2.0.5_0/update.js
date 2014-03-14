(function() {

    /*
     * Track pageview
     */
    chrome.runtime.sendMessage({
        action:	'trackPageview',
        page:	'update.html'
    });

    /*
     * Locale
     */
    var elements = document.getElementsByTagName('*');
    for (var i=0, ilen=elements.length; i<ilen; i++) {
        var element = elements[i];
        if (element && element.dataset && element.dataset.message) {
            element.innerHTML = chrome.i18n.getMessage(element.dataset.message);
        }
    }

    /*
     * Links
     */
    var links = document.getElementsByTagName('a');
    for (var i= 0, ilen=links.length; i<ilen; i++) {
        var link = links[i];
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.open(this.href);
            // track link click
            chrome.runtime.sendMessage(
                {
                    action:	'trackEvent',
                    args:	['Link', 'click', this.href]
                }
            );
        }, false);
    }

	/*
	 * Sidebox width
	 */
	if (window.outerWidth < 1300) {
		document.querySelector('.sidebox').classList.add('small');
	}

    /*
     * Header
     */
	var h1 = document.querySelector('h1');
	var headerText = '';

	if (location.hash === '#install') {
		headerText = chrome.i18n.getMessage('updatePageHeaderInstall');
	}
	else {
    	headerText = chrome.i18n.getMessage('updatePageHeader', chrome.runtime.getManifest().version);
	}

	h1.innerHTML = headerText;

	/*
	 * No show checkbox
	 */

	var noShowField = document.getElementById('noshow_checkbox');

	// change
	noShowField.addEventListener('change', function(e) {

		// do not show
		if (this.checked) {

			console.log('disabling update tab');

			// save setting
			chrome.storage.sync.set({
				'hide_update_tab': true
			});

			// send tracking after the setting is saved so it is sent
			chrome.runtime.sendMessage(
				{
					action:	'trackEvent',
					args:	['Settings', 'HideUpdateTab', '1']
				}
			);

		}
		else {

			console.log('enabling update tab');

			// save setting
			chrome.storage.sync.set({
				'hide_update_tab': false
			});

			// send tracking after the setting is saved so it is sent
			chrome.runtime.sendMessage(
				{
					action:	'trackEvent',
					args:	['Settings', 'HideUpdateTab', '0']
				}
			);

		}

	});

})();