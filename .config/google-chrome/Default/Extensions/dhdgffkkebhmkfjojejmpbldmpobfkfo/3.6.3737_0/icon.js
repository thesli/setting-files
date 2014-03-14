
(function(){var a={getDataUriFromUrl:function(d,b){var f=document.createElement("img");
var e=false;var i=null;document.body.appendChild(f);
var g=function(){if(i){window.clearTimeout(i)}if(!e&&b){b(null)
}};var c=function(){if(i){window.clearTimeout(i)}var k=document.createElement("canvas");
k.width=f.width;k.height=f.height;var j=k.getContext("2d").drawImage(f,0,0);
if(f.parentNode){f.parentNode.removeChild(f)}f=null;
if(!e&&b){b(k.toDataURL())}};var h=function(){i=null;
g();e=true};i=window.setTimeout(h,5000);f.onload=c;
f.onerror=g;f.src=d},initCanvas:function(b){this.canvas=b;
this.context=this.canvas.getContext("2d")},init:function(b,e){var d=null;
if(this.canvas){d=this.canvas}else{d=document.createElement("canvas");
if(D){document.body.appendChild(d)}}d.height=e;d.width=b;
this.initCanvas(d)},initFromImage:function(g,i,h,f,b,k,c){var d=document.createElement("img");
if(D){document.body.appendChild(d)}var j=this;var e=function(){j.init(i,h);
if(k){j.context.scale(k,k)}j.context.drawImage(d,f,b);
j.loaded=true;if(d.parentNode){d.parentNode.removeChild(d)
}d=null;if(c){c()}};d.onload=e;d.src=g},printNr:function(b,e,d,c){this.context.font="22pt Arial bold";
this.context.fillStyle="rgba("+c.join(",")+", 1)";this.context.fillText(d,b,e)
},circle:function(b,g,e,d){var f="rgba("+d.join(",")+", 1)";
this.context.fillStyle=f;this.context.beginPath();this.context.arc(b,g,e,0,2*Math.PI,true);
this.context.fill()},rect:function(f,e,b,d,g,c){if(g==null){g=true
}if(g){this.context.fillStyle="rgba("+c.join(",")+", 0.99)";
this.context.fillRect(f,e,b,d)}else{this.context.fillStyle="rgb("+c.join(",")+", 1)";
this.context.beginPath();this.context.moveTo(f,e);this.context.lineTo(f+b,e);
this.context.lineTo(f+b,e+d);this.context.lineTo(f,e+d);
this.context.lineTo(f,e);this.context.stroke()}},rrect:function(c,g,b,d,i,f){var e=i;
this.circle(c+e,g+e,i,f);this.circle(b-e,g+e,i,f);this.circle(c+e,d-e,i,f);
this.circle(b-e,d-e,i,f);this.rect(c+i,g,b-c-2*i,d-g,true,f);
this.rect(c,g+i,b-c,d-g-2*i,true,f)},createIconEx:function(g,b){var d=140;
var f=140;var i=this;var e=1;var c=function(){var k=14;
var j=25;var h=116-(g>10?k:0)-(g>100?k:0)-(g>1000?k:0)-(g>10000?k:0);
a.rrect(h,0,d,j,4,[200,0,0]);var l=3;a.rrect(h+l,0+l,f-l,j-l,4,[190,0,0]);
a.printNr(h+4,j-3,g,[240,250,240]);if(b){b(i.canvas.toDataURL())
}};a.initFromImage(chrome.extension.getURL("images/icon128.png"),d,f,6,6,1,c)
},toPNG:function(){return this.canvas.toDataURL()}};
Registry.register("icon","3737.6",a)})();