"use strict"; 

var AppControl = base.Component.extend(
{ 
	render: function()
	{
		return { 
			className: 'app-nav-container', 
			onState: ['ignoreHover', {
				ignoreHover: true
            }],
            mouseout: base.bind(this, this.removeIgnore),
			primary: new MainNavigation({
                options: this.options, 
                parent: this
            })
		};
    }, 

    timer: null,
    
    removeIgnore: function()
    {
        window.clearTimeout(this.timer); 

        var state = this.state; 
        this.timer = window.setTimeout(function()
        {
            state.set('ignoreHover', false);
        }, 600);  
    }, 

	setupStates: function()
	{
		this.stateTargetId = 'app-control'; 

		return {
            pinned: false, 
            ignoreHover: false
		}; 
	}
}); 