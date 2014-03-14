// Initialize the animation using the system time of user's device
(function(){
	//https://hacks.mozilla.org/2011/09/detecting-and-generating-css-animations-in-javascript/
	var animation = false,
		transformation = false,
		domPrefixes = 'Webkit Moz O ms Khtml'.split(' '),
		animationstring = 'animation',
		transformstring = 'transform',
		animationName = 'animationName',
		animationDelay = 'animationDelay',
		keyframeprefix = '',
		keyframes = '',
		pfx = ''
		hour = document.getElementById('hour'),
		minute = document.getElementById('minute'),
		second = document.getElementById('second'),
		hourNumbers = document.getElementById('hourNumbers'),
		minuteNumbers = document.getElementById('minuteNumbers'),
		secondNumbers = document.getElementById('secondNumbers');
	if(hour.style.animationName){animation = true;}
	if(hour.style.transform){transformation = true;}
	
	// Check vendor prefix
	if( animation === false ) {
		for( var i = 0; i < domPrefixes.length; i++ ) {
			if( hour.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
				pfx = domPrefixes[ i ];
				animationstring = pfx + 'Animation';
				animationName = pfx + 'AnimationName';
				animationDelay = pfx + 'AnimationDelay';
				keyframeprefix = '-' + pfx.toLowerCase() + '-';
				animation = true;
				break;
			}
		}
	}
	if( transformation === false ) {
		for( var i = 0; i < domPrefixes.length; i++ ) {
			if( hour.style[ domPrefixes[i] + 'Transform' ] !== undefined ) {
				pfx = domPrefixes[ i ];
				transformstring = pfx + 'Transform';
				transformation = true;
				break;
			}
		}
	}
	
	function addCSS(CSS){
		var s = document.createElement( 'style' );
			s.innerHTML = CSS;
			document.getElementsByTagName( 'head' )[ 0 ].appendChild( s );
	}
	
	var now = new Date();
	var h = now.getHours(),
		m = now.getMinutes(),
		s = now.getSeconds(),
		ms = now.getMilliseconds();
	var secondRotate = s*6,
		minuteRotate = m*6+s*6/60,
		hourRotate = h*30+m*6/12+s*6/3600,
		secondTranslate = s*24,
		minuteTranslate = m*24,
		hourTranslate = h*24;
	
	// Analog hands keyframes
	function keyframesString(name,from,to){
		return '@' + keyframeprefix + 'keyframes '+name+' { '+
				'0% {' + keyframeprefix + from + ' }'+
				' 100% {' + keyframeprefix + to + ' }'+
				'}';
	}
	addCSS(keyframesString('secondAppend','transform:rotate('+secondRotate+'deg);','transform:rotate('+(secondRotate+360)+'deg);'));
	addCSS(keyframesString('minuteAppend','transform:rotate('+minuteRotate+'deg);','transform:rotate('+(minuteRotate+360)+'deg);'));
	addCSS(keyframesString('hourAppend','transform:rotate('+hourRotate+'deg);','transform:rotate('+(hourRotate+720)+'deg);'));
	
	// Digital numbers keyframes
	function keyframesNumbers(name,max,start,gap){
		var frames = '';
		for(var count=0; count<=max; count++){
			frames += ((100/60)*count)+'% {' + keyframeprefix + 'transform:translate(0px, -'+(start+count*24)+'px)}';
			if(count<max)
				frames += ((100/(60*1000))*(1000*(count+gap)))+'% {' + keyframeprefix + 'transform:translate(0px, -'+(start+count*24)+'px)}';
		}
		return '@' + keyframeprefix + 'keyframes '+name+' { ' + frames + '}';
	}
	function keyframesNumbers2(name,max,start,gap){
		var frames = '';
		for(var count=0; count<=max; count++){
			frames += ((100/max)*count)+'% {' + keyframeprefix + 'transform:translate(0px, -'+(start+(count+1)*24)+'px)}';
			if(count<max)
				frames += ((100/max)*(count+gap))+'% {' + keyframeprefix + 'transform:translate(0px, -'+(start+(count+1)*24)+'px)}';
		}
		return '@' + keyframeprefix + 'keyframes '+name+' { ' + frames + '}';
	}
	minuteNumbers.style[ transformstring ] = 'translate(0px, -'+(minuteTranslate)+'px)';
	hourNumbers.style[ transformstring ] = 'translate(0px, -'+(hourTranslate)+'px)';
	
	addCSS(keyframesNumbers('secondNumbersAppend',60,secondTranslate,0.9));
	addCSS(keyframesNumbers2('minuteNumbersAppend',60,minuteTranslate,0.999));
	addCSS(keyframesNumbers2('hourNumbersAppend',24,hourTranslate,0.999));
		second.style[ animationName ] = 'secondAppend';
		minute.style[ animationName ] = 'minuteAppend';
		hour.style[ animationName ] = 'hourAppend';
		secondNumbers.style[ animationName ] = 'secondNumbersAppend';
		minuteNumbers.style[ animationDelay ] = (60-s)+'s';
		hourNumbers.style[ animationDelay ] = (3600-(m+1)*60+60-s)+'s';
		minuteNumbers.style[ animationName ] = 'minuteNumbersAppend';
		hourNumbers.style[ animationName ] = 'hourNumbersAppend';
		
	var icon = document.getElementById('icon'),
		lastIcon = icon.href,
		lastTitle = false;
	function updateTitle(){
		var now = new Date();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();
		hour = hour < 10 ? '0' + hour : hour;
		minute = minute < 10 ? '0' + minute : minute;
		second = second < 10 ? '0' + second : second;
		
		// Fill the gap between CSS and js
		var newTitle = '['+hour+':'+minute+':'+second+'] CSS3Clock';
		if(lastTitle==''){
			document.title = newTitle;
		}else if(lastTitle != newTitle){
			setTimeout(function(){
				document.title = newTitle;
			},ms);
		}
		lastTitle = newTitle;
		
		// Change icons
		hour = hour % 12;
		var newIcon = 'icons/gif/'+hour+'/time0'+minute+'.gif';
		if(lastIcon != newIcon){
			lastIcon = newIcon;
			icon.href = newIcon;
		}
	}
	setInterval(updateTitle,100);
	updateTitle();
}());