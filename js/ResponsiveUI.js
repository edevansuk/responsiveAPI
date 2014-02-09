(function(exports) {
	/* 
	 * Constructor for the main 'Responsive' class 
	 */
	var ResponsiveUI = function(options){
		this.settings = {
			supported: true, // Checked and validated in this.init();
			lastBreakPoint: '' // Can use this to check if breakpoint has changed
		};
		
		// extends the settings object, so you can set default breakPoint setting
		if (options) {
			for(var i in options)
				this.settings[i] = options[i];
		}
		
		this.init(); 
	};
	
	/*
	 * Delays rechecking a function based on an event such as window
	 * resizing. Good for checking window width for example while reducing
	 * the number of times the function runs.
	 */
	ResponsiveUI.prototype.regulate = function(func, wait, immediate){
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
	ResponsiveUI.prototype.responsiveCheck = function(){
		var thisState = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content');
		var thisStateString = thisState.toString();
		this.settings.breakPoint = thisStateString;
	};
	
	/*
	 * Image handling
	 */
	ResponsiveUI.prototype.resizeImages = function(){
		// Find all elements on the page with data-[namespace]-src
		var pageImg = document.querySelectorAll('[data-responsive-src]'),
			pageImgLength = pageImg.length;
				
		for (var i=0;i<pageImgLength;i++) { 
			var thisImgObj = pageImg[i],
				thisImgObjAtt = thisImgObj.getAttribute('data-responsive-src'),
				imgObjAttSplit = thisImgObjAtt.split(','),
				imgObjAttSplitLgth = imgObjAttSplit.length;
					
					
			for(var s=0;s<imgObjAttSplitLgth;s++){
				// Create local versions of objects for performance
				var splitItem = imgObjAttSplit[s], 
					sizeSplit = splitItem.split(':'), 
					sizeSplitStringFF = '\"' + sizeSplit[0].toString() + '\"',
					sizeSplitString = sizeSplit[0].toString(),
					cachedBreakpoint =  this.settings.breakPoint;
					
				if(sizeSplitString == cachedBreakpoint || sizeSplitStringFF == cachedBreakpoint) {
	                   thisImgObj.src = sizeSplit[1];
				}
			}
		}
	};
	
	/*
	 * Check the breakpoint has changed or not
	 */
	ResponsiveUI.prototype.breakPointChanged = function(){
		console.log('bpChecker ran');
		var $this = this;
			localBP = this.settings.breakPoint,
			localLBP = this.settings.lastBreakPoint;
		
		// Only update images if a new breakpoint is activated
		if(localBP !== localLBP){
			this.settings.lastBreakPoint = localBP;
			return true;
		} else {
			return false;
		}
	};
	
	/*
	 * Initialises the object
	 */
	ResponsiveUI.prototype.init = function(){
		var $this = this;

		// Checks for method support and sets a value that can be interrogated later
		if(!window.querySelector && !window.addEventListener) {
			$this.settings.supported = false;
			return;
		}
		
		$this.responsiveCheck(); // For first scenarios
		
		window.addEventListener('resize', this.regulate(function() {
			$this.responsiveCheck();
		}, 100), false);
	};
	
	exports.ResponsiveUI = ResponsiveUI;
}(window));







