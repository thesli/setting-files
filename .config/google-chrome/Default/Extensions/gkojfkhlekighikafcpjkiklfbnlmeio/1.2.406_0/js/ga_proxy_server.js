/* LICENSE_CODE ZON */
'use strict'; /*jslint browser:true, es5:true*/
var _gaq = _gaq || [];
(function(){
    var get_params = function(){
	var params = {};
	if (location.search) {
	    var parts = location.search.slice(1).split('&');
	    for (var i in parts)
	    {
		var part = parts[i];
		var pair = part.split('=');
		pair[0] = decodeURIComponent(pair[0]);
		pair[1] = decodeURIComponent(pair[1]);
		params[pair[0]] = (pair[1] !== 'undefined') ?
		    pair[1] : true;
	    }
	}
	return params;
    };
    var conf = top.conf;
    /* XXX dmitry: we encode the path twice since a bug in firefox that does
     * not opens the frame when ':' is a part of encoded uri */
    var src = decodeURIComponent(get_params().ga_path ||
	'https://ssl-google-analytics.com/ga.js');
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.src = src;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    window.addEventListener('load', function(){
	window.addEventListener('message', function(event){
	    try {
		var data = JSON.parse(event.data);
		if (!data.ga_proxy)
		    return;
		for (var i = 0; i < data.queue.length; i++)
		{
		    var row = data.queue[i];
		    var j;
		    for (j=0; j<row.length; j++)
			_gaq.push(row[j]);
		}
	    }
	    catch (e){}
	}, false);
    });
})();
