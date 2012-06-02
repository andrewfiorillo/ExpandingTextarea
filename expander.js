(function( $ ){

	$.fn.expander = function() {
		
		// Get styles of textarea for reuse later
		// 
		
		$.fn.copyCSS = function (source) {
			var dom = $(source).get(0);
			var dest = {};
			var style, prop;
			var camelize = function (a, b) {
					return b.toUpperCase();
				};
			if (window.getComputedStyle) {
				style = window.getComputedStyle(dom, null);
				if (style) {
					var camel, val;
					if (style.length) {
						for (var i = 0, l = style.length; i < l; i++) {
							prop = style[i];
							camel = prop.replace(/\-([a-z])/, camelize);
							val = style.getPropertyValue(prop);
							dest[camel] = val;
						}
					} else {
						for (prop in style) {
							camel = prop.replace(/\-([a-z])/, camelize);
							val = style.getPropertyValue(prop) || style[prop];
							dest[camel] = val;
						}
					}
					return this.css(dest);
				}
			}
			if (style = dom.currentStyle) {
				var camel, val;
				for (prop in style) {
					//dest[prop] = style[prop];
					camel = prop.replace(/\-([a-z])/, camelize);
					val = style.getPropertyValue(prop) || style[prop];
					dest[camel] = val;
				}
				return this.css(dest);
			}
			if (style = dom.style) {
				for (prop in style) {
					if (typeof style[prop] != 'function') {
						dest[prop] = style[prop];
					}
				}
			}
			return this.css(dest);
		};
		
		// Set up expanding for each element
		
		this.each(function(i,el) {
			
			// Set requisite styles on textarea to make this work
			
			$(el).css({
				"resize" 		: "none",
				"word-wrap"		: "break-word",
				"white-space"	: "pre-wrap"
			});
						
			// Create hidden div with all the same styles as textarea, plus a few extra needed things

			var	box = $('<div class="box"></div>');
			
			$(box).insertAfter(el);
			
			$(box).copyCSS(el);
			
			$(box).css({
				"height"		: "auto",
				"position"   	: "absolute",
				"visibility" 	: "hidden",
				"left"			: "-9999px",
				"width" 		: $(el).width(),
			});
			
			// Populate hidden div with text as you tpe and resize textarea based on height
			
			$(el).bind("input keydown keyup change", function() {
				$(box).html(el.value.replace(/(\r\n|\r|\n)$/g,"<br /><br />").replace(/\r?\n|\r/g, "<br />"));
				$(el).height($(box).height());
			});
			
			// In case the textarea is fluid and window gets resized 
			
			$(window).resize(function() {
				$(box).width($(el).width());
				$(el).height($(box).height());
			});
			
		});
	};
	
})( jQuery );