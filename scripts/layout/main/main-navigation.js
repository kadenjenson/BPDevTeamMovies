"use strict"; 

var MainNavigation = base.Component.extend(
{ 
	render: function()
	{
		return {
			className: 'main-navigation nav-container', 
			children: 
			[ 
				{ 
					className: 'logo-container',
					link: this.addLogo()
				}, 
				{ 
					className: 'nav-container',
					nav: this.addPrimaryNav()
				}
			]
		};
	}, 

	addLogo: function()
	{ 
		return A(
		{
			className: 'logo',
			href: './',
			children: 
			[
				{
					tag: 'img',
					src: 'images/life-logo.svg'
				}
			]
		}); 
	}, 
	
	addPrimaryNav: function() 
	{
		return new DeepNavigation(
		{
			options: this.options, 
			appNav: this.parent.panel
		}); 
	}
}); 