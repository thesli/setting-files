$(function(){
    initMenu();
});

function initMenu(){
    $("#item_optionpage").click(function(){
        chrome.tabs.create({url: "setting.html"});
    });
}