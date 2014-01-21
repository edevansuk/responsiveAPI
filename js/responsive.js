(function(exports) {
	/* 
	 * Constructor for the main 'Responsive' class 
	 */
	var Responsive = function(options){
		this.settings = {};
		
		if (options) { 
			$.extend(this.settings, options); // Relies on jQuery
		}
		
		this.init(); 
	};
	
	/*
	 * Delays rechecking a function based on an event such as window
	 * resizing. Good for checking window width for example while reducing
	 * the number of times the function runs.
	 */
	Responsive.prototype.regulate = function(func, wait, immediate){
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};
	
	/*
	 * Check the responsive state
	 */
	Responsive.prototype.responsiveCheck = function(){
		var thisState = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content');
		this.settings.breakPoint = thisState.toString();	
	};
	
	/*
	 * Image handling
	 */
	Responsive.prototype.images = function(){
		// Find all elements on the page with data-splendid-src
		var pageImg = document.querySelectorAll('[data-splendid-src]');
		var pageImgLength = pageImg.length;
		
		for (var i=0;i<pageImgLength;i++) { 
			var thisImgObj = pageImg[i];
			var thisImgObjAtt = thisImgObj.getAttribute('data-splendid-src');
			
			var imgObjAttSplit = thisImgObjAtt.split(',');
			
			for(var s=0;s<imgObjAttSplit.length;s++){
				var splitItem = imgObjAttSplit[s];
				var sizeSplit = splitItem.split(':');
				if(sizeSplit[0] == this.settings.breakPoint) {
					var img = document.getElementById(thisImgObj.id);
					img.src = sizeSplit[1];
				};
			}
		}
	};
	
	/*
	 * Initialises the object
	 */
	Responsive.prototype.init = function(){
		var $this = this;
		
		if($this.settings.breakPoint == null){
			$this.responsiveCheck();
		}
		
		window.addEventListener('resize', this.regulate(function() {
			$this.responsiveCheck();
		}, 100), false);
	};
	
	exports.Responsive = Responsive;
}(window));







