var scrollto = function (a) {
    a = $("a[name=" + a + "]").offset().top - 80;
    $("html:not(:animated),body:not(:animated)").animate({
        scrollTop: a
    }, 500, "swing");
}, getText = function (a, b) {
    if (a.substr(0, 13) == "action_custom") {
        var c = a.split("_");
        return bg.customActions[c[1]] ? bg.customActions[c[1]][c.length == 3 ? "descrip" : "title"] : "[deleted action]";
    }
    return chrome.i18n.getMessage(a.replace(/-/g, "_"), b);
}, bg = chrome.extension.getBackgroundPage(),
    optionsUpdated = function (a) {
        bg.saveOptions(bg.profile);
        a || generateOptions();
    };

document.title = getText("name") + ": " + getText("options_title");

$("body").append($("<div>").attr("id", "contents-contain").append($("<div>").attr("id", "contents").append($("<div>").attr("class", "title").text(getText("options_contents_actions"))).append($("<div>").attr("id", "contentsactions")).append($("<div>").attr("class", "title").text(getText("options_contents_settings"))).append($("<div>").attr("id", "contentssettings")).append($("<ul>")                                                                                          //  .append($('<li id="translatemess">Help <a id="translatelink" href="translate.html">Translate SG</a></li>'))
  .append($('<li id="supportmess">Find a bug? <a id="supportlink" href="https://chrome.google.com/webstore/support/lfkgmnnajiljnolcgolmmgnecgldgeld">Report it</a></li>'))))).append($('<h1 id="optionstitle"><img src="/assets/icon/48.png"/> ' + getText("name") +
    ": " + getText("options_title") + "</h1>")).append($("<div>").attr("id", "addgesture").append($("<div>").attr("id", "addgesturebutton").html("<span>+</span> " + chrome.i18n.getMessage("options_button_startaddgesture")).attr("tabindex", 0).click(function () {
    addGesture(null);
})));

bg.settings.hidePlugin == void 0 && !bg.pluginConnected() && $("#optionstitle").after($("<div>").attr("id", "note_plugin").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_plugin").remove();
    bg.settings.hidePlugin = !1;
})).append($("<p>").html(getText("setting_plugin_descrip"))).append($("<div>").attr("class", "clearall")));

$("#plugin-popup-link").click(function(event) {
  event.preventDefault();
  window.open('http://www.smoothgestures.com/installplugin.html', 'plugin', 'width=750,height=230,top=0,left=0');
});

bg.settings.sendStats == void 0 && $("#optionstitle").after($("<div>").attr("id", "note_sendStats").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_sendStats").remove();
    bg.settings.sendStats = !1;
    refreshSendStats();
    updateSendStats();
})).append($("<input>").attr("type", "button").val(getText("setting_sendstats")).css({
    "min-width": "5em",
    "font-weight": "bold",
    "float": "right",
    "margin-right": ".5em"
}).click(function () {
    $("#note_sendStats").remove();
    bg.settings.sendStats = !0;
    refreshSendStats();
    updateSendStats();
})).append($("<p>").text(getText("setting_sendstats_descrip"))).append($("<div>").attr("class", "clearall")));


bg.settings.hidePageAction == void 0 && $("#optionstitle").after($("<div>").attr("id", "note_hidePageAction").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_hidePageAction").remove();
    bg.settings.hidePageAction = !1;
    refreshHidePageAction();
    updateHidePageAction();
})).append($("<input>").attr("type", "button").val(getText("options_note_hidepageaction_button")).css({
    "min-width": "5em",
    "font-weight": "bold",
    "float": "right",
    "margin-right": ".5em"
}).click(function () {
    $("#note_hidePageAction").remove();
    bg.settings.hidePageAction = !0;
    refreshHidePageAction();
    updateHidePageAction();
})).append($("<p>").text(getText("setting_hidepageaction_descrip"))).append($("<div>").attr("class", "clearall")));


!bg.settings.hideNoteTranslate && ["en", "en-US", "en-GB"].indexOf(navigator.language) == -1 && $("#optionstitle").after($("<div>").attr("id", "note_translate").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_translate").remove();
    bg.settings.hideNoteTranslate = !0;
    bg.saveOptions(bg.profile);
})).append($("<p>").html(getText("options_note_translate", "<a href='/translate.html'>" + getText("options_note_translate_link") + "</a>"))).append($("<div>").attr("class",
    "clearall")));


bg.settings.hideNotePrint || $("#optionstitle").after($("<div>").attr("id", "note_print").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_print").remove();
    bg.settings.hideNotePrint = !0;
    bg.saveOptions(bg.profile);
})).append($("<input>").attr("type", "button").val(getText("options_note_print_button")).css({
    "min-width": "5em",
    "font-weight": "bold",
    "float": "right",
    "margin-right": ".5em"
}).click(function () {
    window.print();
})).append($("<p>").text(getText("options_note_print"))).append($("<div>").attr("class", "clearall")));



bg.settings.hideNoteWelcome || $("#optionstitle").after($("<div>").attr("id", "note_welcome").attr("class", "note clear").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_welcome").remove();
    bg.settings.hideNoteWelcome = !0;
    bg.saveOptions(bg.profile);
})).append($("<p>").text(getText("options_welcome_0")).css({
    margin: "0 0 .7em",
    "font-weight": "bold"
})).append($("<ul>").css({
    margin: "0"
}).append($("<li>").text(getText("options_welcome_1")).css({
    "margin-bottom": ".7em"
})).append($("<li>").text(getText("options_welcome_2")).css({
    "margin-bottom": ".7em"
})).append($("<li>").text(getText("options_welcome_3")).css({
    "margin-bottom": ".7em"
}))).append($("<div>").attr("class",
    "clearall")));

bg.settings.hideNoteRemindRate || $("#optionstitle").after($("<div>").attr("id", "note_remindrate").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_remindrate").remove();
    bg.settings.hideNoteRemindRate = !0;
    bg.saveOptions(bg.profile);
})).append($("<p>").html(getText("options_note_remindrate", "<a href='https://chrome.google.com/webstore/detail/lfkgmnnajiljnolcgolmmgnecgldgeld'>" + getText("options_note_remindrate_link") + "</a>"))).append($("<div>").attr("class",
    "clearall")));
if (bg.settings.showNoteUpdated) $("#optionstitle").after($("<div>").attr("id", "note_updated").attr("class", "note green").append($("<div>").attr("class", "close").attr("tabindex", 0).html("&times;").click(function () {
    $("#note_updated").remove();
})).append($("<p>").text(getText("options_note_updated", bg.extVersion))).append($("<div>").attr("class", "clearall"))), bg.settings.showNoteUpdated = !1, bg.saveOptions(bg.profile);
var generateOptions = function () {
    $("#alloptions, #contentsactions *, #contentssettings *").remove();
    var a = $("<div>").attr("id", "alloptions");
    for (cat in bg.categories) a.append(generateTable(cat));
    a.appendTo("body");
    for (gesture in bg.gestures) displayGesture(gesture);
    a.append($("<div>").attr("class", "footer").text("You have gestured approximately " + ("" + (bg.log.line ? bg.log.line.distance : 0) * 2.54E-4).substr(0, 8) + " meters."));
    refreshNewTabUrl();
    refreshNewTabRight();
    refreshNewTabLinkRight();
    refreshTrailBlock();
    refreshTrailColor();
    refreshTrailWidth();
    refreshHoldButton();
    refreshCloseLastBlock();
    refreshSelectToLink();
    refreshSendStats();
    refreshHidePageAction();
    refreshMarketingAction();
    refreshFishAction();
    refreshContextOnLink();
    refreshBlacklist();
}, generateTable = function (a) {
    var b = $("<div>").attr("class", "optiontable").attr("id", a).append($("<a>").attr("name", a)).append($("<div>").attr("class", "tabletitle").text(getText(a)));
    if (bg.categories[a].actions) {
        $("#contentsactions").append($("<div>").append($("<a href='#'>").click(function () {
            scrollto(a);
            return !1;
        }).text(getText(a))));
        var c = $("<div>");
        for (i = 0; i < bg.categories[a].actions.length; i++) {
            var d = c;
            for (g in bg.gestures) if (bg.gestures[g] == bg.categories[a].actions[i]) {
                d = b;
                break;
            }
            d.append(generateGRow(bg.categories[a].actions[i]));
        }
        c.children().length > 0 && b.append(actionGroup(chrome.i18n.getMessage("options_moreactions") + " (" + c.children().length + ")", "empty-" + a, !1, c));
    } else if (bg.categories[a].customActions) for (id in $("#contentsactions").append($("<div>").append($("<a href='#'>").click(function () {
        scrollto(a);
        return !1;
    }).text(getText(a)))), $(".tabletitle", b).append($("<div>").attr("id", "addactionbutton").html("<span>+</span> " + chrome.i18n.getMessage("options_button_addcustomaction")).attr("tabindex", 0).click(function () {
        addCustom();
    })), bg.customActions) b.append(generateCustomRow(id));
    else if (bg.categories[a].externalActions) {
        c = 0;
        b = $("<div>").attr("class", "optiontable").append($("<a>").attr("name", a));
        for (id in bg.externalActions) {
            b.append($("<div>").attr("class", "tabletitle").text(bg.externalActions[id].name));
            d = bg.externalActions[id].actions;
            for (i = 0; i < d.length; i++) b.append(generateExternalRow(id + "-" + d[i].id, d[i].title, d[i].descrip));
            c++;
        }
        if (c == 0) return null;
        else $("#contentsactions").append($("<div>").append($("<a href='#'>").click(function () {
            scrollto(a);
            return !1;
        }).text(chrome.i18n.getMessage("options_externalactions"))));
    } else bg.categories[a].settings && ($("#contentssettings").append($("<div>").append($("<a href='#'>").click(function () {
        scrollto(a);
        return !1;
    }).text(getText(a)))), b.append(settingsGroup(getText("setting_group_newtab"),
        "showNewTabSettings", $("<div>").append(rowNewTabUrl()).append(rowNewTabRight()).append(rowNewTabLinkRight()))).append(settingsGroup(getText("setting_group_trail"), "showTrailSettings", $("<div>").append(rowTrailBlock()).append(rowTrailColor()).append(rowTrailWidth()))).append(settingsGroup(getText("setting_group_context"), "showContextSettings", $("<div>").append(rowContextOnLink()))).append(settingsGroup(getText("setting_group_assorted"), "showAssortedSettings", $("<div>").append(rowCloseLastBlock()).append(rowSelectToLink()).append(rowBlacklist()))).append(rowHidePageAction()).append(rowMarketingAction()).append(rowFishAction()).append(rowSendStats()).append(rowHoldButton()).append(rowReset()).append(rowImport()));
    return b;
}, actionGroup = function (a, b, c, d) {
    return $("<div>").attr("class", "rowgroup").append($("<div>").attr("class", "actiongrouptitle").text(a).append($("<a>").attr("href", "#").text(!bg.settings["hide-" + b] ? getText("setting_group_hide") : getText("setting_group_show")).click(function () {
        bg.settings["hide-" + b] ? ($(this).text(getText("setting_group_hide")), $("#" + b + "Group").animate({
            height: "show",
            opacity: 1
        }, 200), bg.settings["hide-" + b] = !1) : ($(this).text(getText("setting_group_show")), $("#" + b + "Group").animate({
            height: "hide",
            opacity: 0
        }, 200), bg.settings["hide-" + b] = !0);
        bg.saveOptions(bg.profile);
        return !1;
    }))).append(d.attr("id", b + "Group").attr("class", "grouprows").css({
        display: !bg.settings["hide-" + b] ? "block" : "none"
    }));
}, generateGRow = function (a) {
    return $("<div>").attr("class", "actionrow").append($("<div>").attr("id", "action-" + a).attr("class", "gestureset")).append($("<div>").attr("class", "gesture-add").attr("tabindex", 0).text("+").click(function () {
        addGesture(a);
    })).append(bg.contexts[a] ? $("<img>").attr("class", "actioncontext").attr("src",
        "/assets/icon/icon-" + (bg.contexts[a] == "l" ? "link" : bg.contexts[a] == "i" ? "image" : bg.contexts[a] == "s" ? "selection" : "") + ".png") : null).append($("<div>").attr("class", "actiontitle").text(getText("action_" + a))).append($("<div>").attr("class", "actiondescrip").text(getText("descrip_" + a))).append($("<div>").attr("class", "clearall"));
}, generateExternalRow = function (a, b, c) {
    return $("<div>").attr("class", "actionrow").append($("<div>").attr("id", "action-" + a).attr("class", "gestureset")).append($("<div>").attr("class", "gesture-add").attr("tabindex",
    0).text("+").click(function () {
        addGesture(a);
    })).append($("<div>").attr("class", "actiontitle").text(b)).append($("<div>").attr("class", "actiondescrip").text(c)).append($("<div>").attr("class", "clearall"));
}, generateCustomRow = function (a) {
    return $("<div>").attr("class", "actionrow").append($("<div>").attr("id", "action-" + a).attr("class", "gestureset")).append($("<div>").attr("class", "gesture-add").attr("tabindex", 0).text("+").click(function () {
        addGesture(a);
    })).append($("<div>").attr("class", "actiontitle").text(bg.customActions[a].title).append($("<span>").attr("class",
        "editcustom").attr("tabindex", 0).text("edit").click(function () {
        editCustom(a);
    })).append($("<span>").attr("class", "delcustom").attr("tabindex", 0).html("&times;").click(function () {
        delCustom(a);
    }))).append($("<div>").attr("class", "actiondescrip").text(bg.customActions[a].descrip)).append($("<div>").attr("class", "clearall"));
}, editCustom = function (a) {
    var b = bg.customActions[a],
        c = $("#action-" + a).parent().css({
            display: "none"
        }),
        d = $("<div>").attr("class", "actionrow").attr("id", "edit-" + a).append($("<div>").attr("class",
            "savecustom").attr("tabindex", 0).text("save").click(function () {
            saveCustom(a);
        })).append($("<div>").attr("class", "undocustom").attr("tabindex", 0).text("cancel").click(function () {
            d.remove();
            c.css({
                display: "block"
            });
        })).append($("<select>").attr("class", "cxtcustom").append($("<option>").text("starting anywhere").val("")).append($("<option>").text(chrome.i18n.getMessage("context_on_link")).val("l")).append($("<option>").text(chrome.i18n.getMessage("context_on_image")).val("i")).append($("<option>").text(chrome.i18n.getMessage("context_with_selection")).val("s"))).append($("<select>").attr("class",
            "envcustom").append($("<option>").text("context").attr("disabled", "disabled")).append($("<option>").text("page").val("page")).append($("<option>").text("extension").val("ext"))).append($("<div>").attr("class", "sharecustom").append($("<input type=checkbox>").attr("id", "share-" + a).attr("checked", b.share)).append($("<label>").attr("for", "share-" + a).text("share"))).append($("<input type=text>").attr("class", "titlecustom").val(b.title)).append($("<input type=text>").attr("class", "descripcustom").val(b.descrip)).append($("<textarea>").attr("class",
            "codecustom").text(b.code)).insertAfter(c);
    $(".cxtcustom", d).val(b.context);
    $(".envcustom", d).val(b.env);
}, saveCustom = function (a) {
    var b = bg.customActions[a];
    $("#action-" + a).parent().css({
        display: "block"
    });
    var c = $("#edit-" + a);
    b.title = $(".titlecustom", c).val();
    b.descrip = $(".descripcustom", c).val();
    b.code = $(".codecustom", c).val();
    b.env = $(".envcustom", c).val();
    b.share = $("#share-" + a, c).is(":checked");
    b.context = $(".cxtcustom", c).val();
    bg.contexts[a] = b.context;
    bg.saveOptions(bg.profile);
    bg.saveCustomActions();
    generateOptions();
}, addCustom = function () {
    var a = "custom" + ("" + Math.random()).substr(2);
    bg.customActions[a] = {};
    var b = bg.customActions[a];
    b.title = "Navigate to Page";
    b.descrip = "Go to Google";
    b.code = 'location.href = "http://www.google.com";';
    b.env = "page";
    b.share = !0;
    b.context = "";
    bg.contexts[a] = b.context;
    bg.saveOptions(bg.profile);
    bg.saveCustomActions();
    generateOptions();
    editCustom(a);
}, delCustom = function (a) {
    if (confirm("Delete this custom action?")) {
        for (g in bg.gestures) bg.gestures[g] == a && removeGesture(g);
        delete bg.customActions[a];
        delete bg.contexts[a];
        bg.saveOptions(bg.profile);
        bg.saveCustomActions();
        generateOptions();
    }
}, settingsGroup = function (a, b, c) {
    return $("<div>").attr("class", "rowgroup").append($("<div>").attr("class", "settinggrouptitle").text(a).append($("<a>").attr("href", "#").text(bg.settings[b] ? getText("setting_group_hide") : getText("setting_group_show")).click(function () {
        bg.settings[b] ? (bg.settings[b] = !1, $(this).text(getText("setting_group_show")), $("#" + b + "Group").animate({
            height: "hide",
            opacity: 0
        }, 200), bg.saveOptions(bg.profile)) : (bg.settings[b] = !0, $(this).text(getText("setting_group_hide")), $("#" + b + "Group").animate({
            height: "show",
            opacity: 1
        }, 200));
        return !1;
    }))).append(c.attr("id", b + "Group").attr("class", "grouprows").css({
        display: bg.settings[b] ? "block" : "none"
    }));
}, rowReset = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<input>").attr("type", "button").val(getText("setting_button_reset")).css({
        "min-width": "5em",
        "font-weight": "bold"
    }).click(doReset))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_reset"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_reset_descrip")));
}, doReset = function () {
    if (confirm(getText("setting_warning_reset"))) bg.gestures = JSON.parse(bg.defaults["Smooth Gestures"].gestures), optionsUpdated();
}, rowImport = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<div>").attr("class", "filespoof").append($("<input>").attr("type", "file").change(doImport)).append($("<input>").attr("type",
        "button").attr("tabindex", - 1).val(getText("setting_button_import"))))).append($("<div>").attr("class", "settingcontrol").append($("<input>").attr("type", "button").val(getText("setting_button_export")).css({
        "min-width": "5em",
        "font-weight": "bold"
    }).click(function () {
        chrome.tabs.create({
            url: "/views/Smooth_Gestures_Settings.html"
        });
    }))).append($("<div>").attr("class", "settingtitle").text(getText("setting_import"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_import_descrip")));
}, htmlDecode = function (a) {
    var b = document.createElement("div");
    b.innerHTML = a.replace(/</g, "[leftangle]");
    return b.childNodes[0].nodeValue.replace(/\[leftangle\]/g, "<");
}, doImport = function () {
    var a = this;
    if (!(this.files.length <= 0)) {
        var b = new FileReader;
        b.onload = function () {
            var c = b.result,
                c = c.substring(c.indexOf("{"), c.lastIndexOf("}") + 1);
            c = htmlDecode(c);
            c = JSON.parse(c);
            a.value = "";
            if (c.title != "Smooth Gestures Settings") alert("Error Importing Settings");
            else {
                if (c.gestures) bg.gestures = c.gestures;
                for (x in c.settings) bg.settings[x] = c.settings[x];
                for (x in c.customActions) bg.customActions[x] = c.customActions[x];
                optionsUpdated();
            }
        };
        b.readAsText(this.files[0]);
    }
}, rowContextOnLink = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "contextOnLink").change(updateContextOnLink).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_force_context"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_force_context_descrip")));
}, updateContextOnLink = function () {
    bg.settings.contextOnLink = $("#contextOnLink").val() == 1;
    optionsUpdated();
}, refreshContextOnLink = function () {
    $("#contextOnLink").val(bg.settings.contextOnLink ? 1 : 0);
}, rowHoldButton = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "holdButton").change(updateHoldButton).append($("<option>").val("-1").text(getText("setting_disabled"))).append($("<option>").val("0").text(getText("setting_button_left"))).append($("<option>").val("1").text(getText("setting_button_middle"))).append($("<option>").val("2").text(getText("setting_button_right"))))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_hold_button"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_hold_button_descrip")));
}, updateHoldButton = function () {
    bg.settings.holdButton = $("#holdButton").val();
    optionsUpdated();
}, refreshHoldButton = function () {
    $("#holdButton").val(bg.settings.holdButton);
}, rowTrailColor = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<div>").attr("id", "trailColor").css({
        "float": "right",
        width: "15px",
        height: "140px",
        border: "1px solid gray"
    })).append($("<div>").css({
        width: "200px"
    })).append($("<div>").attr("id", "trailColorR").append($("<input>").attr({
        type: "range",
        min: 0,
        max: 255,
        value: bg.settings.trailColor.r
    }).change(updateTrailColor))).append($("<div>").attr("id", "trailColorG").append($("<input>").attr({
        type: "range",
        min: 0,
        max: 255,
        value: bg.settings.trailColor.g
    }).change(updateTrailColor))).append($("<div>").attr("id", "trailColorB").append($("<input>").attr({
        type: "range",
        min: 0,
        max: 255,
        value: bg.settings.trailColor.b
    }).change(updateTrailColor))).append($("<div>").attr("id",
        "trailColorA").append($("<input>").attr({
        type: "range",
        min: 0,
        max: 1,
        step: 0.01,
        value: bg.settings.trailColor.a
    }).change(updateTrailColor)))).append($("<div>").attr("class", "settingtitle").text(getText("setting_trail_color"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_trail_color_descrip"))).append($("<div>").attr("class", "clearall"));
}, updateTrailColor = function () {
    refreshTrailColor();
    window.updateOptionsTimeout && clearTimeout(window.updateOptionsTimeout);
    window.updateOptionsTimeout = setTimeout(optionsUpdated, 500);
    optionsUpdated(!0);
}, refreshTrailColor = function () {
    $("#trailColorR, #trailColorG, #trailColorB, #trailColorA").css({
        margin: "5px",
        width: "169px",
        "border-radius": "6px"
    }).children().css({
        padding: "0",
        margin: "1px 6px",
        width: "155px"
    });
    $("#trailColorR").css({
        background: "-webkit-linear-gradient(left,rgba(255,0,0,0),rgba(255,0,0,1))"
    });
    $("#trailColorG").css({
        background: "-webkit-linear-gradient(left,rgba(0,255,0,0),rgba(0,255,0,1))"
    });
    $("#trailColorB").css({
        background: "-webkit-linear-gradient(left,rgba(0,0,255,0),rgba(0,0,255,1))"
    });
    $("#trailColorA").css({
        background: "-webkit-linear-gradient(left,rgba(0,0,0,0),rgba(0,0,0,1))"
    });
    bg.settings.trailColor.r = $("#trailColorR input").val() * 1;
    bg.settings.trailColor.g = $("#trailColorG input").val() * 1;
    bg.settings.trailColor.b = $("#trailColorB input").val() * 1;
    bg.settings.trailColor.a = $("#trailColorA input").val() * 1;
    $("#trailColor").css("background-color", "rgba(" + bg.settings.trailColor.r + "," + bg.settings.trailColor.g + "," + bg.settings.trailColor.b + "," + bg.settings.trailColor.a + ")");
}, rowNewTabUrl = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "newTabUrl").change(updateNewTabUrl).append($("<option>").val("chrome://newtab/").text("New Tab page")).append($("<option>").val("homepage").text("Home page")).append($("<option>").val("custom").text("Custom page"))).append($("<input>").attr("id", "newTabUrlCustom").attr("type", "text").css({
        width: "160px",
        border: "1px solid gray",
        margin: "0 .8em"
    })).append($("<input>").attr("type",
        "button").val(getText("setting_button_update")).click(updateNewTabUrl))).append($("<div>").attr("class", "settingtitle").text(getText("setting_newtab_url"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_newtab_url_descrip"))).append($("<div>").attr("class", "clearall"));
}, updateNewTabUrl = function () {
    bg.settings.newTabUrl = $("#newTabUrl").val() != "custom" ? $("#newTabUrl").val() : $("#newTabUrlCustom").val();
    if (!bg.settings.newTabUrl.match(/:/) && bg.settings.newTabUrl.match(/\./)) bg.settings.newTabUrl =
        "http://" + bg.settings.newTabUrl;
    if (!bg.settings.newTabUrl.match(/:/) && bg.settings.newTabUrl != "homepage") bg.settings.newTabUrl = "http://www.google.com/";
    refreshNewTabUrl();
    optionsUpdated();
}, refreshNewTabUrl = function () {
    $("#newTabUrl").val(bg.settings.newTabUrl);
    $("#newTabUrl").val() != bg.settings.newTabUrl ? ($("#newTabUrl").val("custom"), $("#newTabUrlCustom").val(bg.settings.newTabUrl), $("#newTabUrlCustom, #newTabUrlCustom + input").css({
        display: ""
    })) : $("#newTabUrlCustom, #newTabUrlCustom + input").css({
        display: "none"
    });
},
rowNewTabLinkRight = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "newTabLinkRight").change(updateNewTabLinkRight).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class", "settingtitle").text(getText("setting_newtab_linkright"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_newtab_linkright_descrip")));
},
updateNewTabLinkRight = function () {
    bg.settings.newTabLinkRight = $("#newTabLinkRight").val() == 1;
    optionsUpdated();
}, refreshNewTabLinkRight = function () {
    $("#newTabLinkRight").val(bg.settings.newTabLinkRight ? 1 : 0);
}, rowNewTabRight = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "newTabRight").change(updateNewTabRight).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_newtab_right"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_newtab_right_descrip")));
}, updateNewTabRight = function () {
    bg.settings.newTabRight = $("#newTabRight").val() == 1;
    optionsUpdated();
}, refreshNewTabRight = function () {
    $("#newTabRight").val(bg.settings.newTabRight ? 1 : 0);
}, rowTrailWidth = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<div>").attr("id", "trailWidthDraw").css({
        "float": "right",
        width: "100px",
        height: "140px"
    })).append($("<div>").attr("id", "trailWidth").append($("<input>").attr({
        type: "range",
        min: 0.2,
        max: 4,
        step: 0.2,
        value: bg.settings.trailWidth
    }).css({
        padding: "0",
        margin: "0",
        width: "155px"
    }).change(updateTrailWidth)))).append($("<div>").attr("class", "settingtitle").text(getText("setting_trail_width"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_trail_width_descrip"))).append($("<div>").attr("class", "clearall"));
}, updateTrailWidth = function () {
    refreshTrailWidth();
    window.updateOptionsTimeout && clearTimeout(window.updateOptionsTimeout);
    window.updateOptionsTimeout = setTimeout(optionsUpdated, 500);
    optionsUpdated(!0);
}, refreshTrailWidth = function () {
    bg.settings.trailWidth = $("#trailWidth input").val() * 1;
    $("#trailWidthDraw").empty().append(window.SG.drawGesture("URU", 100, 140, bg.settings.trailWidth));
}, rowTrailBlock = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "trailBlock").change(updateTrailBlock).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_trail_draw"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_trail_draw_descrip")));
}, updateTrailBlock = function () {
    bg.settings.trailBlock = $("#trailBlock").val() != 1;
    optionsUpdated();
}, refreshTrailBlock = function () {
    $("#trailBlock").val(bg.settings.trailBlock ? 0 : 1);
}, rowCloseLastBlock = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "closeLastBlock").change(updateCloseLastBlock).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_closelastblock"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_closelastblock_descrip")));
}, updateCloseLastBlock = function () {
    bg.settings.closeLastBlock = $("#closeLastBlock").val() == 1;
    optionsUpdated();
}, refreshCloseLastBlock = function () {
    $("#closeLastBlock").val(bg.settings.closeLastBlock ? 1 : 0);
}, rowSelectToLink = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id",
        "selectToLink").change(updateSelectToLink).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class", "settingtitle").text(getText("setting_selecttolink"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_selecttolink_descrip")));
}, updateSelectToLink = function () {
    bg.settings.selectToLink = $("#selectToLink").val() == 1;
    optionsUpdated();
}, refreshSelectToLink = function () {
    $("#selectToLink").val(bg.settings.selectToLink ? 1 : 0);
}, rowSendStats = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "sendStats").change(updateSendStats).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class", "settingtitle").text(getText("setting_sendstats"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_sendstats_descrip")));
},
updateSendStats = function () {
    bg.settings.sendStats = $("#sendStats").val() == 1;
    bg.settings.sendStats && bg.sendStats();
    optionsUpdated();
}, refreshSendStats = function () {
    $("#sendStats").val(bg.settings.sendStats ? 1 : 0);
}, rowHidePageAction = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<select>").attr("id", "hidePageAction").change(updateHidePageAction).append($("<option>").val("1").text(getText("setting_button_on"))).append($("<option>").val("0").text(getText("setting_button_off"))))).append($("<div>").attr("class",
        "settingtitle").text(getText("setting_hidepageaction"))).append($("<div>").attr("class", "settingdescrip").text(getText("setting_hidepageaction_descrip")));
}, updateHidePageAction = function () {
    bg.settings.hidePageAction = $("#hidePageAction").val() == 0;
    optionsUpdated();
    chrome.windows.getAll({
        populate: !0
    }, function (a) {
        for (i in a) for (j in a[i].tabs) bg.refreshPageAction(a[i].tabs[j].id);
    });
}, refreshHidePageAction = function () {
    $("#hidePageAction").val(bg.settings.hidePageAction ? 0 : 1);
}, rowMarketingAction = function () {
    if (!bg.AU.support.enabled()) {
      return '';
    }
    return $("<div>").attr("class", "ad-support settingrow").append(
        $("<div>").attr("class", "settingcontrol")).append($("<div>").attr("class", "settingtitle").text("Ad Support")).append($("<div>").attr("class", "settingdescrip").text("SmoothGestures is ad supported, the application includes advertising on select domains and is transparent to you the user. If you'd prefer to disable ads, you can make a one time donation instead.")).append($('<br>')).append($('<a href="http://www.smoothgestures.com/donate">').text('Click here to disable ads.'));
}, updateMarketingAction = function () {}, refreshMarketingAction = function () {
    $("#hideMarketingAction").val(bg.AU.support.enabled() ? 1 : 0);
}, rowFishAction = function () {
    return $("<div>").attr("class",
        "settingrow").append($("<div>").attr("class", "settingcontrol")
                     .append($("<select>").attr("id", "hideFishAction").change(updateFishAction)
                     .append($("<option>").val("1").text(getText("setting_button_on")))
                     .append($("<option>").val("0").text("No, I don't like money"))))
                     .append($("<div>").attr("class", "settingtitle").text("Enable Product Search"))
                     .append($("<div>").attr("class", "settingdescrip").html('SmoothGestures has partnered with <a href="http://www.similarproducts.net">Similar Products</a> to let you instantly compare prices and see similar items while you shop. Simply hover over the "See similar" icon to activate it.'))
                     .append($("<img>").attr("src", "../assets/img/similarproducts.png").attr('style', 'width: 566px'));
}, updateFishAction = function () {
  if ($("#hideFishAction").val() == 1) {
    bg.AU.support.enableFish();
  }
  else {
    bg.AU.support.disableFish();
  }
  optionsUpdated();
}, refreshFishAction = function () {
    $("#hideFishAction").val(bg.AU.support.fishEnabled() ? 1 : 0);
}, rowBlacklist = function () {
    return $("<div>").attr("class", "settingrow").append($("<div>").attr("class", "settingcontrol").append($("<input>").attr("type", "button").val(getText("setting_button_update")).click(updateBlacklist))).append($("<div>").attr("class", "settingtitle").text(getText("setting_blacklist"))).append($("<div>").attr("class",
        "settingdescrip").text(getText("setting_blacklist_descrip"))).append($("<textarea>").attr("id", "blacklist").css({
        width: "100%",
        "margin-top": ".5em",
        height: "3em",
        border: "1px solid #999"
    }));
}, updateBlacklist = function () {
    for (var a = $("#blacklist").val().split(","), b = 0; b < a.length; b++) a[b] = a[b].trim();
    bg.settings.blacklist = a;
    optionsUpdated();
}, refreshBlacklist = function () {
    $("#blacklist").val(bg.settings.blacklist.join(", "));
}, displayGesture = function (a) {
    $("#action-" + bg.gestures[a]).append($("<div>").attr("id",
        "gesture-" + a).attr("class", "gesture").append($("<div>").attr("class", "gesture-remove").attr("tabindex", 0).html("&times;").click(function () {
        removeGesture(a);
    })).append(window.SG.drawGesture(a, 100, 100)));
}, addGesture = function (a) {
    if (!window.SG.callback) {
        var b = function (a) {
            a.preventDefault();
        };
        window.addEventListener("mousewheel", b, !1);
        document.addEventListener("keydown", b, !0);
        $("<div>").attr("class", "drawingcanvas").append($("<div>").attr("id", "canvasclose").attr("tabindex", 0).html("&times;").click(function () {
            window.SG.callback = null;
            $(".drawingcanvas").remove();
            window.removeEventListener("mousewheel", b, !1);
            document.removeEventListener("keydown", b, !0);
        })).append($("<div>").attr("class", "canvastitle").text(getText("options_addgesture_title", getText("action_" + a)))).append($("<div>").attr("id", "canvasdescrip").attr("class", "canvasdescrip").append($("<div>").text(getText("options_addgesture_instruct_1"))).append($("<ul>").css({
            margin: "0"
        }).append($("<li>").text(getText("options_addgesture_instruct_2", getText("options_mousebutton_" + bg.settings.holdButton)))).append($("<li>").text(getText("options_addgesture_instruct_3", getText("options_mousebutton_" + bg.settings.holdButton)))).append($("<li>").text(getText("options_addgesture_instruct_4"))).append($("<li>").text(getText("options_addgesture_instruct_5"))))).appendTo("body");
        var c = function (d) {
            bg.contexts[a] && (d = bg.contexts[a] + d);
            window.SG.callback = null;
            var e = function (a) {
                bg.gestures[d] && removeGesture(d);
                bg.gestures[d] = a;
                displayGesture(d);
                $(".drawingcanvas").remove();
                window.removeEventListener("mousewheel",
                b, !1);
                document.removeEventListener("keydown", b, !0);
                optionsUpdated();
            };
            $("#canvasdescrip").css("display", "none");
            $("<div>").attr("id", "nowwhat").css({
                width: "36em",
                margin: "4em auto 1em"
            }).append($("<input>").attr("type", "button").val(getText("options_button_tryagain")).css({
                "font-size": "1.1em",
                "float": "left",
                "min-width": "10em",
                "margin-left": "4em"
            }).click(function () {
                $("#nowwhat").remove();
                $("#gcanvas").remove();
                $("#canvasdescrip").css("display", "block");
                setTimeout(function () {
                    window.SG.callback = c;
                }, 0);
            })).append(a ? $("<input>").attr("type", "button").val(bg.gestures[d] ? getText("options_button_overwrite") : getText("options_button_addgesture")).css({
                "font-size": "1.1em",
                "float": "right",
                "min-width": "10em",
                "margin-right": "4em"
            }).click(function () {
                e(a);
            }) : $("<select>").css({
                "font-size": "1.1em",
                "float": "right",
                width: "14em",
                "text-align": "center",
                "margin-right": "0em"
            }).change(function () {
                e($(this).val());
            }).each(function () {
                $(this).append($("<option>").attr("disabled", "disabled").text(bg.gestures[d] ? getText("options_button_overwrite") : getText("options_button_addgesture")));
                for (cat in bg.categories) if (bg.categories[cat].actions) {
                    $(this).append($("<option>").text(":: " + getText(cat)).attr("disabled", "disabled"));
                    for (var a = 0; a < bg.categories[cat].actions.length; a++) $(this).append($("<option>").text("--- " + getText("action_" + bg.categories[cat].actions[a])).val(bg.categories[cat].actions[a]));
                } else if (bg.categories[cat].customActions) for (id in $(this).append($("<option>").text(":: Custom Actions").attr("disabled", "disabled")), bg.customActions) $(this).append($("<option>").text("--- " + bg.customActions[id].title).val(id));
            })).append($("<div>").css({
                clear: "both"
            })).appendTo(".drawingcanvas");
            bg.gestures[d] && $("#nowwhat").prepend($("<div>").css({
                "text-align": "center",
                "font-size": "1.1em",
                "margin-bottom": ".5em",
                color: "red"
            }).text(getText("options_addgesture_overwrite", getText("action_" + bg.gestures[d]))).appendTo(nowwhat));
            $(window.SG.drawGesture(d, window.innerWidth * 0.8 / 2, window.innerHeight * 0.8 / 2)).attr("id", "gcanvas").css({
                display: "block",
                margin: "0 auto"
            }).appendTo(".drawingcanvas");
        };
        window.SG.callback = c;
    }
}, removeGesture = function (a) {
    $("#gesture-" + a).remove();
    delete bg.gestures[a];
    optionsUpdated();
}, placeContents = function () {
    $("#contents").css("top", window.innerHeight <= $("#contents").height() ? 0 : window.innerHeight >= 400 + $("#contents").height() ? 200 : (window.innerHeight - $("#contents").height()) / 2);
};
placeContents();
window.addEventListener("resize", placeContents);
window.SG.setSettings(bg.settings);
generateOptions();
