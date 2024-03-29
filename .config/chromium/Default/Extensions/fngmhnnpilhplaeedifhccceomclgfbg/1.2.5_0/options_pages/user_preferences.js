$(document).ready(function () {
    $("input:checkbox, input:text, select").uniform();
    setOptions();
    setEvents()
});
updateCallback = function () {
    setOptions()
};

function setOptions() {
    $("#saveMaxDateButton").button().hide();
    $("#maxDateType").buttonset();
    $(":checkbox", "#options-box").removeAttr("checked");
    $("#AN_showADSStatus").prop("checked", AN_status.showADS);
    if (AN_status.showADS) {
        $("#donation_heart").show();
        $("#donation_heart_broken").hide();
        $(".charityMessage").removeClass("benefit-unmatched");
        $("#unicefImage").css("opacity", "1")
    } else {
        $("#donation_heart").hide();
        $("#donation_heart_broken").show();
        $(".charityMessage").addClass("benefit-unmatched");
        $("#unicefImage").css("opacity", "0.5")
    }
    $("#justDelete").prop("checked", preferences.justDelete);
    $("#showAlerts").prop("checked", preferences.showAlerts);
    $("#showDomain").prop("checked", preferences.showDomain);
    $("#showContextMenu").prop("checked", preferences.showContextMenu);
    
    if(isChristmasDate) {
		$("#showChristmasIcon").prop('checked', preferences.showChristmasIcon);
	} else {
		$("#showChristmasIcon").closest(".formLine").hide();
	}
	
    $("#refreshAfterSubmit").prop("checked", preferences.refreshAfterSubmit);
    $("#skipCacheRefresh").prop("checked", preferences.skipCacheRefresh);
    $("#skipCacheRefresh").prop("disabled", !preferences.refreshAfterSubmit);
    if (!preferences.refreshAfterSubmit) {
        $("#skipCacheRefreshLabel").addClass("disabled")
    } else {
        $("#skipCacheRefreshLabel").removeClass("disabled")
    }
    $("#useCustomLocale").prop("checked", preferences.useCustomLocale);
    $("#customLocale").empty();
    $("#customLocale").prop("disabled", !preferences.useCustomLocale);
    var a = $("#customLocale");
    existingLocales = chrome.i18n.getExistingLocales();
    for (var b = 0; b < existingLocales.length; b++) {
        $("#customLocale").append($("<option>").attr("value", existingLocales[b].code).prop("selected", (existingLocales[b].code == preferences.customLocale)).text(existingLocales[b].name))
    }
    $("#useMaxDate").prop("checked", preferences.useMaxCookieAge);
    $("#maxDate").prop("disabled", !preferences.useMaxCookieAge);
    if (!preferences.useMaxCookieAge) {
        $("#maxDateLabel").addClass("disabled");
        $("#maxDateType").buttonset("disable");
        $("#saveMaxDateButton").button("disable")
    } else {
        $("#maxDateLabel").removeClass("disabled");
        $("#maxDateType").buttonset("enable");
        $("#saveMaxDateButton").button("enable")
    }
    $("#maxDate").val(preferences.maxCookieAge);
    $("input:radio", ".radioMaxDate").prop("checked", false);
    $("input:radio[value='" + preferences.maxCookieAgeType + "']").prop("checked", true);
    $("#maxDateType").buttonset("refresh");
    $("option[value='" + preferences.copyCookiesType + "']").prop("selected", true);
    $.uniform.update()
}

function setEvents() {
    $("#AN_showADSStatus").click(function () {
        AN_status.showADS = $("#AN_showADSStatus").prop("checked");
        setOptions()
    });
    $("#donationsMadeTitle").click(function () {
        $("#donationsMadeDetails").toggle("slide", {
            direction: "left"
        })
    });
    $("#showAlerts").click(function () {
        preferences.showAlerts = $("#showAlerts").prop("checked")
    });
    $("#showDomain").click(function () {
        preferences.showDomain = $("#showDomain").prop("checked")
    });
    $("#refreshAfterSubmit").click(function () {
        preferences.refreshAfterSubmit = $("#refreshAfterSubmit").prop("checked");
        $("#skipCacheRefresh").prop("disabled", !preferences.refreshAfterSubmit);
        if (preferences.refreshAfterSubmit) {
            $("#skipCacheRefreshLabel").removeClass("disabled")
        } else {
            $("#skipCacheRefreshLabel").addClass("disabled")
        }
        $.uniform.update()
    });
    $("#skipCacheRefresh").click(function () {
        preferences.skipCacheRefresh = $("#skipCacheRefresh").prop("checked")
    });
    $("#encodeCookieValue").click(function () {
        preferences.encodeCookieValue = $("#encodeCookieValue").prop("checked")
    });
    $("#showContextMenu").click(function () {
        preferences.showContextMenu = $("#showContextMenu").prop("checked")
    });
    $("#showChristmasIcon").click(function () {
        preferences.showChristmasIcon = $("#showChristmasIcon").prop("checked")
    });
    $("#useMaxDate").click(function () {
        updateMaxDate()
    });
    $("#maxDateType").click(function () {
        $("#saveMaxDateButton:hidden").fadeIn()
    });
    $("#maxDate").keydown(function (b) {
        var a;
        if (!b) {
            var b = window.event
        }
        if (b.keyCode) {
            a = b.keyCode
        } else {
            if (b.which) {
                a = b.which
            }
        } if (a == 46 || a == 8 || a == 9 || a == 27 || a == 13 || (a == 65 && b.ctrlKey === true) || (a >= 35 && a <= 39)) {
            return
        } else {
            if (b.shiftKey || (a < 48 || a > 57) && (a < 96 || a > 105)) {
                b.preventDefault()
            }
        }
    });
    $("#maxDate").bind("keyup blur", function (a) {
        $("#saveMaxDateButton:hidden").fadeIn()
    });
    $("#saveMaxDateButton").click(function (a) {
        $("#saveMaxDateButton").fadeOut(function () {
            $("#shortenProgress").fadeIn(function () {
                updateMaxDate(true)
            })
        })
    });
    $("#useCustomLocale").click(function () {
        preferences.useCustomLocale = $("#useCustomLocale").prop("checked");
        top.location.reload()
    });
    $("#customLocale").change(function () {
        preferences.customLocale = $("#customLocale").val();
        top.location.reload()
    });
    $("#copyCookiesType").change(function () {
        preferences.copyCookiesType = $("#copyCookiesType").val()
    })
}
var totalCookies;
var cookiesShortened;

function updateMaxDate(a) {
    var b = $("#useMaxDate").prop("checked");
    $("#useMaxDate").prop("checked", b);
    $("#maxDate").prop("disabled", !b);
    if (!b) {
        $("#maxDateLabel").addClass("disabled");
        $("#maxDateType").buttonset("disable");
        $("#saveMaxDateButton").button("disable").fadeOut();
        $("#saveMaxDateButton:visible").fadeOut()
    } else {
        $("#maxDateLabel").removeClass("disabled");
        $("#maxDateType").buttonset("enable");
        $("#saveMaxDateButton").button("enable");
        if (!a) {
            $("#saveMaxDateButton:hidden").fadeIn()
        }
    } if (!b || a) {
        preferences.useMaxCookieAge = b
    }
    if (a == undefined || a == false) {
        return
    }
    preferences.maxCookieAgeType = $("input:radio[name='radioMaxDate']:checked").val();
    tmp_maxCookieAge = parseInt($("#maxDate").val());
    if (!(typeof tmp_maxCookieAge === "number" && tmp_maxCookieAge % 1 == 0)) {
        $("#maxDate").val(1);
        tmp_maxCookieAge = 1
    }
    preferences.maxCookieAge = tmp_maxCookieAge;
    chrome.cookies.getAll({}, function (c) {
        totalCookies = c.length;
        cookiesShortened = 0;
        $("span", "#shortenProgress").text("0 / " + totalCookies);
        shortenCookies(c, setOptions)
    })
}

function shortenCookies(d, e) {
    if (d.length <= 0) {
        data.nCookiesShortened += cookiesShortened;
        $("#shortenProgress").fadeOut(function () {
            if (e != undefined) {
                e()
            }
        });
        return
    }
    $("span", "#shortenProgress").text((totalCookies - d.length) + " / " + totalCookies);
    var b = d.pop();
    var a = Math.round((new Date).getTime() / 1000) + (preferences.maxCookieAge * preferences.maxCookieAgeType);
    if (b.expirationDate != undefined && b.expirationDate > a) {
        console.log("Shortening life of cookie '" + b.name + "' from '" + b.expirationDate + "' to '" + a + "'");
        var c = cookieForCreationFromFullCookie(b);
        if (!b.session) {
            c.expirationDate = a
        }
        chrome.cookies.set(c, function () {
            shortenCookies(d, e)
        });
        cookiesShortened++
    } else {
        shortenCookies(d, e)
    }
};
