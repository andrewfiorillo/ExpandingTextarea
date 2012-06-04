(function( $ ){

	$.fn.expander = function() {
		
		this.each(function(i,el) {
			
			// Set requisite styles on textarea to make this work
			
			$(el).css({
				"resize" 		: "none",
				"word-wrap"		: "break-word",
				"white-space"	: "pre-wrap",
				"overflow"		: "hidden"
			});
						
			// Create hidden div with all the same styles as textarea, plus a few extra needed things

			var	box			= $('<div class="box"></div>'),
				styles		= {},
				re			= /(\-([a-z]){1})/g,
				camelize	= function(a,b){ return b.toUpperCase(); },
				toDash		= function(str) { return str.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();}); };
			
			if(window.getComputedStyle){
				var style =style = window.getComputedStyle(el, null);
				for(var i = 0, l = style.length; i < l; i++){
					var prop = style[i];
					var camel = prop.replace(re, camelize);
					var val = style.getPropertyValue(prop);
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
				"height"		: "auto",
				"position"   	: "absolute",
				"visibility" 	: "hidden",
				"left"			: "-9999px",
				"margin"		: $(el).css("margin"),
				"width" 		: $(el).width()
			}).insertAfter(el);
			
			// Populate hidden div with text as you tpe and resize textarea based on height
			
			var grow = function() {
				var value = el.value.replace(/</g,"&lt;").replace(/>/g,"&gt;");
				if ($.browser.msie && $.browser.version <= 7)
					 $(box).html(value.replace(/(\r\n|\r|\n)$/g,"<br /><br />|").replace(/\r?\n|\r/g, "<br />|"));
				else $(box).html(value.replace(/(\r\n|\r|\n)$/g,"<br /><br />").replace(/\r?\n|\r/g, "<br />"));
				$(el).height($(box).height());
			};
			
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