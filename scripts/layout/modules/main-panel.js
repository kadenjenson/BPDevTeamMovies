"use strict"; 

/**
 * MainPanel
 * 
 * This will create a base component to extend 
 * to all child components. 
 * @class
 */
var MainPanel = base.Component.extend(
{ 
	panelClass: '',

	panelTitle: '',

	headerClickAction: function()
	{
		var modal = new Modal({
			title: "Contact Us"
		});
		modal.setup();
		modal.display();
	},

	render: function ()
	{
		return MainSection(
		{
			className: this.panelClass,
			children:
				[
					MainTitle({
						text: this.panelTitle,
						bttnText: 'Contact Us',
						bttnClass: 'header-modal bttn',
						click: this.headerClickAction
					}),
					{
						tag: 'section',
						className: 'content-container',
						row:
						{
							className: 'row',
							body: this.addBody()
						}
					}
				]
			});
	},

	addBody: function()
	{
		return {

		};
	},

	/**
	 * This will be called every time the route 
	 * is activated. 
	 * 
	 * @param {object} params 
	 */
	update: function(params) 
	{ 
	
	},

	addCol: function()
	{
		return {
			className: 'col'
		};
	}
});