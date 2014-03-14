// jslint.js
// 2012-11-13

// Copyright (c) 2002 Douglas Crockford  (www.JSLint.com)

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// The Software shall be used for Good, not Evil.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var JSLINT=(function(){function bW(ci,ch){var ax,cg=ci.length,F={};
for(ax=0;ax<cg;ax+=1){F[ci[ax]]=ch}return F}var k,ap,bj,t,l={anon:true,bitwise:true,browser:true,cap:true,"continue":true,css:true,debug:true,devel:true,eqeq:true,es5:true,evil:true,forin:true,fragment:true,indent:10,maxerr:1000,maxlen:256,newcap:true,node:true,nomen:true,on:true,passfail:true,plusplus:true,properties:true,regexp:true,rhino:true,undef:true,unparam:true,sloppy:true,stupid:true,sub:true,todo:true,vars:true,white:true,windows:true},bb,bZ,bf={"<":true,"<=":true,"==":true,"===":true,"!==":true,"!=":true,">":true,">=":true,"+":true,"-":true,"*":true,"/":true,"%":true},ad=bW(["arguments","callee","caller","constructor","eval","prototype","stack","unwatch","valueOf","watch"],true),c,aS=bW(["clearInterval","clearTimeout","document","event","FormData","frames","history","Image","localStorage","location","name","navigator","Option","parent","screen","sessionStorage","setInterval","setTimeout","Storage","window","XMLHttpRequest"],false),A={a_label:"'{a}' is a statement label.",a_not_allowed:"'{a}' is not allowed.",a_not_defined:"'{a}' is not defined.",a_scope:"'{a}' used out of scope.",adsafe_a:"ADsafe violation: '{a}'.",adsafe_autocomplete:"ADsafe autocomplete violation.",adsafe_bad_id:"ADSAFE violation: bad id.",adsafe_div:"ADsafe violation: Wrap the widget in a div.",adsafe_fragment:"ADSAFE: Use the fragment option.",adsafe_go:"ADsafe violation: Misformed ADSAFE.go.",adsafe_html:"Currently, ADsafe does not operate on whole HTML documents. It operates on <div> fragments and .js files.",adsafe_id:"ADsafe violation: id does not match.",adsafe_id_go:"ADsafe violation: Missing ADSAFE.id or ADSAFE.go.",adsafe_lib:"ADsafe lib violation.",adsafe_lib_second:"ADsafe: The second argument to lib must be a function.",adsafe_missing_id:"ADSAFE violation: missing ID_.",adsafe_name_a:"ADsafe name violation: '{a}'.",adsafe_placement:"ADsafe script placement violation.",adsafe_prefix_a:"ADsafe violation: An id must have a '{a}' prefix",adsafe_script:"ADsafe script violation.",adsafe_source:"ADsafe unapproved script source.",adsafe_subscript_a:"ADsafe subscript '{a}'.",adsafe_tag:"ADsafe violation: Disallowed tag '{a}'.",already_defined:"'{a}' is already defined.",and:"The '&&' subexpression should be wrapped in parens.",assign_exception:"Do not assign to the exception parameter.",assignment_function_expression:"Expected an assignment or function call and instead saw an expression.",attribute_case_a:"Attribute '{a}' not all lower case.",avoid_a:"Avoid '{a}'.",bad_assignment:"Bad assignment.",bad_color_a:"Bad hex color '{a}'.",bad_constructor:"Bad constructor.",bad_entity:"Bad entity.",bad_html:"Bad HTML string",bad_id_a:"Bad id: '{a}'.",bad_in_a:"Bad for in variable '{a}'.",bad_invocation:"Bad invocation.",bad_name_a:"Bad name: '{a}'.",bad_new:"Do not use 'new' for side effects.",bad_number:"Bad number '{a}'.",bad_operand:"Bad operand.",bad_style:"Bad style.",bad_type:"Bad type.",bad_url_a:"Bad url '{a}'.",bad_wrap:"Do not wrap function literals in parens unless they are to be immediately invoked.",combine_var:"Combine this with the previous 'var' statement.",conditional_assignment:"Expected a conditional expression and instead saw an assignment.",confusing_a:"Confusing use of '{a}'.",confusing_regexp:"Confusing regular expression.",constructor_name_a:"A constructor name '{a}' should start with an uppercase letter.",control_a:"Unexpected control character '{a}'.",css:"A css file should begin with @charset 'UTF-8';",dangling_a:"Unexpected dangling '_' in '{a}'.",dangerous_comment:"Dangerous comment.",deleted:"Only properties should be deleted.",duplicate_a:"Duplicate '{a}'.",empty_block:"Empty block.",empty_case:"Empty case.",empty_class:"Empty class.",es5:"This is an ES5 feature.",evil:"eval is evil.",expected_a:"Expected '{a}'.",expected_a_b:"Expected '{a}' and instead saw '{b}'.",expected_a_b_from_c_d:"Expected '{a}' to match '{b}' from line {c} and instead saw '{d}'.",expected_at_a:"Expected an at-rule, and instead saw @{a}.",expected_a_at_b_c:"Expected '{a}' at column {b}, not column {c}.",expected_attribute_a:"Expected an attribute, and instead saw [{a}].",expected_attribute_value_a:"Expected an attribute value and instead saw '{a}'.",expected_class_a:"Expected a class, and instead saw .{a}.",expected_fraction_a:"Expected a number between 0 and 1 and instead saw '{a}'",expected_id_a:"Expected an id, and instead saw #{a}.",expected_identifier_a:"Expected an identifier and instead saw '{a}'.",expected_identifier_a_reserved:"Expected an identifier and instead saw '{a}' (a reserved word).",expected_linear_a:"Expected a linear unit and instead saw '{a}'.",expected_lang_a:"Expected a lang code, and instead saw :{a}.",expected_media_a:"Expected a CSS media type, and instead saw '{a}'.",expected_name_a:"Expected a name and instead saw '{a}'.",expected_nonstandard_style_attribute:"Expected a non-standard style attribute and instead saw '{a}'.",expected_number_a:"Expected a number and instead saw '{a}'.",expected_operator_a:"Expected an operator and instead saw '{a}'.",expected_percent_a:"Expected a percentage and instead saw '{a}'",expected_positive_a:"Expected a positive number and instead saw '{a}'",expected_pseudo_a:"Expected a pseudo, and instead saw :{a}.",expected_selector_a:"Expected a CSS selector, and instead saw {a}.",expected_small_a:"Expected a small positive integer and instead saw '{a}'",expected_space_a_b:"Expected exactly one space between '{a}' and '{b}'.",expected_string_a:"Expected a string and instead saw '{a}'.",expected_style_attribute:"Excepted a style attribute, and instead saw '{a}'.",expected_style_pattern:"Expected a style pattern, and instead saw '{a}'.",expected_tagname_a:"Expected a tagName, and instead saw {a}.",expected_type_a:"Expected a type, and instead saw {a}.",for_if:"The body of a for in should be wrapped in an if statement to filter unwanted properties from the prototype.",function_block:"Function statements should not be placed in blocks.Use a function expression or move the statement to the top of the outer function.",function_eval:"The Function constructor is eval.",function_loop:"Don't make functions within a loop.",function_statement:"Function statements are not invocable.Wrap the whole function invocation in parens.",function_strict:"Use the function form of 'use strict'.",html_confusion_a:"HTML confusion in regular expression '<{a}'.",html_handlers:"Avoid HTML event handlers.",identifier_function:"Expected an identifier in an assignment and instead saw a function invocation.",implied_evil:"Implied eval is evil. Pass a function instead of a string.",infix_in:"Unexpected 'in'. Compare with undefined, or use the hasOwnProperty method instead.",insecure_a:"Insecure '{a}'.",isNaN:"Use the isNaN function to compare with NaN.",lang:"lang is deprecated.",leading_decimal_a:"A leading decimal point can be confused with a dot: '.{a}'.",missing_a:"Missing '{a}'.",missing_a_after_b:"Missing '{a}' after '{b}'.",missing_option:"Missing option value.",missing_property:"Missing property name.",missing_space_a_b:"Missing space between '{a}' and '{b}'.",missing_url:"Missing url.",missing_use_strict:"Missing 'use strict' statement.",mixed:"Mixed spaces and tabs.",move_invocation:"Move the invocation into the parens that contain the function.",move_var:"Move 'var' declarations to the top of the function.",name_function:"Missing name in function statement.",nested_comment:"Nested comment.",not:"Nested not.",not_a_constructor:"Do not use {a} as a constructor.",not_a_defined:"'{a}' has not been fully defined yet.",not_a_function:"'{a}' is not a function.",not_a_label:"'{a}' is not a label.",not_a_scope:"'{a}' is out of scope.",not_greater:"'{a}' should not be greater than '{b}'.",octal_a:"Don't use octal: '{a}'. Use '\\u....' instead.",parameter_arguments_a:"Do not mutate parameter '{a}' when using 'arguments'.",parameter_a_get_b:"Unexpected parameter '{a}' in get {b} function.",parameter_set_a:"Expected parameter (value) in set {a} function.",radix:"Missing radix parameter.",read_only:"Read only.",redefinition_a:"Redefinition of '{a}'.",reserved_a:"Reserved name '{a}'.",scanned_a_b:"{a} ({b}% scanned).",slash_equal:"A regular expression literal can be confused with '/='.",statement_block:"Expected to see a statement and instead saw a block.",stopping:"Stopping.",strange_loop:"Strange loop.",strict:"Strict violation.",subscript:"['{a}'] is better written in dot notation.",sync_a:"Unexpected sync method: '{a}'.",tag_a_in_b:"A '<{a}>' must be within '<{b}>'.",todo_comment:"Unexpected TODO comment.",too_long:"Line too long.",too_many:"Too many errors.",trailing_decimal_a:"A trailing decimal point can be confused with a dot: '.{a}'.",type:"type is unnecessary.",unclosed:"Unclosed string.",unclosed_comment:"Unclosed comment.",unclosed_regexp:"Unclosed regular expression.",unescaped_a:"Unescaped '{a}'.",unexpected_a:"Unexpected '{a}'.",unexpected_char_a_b:"Unexpected character '{a}' in {b}.",unexpected_comment:"Unexpected comment.",unexpected_else:"Unexpected 'else' after 'return'.",unexpected_label_a:"Unexpected label '{a}'.",unexpected_property_a:"Unexpected /*property*/ '{a}'.",unexpected_space_a_b:"Unexpected space between '{a}' and '{b}'.",unexpected_typeof_a:"Unexpected 'typeof'. Use '===' to compare directly with {a}.",unnecessary_initialize:"It is not necessary to initialize '{a}' to 'undefined'.",unnecessary_use:"Unnecessary 'use strict'.",unreachable_a_b:"Unreachable '{a}' after '{b}'.",unrecognized_style_attribute_a:"Unrecognized style attribute '{a}'.",unrecognized_tag_a:"Unrecognized tag '<{a}>'.",unsafe:"Unsafe character.",url:"JavaScript URL.",use_array:"Use the array literal notation [].",use_braces:"Spaces are hard to count. Use {{a}}.",use_charAt:"Use the charAt method.",use_object:"Use the object literal notation {}.",use_or:"Use the || operator.",use_param:"Use a named parameter.",used_before_a:"'{a}' was used before it was defined.",var_a_not:"Variable {a} was not declared correctly.",weird_assignment:"Weird assignment.",weird_condition:"Weird condition.",weird_new:"Weird construction. Delete 'new'.",weird_program:"Weird program.",weird_relation:"Weird relation.",weird_ternary:"Weird ternary.",wrap_immediate:"Wrap an immediate function invocation in parentheses to assist the reader in understanding that the expression is the result of a function, and not the function itself.",wrap_regexp:"Wrap the /regexp/ literal in parens to disambiguate the slash operator.",write_is_wrong:"document.write can be a form of eval."},o,bX,b8,aC=bW(["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen","activeborder","activecaption","appworkspace","background","buttonface","buttonhighlight","buttonshadow","buttontext","captiontext","graytext","highlight","highlighttext","inactiveborder","inactivecaption","inactivecaptiontext","infobackground","infotext","menu","menutext","scrollbar","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","window","windowframe","windowtext"],true),L,ab,S={"%":true,cm:true,em:true,ex:true,"in":true,mm:true,pc:true,pt:true,px:true},Q,ce,e={b:"\b",t:"\t",n:"\n",f:"\f",r:"\r",'"':'"',"/":"/","\\":"\\","!":"!"},v=bW(["alert","confirm","console","Debug","opera","prompt","WSH"],false),aP,b7={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","'":"\\'",'"':'\\"',"/":"\\/","\\":"\\\\"},U,bs=["closure","exception","global","label","outer","undef","unused","var"],bH,bm,a2,bt={a:{},abbr:{},acronym:{},address:{},applet:{},area:{empty:true,parent:" map "},article:{},aside:{},audio:{},b:{},base:{empty:true,parent:" head "},bdo:{},big:{},blockquote:{},body:{parent:" html noframes "},br:{empty:true},button:{},canvas:{parent:" body p div th td "},caption:{parent:" table "},center:{},cite:{},code:{},col:{empty:true,parent:" table colgroup "},colgroup:{parent:" table "},command:{parent:" menu "},datalist:{},dd:{parent:" dl "},del:{},details:{},dialog:{},dfn:{},dir:{},div:{},dl:{},dt:{parent:" dl "},em:{},embed:{},fieldset:{},figcaption:{parent:" figure "},figure:{},font:{},footer:{},form:{},frame:{empty:true,parent:" frameset "},frameset:{parent:" html frameset "},h1:{},h2:{},h3:{},h4:{},h5:{},h6:{},head:{parent:" html "},header:{},hgroup:{},hr:{empty:true},"hta:application":{empty:true,parent:" head "},html:{parent:"*"},i:{},iframe:{},img:{empty:true},input:{empty:true},ins:{},kbd:{},keygen:{},label:{},legend:{parent:" details fieldset figure "},li:{parent:" dir menu ol ul "},link:{empty:true,parent:" head "},map:{},mark:{},menu:{},meta:{empty:true,parent:" head noframes noscript "},meter:{},nav:{},noframes:{parent:" html body "},noscript:{parent:" body head noframes "},object:{},ol:{},optgroup:{parent:" select "},option:{parent:" optgroup select "},output:{},p:{},param:{empty:true,parent:" applet object "},pre:{},progress:{},q:{},rp:{},rt:{},ruby:{},samp:{},script:{empty:true,parent:" body div frame head iframe p pre span "},section:{},select:{},small:{},span:{},source:{},strong:{},style:{parent:" head ",empty:true},sub:{},sup:{},table:{},tbody:{parent:" table "},td:{parent:" tr "},textarea:{},tfoot:{parent:" table "},th:{parent:" tr "},thead:{parent:" table "},time:{},title:{parent:" head "},tr:{parent:" table tbody thead tfoot "},tt:{},u:{},ul:{},"var":{},video:{}},u,aV,j,bM,b1,aL,bE,ag,cc=bW(["Buffer","clearInterval","clearTimeout","console","exports","global","module","process","querystring","require","setInterval","setTimeout","__dirname","__filename"],false),aX,y=bW(["indexOf","lastIndexOf","search"],true),I,aA,cb,q,bV,aa,z=bW(["g","i","m"],true),C=function C(){return this
},br=bW(["defineClass","deserialize","gc","help","load","loadClass","print","quit","readFile","readUrl","runCommand","seal","serialize","spawn","sync","toint32","version"],false),B,bi=bW([";",'"',"'",")"],true),b9,d,bx=bW(["Array","Boolean","Date","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","Error","eval","EvalError","Function","isFinite","isNaN","JSON","Math","Number","Object","parseInt","parseFloat","RangeError","ReferenceError","RegExp","String","SyntaxError","TypeError","URIError"],false),bA,r={},bJ,az,V,a5,g,aT=bW(["ActiveXObject","CScript","Debug","Enumerator","System","VBArray","WScript","WSH"],false),bY,R,bL=/@cc|<\/?|script|\]\s*\]|<\s*!|&lt/i,O=/\r\n?|\n/,bc=/[\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/,aU=/[\[\]\/\\"'*<>.&:(){}+=#]/,T=/^\s*(['"=>\/&#]|<(?:\/|\!(?:--)?)?|[a-zA-Z][a-zA-Z0-9_\-:]*|[0-9]+|--)/,D=/^([a-zA-Z_$][a-zA-Z0-9_$]*)$/,n=/^(?:javascript|jscript|ecmascript|vbscript|mocha|livescript)\s*:/i,b6=/\*\/|\/\*/,by=/[\u0000-\u001f'\\\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,bk=/[>&]|<[\/!]?|--/,aN=/[^a-zA-Z0-9+\-_\/. ]/,bI=/^\s*([@#!"'};:\-%.=,+\[\]()*_]|[a-zA-Z][a-zA-Z0-9._\-]*|\/\*?|\d+(?:\.\d+)?|<\/)/,at=/^\s*([{}:#%.=,>+\[\]@()"';]|[*$\^~]=|[a-zA-Z_][a-zA-Z0-9_\-]*|[0-9]+|<\/|\/\*)/,ak=/Sync$/,a7=/^\W*to\s*do(?:\W|$)/i,af=/^\s*([(){}\[\]\?.,:;'"~#@`]|={1,3}|\/(\*(jslint|properties|property|members?|globals?)?|=|\/)?|\*[\/=]?|\+(?:=|\++)?|-(?:=|-+)?|[\^%]=?|&[&=]?|\|[|=]?|>{1,3}=?|<(?:[\/=!]|\!(\[|--)?|<=?)?|\!(\!|==?)?|[a-zA-Z_$][a-zA-Z0-9_$]*|[0-9]+(?:[xX][0-9a-fA-F]+|\.[0-9]*)?(?:[eE][+\-]?[0-9]+)?)/,K=/&|\+|\u00AD|\.\.|\/\*|%[^;]|base64|url|expression|data|mailto|script/i,aE={outer:T,html:T,style:at,styleproperty:bI};
function bD(){}if(typeof Array.prototype.filter!=="function"){Array.prototype.filter=function(ci){var ax,cg=this.length,F=[],ch;
for(ax=0;ax<cg;ax+=1){try{ch=this[ax];if(ci(ch)){F.push(ch)
}}catch(cj){}}return F}}if(typeof Array.prototype.forEach!=="function"){Array.prototype.forEach=function(cg){var F,ax=this.length;
for(F=0;F<ax;F+=1){try{cg(this[F])}catch(ch){}}}}if(typeof Array.isArray!=="function"){Array.isArray=function(F){return Object.prototype.toString.apply(F)==="[object Array]"
}}if(!Object.prototype.hasOwnProperty.call(Object,"create")){Object.create=function(F){bD.prototype=F;
return new bD()}}if(typeof Object.keys!=="function"){Object.keys=function(ax){var cg=[],F;
for(F in ax){if(Object.prototype.hasOwnProperty.call(ax,F)){cg.push(F)
}}return cg}}if(typeof String.prototype.entityify!=="function"){String.prototype.entityify=function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
}}if(typeof String.prototype.isAlpha!=="function"){String.prototype.isAlpha=function(){return(this>="a"&&this<="z\uffff")||(this>="A"&&this<="Z\uffff")
}}if(typeof String.prototype.isDigit!=="function"){String.prototype.isDigit=function(){return(this>="0"&&this<="9")
}}if(typeof String.prototype.supplant!=="function"){String.prototype.supplant=function(F){return this.replace(/\{([^{}]*)\}/g,function(cg,ax){var ch=F[ax];
return typeof ch==="string"||typeof ch==="number"?ch:cg
})}}function bo(F){return b7[F]||"\\u"+("0000"+F.charCodeAt().toString(16)).slice(-4)
}function Z(F){Object.keys(F).forEach(function(ax){cb[ax]=F[ax]
})}function bF(){if(!aA.safe){if(aA.rhino){Z(br);aA.rhino=false
}if(aA.devel){Z(v);aA.devel=false}if(aA.browser){Z(aS);
aA.browser=false}if(aA.windows){Z(aT);aA.windows=false
}if(aA.node){Z(cc);aA.node=false;aX=true}}}function ac(F){if(!F){F=I
}return F.number||F.string}function p(ax,F,cg){throw {name:"JSLintError",line:F,character:cg,message:A.scanned_a_b.supplant({a:ax,b:Math.floor((F/bE.length)*100)})}
}function bS(cl,ck,cj,ch,cg,ax){var F,cm,ci;ck=ck||I;
cm=ck.line||0;F=ck.from||0;ci={id:"(error)",raw:A[cl]||cl,evidence:bE[cm-1]||"",line:cm,character:F,a:cj||(ck.id==="(number)"?String(ck.number):ck.string),b:ch,c:cg,d:ax};
ci.reason=ci.raw.supplant(ci);JSLINT.errors.push(ci);
if(aA.passfail){p(A.stopping,cm,F)}g+=1;if(g>=aA.maxerr){p(A.too_many,cm,F)
}return ci}function aJ(ch,cg,ci,ax,F,ck,cj){return bS(ch,{line:cg,from:ci},ax,F,ck,cj)
}function aR(ch,ck,ax,F,cj,ci){var cg=bS(ch,ck,ax,F,cj,ci);
p(A.stopping,cg.line,cg.character)}function bn(ch,cg,ci,ax,F,ck,cj){return aR(ch,{line:cg,from:ci},ax,F,ck,cj)
}function b4(F){if(!aA.white&&I.from!==F){bS("expected_a_at_b_c",I,"",F,I.from)
}}function am(ax,F,cg){if(ax[F]!==cg){bS("expected_a_b",ax,cg,ax[F]);
return true}return false}aL=(function aL(){var ck,cm,co,F,cr,cn,cq;
function cp(){var cs;if(cr>=bE.length){return false
}ck=1;cq=bE[cr];cr+=1;cs=cq.search(/ \t/);if(cs>=0){aJ("mixed",cr,cs+1)
}cq=cq.replace(/\t/g,bJ);cs=cq.search(bc);if(cs>=0){aJ("unsafe",cr,cs)
}if(aA.maxlen&&aA.maxlen<cq.length){aJ("too_long",cr,cq.length)
}return true}function cg(ct,cu){var cv,cs;if(ct==="(string)"||ct==="(range)"){if(n.test(cu)){aJ("url",cr,co)
}}cs=Object.create(r[(ct==="(punctuator)"||(ct==="(identifier)"&&Object.prototype.hasOwnProperty.call(r,cu))?cu:ct)]||r["(error)"]);
if(ct==="(identifier)"){cs.identifier=true;if(cu==="__iterator__"||cu==="__proto__"){bn("reserved_a",cr,co,cu)
}else{if(!aA.nomen&&(cu.charAt(0)==="_"||cu.charAt(cu.length-1)==="_")){aJ("dangling_a",cr,co,cu)
}}}if(ct==="(number)"){cs.number=+cu}else{if(cu!==undefined){cs.string=String(cu)
}}cs.line=cr;cs.from=co;cs.thru=ck;cv=cs.id;q=cv&&(("(,=:[!&|?{};~+-*%^<>".indexOf(cv.charAt(cv.length-1))>=0)||cv==="return"||cv==="case");
return cs}function ch(cs){var ct=cs.exec(cq),cu;if(ct){F=ct[0].length;
cu=ct[1];cm=cu.charAt(0);cq=cq.slice(F);co=ck+F-cu.length;
ck+=F;return cu}}function cj(ct){var cx,cw=0,cv="",cs;
function cu(cz){var cy=parseInt(cq.substr(cw+1,cz),16);
cw+=cz;if(cy>=32&&cy<=126&&cy!==34&&cy!==92&&cy!==39){aJ("unexpected_a",cr,ck,"\\")
}ck+=cz;cx=String.fromCharCode(cy)}if(b1&&ct!=='"'){aJ("expected_a",cr,ck,'"')
}if(R===ct||(bY==="scriptstring"&&!R)){return cg("(punctuator)",ct)
}for(;;){while(cw>=cq.length){cw=0;if(bY!=="html"||!cp()){bn("unclosed",cr,co)
}}cx=cq.charAt(cw);if(cx===ct){ck+=1;cq=cq.slice(cw+1);
cs=cg("(string)",cv);cs.quote=ct;return cs}if(cx<" "){if(cx==="\n"||cx==="\r"){break
}aJ("control_a",cr,ck+cw,cq.slice(0,cw))}else{if(cx===R){aJ("bad_html",cr,ck+cw)
}else{if(cx==="<"){if(aA.safe&&bY==="html"){aJ("adsafe_a",cr,ck+cw,cx)
}else{if(cq.charAt(cw+1)==="/"&&(bY||aA.safe)){aJ("expected_a_b",cr,ck,"<\\/","</")
}else{if(cq.charAt(cw+1)==="!"&&(bY||aA.safe)){aJ("unexpected_a",cr,ck,"<!")
}}}}else{if(cx==="\\"){if(bY==="html"){if(aA.safe){aJ("adsafe_a",cr,ck+cw,cx)
}}else{if(bY==="styleproperty"){cw+=1;ck+=1;cx=cq.charAt(cw);
if(cx!==ct){aJ("unexpected_a",cr,ck,"\\")}}else{cw+=1;
ck+=1;cx=cq.charAt(cw);switch(cx){case"":if(!aA.es5){aJ("es5",cr,ck)
}cp();cw=-1;break;case R:aJ("bad_html",cr,ck+cw);break;
case"'":if(b1){aJ("unexpected_a",cr,ck,"\\'")}break;
case"u":cu(4);break;case"v":if(b1){aJ("unexpected_a",cr,ck,"\\v")
}cx="\v";break;case"x":if(b1){aJ("unexpected_a",cr,ck,"\\x")
}cu(2);break;default:if(typeof e[cx]!=="string"){aJ(cx>="0"&&cx<="7"?"octal_a":"unexpected_a",cr,ck,"\\"+cx)
}else{cx=e[cx]}}}}}}}}cv+=cx;ck+=1;cw+=1}}function ax(cs){var ct;
if(bY!=="style"&&bY!=="styleproperty"&&cq.charAt(0).isAlpha()){aJ("expected_space_a_b",cr,ck,cm,cq.charAt(0))
}if(cm==="0"){ct=cs.charAt(1);if(ct.isDigit()){if(az.id!=="."&&bY!=="styleproperty"){aJ("unexpected_a",cr,ck,cs)
}}else{if(b1&&(ct==="x"||ct==="X")){aJ("unexpected_a",cr,ck,"0x")
}}}if(cs.slice(cs.length-1)==="."){aJ("trailing_decimal_a",cr,ck,cs)
}if(bY!=="style"){ct=+cs;if(!isFinite(ct)){aJ("bad_number",cr,ck,cs)
}cs=ct}return cg("(number)",cs)}function ci(cs){if(o||b9||(bY&&bY!=="script"&&bY!=="style"&&bY!=="styleproperty")){aJ("unexpected_comment",cr,ck)
}else{if(bY==="script"&&/<\//i.test(cq)){aJ("unexpected_a",cr,ck,"</")
}else{if(aA.safe&&bL.test(cs)){aJ("dangerous_comment",cr,ck)
}else{if(!aA.todo&&a7.test(cs)){aJ("todo_comment",cr,ck)
}}}}}function cl(){var cC,cB,cu=0,cy=0,cz="",cx,cw,cv=0,cA,ct,cs,cD;
for(;;){cC=true;cm=cq.charAt(cv);cv+=1;switch(cm){case"":bn("unclosed_regexp",cr,co);
return;case"/":if(cy>0){aJ("unescaped_a",cr,co+cv,"/")
}cm=cq.slice(0,cv-1);ct=Object.create(z);for(;;){cw=cq.charAt(cv);
if(ct[cw]!==true){break}ct[cw]=false;cv+=1;cz+=cw}if(cq.charAt(cv).isAlpha()){bn("unexpected_a",cr,co,cq.charAt(cv))
}ck+=cv;cq=cq.slice(cv);cs=cq.charAt(0);if(cs==="/"||cs==="*"){bn("confusing_regexp",cr,co)
}cD=cg("(regexp)",cm);cD.flag=cz;return cD;case"\\":cm=cq.charAt(cv);
if(cm<" "){aJ("control_a",cr,co+cv,String(cm))}else{if(cm==="<"){aJ(A.unexpected_a,cr,co+cv,"\\")
}}cv+=1;break;case"(":cy+=1;cC=false;if(cq.charAt(cv)==="?"){cv+=1;
switch(cq.charAt(cv)){case":":case"=":case"!":cv+=1;
break;default:aJ(A.expected_a_b,cr,co+cv,":",cq.charAt(cv))
}}else{cu+=1}break;case"|":cC=false;break;case")":if(cy===0){aJ("unescaped_a",cr,co+cv,")")
}else{cy-=1}break;case" ":cn=1;while(cq.charAt(cv)===" "){cv+=1;
cn+=1}if(cn>1){aJ("use_braces",cr,co+cv,cn)}break;case"[":cm=cq.charAt(cv);
if(cm==="^"){cv+=1;if(!aA.regexp){aJ("insecure_a",cr,co+cv,cm)
}else{if(cq.charAt(cv)==="]"){bn("unescaped_a",cr,co+cv,"^")
}}}cB=false;if(cm==="]"){aJ("empty_class",cr,co+cv-1);
cB=true}klass:do{cm=cq.charAt(cv);cv+=1;switch(cm){case"[":case"^":aJ("unescaped_a",cr,co+cv,cm);
cB=true;break;case"-":if(cB){cB=false}else{aJ("unescaped_a",cr,co+cv,"-");
cB=true}break;case"]":if(!cB){aJ("unescaped_a",cr,co+cv-1,"-")
}break klass;case"\\":cm=cq.charAt(cv);if(cm<" "){aJ(A.control_a,cr,co+cv,String(cm))
}else{if(cm==="<"){aJ(A.unexpected_a,cr,co+cv,"\\")
}}cv+=1;cB=true;break;case"/":aJ("unescaped_a",cr,co+cv-1,"/");
cB=true;break;case"<":if(bY==="script"){cm=cq.charAt(cv);
if(cm==="!"||cm==="/"){aJ(A.html_confusion_a,cr,co+cv,cm)
}}cB=true;break;default:cB=true}}while(cm);break;case".":if(!aA.regexp){aJ("insecure_a",cr,co+cv,cm)
}break;case"]":case"?":case"{":case"}":case"+":case"*":aJ("unescaped_a",cr,co+cv,cm);
break;case"<":if(bY==="script"){cm=cq.charAt(cv);if(cm==="!"||cm==="/"){aJ(A.html_confusion_a,cr,co+cv,cm)
}}break}if(cC){switch(cq.charAt(cv)){case"?":case"+":case"*":cv+=1;
if(cq.charAt(cv)==="?"){cv+=1}break;case"{":cv+=1;cm=cq.charAt(cv);
if(cm<"0"||cm>"9"){aJ(A.expected_number_a,cr,co+cv,cm)
}cv+=1;cA=+cm;for(;;){cm=cq.charAt(cv);if(cm<"0"||cm>"9"){break
}cv+=1;cA=+cm+(cA*10)}cx=cA;if(cm===","){cv+=1;cx=Infinity;
cm=cq.charAt(cv);if(cm>="0"&&cm<="9"){cv+=1;cx=+cm;
for(;;){cm=cq.charAt(cv);if(cm<"0"||cm>"9"){break}cv+=1;
cx=+cm+(cx*10)}}}if(cq.charAt(cv)!=="}"){aJ(A.expected_a_b,cr,co+cv,"}",cm)
}else{cv+=1}if(cq.charAt(cv)==="?"){cv+=1}if(cA>cx){aJ(A.not_greater,cr,co+cv,cA,cx)
}break}}}cm=cq.slice(0,cv-1);ck+=cv;cq=cq.slice(cv);
return cg("(regexp)",cm)}return{init:function(cs){if(typeof cs==="string"){bE=cs.split(O)
}else{bE=cs}cr=0;cp();co=1},range:function(ct,cs){var cv,cu="";
co=ck;if(cq.charAt(0)!==ct){bn("expected_a_b",cr,ck,ct,cq.charAt(0))
}for(;;){cq=cq.slice(1);ck+=1;cv=cq.charAt(0);switch(cv){case"":bn("missing_a",cr,ck,cv);
break;case cs:cq=cq.slice(1);ck+=1;return cg("(range)",cu);
case R:case"\\":aJ("unexpected_a",cr,ck,cv);break}cu+=cv
}},token:function(){var cu,cs,ct;for(;;){while(!cq){if(!cp()){return cg("(end)")
}}while(bY==="outer"){cs=cq.search(bk);if(cs===0){break
}else{if(cs>0){ck+=cs;cq=cq.slice(cs);break}else{if(!cp()){return cg("(end)","")
}}}}ct=ch(aE[bY]||af);if(!ct){if(cq){if(cq.charAt(0)===" "){if(!aA.white){aJ("unexpected_a",cr,ck,"(space)")
}ck+=1;cq=""}else{bn("unexpected_a",cr,ck,cq.charAt(0))
}}}else{cu=ct.charAt(0);if(cu.isAlpha()||cu==="_"||cu==="$"){return cg("(identifier)",ct)
}if(cu.isDigit()){return ax(ct)}switch(ct){case'"':case"'":return cj(ct);
case"//":ci(cq);cq="";break;case"/*":for(;;){cs=cq.search(b6);
if(cs>=0){break}ci(cq);if(!cp()){bn("unclosed_comment",cr,ck)
}}ci(cq.slice(0,cs));ck+=cs+2;if(cq.charAt(cs)==="/"){bn("nested_comment",cr,ck)
}cq=cq.slice(cs+2);break;case"":break;case"/":if(az.id==="/="){bn(A.slash_equal,cr,co)
}return q?cl():cg("(punctuator)",ct);case"<!--":F=cr;
for(;;){cs=cq.indexOf("--");if(cs>=0){break}cs=cq.indexOf("<!");
if(cs>=0){bn("nested_comment",cr,ck+cs)}if(!cp()){bn("unclosed_comment",F,cu)
}}F=cq.indexOf("<!");if(F>=0&&F<cs){bn("nested_comment",cr,ck+F)
}ck+=cs;if(cq.charAt(cs+2)!==">"){bn("expected_a",cr,ck,"-->")
}ck+=3;cq=cq.slice(cs+3);break;case"#":if(bY==="html"||bY==="styleproperty"){for(;
;){cu=cq.charAt(0);if((cu<"0"||cu>"9")&&(cu<"a"||cu>"f")&&(cu<"A"||cu>"F")){break
}ck+=1;cq=cq.slice(1);ct+=cu}if(ct.length!==4&&ct.length!==7){aJ("bad_color_a",cr,co+F,ct)
}return cg("(color)",ct)}return cg("(punctuator)",ct);
default:if(bY==="outer"&&cu==="&"){ck+=1;cq=cq.slice(1);
for(;;){cu=cq.charAt(0);ck+=1;cq=cq.slice(1);if(cu===";"){break
}if(!((cu>="0"&&cu<="9")||(cu>="a"&&cu<="z")||cu==="#")){bn("bad_entity",cr,co+F,ck)
}}break}return cg("(punctuator)",ct)}}}}}}());function m(ax,cg,F){F=F||ax.string;
if(U===bm){if(aA.safe){bS("adsafe_a",ax,F)}if(typeof bm[F]!=="string"){ax.writeable=typeof cb[F]==="boolean"?cb[F]:true;
ax.funct=U;a2[F]=ax}if(cg==="becoming"){cg="var"}}else{if(typeof U[F]==="string"){if(U[F]==="undef"){if(!aA.undef){bS("used_before_a",ax,F)
}cg="var"}else{bS("already_defined",ax,F)}}else{ax.funct=U;
ax.writeable=true;B[F]=ax}}U[F]=cg}function aw(cg){var F,ax=0;
cg=cg||0;while(ax<=cg){F=ag[ax];if(!F){F=ag[ax]=aL.token()
}ax+=1}return F}function f(cg,F){if(j){if(a5&&I.line!==az.line){if((a5!==j||!I.edge)&&I.from===j.at-(I.edge?aA.indent:0)){var ax=j;
for(;;){ax.at-=aA.indent;if(ax===a5){break}ax=ax.was
}ax.open=false}a5=null}if(I.id==="?"&&j.mode===":"&&az.line!==I.line){j.at-=aA.indent
}if(j.open){if(I.edge){if(I.edge==="label"){b4(1)}else{if(I.edge==="case"||j.mode==="statement"){b4(j.at-aA.indent)
}else{if(j.mode!=="array"||I.line!==az.line){b4(j.at)
}}}}else{if(I.line!==az.line){if(I.from<j.at+(j.mode==="expression"?0:aA.indent)){b4(j.at+aA.indent)
}j.wrap=true}}}else{if(I.line!==az.line){if(I.edge){b4(j.at)
}else{j.wrap=true;if(j.mode==="statement"||j.mode==="var"){b4(j.at+aA.indent)
}else{if(I.from<j.at+(j.mode==="expression"?0:aA.indent)){b4(j.at+aA.indent)
}}}}}}switch(az.id){case"(number)":if(I.id==="."){bS("trailing_decimal_a")
}break;case"-":if(I.id==="-"||I.id==="--"){bS("confusing_a")
}break;case"+":if(I.id==="+"||I.id==="++"){bS("confusing_a")
}break}if(az.id==="(string)"||az.identifier){bb=az.string
}if(cg&&I.id!==cg){if(F){bS("expected_a_b_from_c_d",I,cg,F.id,F.line,ac())
}else{if(!I.identifier||I.string!==cg){bS("expected_a_b",I,cg,ac())
}}}bV=az;az=I;I=ag.shift()||aL.token()}function J(F){if(I.identifier&&I.string===F){f()
}else{bS("expected_a_b",I,F,ac())}}function aY(){if(aA.adsafe){aA.safe=true
}if(aA.safe){aA.browser=aA["continue"]=aA.css=aA.debug=aA.devel=aA.evil=aA.forin=aA.newcap=aA.nomen=aA.on=aA.rhino=aA.sloppy=aA.sub=aA.undef=aA.windows=false;
delete cb.Array;delete cb.Date;delete cb.Function;delete cb.Object;
delete cb["eval"];Z({ADSAFE:false,lib:false})}}function bh(){var F,ax;
for(;;){if(I.id!=="(string)"&&!I.identifier){return
}F=I.string;f();ax=false;if(I.id===":"){f(":");switch(I.id){case"true":ax=cb[F]!==false;
f("true");break;case"false":f("false");break;default:aR("unexpected_a")
}}cb[F]=ax;if(I.id!==","){return}f(",")}}function aG(){var F,ax;
while(I.id==="(string)"||I.identifier){F=I.string;if(!l[F]){aR("unexpected_a")
}f();if(I.id!==":"){aR("expected_a_b",I,":",ac())}f(":");
if(typeof l[F]==="number"){ax=I.number;if(ax>l[F]||ax<=0||Math.floor(ax)!==ax){aR("expected_small_a")
}aA[F]=ax}else{if(I.id==="true"){aA[F]=true}else{if(I.id==="false"){aA[F]=false
}else{aR("unexpected_a")}}}f();if(I.id===","){f(",")
}}bF()}function cf(){var F;aA.properties=true;for(;
;){if(I.id!=="(string)"&&!I.identifier){return}F=I.string;
f();if(I.id===":"){for(;;){f();if(I.id!=="(string)"&&!I.identifier){break
}}}aa[F]=0;if(I.id!==","){return}f(",")}}aP=function aP(){var cg=this.id,ax=o,F=j;
o=true;j=null;if(I.line===az.line&&I.from===az.thru){bS("missing_space_a_b",I,ac(az),ac())
}if(ag.length>0){bS("unexpected_a",this)}switch(cg){case"/*properties":case"/*property":case"/*members":case"/*member":cf();
break;case"/*jslint":if(aA.safe){bS("adsafe_a",this)
}aG();break;case"/*globals":case"/*global":if(aA.safe){bS("adsafe_a",this)
}bh();break;default:aR("unexpected_a",this)}o=ax;f("*/");
j=F};function ar(F){I.edge=j?j.open&&(F||"edge"):""
}function bU(ax){var F;if(typeof ax==="number"){j={at:+ax,open:true,was:j}
}else{if(!j){j={at:1,mode:"statement",open:true}}else{if(ax==="statement"){j={at:j.at,open:true,was:j}
}else{F=ax==="var"||I.line!==az.line;j={at:(F||ax==="control"?j.at+aA.indent:j.at)+(j.wrap?aA.indent:0),mode:ax,open:F,was:j};
if(ax==="var"&&F){a5=j}}}}}function bu(ax,F){if(ax){if(j&&j.open){j.at-=aA.indent;
ar()}f(ax,F)}if(j){j=j.was}}function bd(ax,F){ax=ax||az;
F=F||I;if(F.id!=="(end)"&&!aA.white&&(az.line!==F.line||az.thru+1!==F.from)){bS("expected_space_a_b",F,ac(az),ac(F))
}}function bv(ax,F){ax=ax||az;F=F||I;if(F.id!=="(end)"&&(ax.line!==F.line||(!aA.white&&ax.thru+1!==F.from))){bS("expected_space_a_b",F,ac(ax),ac(F))
}}function P(ax,F){ax=ax||az;F=F||I;if((!aA.white||bY==="styleproperty"||bY==="style")&&ax.thru!==F.from&&ax.line===F.line){bS("unexpected_space_a_b",F,ac(ax),ac(F))
}}function b5(ax,F){ax=ax||az;F=F||I;if(F.id!=="(end)"&&(ax.line!==F.line||(!aA.white&&ax.thru!==F.from))){bS("unexpected_space_a_b",F,ac(ax),ac(F))
}}function G(ax,F){if(!aA.white){ax=ax||az;F=F||I;if(ax.thru===F.from&&ax.line===F.line){bS("missing_space_a_b",F,ac(ax),ac(F))
}}}function aO(){if(I.id!==","){aJ("expected_a_b",az.line,az.thru,",",ac())
}else{if(!aA.white){b5()}f(",");G()}}function al(){if(I.id!==";"){aJ("expected_a_b",az.line,az.thru,";",ac())
}else{if(!aA.white){b5()}f(";");if(bi[I.id]!==true){G()
}}}function w(){if(I.string==="use strict"){if(bA){bS("unnecessary_use")
}ar();f();al();bA=true;aA.undef=false;return true}return false
}function a8(ax,F){if(ax===F){return true}if(Array.isArray(ax)){if(Array.isArray(F)&&ax.length===F.length){var cg;
for(cg=0;cg<ax.length;cg+=1){if(!a8(ax[cg],F[cg])){return false
}}return true}return false}if(Array.isArray(F)){return false
}if(ax.id==="(number)"&&F.id==="(number)"){return ax.number===F.number
}if(ax.arity===F.arity&&ax.string===F.string){switch(ax.arity){case"prefix":case"suffix":case undefined:return ax.id===F.id&&a8(ax.first,F.first)&&ax.id!=="{"&&ax.id!=="[";
case"infix":return a8(ax.first,F.first)&&a8(ax.second,F.second);
case"ternary":return a8(ax.first,F.first)&&a8(ax.second,F.second)&&a8(ax.third,F.third);
case"function":case"regexp":return false;default:return true
}}else{if(ax.id==="."&&F.id==="["&&F.arity==="infix"){return ax.second.string===F.second.string&&F.second.id==="(string)"
}if(ax.id==="["&&ax.arity==="infix"&&F.id==="."){return ax.second.string===F.second.string&&ax.second.id==="(string)"
}}return false}function a(F,ax){var cg;if(I.id==="(end)"){aR("unexpected_a",az,I.id)
}f();if(aA.safe&&B[az.string]&&B[az.string]===a2[az.string]&&(I.id!=="("&&I.id!==".")){bS("adsafe_a",az)
}if(ax){bb="anonymous";U["(verb)"]=az.string}if(ax===true&&az.fud){cg=az.fud()
}else{if(az.nud){cg=az.nud()}else{if(I.id==="(number)"&&az.id==="."){bS("leading_decimal_a",az,ac());
f()}aR("expected_identifier_a",az,az.id)}while(F<I.lbp){f();
if(az.led){cg=az.led(cg)}else{aR("expected_operator_a",az,az.id)
}}}return cg}function cd(ax,cg){var F=r[ax];if(!F||typeof F!=="object"){r[ax]=F={id:ax,lbp:cg||0,string:ax}
}return F}function bG(F){F.postscript=true;return F
}function aW(ax){var F=cd(ax,0);F.from=1;F.thru=1;F.line=0;
F.edge="edge";F.string=ax;return bG(F)}function bq(ax,cg){var F=cd(ax);
F.identifier=F.reserved=true;F.fud=cg;return F}function bT(ax,cg){var F=bq(ax,cg);
F.labeled=true}function bQ(ax,cg){var F=bq(ax,cg);F.disrupt=true
}function a0(F){var ax=F.id.charAt(0);if((ax>="a"&&ax<="z")||(ax>="A"&&ax<="Z")){F.identifier=F.reserved=true
}return F}function bO(ax,cg){var F=cd(ax,150);a0(F);
F.nud=function(){var ch=this;ch.arity="prefix";if(typeof cg==="function"){ch=cg(ch);
if(ch.arity!=="prefix"){return ch}}else{if(ax==="typeof"){bd()
}else{b5()}ch.first=a(150)}switch(ch.id){case"++":case"--":if(!aA.plusplus){bS("unexpected_a",ch)
}else{if((!ch.first.identifier||ch.first.reserved)&&ch.first.id!=="."&&ch.first.id!=="["){bS("bad_operand",ch)
}}break;default:if(ch.first.arity==="prefix"||ch.first.arity==="function"){bS("unexpected_a",ch)
}}return ch};return F}function H(ch,cg,ax){var F=cd(ch);
F.arity=cg;if(ax){F.nud=ax}return F}function h(ax,cg){var F=cd(ax);
F.identifier=F.reserved=true;if(typeof cg==="function"){F.nud=cg
}return F}function bw(ax){var F=h(ax);F.string=ax;F.nud=C;
return F}function X(ax,F){return h(ax,function(){if(typeof F==="function"){F(this)
}return this})}function aI(cg,ci,ch,ax){var F=cd(cg,ci);
a0(F);F.led=function(cj){this.arity="infix";if(!ax){G(bV,az);
G()}if(!aA.bitwise&&this.bitwise){bS("unexpected_a",this)
}if(typeof ch==="function"){return ch(cj,this)}this.first=cj;
this.second=a(ci);return this};return F}function a3(ax,F){if(ax.assign){bS(F||A.conditional_assignment,ax)
}return ax}function Y(ax,F){switch(ax.id){case"[":case"-":if(ax.arity!=="infix"){bS(F||A.weird_condition,ax)
}break;case"false":case"function":case"Infinity":case"NaN":case"null":case"true":case"undefined":case"void":case"(number)":case"(regexp)":case"(string)":case"{":bS(F||A.weird_condition,ax);
break;case"(":if(ax.first.id==="new"||(ax.first.string==="Boolean")||(ax.first.id==="."&&y[ax.first.second.string]===true)){bS(F||A.weird_condition,ax)
}break}return ax}function aF(F){switch(F.arity){case"prefix":switch(F.id){case"{":case"[":bS("unexpected_a",F);
break;case"!":bS("confusing_a",F);break}break;case"function":case"regexp":bS("unexpected_a",F);
break;default:if(F.id==="NaN"){bS("isNaN",F)}}return F
}function b0(ax,F){return aI(ax,100,function(ci,ch){aF(ci);
if(F&&!aA.eqeq){bS("expected_a_b",ch,F,ch.id)}var cg=a(100);
if(a8(ci,cg)||((ci.id==="(string)"||ci.id==="(number)")&&(cg.id==="(string)"||cg.id==="(number)"))){bS("weird_relation",ch)
}else{if(ci.id==="typeof"){if(cg.id!=="(string)"){bS("expected_string_a",cg,cg.id==="(number)"?cg.number:cg.string)
}else{if(cg.string==="undefined"||cg.string==="null"){bS("unexpected_typeof_a",ci,cg.string)
}}}}ch.first=ci;ch.second=aF(cg);return ch})}function be(ax,cg){var F=aI(ax,20,function(cj,ci){var ch;
ci.first=cj;if(cj.identifier){if(B[cj.string]){if(B[cj.string].writeable===false){bS("read_only",cj)
}}else{aR("read_only")}if(U["(params)"]){U["(params)"].forEach(function(ck){if(ck.string===cj.string){ck.assign=true
}})}}else{if(aA.safe){ch=cj;do{if(typeof cb[ch.string]==="boolean"){bS("adsafe_a",ch)
}ch=ch.first}while(ch)}}if(cj===r["function"]){bS("identifier_function",az)
}if(cj.id==="."||cj.id==="["){if(!cj.first||cj.first.string==="arguments"){bS("bad_assignment",ci)
}}else{if(cj.identifier){if(!cj.reserved&&U[cj.string]==="exception"){bS("assign_exception",cj)
}}else{bS("bad_assignment",ci)}}ci.second=a(19);if(ci.id==="="&&a8(ci.first,ci.second)){bS("weird_assignment",ci)
}return ci});F.assign=true;if(cg){if(r[cg].bitwise){F.bitwise=true
}}return F}function b2(ax,cg){var F=aI(ax,cg,"number");
F.bitwise=true;return F}function b(ax){var F=cd(ax,150);
F.led=function(cg){b5(bV,az);if(!aA.plusplus){bS("unexpected_a",this)
}else{if((!cg.identifier||cg.reserved)&&cg.id!=="."&&cg.id!=="["){bS("bad_operand",this)
}}this.first=cg;this.arity="suffix";return this};return F
}function a1(){if(I.identifier){f();if(aA.safe&&ad[az.string]){bS("adsafe_a",az)
}else{if(az.reserved&&!aA.es5){bS("expected_identifier_a_reserved",az)
}}return az.string}}function aj(){var F=a1();if(!F){aR(az.id==="function"&&I.id==="("?"name_function":"expected_identifier_a")
}return F}function aM(){var cg,ax=B,F;if(I.id===";"){bS("unexpected_a");
al();return}if(I.identifier&&!I.reserved&&aw().id===":"){ar("label");
cg=I;f();f(":");B=Object.create(ax);m(cg,"label");if(I.labeled!==true||U===bm){aR("unexpected_label_a",cg)
}else{if(n.test(cg.string+":")){bS("url",cg)}}I.label=cg
}if(az.id!=="else"){ar()}bU("statement");F=a(0,true);
if(F){if(F.arity==="statement"){if(F.id==="switch"||(F.block&&F.id!=="do")){G()
}else{al()}}else{if(F.id==="("){if(F.first.id==="new"){bS("bad_new")
}}else{if(!F.assign&&F.id!=="delete"&&F.id!=="++"&&F.id!=="--"){bS("assignment_function_expression",F)
}}al()}}bu();B=ax;return F}function ae(){var cg=[],ax,F;
while(I.postscript!==true){if(I.id===";"){bS("unexpected_a",I);
al()}else{if(I.string==="use strict"){if((!aX&&bY!=="script")||U!==bm||cg.length>0){bS("function_strict")
}w()}if(ax){bS("unreachable_a_b",I,I.string,ax.string);
ax=null}F=aM();if(F){cg.push(F);if(F.disrupt){ax=F;
cg.disrupt=true}}}}return cg}function ca(cg){var cj,ax=I,ci=aV,F=B,ch=bA;
aV=cg;B=Object.create(B);G();if(I.id==="{"){f("{");
bU();if(!cg&&!w()&&!ch&&!aA.sloppy&&U["(context)"]===bm){bS("missing_use_strict")
}cj=ae();bA=ch;bu("}",ax)}else{if(!cg){aR("expected_a_b",I,"{",ac())
}else{bS("expected_a_b",I,"{",ac());cj=[aM()];cj.disrupt=cj[0].disrupt
}}U["(verb)"]=null;B=F;aV=ci;if(cg&&cj.length===0){bS("empty_block")
}return cj}function bK(F){if(aA.properties&&typeof aa[F]!=="number"){bS("unexpected_property_a",az,F)
}if(typeof aa[F]==="number"){aa[F]+=1}else{aa[F]=1}}r["(identifier)"]={id:"(identifier)",lbp:0,identifier:true,nud:function(){var cg=this.string,ax=B[cg],F,ch;
if(typeof ax!=="object"){ch=cb[cg];if(typeof ch==="boolean"){a2[cg]=ax={string:cg,writeable:ch,funct:bm};
bm[cg]="var"}else{if(!aA.undef){bS("used_before_a",az)
}B[cg]=ax={string:cg,writeable:true,funct:U};U[cg]="undef"
}}F=ax.funct;if(U===F){switch(U[cg]){case"becoming":bS("unexpected_a",az);
U[cg]="var";break;case"unused":U[cg]="var";break;case"unparam":U[cg]="parameter";
break;case"unction":U[cg]="function";break;case"label":bS("a_label",az,cg);
break}}else{switch(U[cg]){case"closure":case"function":case"var":case"unused":bS("a_scope",az,cg);
break;case"label":bS("a_label",az,cg);break;case"outer":case"global":break;
default:switch(F[cg]){case"becoming":case"closure":case"function":case"parameter":case"unction":case"unused":case"var":F[cg]="closure";
U[cg]=F===bm?"global":"outer";break;case"unparam":F[cg]="parameter";
U[cg]="outer";break;case"undef":U[cg]="undef";break;
case"label":bS("a_label",az,cg);break}}}return this
},led:function(){aR("expected_operator_a")}};H("(array)","array");
H("(color)","color");H("(function)","function");H("(number)","number",C);
H("(object)","object");H("(string)","string",C);H("(boolean)","boolean",C);
H("(range)","range");H("(regexp)","regexp",C);aW("(begin)");
aW("(end)");aW("(error)");bG(cd("</"));cd("<!");cd("<!--");
cd("-->");bG(cd("}"));cd(")");cd("]");bG(cd('"'));bG(cd("'"));
cd(";");cd(":");cd(",");cd("#");cd("@");cd("*/");bG(h("case"));
h("catch");bG(h("default"));h("else");h("finally");
X("arguments",function(F){if(bA&&U===bm){bS("strict",F)
}else{if(aA.safe){bS("adsafe_a",F)}}U["(arguments)"]=true
});X("eval",function(F){if(aA.safe){bS("adsafe_a",F)
}});bw("false","boolean");bw("Infinity","number");bw("NaN","number");
bw("null","");X("this",function(F){if(aA.safe){bS("adsafe_a",F)
}else{if(bA&&U["(token)"]&&(U["(token)"].arity==="statement"&&U["(name)"].charAt(0)>"Z")){bS("strict",F)
}}});bw("true","boolean");bw("undefined","");aI("?",30,function(cg,ax){bU("?");
ax.first=Y(a3(cg));ax.second=a(0);G();bu();var F=I;
f(":");bU(":");G();ax.third=a(10);ax.arity="ternary";
if(a8(ax.second,ax.third)){bS("weird_ternary",F)}else{if(a8(ax.first,ax.second)){bS("use_or",ax)
}}bu();return ax});aI("||",40,function(cg,ax){function F(ch){if(ch.id==="&&"&&!ch.paren){bS("and",ch)
}return ch}ax.first=F(Y(a3(cg)));ax.second=F(a3(a(40)));
if(a8(ax.first,ax.second)){bS("weird_condition",ax)
}return ax});aI("&&",50,function(ax,F){F.first=Y(a3(ax));
F.second=a3(a(50));if(a8(F.first,F.second)){bS("weird_condition",F)
}return F});bO("void",function(F){F.first=a(0);if(aA.es5||bA){bS("expected_a_b",F,"undefined","void")
}else{if(F.first.number!==0){bS("expected_a_b",F.first,"0",ac(F.first))
}}return F});b2("|",70);b2("^",80);b2("&",90);b0("==","===");
b0("===");b0("!=","!==");b0("!==");b0("<");b0(">");
b0("<=");b0(">=");b2("<<",120);b2(">>",120);b2(">>>",120);
aI("in",120,function(ax,F){bS("infix_in",F);F.left=ax;
F.right=a(130);return F});aI("instanceof",120);aI("+",130,function(cg,ax){if(cg.id==="(number)"){if(cg.number===0){bS("unexpected_a",cg,"0")
}}else{if(cg.id==="(string)"){if(cg.string===""){bS("expected_a_b",cg,"String","''")
}}}var F=a(130);if(F.id==="(number)"){if(F.number===0){bS("unexpected_a",F,"0")
}}else{if(F.id==="(string)"){if(F.string===""){bS("expected_a_b",F,"String","''")
}}}if(cg.id===F.id){if(cg.id==="(string)"||cg.id==="(number)"){if(cg.id==="(string)"){cg.string+=F.string;
if(n.test(cg.string)){bS("url",cg)}}else{cg.number+=F.number
}cg.thru=F.thru;return cg}}ax.first=cg;ax.second=F;
return ax});bO("+");bO("+++",function(){bS("confusing_a",az);
this.first=a(150);this.arity="prefix";return this});
aI("+++",130,function(F){bS("confusing_a",az);this.first=F;
this.second=a(130);return this});aI("-",130,function(cg,ax){if((cg.id==="(number)"&&cg.number===0)||cg.id==="(string)"){bS("unexpected_a",cg)
}var F=a(130);if((F.id==="(number)"&&F.number===0)||F.id==="(string)"){bS("unexpected_a",F)
}if(cg.id===F.id&&cg.id==="(number)"){cg.number-=F.number;
cg.thru=F.thru;return cg}ax.first=cg;ax.second=F;return ax
});bO("-");bO("---",function(){bS("confusing_a",az);
this.first=a(150);this.arity="prefix";return this});
aI("---",130,function(F){bS("confusing_a",az);this.first=F;
this.second=a(130);return this});aI("*",140,function(cg,ax){if((cg.id==="(number)"&&(cg.number===0||cg.number===1))||cg.id==="(string)"){bS("unexpected_a",cg)
}var F=a(140);if((F.id==="(number)"&&(F.number===0||F.number===1))||F.id==="(string)"){bS("unexpected_a",F)
}if(cg.id===F.id&&cg.id==="(number)"){cg.number*=F.number;
cg.thru=F.thru;return cg}ax.first=cg;ax.second=F;return ax
});aI("/",140,function(cg,ax){if((cg.id==="(number)"&&cg.number===0)||cg.id==="(string)"){bS("unexpected_a",cg)
}var F=a(140);if((F.id==="(number)"&&(F.number===0||F.number===1))||F.id==="(string)"){bS("unexpected_a",F)
}if(cg.id===F.id&&cg.id==="(number)"){cg.number/=F.number;
cg.thru=F.thru;return cg}ax.first=cg;ax.second=F;return ax
});aI("%",140,function(cg,ax){if((cg.id==="(number)"&&(cg.number===0||cg.number===1))||cg.id==="(string)"){bS("unexpected_a",cg)
}var F=a(140);if((F.id==="(number)"&&F.number===0)||F.id==="(string)"){bS("unexpected_a",F)
}if(cg.id===F.id&&cg.id==="(number)"){cg.number%=F.number;
cg.thru=F.thru;return cg}ax.first=cg;ax.second=F;return ax
});b("++");bO("++");b("--");bO("--");bO("delete",function(F){bd();
var ax=a(0);if(!ax||(ax.id!=="."&&ax.id!=="[")){bS("deleted")
}F.first=ax;return F});bO("~",function(F){b5();if(!aA.bitwise){bS("unexpected_a",F)
}F.first=a(150);return F});function bC(F){b5();F.first=Y(a(150));
if(bf[F.first.id]===F||F.first.assign){bS("confusing_a",F)
}return F}bO("!",bC);bO("!!",bC);bO("typeof");bO("new",function(ax){bd();
var ci=a(160),ch,cg,F;ax.first=ci;if(ci.id!=="function"){if(ci.identifier){switch(ci.string){case"Object":bS("use_object",az);
break;case"Array":if(I.id==="("){cg=I;cg.first=this;
f("(");if(I.id!==")"){ch=a(0);cg.second=[ch];if(ch.id!=="(number)"||I.id===","){bS("use_array",cg)
}while(I.id===","){f(",");cg.second.push(a(0))}}else{bS("use_array",az)
}f(")",cg);return cg}bS("use_array",az);break;case"Number":case"String":case"Boolean":case"Math":case"JSON":bS("not_a_constructor",ci);
break;case"Function":if(!aA.evil){bS("function_eval")
}break;case"Date":case"RegExp":case"this":break;default:if(ci.id!=="function"){F=ci.string.charAt(0);
if(!aA.newcap&&(F<"A"||F>"Z")){bS("constructor_name_a",az)
}}}}else{if(ci.id!=="."&&ci.id!=="["&&ci.id!=="("){bS("bad_constructor",az)
}}}else{bS("weird_new",ax)}if(I.id!=="("){bS("missing_a",I,"()")
}return ax});aI("(",160,function(ch,F){var cg,ax;if(j&&j.mode==="expression"){P(bV,az)
}else{b5(bV,az)}if(!ch.immed&&ch.id==="function"){bS("wrap_immediate")
}ax=[];if(ch.identifier){if(ch.string.match(/^[A-Z]([A-Z0-9_$]*[a-z][A-Za-z0-9_$]*)?$/)){if(ch.string!=="Number"&&ch.string!=="String"&&ch.string!=="Boolean"&&ch.string!=="Date"){if(ch.string==="Math"||ch.string==="JSON"){bS("not_a_function",ch)
}else{if(ch.string==="Object"){bS("use_object",az)}else{if(ch.string==="Array"||!aA.newcap){bS("missing_a",ch,"new")
}}}}}}else{if(ch.id==="."){if(aA.safe&&ch.first.string==="Math"&&ch.second==="random"){bS("adsafe_a",ch)
}else{if(ch.second.string==="split"&&ch.first.id==="(string)"){bS("use_array",ch.second)
}}}}bU();if(I.id!==")"){P();for(;;){ar();cg=a(10);if(ch.string==="Boolean"&&(cg.id==="!"||cg.id==="~")){bS("weird_condition",cg)
}ax.push(cg);if(I.id!==","){break}aO()}}P();bu(")",F);
if(typeof ch==="object"){if(ch.string==="parseInt"&&ax.length===1){bS("radix",ch)
}else{if(ch.string==="String"&&ax.length>=1&&ax[0].id==="(string)"){bS("unexpected_a",ch)
}}if(!aA.evil){if(ch.string==="eval"||ch.string==="Function"||ch.string==="execScript"){bS("evil",ch)
}else{if(ax[0]&&ax[0].id==="(string)"&&(ch.string==="setTimeout"||ch.string==="setInterval")){bS("implied_evil",ch)
}}}if(!ch.identifier&&ch.id!=="."&&ch.id!=="["&&ch.id!=="("&&ch.id!=="&&"&&ch.id!=="||"&&ch.id!=="?"){bS("bad_invocation",ch)
}if(ch.id==="."){if(ax.length>0&&ch.first&&ch.first.first&&a8(ax[0],ch.first.first)){if(ch.second.string==="call"||(ch.second.string==="apply"&&(ax.length===1||(ax[1].arity==="prefix"&&ax[1].id==="[")))){bS("unexpected_a",ch.second)
}}if(ch.second.string==="toString"){if(ch.first.id==="(string)"||ch.first.id==="(number)"){bS("unexpected_a",ch.second)
}}}}F.first=ch;F.second=ax;return F},true);bO("(",function(F){bU("expression");
P();ar();if(I.id==="function"){I.immed=true}var ax=a(0);
ax.paren=true;P();bu(")",F);if(ax.id==="function"){switch(I.id){case"(":bS("move_invocation");
break;case".":case"[":bS("unexpected_a");break;default:bS("bad_wrap",F)
}}return ax});aI(".",170,function(cg,ax){P(bV,az);P();
var F=aj();if(typeof F==="string"){bK(F)}ax.first=cg;
ax.second=az;if(cg&&cg.string==="arguments"&&(F==="callee"||F==="caller")){bS("avoid_a",cg,"arguments."+F)
}else{if(!aA.evil&&cg&&cg.string==="document"&&(F==="write"||F==="writeln")){bS("write_is_wrong",cg)
}else{if(!aA.stupid&&ak.test(F)){bS("sync_a",az)}else{if(aA.adsafe){if(!bj&&cg.string==="ADSAFE"){if(F==="id"||F==="lib"){bS("adsafe_a",ax)
}else{if(F==="go"){if(bY!=="script"){bS("adsafe_a",ax)
}else{if(t||I.id!=="("||aw(0).id!=="(string)"||aw(0).string!==k||aw(1).id!==","){aR("adsafe_a",ax,"go")
}}t=true;ap=false}}}bj=false}}}}if(!aA.evil&&(F==="eval"||F==="execScript")){bS("evil")
}else{if(aA.safe){for(;;){if(ad[F]===true){bS("adsafe_a",az,F)
}if(typeof cb[cg.string]!=="boolean"||I.id==="("){break
}if(I.id!=="."){bS("adsafe_a",ax);break}f(".");az.first=ax;
az.second=F;ax=az;F=aj();if(typeof F==="string"){bK(F)
}}}}return ax},true);aI("[",170,function(ch,ax){var cg,F;
b5(bV,az);P();bU();ar();cg=a(0);switch(cg.id){case"(number)":if(cg.id==="(number)"&&ch.id==="arguments"){bS("use_param",ch)
}break;case"(string)":if(aA.safe&&(ad[cg.string]||cg.string.charAt(0)==="_"||cg.string.slice(-1)==="_")){bS("adsafe_subscript_a",cg)
}else{if(!aA.evil&&(cg.string==="eval"||cg.string==="execScript")){bS("evil",cg)
}else{if(!aA.sub&&D.test(cg.string)){F=r[cg.string];
if(!F||!F.reserved){bS("subscript",cg)}}}}bK(cg.string);
break;default:if(aA.safe){if((cg.id!=="+"||cg.arity!=="prefix")&&cg.id!=="-"&&cg.id!=="*"){bS("adsafe_subscript_a",cg)
}}}bu("]",ax);P(bV,az);ax.first=ch;ax.second=cg;return ax
},true);bO("[",function(F){F.first=[];bU("array");while(I.id!=="(end)"){while(I.id===","){bS("unexpected_a",I);
f(",")}if(I.id==="]"){break}j.wrap=false;ar();F.first.push(a(10));
if(I.id===","){aO();if(I.id==="]"&&!aA.es5){bS("unexpected_a",az);
break}}else{break}}bu("]",F);return F},170);function an(){var F=a1(true);
if(!F){if(I.id==="(string)"){F=I.string;if(aA.safe){if(ad[F]){bS("adsafe_a")
}else{if(F.charAt(0)==="_"||F.charAt(F.length-1)==="_"){bS("dangling_a")
}}}f()}else{if(I.id==="(number)"){F=I.number.toString();
f()}}}return F}function a9(){var cg,F=I,ax=[];f("(");
bU();P();if(I.id===")"){P();bu(")",F);return ax}for(;
;){ar();cg=aj();ax.push(az);m(az,aA.unparam?"parameter":"unparam");
if(I.id===","){aO()}else{P();bu(")",F);return ax}}}function aZ(cg,ax){var ch=U,ci=aA,F=B;
U={"(name)":ax||"'"+(bb||"").replace(by,bo)+"'","(line)":I.line,"(context)":ch,"(breakage)":0,"(loopage)":0,"(scope)":B,"(token)":cg};
aA=Object.create(ci);B=Object.create(F);bH.push(U);
cg.name=ax;if(ax){m(cg,"function",ax)}cg.writeable=false;
cg.first=U["(params)"]=a9();bd();cg.block=ca(false);
if(U["(arguments)"]){cg.first.forEach(function(cj){if(cj.assign){bS("parameter_arguments_a",cj,cj.string)
}})}U=ch;aA=ci;B=F}be("=");be("+=","+");be("-=","-");
be("*=","*");be("/=","/").nud=function(){aR("slash_equal")
};be("%=","%");be("&=","&");be("|=","|");be("^=","^");
be("<<=","<<");be(">>=",">>");be(">>>=",">>>");bO("{",function(cj){var ch,ci,cg,ax,ck,cl,F={};
cj.first=[];bU();while(I.id!=="}"){j.wrap=false;ar();
if(I.string==="get"&&aw().id!==":"){if(!aA.es5){bS("es5")
}ch=I;f("get");bv();ax=I;ci=an();if(!ci){aR("missing_property")
}ch.string="";aZ(ch);if(U["(loopage)"]){bS("function_loop",ch)
}ck=ch.first;if(ck&&ck.length){bS("parameter_a_get_b",ck[0],ck[0].string,ci)
}aO();cl=I;G();ar();f("set");cl.string="";bv();cg=an();
if(ci!==cg){aR("expected_a_b",az,ci,cg||I.string)}aZ(cl);
if(cl.block.length===0){bS("missing_a",az,"throw")}ck=cl.first;
if(!ck||ck.length!==1){aR("parameter_set_a",cl,"value")
}else{if(ck[0].string!=="value"){aR("expected_a_b",ck[0],"value",ck[0].string)
}}ax.first=[ch,cl]}else{ax=I;ci=an();if(typeof ci!=="string"){aR("missing_property")
}f(":");G();ax.first=a(10)}cj.first.push(ax);if(F[ci]===true){bS("duplicate_a",I,ci)
}F[ci]=true;bK(ci);if(I.id!==","){break}for(;;){aO();
if(I.id!==","){break}bS("unexpected_a",I)}if(I.id==="}"&&!aA.es5){bS("unexpected_a",az)
}}bu("}",cj);return cj});bq("{",function(){bS("statement_block");
this.arity="statement";this.block=ae();this.disrupt=this.block.disrupt;
f("}",this);return this});bq("/*global",aP);bq("/*globals",aP);
bq("/*jslint",aP);bq("/*member",aP);bq("/*members",aP);
bq("/*property",aP);bq("/*properties",aP);bq("var",function(){var F,cg,ax;
if(U["(vars)"]&&!aA.vars){bS("combine_var")}else{if(U!==bm){U["(vars)"]=true
}}this.arity="statement";this.first=[];bU("var");for(;
;){ax=I;cg=aj();m(ax,"becoming");if(I.id==="="){F=I;
F.first=ax;G();f("=");G();if(I.id==="undefined"){bS("unnecessary_initialize",az,cg)
}if(aw(0).id==="="&&I.identifier){aR("var_a_not")}F.second=a(0);
F.arity="infix";this.first.push(F)}else{this.first.push(ax)
}if(U[cg]==="becoming"){U[cg]="unused"}if(I.id!==","){break
}aO();j.wrap=false;if(a5&&I.line===az.line&&this.first.length===1){a5=null;
j.open=false;j.at-=aA.indent}G();ar()}a5=null;bu();
return this});bq("function",function(){bd();if(aV){bS("function_block",az)
}var F=I,ax=aj();m(F,"unction");P();this.arity="statement";
aZ(this,ax);if(I.id==="("&&I.line===az.line){aR("function_statement")
}return this});bO("function",function(F){if(!aA.anon){bd()
}var ax=a1();if(ax){P()}else{ax=""}aZ(F,ax);if(U["(loopage)"]){bS("function_loop")
}switch(I.id){case";":case"(":case")":case",":case"]":case"}":case":":break;
case".":if(aw().string!=="bind"||aw(1).id!=="("){bS("unexpected_a")
}break;default:aR("unexpected_a")}F.arity="function";
return F});bq("if",function(){var F=I;bd();f("(");bU("control");
P();ar();this.arity="statement";this.first=Y(a3(a(0)));
P();bu(")",F);bd();this.block=ca(true);if(I.id==="else"){bd();
f("else");bd();this["else"]=I.id==="if"||I.id==="switch"?aM(true):ca(true);
if(this["else"].disrupt&&this.block.disrupt){this.disrupt=true
}}return this});bq("try",function(){var ax,F,cg;if(aA.adsafe){bS("adsafe_a",this)
}bd();this.arity="statement";this.block=ca(false);if(I.id==="catch"){bd();
f("catch");bd();cg=I;f("(");bU("control");P();ar();
F=B;B=Object.create(F);ax=I.string;this.first=ax;if(!I.identifier){bS("expected_identifier_a",I)
}else{m(I,"exception")}f();P();bu(")",cg);bd();this.second=ca(false);
B=F}if(I.id==="finally"){bd();f("finally");bd();this.third=ca(false)
}else{if(!this.second){aR("expected_a_b",I,"catch",ac())
}}return this});bT("while",function(){bd();var F=I;
U["(breakage)"]+=1;U["(loopage)"]+=1;f("(");bU("control");
P();ar();this.arity="statement";this.first=a3(a(0));
if(this.first.id!=="true"){Y(this.first,A.unexpected_a)
}P();bu(")",F);bd();this.block=ca(true);if(this.block.disrupt){bS("strange_loop",bV)
}U["(breakage)"]-=1;U["(loopage)"]-=1;return this});
h("with");bT("switch",function(){var ax=[],ch=aV,cj,ci=I,cg=true;
function F(ck){if(a8(cj,ck)){bS("duplicate_a",ck)}}U["(breakage)"]+=1;
bd();f("(");P();bU();this.arity="statement";this.first=Y(a3(a(0)));
P();bu(")",ci);bd();f("{");bU();aV=true;this.second=[];
while(I.id==="case"){ci=I;ax.forEach(F);ci.first=[];
ci.arity="case";G();ar("case");f("case");for(;;){bd();
cj=a(0);ax.forEach(F);ax.push(cj);ci.first.push(cj);
if(cj.id==="NaN"){bS("unexpected_a",cj)}b5();f(":");
if(I.id!=="case"){break}G();ar("case");f("case")}G();
ci.second=ae();if(ci.second&&ci.second.length>0){cj=ci.second[ci.second.length-1];
if(cj.disrupt){if(cj.id==="break"){cg=false}}else{bS("missing_a_after_b",I,"break","case")
}}else{bS("empty_case")}this.second.push(ci)}if(this.second.length===0){bS("missing_a",I,"case")
}if(I.id==="default"){G();ci=I;ci.arity="case";ar("case");
f("default");b5();f(":");G();ci.second=ae();if(ci.second&&ci.second.length>0){cj=ci.second[ci.second.length-1];
if(cg&&cj.disrupt&&cj.id!=="break"){this.disrupt=true
}}this.second.push(ci)}U["(breakage)"]-=1;G();bu("}",this);
aV=ch;return this});bq("debugger",function(){if(!aA.debug){bS("unexpected_a",this)
}this.arity="statement";return this});bT("do",function(){U["(breakage)"]+=1;
U["(loopage)"]+=1;bd();this.arity="statement";this.block=ca(true);
if(this.block.disrupt){bS("strange_loop",bV)}bd();f("while");
var F=I;bd();f("(");bU();P();ar();this.first=Y(a3(a(0)),A.unexpected_a);
P();bu(")",F);U["(breakage)"]-=1;U["(loopage)"]-=1;
return this});bT("for",function(){var ax,ch,F=false,cg=I,ci;
this.arity="statement";U["(breakage)"]+=1;U["(loopage)"]+=1;
f("(");if(I.id===";"){P();f(";");P();f(";");P();f(")");
ax=ca(true)}else{bU("control");G(this,cg);P();if(I.id==="var"){bS("move_var");
f();if(typeof U[I.string]==="string"){bS("already_defined",I,I.string)
}else{U[I.string]="unused";B[I.string]={funct:U,string:I.string,writable:true}
}}ar();if(aw(0).id==="in"){this.forin=true;ci=I;switch(U[ci.string]){case"unused":U[ci.string]="var";
break;case"closure":case"var":break;default:bS("bad_in_a",ci)
}f();f("in");this.first=ci;this.second=a(20);bu(")",cg);
ax=ca(true);if(!aA.forin){if(ax.length===1&&typeof ax[0]==="object"&&ax[0].string==="if"&&!ax[0]["else"]){ch=ax[0].first;
while(ch.id==="&&"){ch=ch.first}switch(ch.id){case"===":case"!==":F=ch.first.id==="["?ch.first.first.string===this.second.string&&ch.first.second.string===this.first.string:ch.first.id==="typeof"&&ch.first.first.id==="["&&ch.first.first.first.string===this.second.string&&ch.first.first.second.string===this.first.string;
break;case"(":F=ch.first.id==="."&&((ch.first.first.string===this.second.string&&ch.first.second.string==="hasOwnProperty"&&ch.second[0].string===this.first.string)||(ch.first.first.string==="ADSAFE"&&ch.first.second.string==="has"&&ch.second[0].string===this.second.string&&ch.second[1].string===this.first.string)||(ch.first.first.id==="."&&ch.first.first.first.id==="."&&ch.first.first.first.first.string==="Object"&&ch.first.first.first.second.string==="prototype"&&ch.first.first.second.string==="hasOwnProperty"&&ch.first.second.string==="call"&&ch.second[0].string===this.second.string&&ch.second[1].string===this.first.string));
break}}if(!F){bS("for_if",this)}}}else{ar();this.first=[];
for(;;){this.first.push(a(0,"for"));if(I.id!==","){break
}aO()}al();ar();this.second=a3(a(0));if(this.second.id!=="true"){Y(this.second,A.unexpected_a)
}al(az);if(I.id===";"){aR("expected_a_b",I,")",";")
}this.third=[];ar();for(;;){this.third.push(a(0,"for"));
if(I.id!==","){break}aO()}P();bu(")",cg);bd();ax=ca(true)
}}if(ax.disrupt){bS("strange_loop",bV)}this.block=ax;
U["(breakage)"]-=1;U["(loopage)"]-=1;return this});
bQ("break",function(){var F=I.string;this.arity="statement";
if(U["(breakage)"]===0){bS("unexpected_a",this)}if(I.identifier&&az.line===I.line){bv();
if(U[F]!=="label"){bS("not_a_label",I)}else{if(B[F].funct!==U){bS("not_a_scope",I)
}}this.first=I;f()}return this});bQ("continue",function(){if(!aA["continue"]){bS("unexpected_a",this)
}var F=I.string;this.arity="statement";if(U["(breakage)"]===0){bS("unexpected_a",this)
}if(I.identifier&&az.line===I.line){bv();if(U[F]!=="label"){bS("not_a_label",I)
}else{if(B[F].funct!==U){bS("not_a_scope",I)}}this.first=I;
f()}return this});bQ("return",function(){if(U===bm&&bY!=="scriptstring"){bS("unexpected_a",this)
}this.arity="statement";if(I.id!==";"&&I.line===az.line){bv();
if(I.id==="/"||I.id==="(regexp)"){bS("wrap_regexp")
}this.first=a(0);if(this.first.assign){bS("unexpected_a",this.first)
}}if(aw(0).id==="}"&&aw(1).id==="else"){bS("unexpected_else",this)
}return this});bQ("throw",function(){this.arity="statement";
bv();this.first=a(20);return this});h("class");h("const");
h("enum");h("export");h("extends");h("import");h("super");
h("implements");h("interface");h("let");h("package");
h("private");h("protected");h("public");h("static");
h("yield");function ay(){function ax(){var ch=I,cg={};
f("{");if(I.id!=="}"){while(I.id!=="(end)"){while(I.id===","){bS("unexpected_a",I);
f(",")}if(I.id!=="(string)"){bS("expected_string_a")
}if(cg[I.string]===true){bS("duplicate_a")}else{if(I.string==="__proto__"){bS("dangling_a")
}else{cg[I.string]=true}}f();f(":");ay();if(I.id!==","){break
}f(",");if(I.id==="}"){bS("unexpected_a",az);break}}}f("}",ch)
}function F(){var cg=I;f("[");if(I.id!=="]"){while(I.id!=="(end)"){while(I.id===","){bS("unexpected_a",I);
f(",")}ay();if(I.id!==","){break}f(",");if(I.id==="]"){bS("unexpected_a",az);
break}}}f("]",cg)}switch(I.id){case"{":ax();break;case"[":F();
break;case"true":case"false":case"null":case"(number)":case"(string)":f();
break;case"-":f("-");b5();f("(number)");break;default:aR("unexpected_a")
}}function av(){if(I.identifier){f();return true}}function ai(){if(I.id==="-"){f("-");
b5()}if(I.id==="(number)"){f("(number)");return true
}}function bp(){if(I.id==="(string)"){f();return true
}}function a4(){var F,cg,ax,ch;if(I.identifier){ch=I.string;
if(ch==="rgb"||ch==="rgba"){f();ax=I;f("(");for(F=0;
F<3;F+=1){if(F){aO()}cg=I.number;if(I.id!=="(number)"||cg<0){bS("expected_positive_a",I);
f()}else{f();if(I.id==="%"){f("%");if(cg>100){bS("expected_percent_a",az,cg)
}}else{if(cg>255){bS("expected_small_a",az,cg)}}}}if(ch==="rgba"){aO();
cg=I.number;if(I.id!=="(number)"||cg<0||cg>1){bS("expected_fraction_a",I)
}f();if(I.id==="%"){bS("unexpected_a");f("%")}}f(")",ax);
return true}if(aC[I.string]===true){f();return true
}}else{if(I.id==="(color)"){f();return true}}return false
}function bB(){if(I.id==="-"){f("-");b5()}if(I.id==="(number)"){f();
if(I.id!=="(string)"&&S[I.string]===true){b5();f()}else{if(+az.number!==0){bS("expected_linear_a")
}}return true}return false}function N(){if(I.id==="-"){f("-");
b5()}if(I.id==="(number)"){f();if(I.id!=="(string)"&&S[I.string]===true){b5();
f()}return true}return false}function au(){if(I.identifier){switch(I.string){case"thin":case"medium":case"thick":f();
return true}}else{return bB()}}function b3(){if(I.identifier){if(I.string==="auto"){f();
return true}}else{return bB()}}function ah(){if(I.identifier&&I.string==="attr"){f();
f("(");if(!I.identifier){bS("expected_name_a")}f();
f(")");return true}return false}function aD(){while(I.id!==";"){if(!av()&&!bp()){bS("expected_name_a")
}if(I.id!==","){return true}aO()}}function bz(){if(I.identifier&&I.string==="counter"){f();
f("(");f();if(I.id===","){aO();if(I.id!=="(string)"){bS("expected_string_a")
}f()}f(")");return true}if(I.identifier&&I.string==="counters"){f();
f("(");if(!I.identifier){bS("expected_name_a")}f();
if(I.id===","){aO();if(I.id!=="(string)"){bS("expected_string_a")
}f()}if(I.id===","){aO();if(I.id!=="(string)"){bS("expected_string_a")
}f()}f(")");return true}return false}function E(){return bB()&&(I.id!=="(number)"||bB())
}function bN(){for(;;){if(I.string==="inset"){f()}for(;
;){if(!bB()){break}}a4();if(I.id!==","){break}f(",")
}return true}function x(){var F;if(I.identifier&&I.string==="rect"){f();
f("(");for(F=0;F<4;F+=1){if(!bB()){bS("expected_number_a");
break}}f(")");return true}return false}function aH(){var ax,F;
if(I.identifier&&I.string==="url"){I=aL.range("(",")");
F=I.string;ax=F.charAt(0);if(ax==='"'||ax==="'"){if(F.slice(-1)!==ax){bS("bad_url_a")
}else{F=F.slice(1,-1);if(F.indexOf(ax)>=0){bS("bad_url_a")
}}}if(!F){bS("missing_url")}if(K.test(F)){aR("bad_url_a")
}V.push(F);f();return true}return false}b8=[aH,function(){for(;
;){if(I.identifier){switch(I.string.toLowerCase()){case"url":aH();
break;case"expression":bS("unexpected_a");f();break;
default:f()}}else{if(I.id===";"||I.id==="!"||I.id==="(end)"||I.id==="}"){return true
}f()}}}];function ba(){J("font-family");f(":");if(!av()&&!bp()){aR("expected_name_a")
}al();J("src");f(":");while(true){if(I.string==="local"){J("local");
f("(");if(K.test(I.string)){aR("bad_url_a")}if(!av()&&!bp()){aR("expected_name_a")
}f(")")}else{if(!aH()){aR("expected_a_b",I,"url",ac())
}}if(I.id!==","){break}aO()}al()}L=["none","dashed","dotted","double","groove","hidden","inset","outset","ridge","solid"];
ab=["auto","always","avoid","left","right"];Q={all:true,braille:true,embossed:true,handheld:true,print:true,projection:true,screen:true,speech:true,tty:true,tv:true};
ce=["auto","hidden","scroll","visible"];bX={background:[true,"background-attachment","background-color","background-image","background-position","background-repeat"],"background-attachment":["scroll","fixed"],"background-color":["transparent",a4],"background-image":["none",aH],"background-position":[2,[bB,"top","bottom","left","right","center"]],"background-repeat":["repeat","repeat-x","repeat-y","no-repeat"],border:[true,"border-color","border-style","border-width"],"border-bottom":[true,"border-bottom-color","border-bottom-style","border-bottom-width"],"border-bottom-color":a4,"border-bottom-left-radius":E,"border-bottom-right-radius":E,"border-bottom-style":L,"border-bottom-width":au,"border-collapse":["collapse","separate"],"border-color":["transparent",4,a4],"border-left":[true,"border-left-color","border-left-style","border-left-width"],"border-left-color":a4,"border-left-style":L,"border-left-width":au,"border-radius":function(){function F(ax){var cg=1;
if(ax){f(ax)}if(!bB()){return false}while(I.id==="(number)"){if(!bB()){return false
}cg+=1}if(cg>4){bS("bad_style")}return true}return F()&&(I.id!=="/"||F("/"))
},"border-right":[true,"border-right-color","border-right-style","border-right-width"],"border-right-color":a4,"border-right-style":L,"border-right-width":au,"border-spacing":[2,bB],"border-style":[4,L],"border-top":[true,"border-top-color","border-top-style","border-top-width"],"border-top-color":a4,"border-top-left-radius":E,"border-top-right-radius":E,"border-top-style":L,"border-top-width":au,"border-width":[4,au],bottom:[bB,"auto"],"box-shadow":["none",bN],"caption-side":["bottom","left","right","top"],clear:["both","left","none","right"],clip:[x,"auto"],color:a4,content:["open-quote","close-quote","no-open-quote","no-close-quote",bp,aH,bz,ah],"counter-increment":[av,"none"],"counter-reset":[av,"none"],cursor:[aH,"auto","crosshair","default","e-resize","help","move","n-resize","ne-resize","nw-resize","pointer","s-resize","se-resize","sw-resize","w-resize","text","wait"],direction:["ltr","rtl"],display:["block","compact","inline","inline-block","inline-table","list-item","marker","none","run-in","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group"],"empty-cells":["show","hide"],"float":["left","none","right"],font:["caption","icon","menu","message-box","small-caption","status-bar",true,"font-size","font-style","font-weight","font-family"],"font-family":aD,"font-size":["xx-small","x-small","small","medium","large","x-large","xx-large","larger","smaller",bB],"font-size-adjust":["none",ai],"font-stretch":["normal","wider","narrower","ultra-condensed","extra-condensed","condensed","semi-condensed","semi-expanded","expanded","extra-expanded"],"font-style":["normal","italic","oblique"],"font-variant":["normal","small-caps"],"font-weight":["normal","bold","bolder","lighter",ai],height:[bB,"auto"],left:[bB,"auto"],"letter-spacing":["normal",bB],"line-height":["normal",N],"list-style":[true,"list-style-image","list-style-position","list-style-type"],"list-style-image":["none",aH],"list-style-position":["inside","outside"],"list-style-type":["circle","disc","square","decimal","decimal-leading-zero","lower-roman","upper-roman","lower-greek","lower-alpha","lower-latin","upper-alpha","upper-latin","hebrew","katakana","hiragana-iroha","katakana-oroha","none"],margin:[4,b3],"margin-bottom":b3,"margin-left":b3,"margin-right":b3,"margin-top":b3,"marker-offset":[bB,"auto"],"max-height":[bB,"none"],"max-width":[bB,"none"],"min-height":bB,"min-width":bB,opacity:ai,outline:[true,"outline-color","outline-style","outline-width"],"outline-color":["invert",a4],"outline-style":["dashed","dotted","double","groove","inset","none","outset","ridge","solid"],"outline-width":au,overflow:ce,"overflow-x":ce,"overflow-y":ce,padding:[4,bB],"padding-bottom":bB,"padding-left":bB,"padding-right":bB,"padding-top":bB,"page-break-after":ab,"page-break-before":ab,position:["absolute","fixed","relative","static"],quotes:[8,bp],right:[bB,"auto"],"table-layout":["auto","fixed"],"text-align":["center","justify","left","right"],"text-decoration":["none","underline","overline","line-through","blink"],"text-indent":bB,"text-shadow":["none",4,[a4,bB]],"text-transform":["capitalize","uppercase","lowercase","none"],top:[bB,"auto"],"unicode-bidi":["normal","embed","bidi-override"],"vertical-align":["baseline","bottom","sub","super","top","text-top","middle","text-bottom",bB],visibility:["visible","hidden","collapse"],"white-space":["normal","nowrap","pre","pre-line","pre-wrap","inherit"],width:[bB,"auto"],"word-spacing":["normal",bB],"word-wrap":["break-word","normal"],"z-index":["auto",ai]};
function s(){var F;while(I.id==="*"||I.id==="#"||I.string==="_"){if(!aA.css){bS("unexpected_a")
}f()}if(I.id==="-"){if(!aA.css){bS("unexpected_a")}f("-");
if(!I.identifier){bS("expected_nonstandard_style_attribute")
}f();return b8}if(!I.identifier){bS("expected_style_attribute")
}else{if(Object.prototype.hasOwnProperty.call(bX,I.string)){F=bX[I.string]
}else{F=b8;if(!aA.css){bS("unrecognized_style_attribute_a")
}}}f();return F}function aK(ax){var ch=0,cl,ci,cg,F,ck=0,cj;
switch(typeof ax){case"function":return ax();case"string":if(I.identifier&&I.string===ax){f();
return true}return false}for(;;){if(ch>=ax.length){return false
}cj=ax[ch];ch+=1;if(typeof cj==="boolean"){break}else{if(typeof cj==="number"){cl=cj;
cj=ax[ch];ch+=1}else{cl=1}}cg=false;while(cl>0){if(aK(cj)){cg=true;
cl-=1}else{break}}if(cg){return true}}ck=ch;ci=[];for(;
;){F=false;for(ch=ck;ch<ax.length;ch+=1){if(!ci[ch]){if(aK(bX[ax[ch]])){cg=true;
F=true;ci[ch]=true;break}}}if(!F){return cg}}}function a6(){if(I.id==="(number)"){f();
if(I.string==="n"&&I.identifier){b5();f();if(I.id==="+"){b5();
f("+");b5();f("(number)")}}return}if(I.identifier&&(I.string==="odd"||I.string==="even")){f();
return}bS("unexpected_a")}function W(){var F;for(;;
){if(I.id==="}"||I.id==="(end)"||(R&&I.id===R)){return
}F=s();f(":");if(I.identifier&&I.string==="inherit"){f()
}else{if(!aK(F)){bS("unexpected_a");f()}}if(I.id==="!"){f("!");
b5();if(I.identifier&&I.string==="important"){f()}else{bS("expected_a_b",I,"important",ac())
}}if(I.id==="}"||I.id===R){bS("expected_a_b",I,";",ac())
}else{al()}}}function bR(){if(I.identifier){if(!Object.prototype.hasOwnProperty.call(bt,aA.cap?I.string.toLowerCase():I.string)){bS("expected_tagname_a")
}f()}else{switch(I.id){case">":case"+":f();bR();break;
case":":f(":");switch(I.string){case"active":case"after":case"before":case"checked":case"disabled":case"empty":case"enabled":case"first-child":case"first-letter":case"first-line":case"first-of-type":case"focus":case"hover":case"last-child":case"last-of-type":case"link":case"only-of-type":case"root":case"target":case"visited":J(I.string);
break;case"lang":J("lang");f("(");if(!I.identifier){bS("expected_lang_a")
}f(")");break;case"nth-child":case"nth-last-child":case"nth-last-of-type":case"nth-of-type":J(I.string);
f("(");a6();f(")");break;case"not":J("not");f("(");
if(I.id===":"&&aw(0).string==="not"){bS("not")}bR();
f(")");break;default:bS("expected_pseudo_a")}break;
case"#":f("#");if(!I.identifier){bS("expected_id_a")
}f();break;case"*":f("*");break;case".":f(".");if(!I.identifier){bS("expected_class_a")
}f();break;case"[":f("[");if(!I.identifier){bS("expected_attribute_a")
}f();if(I.id==="="||I.string==="~="||I.string==="$="||I.string==="|="||I.id==="*="||I.id==="^="){f();
if(I.id!=="(string)"){bS("expected_string_a")}f()}f("]");
break;default:aR("expected_selector_a")}}}function aQ(){if(I.id==="{"){bS("expected_style_pattern")
}for(;;){bR();if(I.id==="</"||I.id==="{"||I.id==="}"||I.id==="(end)"){return""
}if(I.id===","){aO()}}}function bl(){while(I.id!=="}"&&I.id!=="</"&&I.id!=="(end)"){aQ();
bY="styleproperty";if(I.id===";"){al()}else{f("{");
W();bY="style";f("}")}}}function bg(){var F;while(I.id==="@"){F=aw();
f("@");switch(I.string){case"import":J("import");if(!aH()){bS("expected_a_b",I,"url",ac());
f()}al();break;case"media":J("media");for(;;){if(!I.identifier||Q[I.string]!==true){aR("expected_media_a")
}f();if(I.id!==","){break}aO()}f("{");bl();f("}");break;
case"font-face":J("font-face");f("{");ba();f("}");break;
default:aR("expected_at_a")}}bl()}function i(F){if(F!=="html"&&!aA.fragment){if(F==="div"&&aA.adsafe){aR("adsafe_fragment")
}else{aR("expected_a_b",az,"html",F)}}if(aA.adsafe){if(F==="html"){aR("adsafe_html",az)
}if(aA.fragment){if(F!=="div"){aR("adsafe_div",az)}}else{aR("adsafe_fragment",az)
}}aA.browser=true}function ao(ax,cg){var ch,F;if(ax==="id"){ch=typeof cg==="string"?cg.toUpperCase():"";
if(u[ch]===true){bS("duplicate_a",I,cg)}if(!/^[A-Za-z][A-Za-z0-9._:\-]*$/.test(cg)){bS("bad_id_a",I,cg)
}else{if(aA.adsafe){if(k){if(cg.slice(0,k.length)!==k){bS("adsafe_prefix_a",I,k)
}else{if(!/^[A-Z]+_[A-Z]+$/.test(cg)){bS("adsafe_bad_id")
}}}else{k=cg;if(!/^[A-Z]+_$/.test(cg)){bS("adsafe_bad_id")
}}}}F=cg.search(aU);if(F>=0){bS("unexpected_char_a_b",az,cg.charAt(F),ax)
}u[ch]=true}else{if(ax==="class"||ax==="type"||ax==="name"){F=cg.search(aN);
if(F>=0){bS("unexpected_char_a_b",az,cg.charAt(F),ax)
}u[ch]=true}else{if(ax==="href"||ax==="background"||ax==="content"||ax==="data"||ax.indexOf("src")>=0||ax.indexOf("url")>=0){if(aA.safe&&K.test(cg)){aR("bad_url_a",I,cg)
}V.push(cg)}else{if(ax==="for"){if(aA.adsafe){if(k){if(cg.slice(0,k.length)!==k){bS("adsafe_prefix_a",I,k)
}else{if(!/^[A-Z]+_[A-Z]+$/.test(cg)){bS("adsafe_bad_id")
}}}else{bS("adsafe_bad_id")}}}else{if(ax==="name"){if(aA.adsafe&&cg.indexOf("_")>=0){bS("adsafe_name_a",I,cg)
}}}}}}}function bP(ch,cj){var ci,ax=bt[ch],cg,F;b9=false;
if(!ax){aR(A.unrecognized_tag_a,I,ch===ch.toLowerCase()?ch:ch+" (capitalization error)")
}if(d.length>0){if(ch==="html"){aR("unexpected_a",az,ch)
}F=ax.parent;if(F){if(F.indexOf(" "+d[d.length-1].name+" ")<0){aR("tag_a_in_b",az,ch,F)
}}else{if(!aA.adsafe&&!aA.fragment){ci=d.length;do{if(ci<=0){aR("tag_a_in_b",az,ch,"body")
}ci-=1}while(d[ci].name!=="body")}}}switch(ch){case"div":if(aA.adsafe&&d.length===1&&!k){bS("adsafe_missing_id")
}break;case"script":bY="script";f(">");if(cj.lang){bS("lang",az)
}if(aA.adsafe&&d.length!==1){bS("adsafe_placement",az)
}if(cj.src){if(aA.adsafe&&(!ap||!bZ[cj.src])){bS("adsafe_source",az)
}}else{bU(I.from);ar();w();bj=true;cg=ae();if(aA.adsafe){if(t){aR("adsafe_script",az)
}if(cg.length!==1||am(cg[0],"id","(")||am(cg[0].first,"id",".")||am(cg[0].first.first,"string","ADSAFE")||am(cg[0].second[0],"string",k)){aR("adsafe_id_go")
}switch(cg[0].first.second.string){case"id":if(ap||t||cg[0].second.length!==1){aR("adsafe_id",I)
}ap=true;break;case"go":if(t){aR("adsafe_go")}if(cg[0].second.length!==2||am(cg[0].second[1],"id","function")||!cg[0].second[1].first||am(cg[0].second[1].first[0],"string","dom")||cg[0].second[1].first.length>2||(cg[0].second[1].first.length===2&&am(cg[0].second[1].first[1],"string","lib"))){aR("adsafe_go",I)
}t=true;break;default:aR("adsafe_id_go")}}j=null}bY="html";
f("</");J("script");bY="outer";break;case"style":bY="style";
f(">");bg();bY="html";f("</");J("style");break;case"input":switch(cj.type){case"button":case"checkbox":case"radio":case"reset":case"submit":break;
case"file":case"hidden":case"image":case"password":case"text":if(aA.adsafe&&cj.autocomplete!=="off"){bS("adsafe_autocomplete")
}break;default:bS("bad_type")}break;case"applet":case"body":case"embed":case"frame":case"frameset":case"head":case"iframe":case"noembed":case"noframes":case"object":case"param":if(aA.adsafe){bS("adsafe_tag",I,ch)
}break}}function M(F){return"</"+F+">"}function aq(){var ci,ck,cj,ax,cl=aA.white,F,ch,cm,cg;
bY="html";R="";d=null;for(;;){switch(I.string){case"<":bY="html";
f("<");ck={};ch=I;ax=ch.string;J(ax);if(aA.cap){ax=ax.toLowerCase()
}ch.name=ax;if(!d){d=[];i(ax)}cm=bt[ax];if(typeof cm!=="object"){aR("unrecognized_tag_a",ch,ax)
}cj=cm.empty;ch.type=ax;for(;;){if(I.id==="/"){f("/");
if(I.id!==">"){bS("expected_a_b",I,">",ac())}break}if(I.id&&I.id.charAt(0)===">"){break
}if(!I.identifier){if(I.id==="(end)"||I.id==="(error)"){bS("expected_a_b",I,">",ac())
}bS("bad_name_a")}aA.white=false;G();ci=I.string;aA.white=cl;
f();if(!aA.cap&&ci!==ci.toLowerCase()){bS("attribute_case_a",az)
}ci=ci.toLowerCase();R="";if(Object.prototype.hasOwnProperty.call(ck,ci)){bS("duplicate_a",az,ci)
}if(ci.slice(0,2)==="on"){if(!aA.on){bS("html_handlers")
}bY="scriptstring";f("=");F=I.id;if(F!=='"'&&F!=="'"){aR("expected_a_b",I,'"',ac())
}R=F;cg=aA.white;aA.white=true;f(F);w();ae();aA.white=cg;
if(I.id!==F){aR("expected_a_b",I,F,ac())}bY="html";
R="";f(F);cm=false}else{if(ci==="style"){bY="scriptstring";
f("=");F=I.id;if(F!=='"'&&F!=="'"){aR("expected_a_b",I,'"',ac())
}bY="styleproperty";R=F;f(F);W();bY="html";R="";f(F);
cm=false}else{if(I.id==="="){f("=");cm=I.string;if(!I.identifier&&I.id!=='"'&&I.id!=="'"&&I.id!=="(string)"&&I.id!=="(number)"&&I.id!=="(color)"){bS("expected_attribute_value_a",az,ci)
}f()}else{cm=true}}}ck[ci]=cm;ao(ci,cm)}bP(ax,ck);if(!cj){d.push(ch)
}bY="outer";f(">");break;case"</":bY="html";f("</");
if(!I.identifier){bS("bad_name_a")}ax=I.string;if(aA.cap){ax=ax.toLowerCase()
}f();if(!d){aR("unexpected_a",I,M(ax))}ch=d.pop();if(!ch){aR("unexpected_a",I,M(ax))
}if(ch.name!==ax){aR("expected_a_b",I,M(ch.name),M(ax))
}if(I.id!==">"){aR("expected_a_b",I,">",ac())}bY="outer";
f(">");break;case"<!":if(aA.safe){bS("adsafe_a")}bY="html";
for(;;){f();if(I.id===">"||I.id==="(end)"){break}if(I.string.indexOf("--")>=0){aR("unexpected_a",I,"--")
}if(I.string.indexOf("<")>=0){aR("unexpected_a",I,"<")
}if(I.string.indexOf(">")>=0){aR("unexpected_a",I,">")
}}bY="outer";f(">");break;case"(end)":if(d.length!==0){bS("missing_a",I,"</"+d.pop().string+">")
}return;default:if(I.id==="(end)"){aR("missing_a",I,"</"+d[d.length-1].string+">")
}else{f()}}if(d&&d.length===0&&(aA.adsafe||!aA.fragment||I.id==="(end)")){break
}}if(I.id!=="(end)"){aR("unexpected_a")}}bM=function aB(cj,ch){var cg,ax,F;
JSLINT.errors=[];JSLINT.tree="";JSLINT.properties="";
c=bV=az=I=Object.create(r["(begin)"]);cb={};Z(bx);aa={};
if(ch){aA=Object.create(ch);ax=aA.predef;if(ax){if(Array.isArray(ax)){for(cg=0;
cg<ax.length;cg+=1){cb[ax[cg]]=true}}else{if(typeof ax==="object"){Z(ax)
}}}aY()}else{aA={}}aA.indent=+aA.indent||4;aA.maxerr=+aA.maxerr||50;
k="";ap=bj=t=false;bZ={};if(aA.approved){for(cg=0;cg<aA.approved.length;
cg+=1){bZ[aA.approved[cg]]=aA.approved[cg]}}else{bZ.test="test"
}bJ="";for(cg=0;cg<aA.indent;cg+=1){bJ+=" "}a2=B={};
bm=U={"(scope)":B,"(breakage)":0,"(loopage)":0};bH=[U];
o=false;u={};aV=false;j=null;b1=false;ag=[];aX=false;
q=true;b9=false;d=null;bA=false;V=[];a5=null;g=0;bY="";
aL.init(cj);bF();try{f();if(I.id==="(number)"){aR("unexpected_a")
}else{if(I.string.charAt(0)==="<"){aq();if(aA.adsafe&&!t){bS("adsafe_go",this)
}}else{switch(I.id){case"{":case"[":b1=true;ay();break;
case"@":case"*":case"#":case".":case":":bY="style";
f();if(az.id!=="@"||!I.identifier||I.string!=="charset"||az.line!==1||az.from!==1){aR("css")
}f();if(I.id!=="(string)"&&I.string!=="UTF-8"){aR("css")
}f();al();bg();break;default:if(aA.adsafe&&aA.fragment){aR("expected_a_b",I,"<div>",ac())
}bU(1);if(I.id===";"&&!aX){al()}bj=true;F=ae();c.first=F;
bM.tree=c;if(aA.adsafe&&(F.length!==1||am(F[0],"id","(")||am(F[0].first,"id",".")||am(F[0].first.first,"string","ADSAFE")||am(F[0].first.second,"string","lib")||F[0].second.length!==2||F[0].second[0].id!=="(string)"||am(F[0].second[1],"id","function"))){aR("adsafe_lib")
}if(F.disrupt){bS("weird_program",bV)}}}}j=null;f("(end)");
bM.property=aa}catch(ci){if(ci){JSLINT.errors.push({reason:ci.message,line:ci.line||I.line,character:ci.character||I.from},null)
}}return JSLINT.errors.length===0};bM.data=function(){var cj={functions:[]},cn,ck,cl,ci,ch,F,cm,cg=[],ax=[];
if(bM.errors.length){cj.errors=bM.errors}if(b1){cj.json=true
}if(V.length>0){cj.urls=V}ck=Object.keys(a2).filter(function(co){return co.charAt(0)!=="("&&typeof bx[co]!=="boolean"
});if(ck.length>0){cj.globals=ck}for(cl=1;cl<bH.length;
cl+=1){cm=bH[cl];cn={};for(ci=0;ci<bs.length;ci+=1){cn[bs[ci]]=[]
}for(F in cm){if(Object.prototype.hasOwnProperty.call(cm,F)){if(F.charAt(0)!=="("){ch=cm[F];
if(ch==="unction"||ch==="unparam"){ch="unused"}if(Array.isArray(cn[ch])){cn[ch].push(F);
if(ch==="unused"){ax.push({name:F,line:cm["(line)"],"function":cm["(name)"]})
}else{if(ch==="undef"){cg.push({name:F,line:cm["(line)"],"function":cm["(name)"]})
}}}}}}for(ci=0;ci<bs.length;ci+=1){if(cn[bs[ci]].length===0){delete cn[bs[ci]]
}}cn.name=cm["(name)"];cn.params=cm["(params)"];cn.line=cm["(line)"];
cj.functions.push(cn)}if(ax.length>0){cj.unused=ax}if(cg.length>0){cj["undefined"]=cg
}return cj};bM.error_report=function(cj){var ax,ch,F=[],cg,ci;
if(cj.errors){if(cj.json){F.push("<cite>JSON: bad.</cite><br>")
}for(ch=0;ch<cj.errors.length;ch+=1){ci=cj.errors[ch];
if(ci){ax=ci.evidence||"";F.push("<cite>");if(isFinite(ci.line)){F.push("<address>line "+String(ci.line)+" character "+String(ci.character)+"</address>")
}F.push(ci.reason.entityify()+"</cite>");if(ax){F.push("<pre>"+ax.entityify()+"</pre>")
}}}}if(cj.unused||cj["undefined"]){F.push("<dl>");if(cj["undefined"]){F.push("<dt>undefined</dt><dd>");
cg=[];for(ch=0;ch<cj["undefined"].length;ch+=1){cg[ch]="<code>"+cj["undefined"][ch].name+"</code>&nbsp;<address>"+cj["undefined"][ch]["function"]+" "+String(cj["undefined"][ch].line)+"</address>"
}F.push(cg.join(", "));F.push("</dd>")}if(cj.unused){F.push("<dt>unused</dt><dd>");
cg=[];for(ch=0;ch<cj.unused.length;ch+=1){cg[ch]="<code>"+cj.unused[ch].name+"</code>&nbsp;<address>"+cj.unused[ch]["function"]+" "+String(cj.unused[ch].line)+"</address>"
}F.push(cg.join(", "));F.push("</dd>")}F.push("</dl>")
}return F.join("")};bM.report=function(ck){var cg,ch,ax,cl,F=[],cj;
function ci(cn,cp){var co,cm;if(Array.isArray(cp)){F.push("<dt>"+cn+"</dt><dd>");
cp.sort().forEach(function(cq){if(cq!==cm){cm=cq;F.push((co?", ":"")+cm);
co=true}});F.push("</dd>")}else{if(cp){F.push("<dt>"+cn+"</dt><dd>",cp,"</dd>")
}}}F.push("<dl>");if(ck.urls){ci("url",ck.urls);cg=true
}if(ck.globals){ci("global",ck.globals);cg=true}else{if(bY==="style"){F.push("<dt>CSS.</dt>")
}else{if(ck.json){if(!ck.errors){F.push("<dt>JSON: good.</dt>")
}}else{F.push("<dt><i>No new global variables introduced.</i></dt>")
}}}if(cg){F.push("</dl>")}else{F[0]=""}if(ck.functions){for(ch=0;
ch<ck.functions.length;ch+=1){cj=ck.functions[ch];cl=[];
if(cj.params){for(ax=0;ax<cj.params.length;ax+=1){cl[ax]=cj.params[ax].string
}}F.push("<dl><address>line "+String(cj.line)+"</address>"+cj.name.entityify()+"("+cl.join(", ")+")");
ci("undefined",cj["undefined"]);ci("unused",cj.unused);
ci("closure",cj.closure);ci("variable",cj["var"]);ci("exception",cj.exception);
ci("outer",cj.outer);ci("global",cj.global);ci("label",cj.label);
F.push("</dl>")}}return F.join("")};bM.properties_report=function(ck){if(!ck){return""
}var ci,cl,cm=Object.keys(ck).sort(),cg,ch=["/*properties"],cj="    ",F,ax=false;
for(ci=0;ci<cm.length;ci+=1){cl=cm[ci];if(ck[cl]>0){if(ax){cj+=", "
}F=D.test(cl)?cl:"'"+cl.replace(by,bo)+"'";cg+=F.length+2;
if(cj.length+F.length>80){ch.push(cj);cj="    "}cj+=F;
ax=true}}ch.push(cj,"*/\n");return ch.join("\n")};bM.jslint=bM;
bM.edition="2012-11-13";return bM}());