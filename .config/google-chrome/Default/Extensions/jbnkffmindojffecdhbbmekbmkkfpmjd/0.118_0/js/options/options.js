define("foreground/model/foregroundViewManager",[],function(){"use strict";var e=Backbone.Model.extend({defaults:function(){return{views:[]}},initialize:function(){$(window).unload(function(){this.allViewsStopListening()}.bind(this))},allViewsStopListening:function(){_.each(this.get("views"),function(e){e.stopListening()})},subscribe:function(e){var t=this.get("views"),i=t.indexOf(e);-1===i&&t.push(e)},unsubscribe:function(e){var t=this.get("views"),i=t.indexOf(e);i>-1&&t.splice(i,1)}});return new e}),define("foreground/model/settings",[],function(){"use strict";return chrome.extension.getBackgroundPage().Settings}),define("foreground/view/genericForegroundView",["foreground/model/foregroundViewManager","foreground/model/settings"],function(e,t){"use strict";var i=function(t){e.subscribe(this),Backbone.View.apply(this,[t])};return _.extend(i.prototype,Backbone.View.prototype,{initializeTooltips:function(){t.get("showTooltips")&&setTimeout(function(){var e=this.$el.find("[title]");e.filter(function(){var e=!1;return($(this).hasClass("playlistTitle")||$(this).hasClass("title")||$(this).hasClass("item-title"))&&(e=this.offsetWidth===this.scrollWidth),e}).attr("title",""),e.qtip({position:{viewport:$(window),my:"top center",at:"bottom center"},style:{classes:"qtip-light qtip-shadow"}})}.bind(this))}}),i.extend=Backbone.View.extend,i}),define("text",{load:function(e){throw new Error("Dynamic load not allowed: "+e)}}),define("text!template/settings.html",[],function(){return"<div class=\"topic\">\r\n    <%= chrome.i18n.getMessage('general') %>\r\n</div>\r\n<div class=\"category\">\r\n\r\n    <ul>\r\n        <li>\r\n            <label id=\"suggestedQualitySelectLabel\" for=\"suggestedQualitySelect\">\r\n                <%= chrome.i18n.getMessage('videoQuality') %>\r\n            </label>\r\n            \r\n            <select id=\"suggestedQualitySelect\" name=\"suggestedQualitySelect\">\r\n            \r\n                <option value=\"highres\" <%= suggestedQuality === 'highres' ? 'selected' : '' %>>\r\n                    <%= chrome.i18n.getMessage('highest') %>\r\n                </option>\r\n\r\n                <option value=\"default\" <%= suggestedQuality === 'default' ? 'selected' : '' %>>\r\n                    <%= chrome.i18n.getMessage('auto') %>\r\n                </option>\r\n\r\n                <option value=\"small\" <%= suggestedQuality === 'small' ? 'selected' : '' %>>\r\n                    <%= chrome.i18n.getMessage('lowest') %>\r\n                </option>\r\n\r\n            </select>\r\n        </li>\r\n        <li>\r\n            <input type=\"checkbox\" id=\"showTooltips\" <%= showTooltips ? 'checked' : '' %>>\r\n            <label for=\"showTooltips\">\r\n                <%= chrome.i18n.getMessage('showTooltips') %>\r\n            </label>\r\n        </li>\r\n        <li>\r\n            <input type=\"checkbox\" id=\"alwaysOpenToSearch\" <%= alwaysOpenToSearch ? 'checked' : '' %> >\r\n            <label for=\"alwaysOpenToSearch\">\r\n                <%= chrome.i18n.getMessage('alwaysOpenToSearch') %>\r\n            </label>\r\n        </li>\r\n    </ul>\r\n\r\n</div>\r\n\r\n<div class=\"remindersLabel topic\">\r\n    <%= chrome.i18n.getMessage('reminders') %>\r\n</div>\r\n<div class=\"category\">\r\n    <ul>\r\n        <li>\r\n            <input type=\"checkbox\" id=\"remindClearStream\" <%= remindClearStream ? 'checked' : '' %>>\r\n            <label for=\"remindClearStream\">\r\n                <%= chrome.i18n.getMessage('remindClearStream') %>\r\n            </label>\r\n        </li>\r\n        <li>\r\n            <input type=\"checkbox\" id=\"remindDeletePlaylist\" <%= remindDeletePlaylist ? 'checked' : '' %>>\r\n            <label for=\"remindDeletePlaylist\">\r\n                <%= chrome.i18n.getMessage('remindDeletePlaylist') %>\r\n            </label>\r\n        </li>\r\n    </ul>\r\n</div>"}),define("foreground/model/player",[],function(){"use strict";return chrome.extension.getBackgroundPage().YouTubePlayer}),define("common/view/settingsView",["foreground/view/genericForegroundView","foreground/model/foregroundViewManager","text!template/settings.html","foreground/model/player","foreground/model/settings"],function(e,t,i,n,r){"use strict";var s=Backbone.Marionette.ItemView.extend({className:"settings",template:_.template(i),model:r,ui:{suggestedQualitySelect:"#suggestedQualitySelect",showTooltipsCheckbox:"#showTooltips",remindClearStreamCheckbox:"#remindClearStream",remindDeletePlaylistCheckbox:"#remindDeletePlaylist",alwaysOpenToSearchCheckbox:"#alwaysOpenToSearch"},templateHelpers:{"chrome.i18n":chrome.i18n},initialize:function(){t.subscribe(this)},doOk:function(){var e=this.ui.suggestedQualitySelect.val();r.set("suggestedQuality",e),n.setSuggestedQuality(e);var t=this.ui.remindClearStreamCheckbox.is(":checked");r.set("remindClearStream",t);var i=this.ui.remindDeletePlaylistCheckbox.is(":checked");r.set("remindDeletePlaylist",i);var s=this.ui.showTooltipsCheckbox.is(":checked");r.set("showTooltips",s),$("[title]").qtip("disable",!s);var o=this.ui.alwaysOpenToSearchCheckbox.is(":checked");r.set("alwaysOpenToSearch",o)}});return s}),define("options/options",["common/view/settingsView"],function(e){"use strict";var t=Backbone.View.extend({el:$("body"),events:{"click button.save":"save"},settingsView:new e,initialize:function(){this.$el.find("button.save").before(this.settingsView.render().el),this.$el.find("button.save").text(chrome.i18n.getMessage("save"))},save:function(){this.settingsView.doOk()}});return new t});