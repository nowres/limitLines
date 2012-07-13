/**
 * Plugin name: limitLines
 * @description: limits the number of lines within a textarea
 * @author: Nowres RAFID ABDULSATTAR
 * @license: GNU GPLv3
 */

(function( $ ){

    var methods = {
        init : function( options ) {

            return this.each(function(){

                var $this = $(this),
                data = $this.data('limitLines');

                // If the plugin hasn't been initialized yet
                if ( ! data ) {
                    var target, ruler;

                    $(this).data('limitLines', {
                        target : $this,
                        max : 8
                    });
                    data = $this.data('limitLines');
                    target = data.target;

                    target.parent().append('<span class="_limitLines_ruler" style="display: block;white-space: pre;"></span>');
                    target.keyup(methods.brider);
                    target.keypress(methods.kpHandler);

                    data.ruler = target.parent().children('._limitLines_ruler');
                    ruler = data.ruler;

                    ruler.css('font-family', target.css('font-family'));
                    ruler.css('font-size', target.css('font-size'));

                    data.maxWidth = target.get(0).scrollWidth;

                    data.number = 0;

                    data.counter = $this.parent().children('.lineNumbers');

                    data.counter.html(data.max - data.number);
                    
                    methods.brider.call(target);
                    
                    ruler.css({position: 'absolute', top: '-100px', visibility: 'hidden'});
                }
            });
        },
        destroy : function( ) {
            return this.each(function(){
                var $this = $(this);
                $this.removeData('limitLines');
            })
        },
        brider: function(e) {
            var maxW, $this = $(this),
            data = $this.data('limitLines'),
            $ruler = data.ruler,
            ruler = $ruler.get(0),
            chars = $this.val(),
            l = chars.length,
            w = 0,
            n = 1,
            s = -1;
            
            data.maxWidth = target.get(0).scrollWidth;
            maxW = data.maxWidth;

            ruler.innerHTML = '';

            if (l == 0) {
                n = 0;
            }

            for (var i = 0; i < l; i++) {
                if (chars.charAt(i) == '\n') {
                    n++;
                    s = -1;
                    ruler.innerHTML = '';
                }
                $ruler.append(chars.charAt(i));
                if (ruler.clientWidth >= maxW) {
                    n++;
                    ruler.innerHTML = '';
                    if (s >= 0) {
                        $ruler.append(chars.slice(s + 1, i));
                        s = -1;
                    }
                    $ruler.append(chars.charAt(i));
                }
                if (n > data.max) {
                    $this.val(chars.slice(0, i));
                    n = data.max;
                    break;
                }
                if (chars.charAt(i) == ' ') {
                    s = i;
                }
            }
            data.number = n;
            data.counter.html(data.max - data.number);

        },
        kpHandler: function(e) {
            var $this = $(this),
            data = $this.data('limitLines');
			
            if (e.keyCode == 8 || e.keyCode == 46) {
                return true;
            } else if (data.number >= data.max + 1) {
                return false;
            }

            return true;
        }
    };

    $.fn.limitLines = function( method ) {

        if ( methods[method] ) {
            return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.limitLines' );
        }

    };

})( jQuery );


