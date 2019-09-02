"use strict"; 

var Panel = base.Component.extend(
{
	render: function() 
	{ 
		return { 
            className: 'panel',
            text: P({
                text: this.text
            }), 
            children: this.children
        };
	}
});