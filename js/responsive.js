(function(options) {
	var settings = {
		breakPoint: 'large'
	};
	
	/* 
	 * Constructor for the main 'Responsive' class 
	 */
	var Responsive = function(options){
		/*if (options) { 
			$.extend(settings, options);
		};*/
		
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
		settings.breakPoint = thisState.toString();	
		console.log(settings.breakPoint);
	};
	
	Responsive.prototype.page = function(){
		//Execute passed functions here to abstract the breakpoints
	};
	
	/*
	 * Initialises the object
	 */
	Responsive.prototype.init = function(){
		var $this = this;
		$this.responsiveCheck();
		
		window.addEventListener('resize', this.regulate(function() {
			$this.responsiveCheck();
		}, 100), false);
	};
	
	options.Responsive = Responsive;
}(window));







