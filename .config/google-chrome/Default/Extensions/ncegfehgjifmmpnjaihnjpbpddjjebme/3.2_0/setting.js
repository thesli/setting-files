$(function(){
	chrome.runtime.getBackgroundPage(function(bg){
		bg.checkSettingWindow();
	});
    createSettingListener();
    loadSetting();
    initForm();
});

function createSettingListener() {
    // listener for reflesh forms
    chrome.runtime.onConnect.addListener(function(port){
        if (port.name == "chromeTouch.updateSettingForm") {
            port.onMessage.removeListener(handleUpdateForm);
            port.onMessage.addListener(handleUpdateForm);
        }
    });
}

function handleUpdateForm(detail){
    updateForm(detail.key, detail.value);
}

function loadSetting() {
    var form = document.forms[0];
    var defaults = {
        switchTouchMode: 1,
        switchTouchModeKeys: "Ctrl+Shift+C",
        switchTouchModeEasyKey: '{"ctrlKey":true,"altKey":false,"shiftKey":true,"keyCode":67}',
        hideIcon: 0,
        touchMode: 2,
        useButton: 1,
        dragSpeed: 3,
        dragDirection: 1,
        glideDistance: 3,
        glideFactor: 3,
        featureBounce: 1,
        featureNoScrollbar: 0,
        featureNoScrollbarUseKeyboard: 1,
        featureNoScrollbarUseMousewheel: 1,
        featureMousegesture: 0,
        featureMousegestureReverseBackForward: 0
    };
    for (var key in defaults) {
        var value = localStorage.getItem(key);
        if (value === null || typeof value === "undefined") {
            value = defaults[key];
        }
        updateForm(key, value);
    }
}

function updateForm(key, value) {
    var element = document.getElementById(key + "_" + value);
    if (!element) {
        element = document.getElementById(key);
    }
    if (!element) {
        return;
    }
    if (element.type == "radio") {
        element.checked = true;
    } else if (element.type == "checkbox" && value == element.value) {
        element.checked = true;
    } else if (element.type == "text") {
        element.value = value;
    }
}

function updateSetting(key, value) {
    var port = chrome.runtime.connect({name: "chromeTouch.updateSetting"});
    var data = {
        key: key,
        value: value
    };
    port.postMessage(data);
}

function initForm() {
    // Add handlers for input tags.
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
            inputs[i].addEventListener("click", function(){
                var key = this.name;
                updateSetting(key, this.checked ? 1 : 0);
            }, false);
        } else if (inputs[i].type == "radio") {
            inputs[i].addEventListener("click", function(){
                var key = this.name;
                var currentValue = document.getElementById(key).getAttribute("value");
                if (this.value != currentValue) {
                    updateSetting(key, this.value);                        
                }
            }, false);
        } else if (inputs[i].type == "text") {
            inputs[i].addEventListener("blur", function(){
                var key = this.name;
                updateSetting(key, this.value);
                if ($(this).attr("rel")) {
                    $("#" + $(this).attr("rel")).each(function(){
                        updateSetting($(this).attr("name"), $(this).val());
                    });
                }
            }, false);
        }
    }
    
    // Add handler for easy switch hotkey editor.
    var keycodes = {
        48: "0",
        49: "1",
        50: "2",
        51: "3",
        52: "4",
        53: "5",
        54: "6",
        55: "7",
        56: "8",
        57: "9",
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z", 
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        13: "Enter",
        186: ":",
        187: ";",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "@",
        219: "[",
        221: "]",
        222: "^",
    };
    $("#switchTouchModeKeys").keypress(function(event){
        return false;
    });
    $("#switchTouchModeKeys").keyup(function(event){
        return false;
    });
    $("#switchTouchModeKeys").keydown(function(event){
        var keys = [];
        var easykey = {"ctrlKey":false,"altKey":false,"shiftKey":false};
        if (event.ctrlKey) {
            keys.push("Ctrl");
            easykey.ctrlKey = true;
        }
        if (event.altKey) {
            keys.push("Alt");
            easykey.altKey = true;
        }
        if (event.shiftKey) {
            keys.push("Shift");
            easykey.shiftKey = true;
        }
        if (keycodes[event.keyCode]) {
            keys.push(keycodes[event.keyCode]);
            easykey.keyCode = event.keyCode;
        }
        $(this).val(keys.join("+"));
        $("#switchTouchModeEasyKey").val(JSON.stringify(easykey));
        $("#switchTouchModeKeysUpdate").show();
        return false;
    });
    $("#switchTouchModeKeysUpdate").click(function(){
        $(this).hide();
        return false;
    });
    
    // Init language option.
    var langs = getLanguages();
    var lang = getDefaultLanguages();
    var langselect = $("#lang");
    for (var i in langs) {
        if (typeof i === "string") {
            if (lang === i) {
                langselect.append('<option value="' + i + '" selected>' + langs[i] + '</option>');
            } else {
                langselect.append('<option value="' + i + '">' + langs[i] + '</option>');
            }
        }
    }
    langselect.change(function(){
        changeLanguage($(this).val());
    });
}
