"use strict"; 

var AppShell = base.Component.extend(
{ 
	render: function()
	{
		return { 
			className: 'app-container', 
			children: 
			[
				new AppControl({
					options: this.options
				}), 
				this.cache('mainBody', 
				{ 
					className: 'active-panel-container', 
					switch: this.routes
				})
			]
		};
	}, 
	
	getBodyPanel: function()
	{ 
		return this.mainBody; 
	}
}); 