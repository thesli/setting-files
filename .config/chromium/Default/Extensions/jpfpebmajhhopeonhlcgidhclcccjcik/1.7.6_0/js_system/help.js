$(function(){$(".click-open-extension-page").click(function(){top.location.href=chrome.extension.getURL($(this).data("url"))});var a=Math.floor(Math.random()*11);if(a%2==0){var b=true;$("#support").addClass("cake")}});