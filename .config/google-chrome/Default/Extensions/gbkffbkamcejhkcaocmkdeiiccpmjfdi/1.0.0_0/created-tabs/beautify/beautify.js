function js_beautify(M,n){function z(a){for(a=typeof a==="undefined"?!1:a;g.length&&(g[g.length-1]===" "||g[g.length-1]===u||a&&(g[g.length-1]==="\n"||g[g.length-1]==="\r"));)g.pop()}function k(a){c.eat_next_space=!1;if(!q||!A(c.mode))if(a=typeof a==="undefined"?!0:a,c.if_line=!1,z(),g.length){if(g[g.length-1]!=="\n"||!a)s=!0,g.push("\n");for(a=0;a<c.indentation_level;a+=1)g.push(u);c.var_line&&c.var_line_reindented&&(N===" "?g.push("    "):g.push(u))}}function e(){if(c.eat_next_space)c.eat_next_space=
!1;else{var a=" ";g.length&&(a=g[g.length-1]);a!==" "&&a!=="\n"&&a!==u&&g.push(" ")}}function i(){s=!1;c.eat_next_space=!1;g.push(d)}function H(){g.length&&g[g.length-1]===u&&g.pop()}function t(a){c&&B.push(c);c={previous_mode:c?c.mode:"BLOCK",mode:a,var_line:!1,var_line_tainted:!1,var_line_reindented:!1,in_html_comment:!1,if_line:!1,in_case:!1,eat_next_space:!1,indentation_baseline:-1,indentation_level:c?c.indentation_level+(c.var_line&&c.var_line_reindented?1:0):Q}}function A(a){return a==="[EXPRESSION]"||
a==="[INDENTED-EXPRESSION]"}function C(a){return a==="[EXPRESSION]"||a==="[INDENTED-EXPRESSION]"||a==="(EXPRESSION)"}function D(){E=c.mode==="DO_BLOCK";B.length>0&&(c=B.pop())}function m(a,b){for(var c=0;c<b.length;c+=1)if(b[c]===a)return!0;return!1}function R(){for(var a=0,b=0,c=g.length-1;c>=0;c--)switch(g[c]){case ":":a===0&&b++;break;case "?":if(a===0)if(b===0)return!0;else b--;break;case "{":if(a===0)return!1;a--;break;case "(":case "[":a--;break;case ")":case "]":case "}":a++}}function I(){r=
0;if(b>=o)return["","TK_EOF"];y=!1;var a=h.charAt(b);b+=1;if(q&&A(c.mode)){for(var d=0;m(a,J);){a==="\n"?(z(),g.push("\n"),s=!0,d=0):a==="\t"?d+=4:a!=="\r"&&(d+=1);if(b>=o)return["","TK_EOF"];a=h.charAt(b);b+=1}if(c.indentation_baseline===-1)c.indentation_baseline=d;if(s){var e;for(e=0;e<c.indentation_level+1;e+=1)g.push(u);if(c.indentation_baseline!==-1)for(e=0;e<d-c.indentation_baseline;e++)g.push(" ")}}else{for(;m(a,J);){a==="\n"&&(r+=O?r<=O?1:0:1);if(b>=o)return["","TK_EOF"];a=h.charAt(b);b+=
1}if(K&&r>1)for(e=0;e<r;e+=1)k(e===0),s=!0;y=r>0}if(m(a,F)){if(b<o)for(;m(h.charAt(b),F);)if(a+=h.charAt(b),b+=1,b===o)break;if(b!==o&&a.match(/^[0-9]+[Ee]$/)&&(h.charAt(b)==="-"||h.charAt(b)==="+"))return d=h.charAt(b),b+=1,e=I(b),a+=d+e[0],[a,"TK_WORD"];if(a==="in")return[a,"TK_OPERATOR"];y&&f!=="TK_OPERATOR"&&!c.if_line&&(K||j!=="var")&&k();return[a,"TK_WORD"]}if(a==="("||a==="[")return[a,"TK_START_EXPR"];if(a===")"||a==="]")return[a,"TK_END_EXPR"];if(a==="{")return[a,"TK_START_BLOCK"];if(a===
"}")return[a,"TK_END_BLOCK"];if(a===";")return[a,"TK_SEMICOLON"];if(a==="/"){d="";e=!0;if(h.charAt(b)==="*"){b+=1;if(b<o)for(;!(h.charAt(b)==="*"&&h.charAt(b+1)&&h.charAt(b+1)==="/")&&b<o;){a=h.charAt(b);d+=a;if(a==="\r"||a==="\n")e=!1;b+=1;if(b>=o)break}b+=2;return e?["/*"+d+"*/","TK_INLINE_COMMENT"]:["/*"+d+"*/","TK_BLOCK_COMMENT"]}if(h.charAt(b)==="/"){for(d=a;h.charAt(b)!=="\r"&&h.charAt(b)!=="\n";)if(d+=h.charAt(b),b+=1,b>=o)break;b+=1;y&&k();return[d,"TK_COMMENT"]}}if(a==="'"||a==='"'||a===
"/"&&(f==="TK_WORD"&&m(j,["return","do"])||f==="TK_COMMENT"||f==="TK_START_EXPR"||f==="TK_START_BLOCK"||f==="TK_END_BLOCK"||f==="TK_OPERATOR"||f==="TK_EQUALS"||f==="TK_EOF"||f==="TK_SEMICOLON")){d=a;e=!1;var i=a;if(b<o)if(d==="/")for(a=!1;e||a||h.charAt(b)!==d;){if(i+=h.charAt(b),e?e=!1:(e=h.charAt(b)==="\\",h.charAt(b)==="["?a=!0:h.charAt(b)==="]"&&(a=!1)),b+=1,b>=o)return[i,"TK_STRING"]}else for(;e||h.charAt(b)!==d;)if(i+=h.charAt(b),e=e?!1:h.charAt(b)==="\\",b+=1,b>=o)return[i,"TK_STRING"];b+=
1;i+=d;if(d==="/")for(;b<o&&m(h.charAt(b),F);)i+=h.charAt(b),b+=1;return[i,"TK_STRING"]}if(a==="#"){if(g.length===0&&h.charAt(b)==="!"){for(i=a;b<o&&a!="\n";)a=h.charAt(b),i+=a,b+=1;g.push(i.replace(/^\s\s*|\s\s*$/,"")+"\n");k();return I()}d="#";if(b<o&&m(h.charAt(b),P)){do a=h.charAt(b),d+=a,b+=1;while(b<o&&a!=="#"&&a!=="=");a!=="#"&&(h.charAt(b)==="["&&h.charAt(b+1)==="]"?(d+="[]",b+=2):h.charAt(b)==="{"&&h.charAt(b+1)==="}"&&(d+="{}",b+=2));return[d,"TK_WORD"]}}if(a==="<"&&h.substring(b-1,b+3)===
"<\!--")return b+=3,c.in_html_comment=!0,["<\!--","TK_COMMENT"];if(a==="-"&&c.in_html_comment&&h.substring(b-1,b+2)==="--\>")return c.in_html_comment=!1,b+=2,y&&k(),["--\>","TK_COMMENT"];if(m(a,L)){for(;b<o&&m(a+h.charAt(b),L);)if(a+=h.charAt(b),b+=1,b>=o)break;return a==="="?[a,"TK_EQUALS"]:[a,"TK_OPERATOR"]}return[a,"TK_UNKNOWN"]}var h,g,d,f,j,p,v,c,B,u,J,F,L,b,w,P,l,x,E,y,s,r,n=n?n:{},G=n.braces_on_own_line?n.braces_on_own_line:!1;v=n.indent_size?n.indent_size:4;var N=n.indent_char?n.indent_char:
" ",K=typeof n.preserve_newlines==="undefined"?!0:n.preserve_newlines,O=typeof n.max_preserve_newlines==="undefined"?!1:n.max_preserve_newlines,Q=n.indent_level?n.indent_level:0,S=n.space_after_anon_function==="undefined"?!1:n.space_after_anon_function,q=typeof n.keep_array_indentation==="undefined"?!1:n.keep_array_indentation;s=!1;var o=M.length;for(u="";v>0;)u+=N,v-=1;h=M;v="";f="TK_START_EXPR";p=j="";g=[];E=!1;J="\n\r\t ".split("");F="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split("");
P="0123456789".split("");L="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::".split(" ");w="continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(",");B=[];t("BLOCK");for(b=0;;){x=I(b);d=x[0];x=x[1];if(x==="TK_EOF")break;switch(x){case "TK_START_EXPR":if(d==="["){if(f==="TK_WORD"||j===")"){m(j,w)&&e();t("(EXPRESSION)");i();break}if(c.mode==="[EXPRESSION]"||c.mode==="[INDENTED-EXPRESSION]")if(p==="]"&&
j===","){if(c.mode==="[EXPRESSION]")c.mode="[INDENTED-EXPRESSION]",q||(c.indentation_level+=1);t("[EXPRESSION]");q||k()}else if(j==="["){if(c.mode==="[EXPRESSION]")c.mode="[INDENTED-EXPRESSION]",q||(c.indentation_level+=1);t("[EXPRESSION]");q||k()}else t("[EXPRESSION]");else t("[EXPRESSION]")}else t("(EXPRESSION)");j===";"||f==="TK_START_BLOCK"?k():f==="TK_END_EXPR"||f==="TK_START_EXPR"||f==="TK_END_BLOCK"||j==="."||(f!=="TK_WORD"&&f!=="TK_OPERATOR"?e():v==="function"?S&&e():(m(j,w)||j==="catch")&&
e());i();break;case "TK_END_EXPR":if(d==="]")if(q){if(j==="}"){H();i();D();break}}else if(c.mode==="[INDENTED-EXPRESSION]"&&j==="]"){D();k();i();break}D();i();break;case "TK_START_BLOCK":v==="do"?t("DO_BLOCK"):t("BLOCK");G?(f!=="TK_OPERATOR"&&(j=="return"?e():k(!0)),i(),c.indentation_level+=1):(f!=="TK_OPERATOR"&&f!=="TK_START_EXPR"?f==="TK_START_BLOCK"?k():e():A(c.previous_mode)&&j===","&&(p==="}"?e():k()),c.indentation_level+=1,i());break;case "TK_END_BLOCK":D();G?k():f==="TK_START_BLOCK"?s?H():
z():A(c.mode)&&q?(q=!1,k(),q=!0):k();i();break;case "TK_WORD":if(E){e();i();e();E=!1;break}if(d==="function"&&(s||j===";")&&j!=="{"){r=s?r:0;K||(r=1);for(l=0;l<2-r;l++)k(!1)}if(d==="case"||d==="default"){j===":"?H():(c.indentation_level--,k(),c.indentation_level++);i();c.in_case=!0;break}l="NONE";f==="TK_END_BLOCK"?m(d.toLowerCase(),["else","catch","finally"])?G?l="NEWLINE":(l="SPACE",e()):l="NEWLINE":f==="TK_SEMICOLON"&&(c.mode==="BLOCK"||c.mode==="DO_BLOCK")?l="NEWLINE":f==="TK_SEMICOLON"&&C(c.mode)?
l="SPACE":f==="TK_STRING"?l="NEWLINE":f==="TK_WORD"?l="SPACE":f==="TK_START_BLOCK"?l="NEWLINE":f==="TK_END_EXPR"&&(e(),l="NEWLINE");if(c.if_line&&f==="TK_END_EXPR")c.if_line=!1;if(m(d.toLowerCase(),["else","catch","finally"]))f!=="TK_END_BLOCK"||G?k():(z(!0),e());else if(m(d,w)||l==="NEWLINE"){if(!((f==="TK_START_EXPR"||j==="="||j===",")&&d==="function"))if(j==="return"||j==="throw")e();else if(f!=="TK_END_EXPR"){if((f!=="TK_START_EXPR"||d!=="var")&&j!==":")d==="if"&&v==="else"&&j!=="{"?e():k()}else m(d,
w)&&j!==")"&&k()}else A(c.mode)&&j===","&&p==="}"?k():l==="SPACE"&&e();i();v=d;if(d==="var")c.var_line=!0,c.var_line_reindented=!1,c.var_line_tainted=!1;if(d==="if")c.if_line=!0;if(d==="else")c.if_line=!1;break;case "TK_SEMICOLON":i();c.var_line=!1;c.var_line_reindented=!1;break;case "TK_STRING":f==="TK_START_BLOCK"||f==="TK_END_BLOCK"||f==="TK_SEMICOLON"?k():f==="TK_WORD"&&e();i();break;case "TK_EQUALS":if(c.var_line)c.var_line_tainted=!0;e();i();e();break;case "TK_OPERATOR":l=p=!0;if(c.var_line&&
d===","&&C(c.mode))c.var_line_tainted=!1;if(c.var_line&&d===",")if(c.var_line_tainted){i();c.var_line_reindented=!0;c.var_line_tainted=!1;k();break}else c.var_line_tainted=!1;if(j==="return"||j==="throw"){e();i();break}if(d===":"&&c.in_case){i();k();c.in_case=!1;break}if(d==="::"){i();break}if(d===","){c.var_line?c.var_line_tainted?(i(),k(),c.var_line_tainted=!1):(i(),e()):f==="TK_END_BLOCK"&&c.mode!=="(EXPRESSION)"?(i(),c.mode==="OBJECT"&&j==="}"?k():e()):c.mode==="OBJECT"?(i(),k()):(i(),e());break}else if(m(d,
["--","++","!"])||m(d,["-","+"])&&(m(f,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||m(j,w)))l=p=!1,j===";"&&C(c.mode)&&(p=!0),f==="TK_WORD"&&m(j,w)&&(p=!0),c.mode==="BLOCK"&&(j==="{"||j===";")&&k();else if(d===".")p=!1;else if(d===":"&&!R())c.mode="OBJECT",p=!1;p&&e();i();l&&e();break;case "TK_BLOCK_COMMENT":p=d.split(/\x0a|\x0d\x0a/);if(/^\/\*\*/.test(d)){k();g.push(p[0]);for(l=1;l<p.length;l++)k(),g.push(" "),g.push(p[l].replace(/^\s\s*|\s\s*$/,""))}else{p.length>1?(k(),z()):e();
for(l=0;l<p.length;l++)g.push(p[l]),g.push("\n")}k();break;case "TK_INLINE_COMMENT":e();i();C(c.mode)?e():k();break;case "TK_COMMENT":y?k():e();i();k();break;case "TK_UNKNOWN":(j==="return"||j==="throw")&&e(),i()}p=j;f=x;j=d}return g.join("").replace(/[\n ]+$/,"")}if(typeof exports!=="undefined")exports.js_beautify=js_beautify;