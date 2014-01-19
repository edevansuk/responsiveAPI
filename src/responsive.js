(function(exports) {
	/* 
	 * Constructor for the main 'Responsive' class 
	 */
	var Responsive = function(options){
		this.settings = {};
		
		if (options) { 
			$.extend(this.settings, options); // Relies on jQuery
		};
		
		this.debug(this.settings.breakPoint);
		
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
		this.debug(this.settings.breakPoint);
	};
	
	Responsive.prototype.debug = function(error){
		if(console){
			console.log(error);
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







