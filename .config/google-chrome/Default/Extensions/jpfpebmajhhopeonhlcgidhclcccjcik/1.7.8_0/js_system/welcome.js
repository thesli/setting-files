var numRequestsOutstanding=0;var trends={historyItems:0,byUrl:{},byDomain:{},topUrls:{}};var sortByCount=function(d,c){return c.count-d.count};function calcTrends(){chrome.history.search({text:"",maxResults:15000,startTime:0},function(d){for(var c=0;c<d.length;++c){var b=d[c].url;if(b.indexOf("http")==-1){continue}var e=getHostname(b);var a=function(f,g){return function(h){processVisits(f,g,h)}};chrome.history.getVisits({url:b},a(b,e));numRequestsOutstanding++}if(!numRequestsOutstanding){onAllVisitsProcessed()}})}var onAllVisitsProcessed=function(){urlArray=[];for(var c in trends.byUrl){urlArray.push({url:c,count:trends.byUrl[c]})}urlArray.sort(sortByCount);trends.topUrls=urlArray;var a=10;$("#most_visited_websites").html("");for(value in trends.topUrls){if(typeof trends.topUrls[value].url!="undefined"){a--;if(a<0){continue}var b=document.createElement("div");var e=document.createElement("a");var d=document.createElement("div");var g=document.createElement("input");var f=document.createElement("span");e.setAttribute("href",trends.topUrls[value].url);e.setAttribute("target","_blank");e.innerHTML=getHostname(trends.topUrls[value].url);d.innerHTML=trends.topUrls[value].url;d.setAttribute("class","fullurl");f.innerHTML="<b>"+trends.topUrls[value].count+"</b>&nbsp; "+i18n("visits");g.setAttribute("type","checkbox");g.setAttribute("url",trends.topUrls[value].url);g.setAttribute("visits",trends.topUrls[value].count);g.setAttribute("title",getHostname(trends.topUrls[value].url));g.setAttribute("checked","checked");b.setAttribute("class","website");b.appendChild(g);b.appendChild(e);b.appendChild(f);b.appendChild(d);$("#most_visited_websites").append(b)}}};var processVisits=function(a,c,d){for(var b=0,e=d.length;b<e;++b){trends.visitItems++;hasMatch=1;if(!trends.byUrl[a]){trends.byUrl[a]=0}trends.byUrl[a]++;if(c){if(!trends.byDomain[c]){trends.byDomain[c]=0}trends.byDomain[c]++}}if(!--numRequestsOutstanding){onAllVisitsProcessed()}return};$(function(){background_init();welcome(1);$(".preview_image").hover(function(){$(".preview").hide();$(".note").hide();$("#image"+($(this).attr("rel"))+"").show();$("#note"+($(this).attr("rel"))+"").show();$("#footnote"+($(this).attr("rel"))+"").show()});$(document).on("click",".website",function(){$(this).find('input[type="checkbox"]').prop("checked",!($(this).find('input[type="checkbox"]').prop("checked")))})});function welcome(a){$(".welcome").hide();$("#welcome-"+a).show();if(a==10){calcTrends()}if(a==12){getRecommendedSetup()}}function ImportSelected(){$("#most_visited_websites input:checked").each(function(){var a=$(this);insert=new Array();insert.url=a.attr("url");insert.title=a.attr("title");insert.thumbnail=suggestThumbnail(a.attr("url"));insert.ts_created=Math.round(new Date().getTime()/1000);insert.visits=a.attr("visits");insert.visits_morning=Math.round(a.attr("visits")/4);insert.visits_afternoon=Math.round(a.attr("visits")/4);insert.visits_evening=Math.round(a.attr("visits")/4);insert.visits_night=Math.round(a.attr("visits")/4);insert.position=999;insert.idgroup=0;speeddial.storage.addItem(insert,function(){});welcome(11)})}function getRecommendedSetup(){chrome.management.getAll(function(c){var b=0;for(var a=0;a<c.length;a++){if(c[a].isApp){b++}}if(b>0){$(".apps_present_true").show().find("b").text(b);$(".apps_present_false").hide()}else{$(".apps_present_true").hide();$(".apps_present_false").show()}});chrome.bookmarks.search("e",function(a){if(a.length>100){}})}function suggestThumbnail(a){suggest={"http://farm6.static.flickr.com/5308/5612547127_2795ba0088_o.png":"amazon.com","http://farm6.static.flickr.com/5225/5612548425_d14a25ab7a_o.jpg":"aol.com","http://farm6.static.flickr.com/5063/5612547145_625055a1c6_o.png":"apple.com","http://farm6.static.flickr.com/5108/5612548509_057cc6a0fa_o.png":"ask.com","http://farm6.static.flickr.com/5305/5613126090_8817365b5d_o.png":"basecamphq.com","http://farm6.static.flickr.com/5148/5612548351_9411e74716_o.png":"bbc.co.uk","http://farm6.static.flickr.com/5145/5612547231_41be1f7af1_o.png":"bing.com","http://farm6.static.flickr.com/5264/5612547257_89c0646b7e_o.png":"blogger.com","http://farm6.static.flickr.com/5103/5612547299_b58507c069_o.jpg":"brizzly.com","http://farm6.static.flickr.com/5103/5612547401_fe7c50145e_o.png":"cnet.com","http://farm6.static.flickr.com/5108/5613126266_b2d2b57e01_o.png":"craigslist.com","http://farm6.static.flickr.com/5106/5613127096_8ed7fe6280_o.jpg":"dailymotion.com","http://farm6.static.flickr.com/5268/5613127398_057cc6a0fa_o.jpg":"delicious.com","http://farm6.static.flickr.com/5310/5612547429_851d9333bc_o.gif":"deviantart.com","http://farm6.static.flickr.com/5107/5613127304_54410dc147_o.png":"digg.com","http://farm6.static.flickr.com/5068/5613127424_ba6b9ce1fb_o.png":"diigo.com","http://farm6.static.flickr.com/5065/5612547459_ffe302f6b3_o.jpg":"dribbble.com","http://farm6.static.flickr.com/5150/5612548579_c7e2229542_o.png":"dropbox.com","http://farm6.static.flickr.com/5223/5613126420_6d8dd8f81d_o.jpg":"ebay.com","http://farm6.static.flickr.com/5065/5612547553_9469c585fa_o.jpg":"facebook.com","http://farm6.static.flickr.com/5147/5612547583_8daa982867_o.jpg":"feedly.com","http://farm6.static.flickr.com/5064/5613126494_793c4cbc7b_o.jpg":"ffffound.com","http://farm6.static.flickr.com/5066/5613127018_e8b8002261_o.png":"flickr.com","http://farm6.static.flickr.com/5187/5613126368_5dc9d395df_o.jpg":"forrst.com","http://farm6.static.flickr.com/5222/5613127480_61e80dc1e7_o.jpg":"foursquare.com","http://farm6.static.flickr.com/5149/5612548639_6ce41bf235_o.jpg":"github.com","http://farm6.static.flickr.com/5024/5612547633_2ec7199e05_o.gif":"gizmodo.com","http://farm6.static.flickr.com/5145/5612547349_bf6b97702a_o.jpg":"mail.google.com","http://farm6.static.flickr.com/5230/5612548687_8d52a8da49_o.png":"google.com/analytics","http://farm6.static.flickr.com/5143/5613127610_343b0f69e6_o.png":"google.com/buzz","http://farm6.static.flickr.com/5182/5613127636_e854aea66b_o.png":"google.com/calendar","http://farm6.static.flickr.com/5263/5613127662_7c7053388c_o.png":"docs.google.com","http://farm6.static.flickr.com/5307/5612548787_5acd8513c0_o.png":"groups.google.com","http://farm6.static.flickr.com/5063/5612548815_5f46bebea8_o.png":"maps.google.com","http://farm6.static.flickr.com/5265/5613127728_79afc7eeca_o.png":"news.google.com","http://farm6.static.flickr.com/5266/5612548895_13384a663c_o.png":"orkut.com","http://farm6.static.flickr.com/5144/5612548919_36c288a72e_o.png":"reader.google.com","http://farm6.static.flickr.com/5221/5612548667_a9b09a2068_o.png":"google.com","http://farm6.static.flickr.com/5108/5613126568_99e9442594_o.jpg":"gowalla.com","http://farm6.static.flickr.com/5104/5613126590_57b470661f_o.png":"grooveshark.com","http://farm6.static.flickr.com/5262/5613126614_b2158433d4_o.gif":"hackernews.com","http://farm6.static.flickr.com/5185/5612548147_3199620e1e_o.png":"hulu.com","http://farm6.static.flickr.com/5304/5612548471_4425892b60_o.png":"ifttt.com","http://farm6.static.flickr.com/5109/5613126866_c7c062ce7c_o.png":"instapaper.com","http://farm6.static.flickr.com/5228/5612548029_964fc1fa0b_o.png":"last.fm","http://farm6.static.flickr.com/5181/5612548209_bf2575831e_o.png":"lifehacker.com","http://farm6.static.flickr.com/5263/5613126948_f31f2422b8_o.jpg":"linkedin.com","http://farm6.static.flickr.com/5025/5613126932_391d019251_o.png":"mashable.com","http://farm6.static.flickr.com/5303/5613127072_fcf378487b_o.png":"metacafe.com","http://farm6.static.flickr.com/5190/5612547509_86669e0726_o.jpg":"mixcloud.com","http://farm6.static.flickr.com/5102/5613127170_cf0118130f_o.png":"msn.com","http://farm6.static.flickr.com/5221/5612548053_69d8ba7bd6_o.jpg":"myspace.com","http://farm6.static.flickr.com/5183/5613127240_fdf6395a72_o.jpg":"nytimes.com","http://farm6.static.flickr.com/5103/5612548107_c6e6271a3a_o.jpg":"pandora.com","http://farm6.static.flickr.com/5142/5612548945_9d019ca609_o.png":"picasa.google.com","http://farm6.static.flickr.com/5184/5613127968_eebf637eee_o.png":"pinboard.in","http://farm6.static.flickr.com/5064/5613126842_e0813dab95_o.png":"posterous.com","http://farm6.static.flickr.com/5302/5613127990_09cd978cc0_o.jpg":"rememberthemilk.com","http://farm6.static.flickr.com/5106/5612549099_bc684285d3_o.jpg":"scribd.com","http://farm2.static.flickr.com/1409/5613226230_df2139b573_o.jpg":"sina.com","http://farm6.static.flickr.com/5183/5613126828_afbc5e94b9_o.jpg":"soundcloud.com","http://farm6.static.flickr.com/5189/5612549067_1aa5066a4f_o.jpg":"sourceforge.net","http://farm6.static.flickr.com/5310/5612547917_7274aebc6a_o.png":"springpad.com","http://farm6.static.flickr.com/5067/5613126782_f0aa8c6f3c_o.jpg":"stumbleupon.com","http://farm6.static.flickr.com/5148/5612547863_02d3843b72_o.jpg":"techcrunch.com","http://farm6.static.flickr.com/5064/5612548265_22701c9c84_o.jpg":"technorati.com","http://farm6.static.flickr.com/5222/5612647167_dccacfeb49_o.jpg":"ted.com","http://farm6.static.flickr.com/5184/5612654409_b5e6509e41_o.png":"livejournal.com","http://farm6.static.flickr.com/5270/5612547831_d2966fa009_o.png":"tumblr.com","http://farm6.static.flickr.com/5262/5613127870_28b3501e9e_o.jpg":"twitter.com","http://farm6.static.flickr.com/5305/5612647193_6b4fe7772e_o.jpg":"ubu.com","http://farm6.static.flickr.com/5145/5612547795_53646a88eb_o.png":"vimeo.com","http://farm6.static.flickr.com/5030/5613126220_3f11312ec5_o.png":"wikipedia.org","http://farm6.static.flickr.com/5147/5612549041_e7339fa9c1_o.jpg":"live.com","http://farm6.static.flickr.com/5107/5613126666_c7f3226bb8_o.jpg":"wired.com","http://farm6.static.flickr.com/5181/5612548301_6913510f55_o.png":"wordpress.org","http://farm6.static.flickr.com/5069/5612547747_db53b9ac06_o.jpg":"yahoo.com","http://farm6.static.flickr.com/5266/5612548979_9d0135356c_o.jpg":"youtube.com"};for(var b in suggest){if(a.indexOf(suggest[b])>-1){return b}}return""}$(function(){$("*[i18n]").each(function(){if(i18n($(this).attr("i18n"))){$(this).html(i18n($(this).attr("i18n")))}})});$(function(){$(".click-open-extension-page").click(function(){top.location.href=chrome.extension.getURL($(this).data("url"))});$(".click-welcome").click(function(){welcome($(this).data("screen"))});$("#click-import-selected").click(function(){ImportSelected()});$(".click-toggle-value").click(function(){var b=$(this).data("option");var a=$(this).data("value");toggleValue(b,a)})});