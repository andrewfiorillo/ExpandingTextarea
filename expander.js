(function( $ ){
	
	$.fn.getStyleObject = function(){
		var dom = this.get(0);
		var style;
		var returns = {};
		if(window.getComputedStyle){
			var camelize = function(a,b){
				return b.toUpperCase();
			}
			style = window.getComputedStyle(dom, null);
			for(var i = 0, l = style.length; i < l; i++){
				var prop = style[i];
				var camel = prop.replace(/\-([a-z])/, camelize);
				var val = style.getPropertyValue(prop);
				returns[camel] = val;
			}
			return returns;
		}
		// if(dom.currentStyle){
		// 	style = dom.currentStyle;
		// 	for(var prop in style){
		// 		returns[prop] = style[prop];
		// 	}
		// 	return returns;
		// }
		if(style = dom.style){
			for(var prop in style){
				if(typeof style[prop] != 'function'){
					returns[prop] = style[prop];
				}
			}
			return returns;
		}
		return returns;
	}

	$.fn.expander = function() {
		
		// Set up expanding for each element
		
		this.each(function(i,el) {
			
			// Set requisite styles on textarea to make this work
			
			$(el).css({
				"resize" 		: "none",
				"word-wrap"		: "break-word",
				"white-space"	: "pre-wrap",
			});
						
			// Create hidden div with all the same styles as textarea, plus a few extra needed things

			var	box = $('<div class="box"></div>'),
				styles = $(el).getStyleObject();
			
			$(box).css(styles).css({
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