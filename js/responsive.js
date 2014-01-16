// Create a namespace for the sites API and modules
var responsive = {
	breakPoint: 'large',
	
	regulate: function(func, wait, immediate){
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
	},
	
	responsiveCheck: function(){
		var thisState = window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content');
		responsive.breakPoint = thisState.toString();	
		console.log(responsive.breakPoint);
	}, 
		
	init: function() {
		responsive.responsiveCheck();
		window.addEventListener('resize', responsive.regulate(function() {
		    responsive.responsiveCheck();
		}, 100), false);
	}
};

responsive.init();
