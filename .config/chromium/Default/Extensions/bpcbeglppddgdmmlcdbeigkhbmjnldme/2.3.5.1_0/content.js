function killErrors() {
	return true;
}
window.onerror = killErrors;
var my_title;
function $(obj) {
	return document.getElementById(obj);
}
function lang(messageID, args) {
	return chrome.i18n.getMessage(messageID, args);
}
function remove_ad_by_id(obj){
	if($(obj)!=null){
		$(obj).parentNode.removeChild($(obj));
	}
}
function remove_obj(obj){
	if(obj!=null){
		obj.parentNode.removeChild(obj);
	}
}
function remove_title_flash(){
	noticeTitle=function(){};
	noticeTitleFlash=function(){};
	if(document.title){
		if (!my_title){my_title=document.title;}
		document.title=my_title;
	}
}
function remove_ad(setting){
	var allelements = document.getElementsByTagName("div");
	var whitelisted=false;
	var check_domain;
	var autofinish_ok=false;
	var wl_array=Array();
	if (!setting["wl_array"]){
		setting["wl_array"]="";
	}
	if (setting["noflashtitle"]==="1"){
		remove_title_flash();
	}
	check_domain='domain:'+window.location.host;
	wl_array=setting["wl_array"].split("|") ? setting["wl_array"].split("|") : Array();
	whitelisted=false;
	for(var w_i=0;w_i<wl_array.length;w_i++){
		if (wl_array[w_i] && check_domain.indexOf(wl_array[w_i]) > 1){
			whitelisted=true;
		}
	}
	if (setting["killwidget"]==="1"){
		remove_ad_by_id("sitefocus");
		remove_ad_by_id("ckepop");
		remove_ad_by_id("fixedLayertop");
		remove_ad_by_id("bshareF");
	}
	if (!whitelisted && setting["killdzad"]==="1"){
		remove_ad_by_id("ad_headerbanner");
		remove_ad_by_id("ad_footerbanner1");
		remove_ad_by_id("ad_footerbanner2");
		remove_ad_by_id("ad_footerbanner3");
		remove_ad_by_id("ad_headerbanner_none");
		remove_ad_by_id("ad_footerbanner1_none");
		remove_ad_by_id("ad_footerbanner2_none");
		remove_ad_by_id("ad_footerbanner3_none");
		remove_ad_by_id("ad_text");
		for (i=0;i<=30;i=i+1) {
			remove_ad_by_id("ad_thread1_"+i);
			remove_ad_by_id("ad_thread2_"+i);
			remove_ad_by_id("ad_thread3_"+i);
			remove_ad_by_id("ad_thread4_"+i);
		}
	}
	allelements = document.getElementsByTagName("div");
	for(var e_i=0;e_i<allelements.length;e_i++){
		if (!whitelisted && setting["killdzxad"]!=="0"){
			if (allelements[e_i].className=="ad") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_b") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_b") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_p") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_pt") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_pr") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_pb") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_mu") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_fl") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="a_fl a_cb") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="bm a_c") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="wp a_h") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="wp a_f") { remove_obj(allelements[e_i]) };
			if (allelements[e_i].className=="wp a_t") { remove_obj(allelements[e_i]) };
			if ('postmessage'.indexOf(allelements[e_i].parentNode.id)<0 && allelements[e_i].style.overflow=="hidden") { allelements[e_i].style.height="auto" };
		}
		if (setting["killsignad"]==="1"){
			if (allelements[e_i].className=="sign") remove_obj(allelements[e_i]);
			if (allelements[e_i].className=="signatures") remove_obj(allelements[e_i]);
		}
		if (setting["killwidget"]==="1"){
			if (allelements[e_i].className=="QQbox") remove_obj(allelements[e_i]);
		}
	}
	if (document.readyState == "complete"){
		if (setting["noflashtitle"]==="1"){
			setInterval(function(){remove_title_flash();},300);
		}
		if (setting["autofinish"]==="1" && $('fastpostform')!=null && $('fastpostmessage')!=null && !autofinish_ok){
			autofinish_ok=true;
			function mb_strlen(str) {
				var len = 0;
				for(var i=0;i<str.length;i++) {
					len+=str.charCodeAt(i)<0||str.charCodeAt(i)>255?2:1;
				}
				return len;
			}
			$('fastpostform').onsubmit=function(){
				if(!postminchars){var postminchars=20;}
				while(mb_strlen($('fastpostmessage').value)<postminchars){
					$('fastpostmessage').value=$('fastpostmessage').value+'　';
				}
			}
			$('fastpostmessage').addEventListener('keydown',function(event){
				if(event.ctrlKey) $('fastpostreturn').innerHTML='';
				if(!postminchars){var postminchars=20;}
				if(event.ctrlKey && event.keyCode==13 || event.altKey && event.keyCode==83 && mb_strlen($('fastpostmessage').value)<postminchars) {
					while(mb_strlen($('fastpostmessage').value)<postminchars){
						$('fastpostmessage').value=$('fastpostmessage').value+'　';
					}
					$('fastpostreturn').innerHTML=lang('autofinish_ok');
				}
			},true);
		}
		setTimeout(function(){clearInterval(remove_ad_timer);},10000);
	}
}
chrome.extension.sendRequest({getsetting:"yes"},function(response){
	remove_ad_timer=setInterval(function(){remove_ad(response.setting)},50);
});