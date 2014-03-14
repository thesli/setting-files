function pref(name,value)
{
    if (name.indexOf("default-of-")>0)
    {
        autopagerPref[name.substr(name.indexOf("default-of-")+11)] = value
    }
    try{
        delete autopagerPref.getLocalStorage()[name]        
    }catch(e){}
}
pref("autopager.default-of-enabled", true);
pref("autopager.default-of-debug", false);
pref("autopager.default-of-showpagehold", false);
pref("autopager.default-of-myname", "");
pref("autopager.default-of-smartenable", false);
pref("autopager.default-of-smartexactlymatch", true);
pref("autopager.default-of-smartmaxsize", "2");
pref("autopager.default-of-smarttext", "next|>|下一页|次を表示");
//refer to http://www.teesoft.info/phpbb/viewtopic.php?t=330 fro "NEXT" in Different Languages
pref("autopager.default-of-discoverytext", "navbar|right_arrow|pagN|page|pages|paging|下页|次页|Volgende|Volg|Verder|Напред|Следва|Næste|Nächste|Naechste|Weiter|Vorwärts|Vorwaerts|Volgende|Continue|Onward|Venonta|Seuraava|Suivant|Prochaine|Επόμενη|Næst|Successive|Successiva|Successivo|Prossima|Prossime|Prossimo|Altra|Altro|次へ|다음|Neste|Dalej|Następna|Następne|Następny|Więcej|Próximo|Înainte|Înaintare|Următor|Următoare|След|Следующая|Siguiente|Próxima|Próximos|Nästa|Sonraki|Devam|İlerle");
pref("autopager.default-of-smartlinks", "2");
pref("autopager.default-of-smartMargin", "1");
pref("autopager.default-of-alwaysEnableJavaScript", true);

pref("autopager.default-of-enablehotkeys.ctrlkey", true);
pref("autopager.default-of-enablehotkeys.altkey", true);
pref("autopager.default-of-enablehotkeys.shiftkey", false);
pref("autopager.default-of-loading", "position: fixed; z-index: 2147483647; font-size: 12px; bottom: 1px; max-width:200px;max-height:20px;right: 20px;padding: 1px; background: green none repeat scroll 0%; display:none;");
pref("autopager.default-of-optionstyle", "line-height:normal;width:200px;position: fixed; z-index: 2147483647; font-size: 12px; bottom: 1px; right: 20px;padding: 1px; background: green none repeat scroll 0%; display:none;text-align:left !important;");

pref("autopager.default-of-pagebreak", "clear:both; line-height:20px; background:#E6E6E6; text-align:center;margin-top:20px;margin-bottom:20px;");
pref("autopager.default-of-timeout", "120");
pref("autopager.default-of-lazyload", "1000");
pref("autopager.default-of-update", "48");
pref("autopager.default-of-settingupdatedate", "");
pref("autopager.default-of-noprompt", true);
pref("autopager.default-of-modalprompt", true);
pref("autopager.default-of-disable-by-default", false);
//pref("extensions.autopager@mozilla.org.description", "chrome://autopager/locale/autopager.properties");
pref("autopager.default-of-hide-status", false);
pref("autopager.default-of-hide-toolbar-icon", false);
pref("autopager.default-of-hide-context-menu", false);

pref("autopager.default-of-loadingDelayMiliseconds", "100");
pref("autopager.default-of-show-help", false);
pref("autopager.default-of-miniheight", "0.5");
pref("autopager.default-of-defaultheight", "1");
pref("autopager.default-of-minipages", "1");
pref("autopager.default-of-simulateMouseDown",false);
pref("autopager.default-of-show-workshop-in-sidebar",true);
pref("autopager.default-of-tweaking-workshop-result-style",false);
pref("autopager.default-of-show-nav-up",true);
pref("autopager.default-of-show-nav-down",true);
pref("autopager.default-of-show-nav-top",true);
pref("autopager.default-of-show-nav-bottom",true);
pref("autopager.default-of-tweaking-session",true);
pref("autopager.default-of-show-rulecount",true);
pref("autopager.default-of-include-unsafe-rules",false);
pref("autopager.default-of-mini-window-width", "200");
pref("autopager.default-of-mini-window-height", "100");
pref("autopager.default-of-set-x-autopager-httphead", false);
pref("autopager.default-of-ignore-format-version-check", false);
pref("autopager.default-of-anti-anti-autopager", false);
pref("autopager.default-of-work-in-lite-mode", false);
pref("autopager.default-of-with-lite-rules", true);
pref("autopager.default-of-with-lite-discovery", true);
pref("autopager.default-of-hide-lite-discovery-on-no-rules", true);
pref("autopager.default-of-ids", "");
pref("autopager.default-of-with-lite-recommended-rules", true);
pref("autopager.default-of-with-lite-discovery-aways-display", false);
pref("autopager.default-of-lite-discovery-prompted", false);
pref("autopager.default-of-repository-site","http://ap.teesoft.info/");
pref("autopager.default-of-immedialate-load-count","3");
pref("autopager.default-of-show-nav-immedialate-load",true);
pref("autopager.default-of-related-search-discover-url","http://www.google.com/complete/search?client=firefox&q={query}");
pref("autopager.default-of-related-search-prompted",false);
pref("autopager.default-of-related-search-enabled",false);
//pref("autopager.default-of-keywordXPath","//input[@name='q']/@value ||| //input[@id='kw' or @name='wd']/@value ||| substring-before(//head/title/text(),'-') ||| //head/title/text()");
//pref("autopager.default-of-searchs",'{"surfcanyon":{"l":"Personal Search","u":"http://autopager.surfcanyon.com/search?f=nrl{num}&q={query}","i":"http://autopager.surfcanyon.com/favicon.ico", "d":"http://fbt62709.surfcanyon.com/queryReformulation?partner=autopager&authCode=fbt62709&q={query}","r":true},"google":{"l":"Google Search","u":"http://www.google.com/cse?cx=partner-pub-5288402605907671:4200508932&ie=UTF-8&q={query}","i":"http://www.google.com/favicon.ico","r":false},"bingsearch":{"l":"Bing Search","u":"http://www.bing.com/search?q={query}&qs=n","i":"http://www.bing.com/favicon.ico","r":false},"wiki":{"l":"Wikipedia","u":"http://en.wikipedia.org/wiki/{query}","i":"http://en.wikipedia.org/favicon.ico","r":false}}');
pref("autopager.default-of-show-rate",true);