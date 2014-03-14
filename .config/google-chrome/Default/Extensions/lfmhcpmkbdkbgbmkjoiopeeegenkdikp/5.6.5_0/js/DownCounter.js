
	var DownloadsCounter = new function(){
		
		function getRandomInt (min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function number_format (number, decimals, dec_point, thousands_sep) {
			number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
			var n = !isFinite(+number) ? 0 : +number,
				prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
				dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
				s = '',
				toFixedFix = function (n, prec) {
					var k = Math.pow(10, prec);            return '' + Math.round(n * k) / k;
				};
			// Fix for IE parseFloat(0.55).toFixed(0) = 0;
			s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
			if (s[0].length > 3) {        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
			}
			if ((s[1] || '').length < prec) {
				s[1] = s[1] || '';
				s[1] += new Array(prec - s[1].length + 1).join('0');    }
			return s.join(dec);
		}
		
		const INTENSIVITY_FROM = 1;
		const INTENSIVITY_TO = 3;		
				
						
		var value = 5460831;
		
		setInterval(function(){
			
			var plus = getRandomInt( INTENSIVITY_FROM, INTENSIVITY_TO );
			value += plus;
			
			document.cookie = "downloadCounter="+value;
			
			$("#downloadCounterValue").html( number_format(value) );
			
		}, 2000);
		
	};
	
	$(document).ready(function(){
				
				$('div.G4').galleryScroll({
					slideNum:'div.s2',
					autoSlide:3000,
					funcOnclick: function( index ){
						index = Math.round(index);
						function display(){
							try{
								var slide = slides[index];
								$("#slideDown").html( slide.text );
								$("#slideTitle").html( slide.title );
								$("#text2Container").css( "visibility", "hidden" );

								$("#text2Container").html( slide.btext );
								
								$("#text2Container ul").css("margin-top", "-300px").css("opacity", "0");
																
								
								$("#text2Container ul").animate( {
									marginTop: "10",
									opacity: "1"
								}, {
									complete: function(){	
	
										$("#text2Container ul").animate( {
											marginTop: "-=3",
										}, {
											complete: function(){
			
											},
											duration: 50
										} );	
	
									},
									duration: "500ms"
								} );	
										
		
								$("#text2Container").css( "visibility", "visible" );	
							}
							catch(ex){				}						

						}
						
						if( $("#text2Container ul").length == 1 ){
						
							$("#text2Container ul").animate( {
								marginTop: "-=3",
							}, {
								complete: function(){
									$("#text2Container ul").animate( {
										marginTop: "+=100",
										opacity: 0
									}, {
										complete: function(){
		
											display();					
											
										},
										duration: 200
									} );
								},
								duration: 50
							} );	
						

						}
						else{
							display();
						}


					}
				});
			});		

			
	var preloadImages = ["http://fvdsuite.com/system/application/views/themes/newfvd//images/btn-download-hover.png"];
	var _images = [];
			
	for( var i = 0; i != preloadImages.length; i++ )
	{
				var img = new Image();
				img.src = preloadImages[i];
				
				_images.push( img );
	}
			

	var slides = [
							{
				 title: '<img src="/images/slide/title1.png" alt="">',			
				 text:'<a href="http://fvd-converter.com/" class="download"><span class="drop">Download Video Converter</span></a>',
				 btext:'<ul> <li>Convert Files in Batches</li> <li>Video to Audio Converter</li><li>Output to AVI, MP4, MKV, FLV, 3GP, MP3</li><li>Convert Videos with Super High Speed</li><li>Support videos shot by iPhone, other smart phones and DVs</li> </ul>'
				}
				,				
				{
				 title: '<img src="/images/slide/title2.png" alt="">',			
				 text:'<a href="http://fvd-player.com/" class="download"><span class="drop">Download Video Player</span></a>',
				 btext:'<ul> <li>Well-designed interface</li> <li>High operating speed</li><li>Easy to use interface</li><li>Plays .flv, .webm, .avi, .mp4, .mkv, .mp3 and more</li><li>Advanced Equalizer!</li> </ul>'
				}
						];
