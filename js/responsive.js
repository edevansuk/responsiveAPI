(function(options) {
	var settings = {
		breakPoint: 'large'
	};
	
	/* 
	 * Constructor for the main 'Responsive' class 
	 */
	var Responsive = function(settings){
		/*if (options) { 
			$.extend(settings, options);
		};*/
		this.init(); 
	};
	
	/*
	 * This allows functions to run on events after 
	 * the requests have stopped hitting it to
	 * avoid things like resize resulting in umpteen
	 * results being returned. Timeout can be set
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







