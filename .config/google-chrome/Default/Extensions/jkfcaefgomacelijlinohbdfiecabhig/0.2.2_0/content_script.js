// Copyright 2011 - ilyas Stéphane Türkben

var storyContentHandler = function(idx) {
	if (!this.getAttribute("id") && !$(this).hasClass("fbplaylisted")) {
		$(this).addClass('fbplaylisted');
		var storyId = 'storyContent-' + idx;
		this.setAttribute("id", storyId);
		var v = $("#" + storyId + " a.uiVideoThumb");
		if (v.length > 0) {
			var th = this;
			var videoClickHandler = function(e) {
				var closeHandler = function() {
					$(th).remove();
				}
				$(th).css("margin", "20px");
				$("#fbplaylist").css("display", "block");
				$('<a class="gapat" style="display:inline-block; color:red; background-color:black; width:32px; height:24px; text-align:center; vertical-align:middle;position: absolute;top: -10px;right: 10px;" title="close" href="#">X</a>').appendTo(th);
				$(th).css("margin-bottom", "20px");
				$(th).css("width", "410px");
				var parent = $(th).get(0).parentElement;
				$(th).appendTo("#fbplaylist");
				parent.parentElement.removeChild(parent);
				$("#" + storyId + " .gapat").click(closeHandler);
			};
			v.click(videoClickHandler);
		}
	}
};

var timelineUnitContainerHandler = function(idx) {
	if (this.getAttribute("id") && !$(this).hasClass("fbplaylisted")) {
		$(this).addClass('fbplaylisted');
		var storyId = this.getAttribute("id");
		var v = $("#" + storyId + " a._1xv._1xy._1xx");
		if (v.length > 0) {
			var th = this;
			var videoClickHandler = function(e) {
				var closeHandler = function() {
					$(th).remove();
				}
				$(th).css("margin", "20px");
				$("#fbplaylist").css("display", "block");
				$('<a class="gapat" style="display:inline-block; color:red; background-color:black; width:32px; height:24px; text-align:center; vertical-align:middle;position: absolute;top: -10px;right: 10px;" title="close" href="#">X</a>').appendTo(th);
				$(th).css("margin-bottom", "20px");
				$(th).css("width", "410px");
				var parent = $(th).get(0).parentElement;
				$(th).appendTo("#fbplaylist");
				parent.parentElement.removeChild(parent);
				$("#" + storyId + " .gapat").click(closeHandler);
			};
			v.click(videoClickHandler);
		}
	}
};

var doIt = function() {
	$('#contentArea .storyContent').each(storyContentHandler);
	$('#contentArea .timelineUnitContainer').each(timelineUnitContainerHandler);
}
$(function() {
	doIt();
	$("#globalContainer").bind('DOMSubtreeModified', doIt);
	document.body.insertAdjacentHTML("afterBegin", '<div id="fbplaylist" style="display:none; background-color:white; position:fixed; right:0px; z-index:99999; max-height:800px;overflow-y:auto;"></div>');
});

