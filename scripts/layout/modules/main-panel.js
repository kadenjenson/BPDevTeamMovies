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