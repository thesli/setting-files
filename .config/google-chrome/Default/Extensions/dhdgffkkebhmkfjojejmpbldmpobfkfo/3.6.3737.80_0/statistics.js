
(function(b){var d=Registry.prepare();var c={gcalenpjmijncebpfijmoaglllgpjagf:"UA-40782729-1",dhdgffkkebhmkfjojejmpbldmpobfkfo:"UA-40861355-1",dcgolfjdmhddbdbpipnjnakbblbojcnf:"UA-40861355-1",mfdhdgbonjidekjkjmjaneanmdmpmidf:"UA-40782729-1"};
b._gaq=b._gaq||[];var a=false;var h=function(){var j=document.createElement("script");
j.type="text/javascript";j.async=true;j.src="https://ssl.google-analytics.com/ga.js";
var i=document.getElementsByTagName("script")[0];i.parentNode.insertBefore(j,i)
};var f=function(){var j=d.SELF.ID;if(a){return}var i=c[j];
if(!i){if(i===undefined){console.debug("unknown extension id: "+j)
}return}b._gaq.push(["_setAccount",i]);b._gaq.push(["_gat._anonymizeIp"]);
b._gaq.push(["_trackPageview"]);h();a=true};var e=function(k,j,l){var m=k;
var i="";if(l===true){i="Installed";m+=" <"+(j?j:"?")+">"
}else{if(l===null){i="Updated"}else{i="Removed"}}b._gaq.push(["_trackEvent","Script",i,m])
};var g=function(k,j,i){if(j===undefined){j=""}if(i===undefined){j+=" "+window.location.href;
i=""}b._gaq.push(["_trackEvent","Error",k,j+i])};Registry.register("statistics","3737.80",{init:f,tS:e,tE:g})
})(window);