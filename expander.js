(function($){

	$.fn.expander = function() {
				
		var re     = /(\-([a-z]){1})/g,
			br     = "<br />",
			breaks = "<br /><br />";
		
		function camelize(a,b) {
			return b.toUpperCase();
		}
		
		function toDash(str) {
			return str.replace(re, function(s) {
				return "-" + s.toLowerCase() 
			});
		}
		
		this.each(function(i,el) {
			
			// Set requisite styles on textarea to make this work
			
			$(el).css({
				"resize"      : "none",
				"overflow"    : "hidden",
				"white-space" : "pre",
				"white-space" : "pre-wrap",
				"white-space" : "-moz-pre-wrap",
				"white-space" : "-pre-wrap",
				"white-space" : "-o-pre-wrap",
				"word-wrap"   : "break-word"
			});
						
			// Create hidden div with all the same styles as textarea, plus a few extra needed things

			var	box    = $('<pre class="box"></pre>'),
				styles = {};
			
			if (window.getComputedStyle) {
				var style = window.getComputedStyle(el, null);
				for (var i = 0, l = style.length; i < l; i++) {
					var prop  = style[i];
					var camel = prop.replace(re, camelize);
					var val   = style.getPropertyValue(prop);
					styles[camel] = val;
				}
			}
			else if (el.currentStyle) {
				var style = el.currentStyle;
				for (var prop in style) {
					prop = prop.replace(re, camelize);
					try { styles[toDash(prop)] = style[prop]; }
					catch(err) {}
				}
			}
			
			$(box).css(styles).css({
				"height"     : "auto",
				"position"   : "absolute",
				"visibility" : "hidden",
				"left"       : "-9999px",
				"width"      : $(el).width()
			}).insertAfter(el);
			
			// Populate hidden div with text as you tpe and resize textarea based on height
			
			function grow() {	
				var value = el.value;
				value = value.replace(/</g,"&lt;").replace(/>/g,"&gt;");
				value = value.replace(/(\r\n|\r|\n)$/g, breaks);
				value = value.replace(/\r?\n|\r/g, br);
				$(box).html(value);
				$(el).height($(box).height());
			}
			$(el).bind("input keydown keyup change", grow);
			grow();
			
			// In case the textarea is fluid and window gets resized 
			
			$(window).resize(function() {
				$(box).width($(el).width());
				$(el).height($(box).height());
			});
			
		});

	};
	
})( jQuery );