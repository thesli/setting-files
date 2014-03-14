/**
 * 
 */

var extPath = chrome.extension.getURL("");
var gItems = $('');
var timer = null;

function injectCssFile(file, document){
	var style = document.createElement("link");
	style.type = "text/css";
	style.rel = "stylesheet";
	style.href = file;
	document.getElementsByTagName("head")[0].appendChild(style);
}

function previewEnter(e){
	var p = $('.zFrameDiv', this);
	var iframe = $('iframe', p);
	if( iframe.attr('src') == ''){
		iframe.attr('src', iframe.attr('href'));
	}
	p.show();
//	this.style.borderColor = "lightgreen";
	$('.zMagIcon', this).css('border-color', 'lightgreen');
}

function previewLeave(e){
	var p = $('.zFrameDiv', this);
	p.hide();
	$('.zMagIcon', this).css('border-color', 'white');
}

function processForum(){
	var iconHtml = '<span class="zPreview"><img class="zMagIcon" src="' + extPath + 'images/preview16.png"></span>';
	function previewHtml(href){
		return '<span class="zPreview" style="float: left;"><img class="zMagIcon" src="' + extPath + 'images/preview16.png">' +
			'<div class="zFrameDiv"><iframe src="" href="'+href+'" height="100%" width="'+ (window.innerWidth - 110) +'px" scrolling="yes" frameborder="1" sandbox></iframe></div>' +
			'</span>';
	}

	$('a[href^="showthread.php?t="]').each(function(){
		if(this.childElementCount) return;		// True for lastpost & newpost of thread
//		var p = $(iconHtml).insertBefore(this);
//		p.append(previewHtml(this.href));
		var p = $(previewHtml(this.href)).insertBefore(this);
		p.mouseenter(previewEnter).mouseleave(previewLeave);
		
	});
}

function init(){
	if(location.href.indexOf('forumdisplay.php') > 0 ){
		injectCssFile(extPath + 'preview.css', document);
		processForum();
	}
}


init();