$(document).ready(function(){setReadOnlyRules();setEvents()});var forceHideOperations=false;updateCallback=function(){location.reload(true);return;setReadOnlyRules();setEvents()};function setEvents(){$(".cmd_delete").unbind().click(function(){if(!data.showAlerts||confirm(_getMessage("Alert_deleteRule")+"?")){hideEditCommands();var a=$(".active").attr("index");forceHideOperations=true;$(".operations:visible").clearQueue();$(".operations:visible").fadeOut();$(".active").fadeOut(function(){forceHideOperations=false;deleteReadOnlyRule(a);location.reload(true);return})}});$(".data_row").unbind().mouseover(function(){$(".active").removeClass("active");$(this).addClass("active");$(".operations").clearQueue();$(".operations:hidden").animate({top:$(this).position().top,left:$(this).position().left+5,},0,function(){$(".operations:hidden").show("slide",200)});$(".operations").animate({top:$(this).position().top,left:$(this).position().left+5,},250)})}function setReadOnlyRules(){$(".table_row:not(.header, .template, #line_template)",".table").detach();if(data.readOnly.length==0){var h=$("#no_rules").clone().removeClass("template");$(".table").append(h);return}for(var b=0;b<data.readOnly.length;b++){try{var g=data.readOnly[b];var d=(g.domain!=undefined)?g.domain:"any";var a=(g.name!=undefined)?g.name:"any";var c=(g.value!=undefined)?g.value:"any";addRuleLine(d,a,c,b)}catch(f){console.error(f.message)}}}function addRuleLine(e,c,d,b){var a=$("#line_template").clone();$(".domain_field",a).empty().text(e);$(".name_field",a).empty().text(c);$(".value_field",a).empty().text(d);a.attr("id","rule_n_"+b);a.attr("index",b);a.css("display","");$(".table").append(a)}function hideEditCommands(){newRowVisible=false;$(".new_rule_operations").fadeOut();$(".new_row:not(.template)").fadeOut().detach()};