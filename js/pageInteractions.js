$script('ResponsiveUI', function () { // Checks that dependency ResponsiveUI is loaded
	if(window.console){
		console.log('Responsive API loaded');
	}
	
	var page = new ResponsiveUI();
	
	if(!page.settings.supported){return;}; // Checks for support and ResponsiveUI 
	
	ResponsiveUI.prototype.actions = function(options){
		var methods = {
			init: function(state){
				switch(state) {
					case 'large':
						methods.largeUI();
						break;
					case 'medium':
						methods.mediumUI();
						break;
					case 'small':
						methods.smallUI();
						break;
				};
			},
			
			smallUI: function(){
				if(page.breakPointChanged()){
					console.log('Small fired');
					page.resizeImages();
				}
			},
			
			mediumUI: function(){
				if(page.breakPointChanged()){
					console.log('Medium fired');
					page.resizeImages();
				}
			},
			
			largeUI: function(){
				if(page.breakPointChanged()){
					console.log('Large fired');
					page.resizeImages();
				}
			},
		};
		
		methods.init(options);
		
	};
	
	page.actions(page.settings.breakPoint);
	window.addEventListener('resize', page.regulate(function() {
		page.actions(page.settings.breakPoint);
	}, 100), false);
	
});