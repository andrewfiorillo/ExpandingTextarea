(function( $ ){

	$.fn.expander = function() {
		
		// Set up expanding for each element
		
		this.each(function(i,el) {
			
			// Set requisite styles on textarea to make this work
			
			$(el).css({
				"resize" 		: "none",
				"word-wrap"		: "break-word",
				"white-space"	: "pre-wrap"
			});
						
			// Create hidden div with all the same styles as textarea, plus a few extra needed things

			var	box = $('<div class="box"></div>'), styles = {};
			
			if(window.getComputedStyle){
				var camelize = function(a,b){ return b.toUpperCase(); }
				var style = window.getComputedStyle(el, null);
				for(var i = 0, l = style.length; i < l; i++){
					var prop = style[i];
					var camel = prop.replace(/\-([a-z])/, camelize);
					var val = style.getPropertyValue(prop);
					styles[camel] = val;
				}
			}
			else if (el.currentStyle) {
				var style = el.currentStyle,
					re = /(\-([a-z]){1})/g,
					toDash = function(str) { return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}); };
				for (var prop in style) {
					if (prop == 'float') prop = 'styleFloat';
					if (re.test(prop)) prop = prop.replace(re, function() { return arguments[2].toUpperCase(); });
					try { if(style[prop]) styles[toDash(prop)] = style[prop]; }
					catch(err) {}
				}
			}
			
			$(box).css(styles).css({
				"height"		: "auto",
				"position"   	: "absolute",
				"visibility" 	: "hidden",
				"left"			: "-9999px",
				"width" 		: $(el).width()
			}).insertAfter(el);
			
			// Populate hidden div with text as you tpe and resize textarea based on height
			
			$(el).bind("input keydown keyup change", function() {
				if ($.browser.msie && $.browser.version <= 7) $(box).html(el.value.replace(/(\r\n|\r|\n)$/g,"<br /><br />|").replace(/\r?\n|\r/g, "<br />|"));
				else $(box).html(el.value.replace(/(\r\n|\r|\n)$/g,"<br /><br />").replace(/\r?\n|\r/g, "<br />"));
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