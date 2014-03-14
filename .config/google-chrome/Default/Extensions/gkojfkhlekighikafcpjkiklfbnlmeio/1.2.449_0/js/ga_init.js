/* LICENSE_CODE ZON */
'use strict'; /*jslint browser:true, es5:true*/
require(['ga_proxy.js'], function(ga_proxy){
    var conf = window.conf;
    function ga_init(account)
    {
	window._gaq = window._gaq||new window.GaProxy('ga_proxy_server.html',
	    conf.url_bext+'/ga.js', null, 1000);
	window._gaq.push(['_setAccount', account||'UA-41964537-8'],
	    ['_setDomainName', 'none'], ['_trackPageview']);
	var prev_onerror = window.onerror;
	window.onerror = function(message, file, line){
	    window._gaq.push(['_trackEvent', 'Error',
		file+':'+line+'\n'+message]);
	    if (prev_onerror)
		prev_onerror(message, file, line);
	};
    }

    var s = document.getElementsByClassName('_hola_ga_account');
    if (s.length)
	ga_init(s[0].getAttribute('ga_account'));
});
