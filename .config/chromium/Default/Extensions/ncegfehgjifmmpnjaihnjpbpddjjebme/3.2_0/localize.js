(function(){
    var messages = null;
    var languages = {
        zh_CN : "Chinese(Simplified)",
        en_US: "English",
        it : "Italian",
        ja : "Japanese",
        es : "Spanish",
        tr : "Turkish"
    };
    
    function loadMessage(lang, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                var text = xhr.responseText;
                if (text) {
                    messages = JSON.parse(text);
                    callback();
                }
            }
        };
        try {
            xhr.open("GET", chrome.runtime.getURL("/_locales/" + lang + "/messages.json"), false);
            xhr.send();
        } catch(e) {
            console.log(e);
        }
    }
    
    function updateMessage() {
        $("[class*=i18n]").each(function(){
            var matches = $(this).attr("class").match(/i18n \[([^\]]*)\]/);
            if (messages[matches[1]]) {
                $(this).html(messages[matches[1]].message);
            }      
        });
    }
    
    function getLanguages() {
        return languages;
    }
    
    function getDefaultLanguages() {
        return localStorage.getItem('lang');
    }
    
    function changeLanguage(lang) {
        localStorage.setItem('lang', lang);
        loadMessage(lang, updateMessage);
    }
    
    // default language
    chrome.i18n.getAcceptLanguages(function(languageList) {
        var lang = localStorage.getItem('lang');
        if (!lang) {
            for (var i = 0; i < languageList.length; i++) {
                if (languages[languageList[i]]) {
                    lang = languageList[i];
                }
            }
        }
        if (!lang) {
            lang = "en_US";
        }
        changeLanguage(lang);
    });
    
    window["getLanguages"] = getLanguages;
    window["getDefaultLanguages"] = getDefaultLanguages;
    window["changeLanguage"] = changeLanguage;
})();
