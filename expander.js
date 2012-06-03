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

			var	box = $('<div class="box"></div>');
			
			if(window.getComputedStyle){
				var camelize = function(a,b){ return b.toUpperCase(); }
				var returns = {};
				var style = window.getComputedStyle(el, null);
				for(var i = 0, l = style.length; i < l; i++){
					var prop = style[i];
					var camel = prop.replace(/\-([a-z])/, camelize);
					var val = style.getPropertyValue(prop);
					returns[camel] = val;
				}
				$(box).css(returns);
			}
			
			$(box).css({
				"height"		: "auto",
				"position"   	: "absolute",
				"visibility" 	: "hidden",
				"left"			: "-9999px",
				"width" 		: $(el).width(),
				"line-height"	: $(el).css("line-height"),
				"font-size"		: $(el).css("font-size"),
				"font-family"	: $(el).css("font-family")
			}).insertAfter(el);
			
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