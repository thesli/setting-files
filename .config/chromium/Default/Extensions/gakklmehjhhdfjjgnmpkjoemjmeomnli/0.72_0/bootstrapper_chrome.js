/*global window:false, console:true*/

//chrome
/**
 * @fileoverview
 * @suppress {missingProperties}
 */
console = console || {log:function(){}};

if(window.top === window.self){
    var xobni = xobni || {};
    xobni.sandboxed = (function(){
            //var domain = "localhost:5723";
            var domain = "sidebar.xobni.com/bin",
                xsDomainStr = "xsDomain=",
                regex = /(?:\?|\&)xsDomain\=([\w\:\.\/\-\_]+)(?:\&|$|\#)/,
                matches = null,
                failScript = null,
                script = null,
                fullUrl = null,
                protocol = "http";


            if(window.location && window.location.href){
                matches = regex.exec(window.location.href);

                if(matches && matches.length && matches.length >= 2 && matches[1] && matches[1].length){
                    domain = matches[1];
                }

                console.log("Current domain is: " + domain);
            }

            protocol = "https";

            failScript = document.createElement('script');
            failScript.innerHTML = 'var xobni = xobni || {};' +
                'xobni.failover = function(){' +
                '    var body = document.body,' +
                '        failDiv = document.createElement("div"),' +
                '        closeLink = document.createElement("a"),' +
                '        onClick = function(){' +
                '           closeLink.removeEventListener("click", onClick, false);' +
                '           failDiv.parentNode.removeChild(failDiv);' +
                '        };' +
                '   failDiv.setAttribute("style", "background: -moz-linear-gradient(top, #fff2ca, #ffdd96);background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#fff2ca), to(#ffdd96));border: solid 1px #ffd817; padding: 12px 12px 12px 12px; font: normal 12px Arial; z-index:100000;position:absolute;right:30px;top:10px;display:block;"); ' +
                '   failDiv.innerHTML = "<strong style=\'color: #d66922; font-weight: bold;\'>Smartr is currently undergoing maintenance. </strong><br /><a href=\'https://support.xobni.com/entries/20511291-maintenance-updates?page=1#post_20548068\' target=\'_blank\' style=\'color: #0066cc;\'>More details</a> &nbsp;&nbsp;"; ' +
                '   closeLink.innerHTML = " <span style=\'color: #d66922; font-weight: bold; font-size: 10px; cursor: pointer; text-decoration: underline;\'>Close</span>"; ' +
                '   closeLink.addEventListener("click", onClick, false); ' +
                '   failDiv.appendChild(closeLink); ' +
                '   body.appendChild(failDiv); ' +
           '};';
           (document.body || document.head || document.documentElement).appendChild(failScript);


            script = document.createElement('script');
            fullUrl = protocol + "://" + domain + "/xobni_insert.js";
            console.log("fullUrl: " + fullUrl);

            script.setAttribute("src", fullUrl);
            (document.body || document.head || document.documentElement).appendChild(script);


    }());

    xobni.sandboxed = null;
    xobni = null;
}