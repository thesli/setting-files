jQuery.fn.clickecho = function(o) {
 
    // Defaults
    var o = jQuery.extend({
         duration: 300,
         color: '#fff',
         radius: 150,
         thickness: 20
    },o);
     
    $(this).each(function(){

        $(this).click(function(e){
            
                // Clear out any other running clickecho's
                $('#clickecho').stop().remove();
                
                // Create echo canvas
                $('<canvas style="position:fixed;filter:alpha(opacity=50);-moz-opacity:0.5;-khtml-opacity:0.5;opacity:0.5;z-index:9999" id="clickecho" width="'+(o.radius*2)+'" height="'+(o.radius*2)+'"></canvas>').appendTo('body');
                
                // Define canvas element
                var clickecho = $('#clickecho')[0].getContext("2d");
                clickecho.lineWidth   = o.thickness;
                clickecho.strokeStyle = o.color;
                clickecho.beginPath();
                clickecho.arc(o.radius, o.radius, (o.radius-o.thickness), 0, Math.PI*2, true);
                clickecho.closePath();
                clickecho.stroke();
                
                // Get cursor position
                var x = e.pageX;
                var y = e.pageY;
                
                // Set move-to var's for top & left    
                var posx = x-o.radius;
                var posy = y-o.radius;
                
                // Shrink the canvas
                $('#clickecho').css({'top' : y, 'left' : x, 'height' : '5px', 'width' : '5px' });
                
                // Animate to create the effect, remove the #clickecho object on complete
                $('#clickecho').animate({ width: (o.radius*2)+'px', height: (o.radius*2)+'px', top: posy, left: posx, opacity: 0 },o.duration,function(){ $('#clickecho').remove(); });
                
        });
    });
 
};