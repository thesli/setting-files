/*
 * ContextMenu - jQuery plugin for right-click context menus
 *
 * Author: Mike Corrigan
 * Parts of this plugin are inspired by Chris Domigan & Dan G. Switzer, II
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 * Version: r2
 * Date: 25 June 2010
 */

(function($) {
	var menu, shadow, trigger, content, hash, currentTarget;
	var defaults = {
		menuStyle: {
			fontFamily: 'Arial, Helvetica, sans-serif',
			listStyle: 'none',
			padding: '2px',
			margin: '0px',
			fontSize: '12px',
			backgroundColor: '#f1f1f1',
			border: '1px solid #979797',
			width: '300px',
			textAlign: 'left',
			backgroundImage: 'url(' + chrome.extension.getURL('images/menu/left_base.png') + ')',
			backgroundRepeat: "repeat-y"
		},
		itemStyle: {
			margin: '0px',
			color: '#000',
			display: 'block',
			cursor: 'default',
			padding: '3px',
			paddingLeft: '31px',
			border: '1px solid transparent',
			backgroundColor: 'transparent',
			backgroundImage: 'none'
		},
		disabledItemStyle: {
			margin: '0px',
			color: '#666',
			display: 'block',
			cursor: 'default',
			padding: '3px',
			paddingLeft: '31px',
			border: '1px solid transparent',
			backgroundColor: 'transparent',
			backgroundImage: 'none'
		},
		seperatorStyle: {
			margin: '0px',
			display: 'block',
			padding:"3px 0 3px 0",
			marginLeft: '28px',
			backgroundColor: 'transparent',
			backgroundImage: 'url(' + chrome.extension.getURL('images/menu/seperator_v.png') + ')',
			backgroundRepeat: "repeat-x"
		},
		itemHoverStyle: {
			border: '1px solid #a8d8eb',
			backgroundColor: '#e3eff4',
			backgroundImage: 'url(' + chrome.extension.getURL('images/menu/item_hl.png') + ')',
			backgroundRepeat: "repeat-x",
			'-webkit-border-radius':'3px'
		},
		eventPosX: 'pageX',
		eventPosY: 'pageY',
		shadow : true,
		onContextMenu: null,
		onShowMenu: null
 	};

	$.fn.contextMenu = function(id, options) {
		if (!menu) {                                      // Create singleton menu
			menu = $('<div id="ugdv_jqContextMenu"></div>')
				.hide()
				.css({position:'absolute', zIndex:'9999'})
				.appendTo('body')
				.bind('click', function(e) {
					e.stopPropagation();
				})
				.bind('contextmenu', function(e){
					return false;
				});
    	}
		if (!shadow) {
			shadow = $('<div></div>')
				.css({backgroundColor:'#000',position:'absolute',opacity:0.2,zIndex:9998})
				.appendTo('body')
				.hide();
		}
		hash = hash || [];
		hash.push({
			id : id,
			menuStyle: $.extend({}, defaults.menuStyle, options.menuStyle || {}),
			itemStyle: $.extend({}, defaults.itemStyle, options.itemStyle || {}),
			seperatorStyle: $.extend({}, defaults.seperatorStyle, options.seperatorStyle || {}),
			itemHoverStyle: $.extend({}, defaults.itemHoverStyle, options.itemHoverStyle || {}),
			disabledItemStyle: $.extend({}, defaults.disabledItemStyle, options.disabledItemStyle || {}),
			bindings: options.bindings || {},
			shadow: options.shadow || options.shadow === false ? options.shadow : defaults.shadow,
			onContextMenu: options.onContextMenu || defaults.onContextMenu,
			onShowMenu: options.onShowMenu || defaults.onShowMenu,
			eventPosX: options.eventPosX || defaults.eventPosX,
			eventPosY: options.eventPosY || defaults.eventPosY
		});

		var index = hash.length - 1;
		$(this).bind('contextmenu', function(e) {
			// Check if onContextMenu() defined
			var bShowContext = (!!hash[index].onContextMenu) ? hash[index].onContextMenu(e) : true;
			if (bShowContext) display(index, this, e, options);
				return false;
			});
			return this;
		};
		
		function display(index, trig, e, options) {
			trigger = trig;
			var cur = hash[index];
			content = $('#'+cur.id).find('ul:first').clone(true); // clone 
			content.css(cur.menuStyle).find('li').each(function(e){
				if ($(this).hasClass("ugdv_seperator")){
					$(this).css(cur.seperatorStyle);
				}else{
					if ($(this).hasClass('ugdv_disabled')){	
						$(this).css(cur.disabledItemStyle);
					}else{
						$(this).css(cur.itemStyle);
					}
					$(this).hover(
						function() {
							$(this).css(cur.itemHoverStyle);
						},
						function(){
							if ($(this).hasClass('ugdv_disabled')){
								$(this).css(cur.disabledItemStyle);
							}else{
								$(this).css(cur.itemStyle);
							}
						}
					)
				}
			});
			// determine if this is a pdf file - to see if we should show the PDF link
			var pdf_regex = new RegExp('^[^\\?#]+\\.("pdf")((#|\\?).*)?$', 'i');
			
			// attempt to get regex to find pdf
			// alert(pdf_regex.test(trigger.href));
			
			// simple test for .pdf
			if (trigger.href.toLowerCase().indexOf('.pdf') != -1){
				$('ul#' + content.attr('id') + ' li#ugdv_menuItem_editpdf').removeClass('ugdv_disabled');
				$('ul#' + content.attr('id') + ' li#ugdv_menuItem_editpdf').css(cur.itemStyle);
			}else{
				$('ul#' + content.attr('id') + ' li#ugdv_menuItem_editpdf').addClass('ugdv_disabled');
				$('ul#' + content.attr('id') + ' li#ugdv_menuItem_editpdf').css(cur.disabledItemStyle);
			}
			
			// determine if the user has turned off the edit on PDFEscape.com function
			chrome.extension.sendRequest({
					type: 'get',
					key:  'ugdv_pdfEdit'
				},
				function(response) {
					if (response == "true"){
						// show altogether
						$('ul#' + content.attr('id') + ' li#ugdv_menuItem_editpdf').show();
					}else{
						// hide altogether
						$('ul#' + content.attr('id') + ' li#ugdv_menuItem_editpdf').hide();
					}
					// because we have modified the list height, we should update the shadow height
					if (cur.shadow) {
						shadow.css({
							width:menu.width(),
							height:menu.height(),
							left:posX + 2,
							top:posY + 2
						})
					}
				}
			);
			
			
		// Send the content to the menu
		menu.html(content);

		// if there's an onShowMenu, run it now -- must run after content has been added
		if (!!cur.onShowMenu) menu = cur.onShowMenu(e, menu);
		
		$.each(cur.bindings, function(id, func) {
			$('#'+id, menu).bind('click', function(e) {
				if (!$(this).hasClass('ugdv_disabled')){
					hide();	
				}
				func(trigger, this);
			});
		});
		
		// check for window borders
		var posX = e.pageX;
		var posY = e.pageY;
		var windowWidth = $(window).width() + $(window).scrollLeft();
		if(windowWidth < posX + menu.outerWidth()) posX -= menu.outerWidth();
		var windowHeight = $(window).height() + $(window).scrollTop();
		if(windowHeight < posY + menu.outerHeight()) posY -= menu.outerHeight();
		
		menu.css({left:posX,top:posY}).fadeIn("fast");
		if (cur.shadow) {
			shadow.css({
				width:menu.width(),
				height:menu.height(),
				left:posX + 2,
				top:posY + 2
			})
			.fadeIn("fast");
		}
		$(document).one('click', hide);
	}
	
	function hide() {
		menu.hide();
		shadow.hide();
	}
	
	// Apply defaults
	$.contextMenu = {
		defaults : function(userDefaults) {
			$.each(userDefaults, function(i, val) {
				if (typeof val == 'object' && defaults[i]) {
					$.extend(defaults[i], val);
				}
				else defaults[i] = val;
			});
		}
	};

})(jQuery);

$(function() {
	$('div.ugdv_contextMenu').hide();
});