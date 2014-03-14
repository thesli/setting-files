
(function(b){var c={gcalenpjmijncebpfijmoaglllgpjagf:"UA-40782729-1",dhdgffkkebhmkfjojejmpbldmpobfkfo:"UA-40861355-1",dcgolfjdmhddbdbpipnjnakbblbojcnf:"UA-40861355-1",mfdhdgbonjidekjkjmjaneanmdmpmidf:"UA-40782729-1"};
b._gaq=b._gaq||[];var a=false;var g=function(){var i=document.createElement("script");
i.type="text/javascript";i.async=true;i.src="https://ssl.google-analytics.com/ga.js";
var h=document.getElementsByTagName("script")[0];h.parentNode.insertBefore(i,h)
};var e=function(i){if(a){return}var h=c[i];if(!h){if(h===undefined){console.debug("unknown extension id: "+i)
}return}b._gaq.push(["_setAccount",h]);b._gaq.push(["_gat._anonymizeIp"]);
b._gaq.push(["_trackPageview"]);g();a=true};var d=function(j,i,k){var l=j;
var h="";if(k===true){h="Installed";l+=" <"+(i?i:"?")+">"
}else{if(k===null){h="Updated"}else{h="Removed"}}b._gaq.push(["_trackEvent","Script",h,l])
};var f=function(j,i,h){if(i===undefined){i=""}if(h===undefined){i+=" "+window.location.href;
h=""}b._gaq.push(["_trackEvent","Error",j,i+h])};Registry.register("statistics","3630.77",{init:e,tS:d,tE:f})
})(window);