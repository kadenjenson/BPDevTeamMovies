"use strict"; 

/**
 * SwitchLink 
 * 
 * This will create a tab link component. 
 * @class
 */
var SwitchLink = base.Component.extend(
{
	/**
	 * This will configure the link active class. 
	 * 
	 * @protected
	 */
	beforeSetup: function()
	{
		this.selectedClass = this.activeClass || 'selected'; 
	},

	render: function()
	{
		var href = this.href, 
		text = this.label; 

		var watchers = this.setupWatchers(href, text); 

		var onState = {}; 
		onState[this.selectedClass] = true;
		
		return { 
			tag: 'li',  
			className: 'option',
			a: this.cache('link', 
			{
				tag: 'a', 
				className: this.className || null, 
				onState: ['selected', onState],
				href: this.getString(href), 
				text: this.getString(text), 
				children: this.children,
				watch: watchers
			})
		};
	}, 

	/**
	 * This will get string. 
	 * 
	 * @param {string} string 
	 * @return {(string|null)}
	 */
	getString: function(string)
	{
		return typeof string !== 'object'? string : null;
	}, 

	/**
	 * This will setup the watchers. 
	 * 
	 * @protected
	 * @param {string} href 
	 * @param {string} text 
	 * @return {array}
	 */
	setupWatchers: function(href, text)
	{
		var watchers = []; 

		if(href && typeof href === 'object')
		{
			watchers.push(
			{
				attr: 'href', 
				value: href
			}); 
		}

		if(text && typeof text === 'object')
		{
			watchers.push(
			{
				attr: 'text', 
				value: text
			});
		}
		return watchers; 
	}, 

	setupStates: function()
	{
		return {
			selected: false
		}; 
	}, 

	update: function(selected)
	{
		this.state.set('selected', selected);
	}
}); 

var SwitchNavigation = base.Component.extend(
{
	beforeSetup: function()
	{
        this.data = base.router.data;
		this.links = []; 
	}, 

	beforeDestroy: function()
	{
		this.links = []; 
	},

	render: function()
	{
		return {
			tag: 'nav',
			ul: 
			{ 
				tag: 'ul', 
                watch: 
                {
					value: ['[[path]]', this.data], 
					callBack: base.bind(this, this.updateLinks)
				},
				children: this.addLinks()
			}
		};
	}, 

	afterSetup: function()
	{
		var path = this.data.get('path'); 
		this.updateLinks(null, path); 
	}, 

	updateLinks: function(ele, value)
	{
		var check = false, 
		links = this.links, 
		firstLink = null;

		for(var i = 0, length = links.length; i < length; i++) 
		{
			var link = links[i]; 
			if(link.rendered === false)
			{
				continue; 
			}

			/* we want to save the first route in the switch 
			so it can be selected if no route is active */ 
			if(i === 0)
			{
				firstLink = link; 
			} 
			
			if(check === true)
			{
				this.updateLink(link, false);
				continue; 
			}

			check = value.indexOf(link.link.pathname) !== -1; 
			this.updateLink(link, check);
		}

		if(check !== true && firstLink)
		{
			this.updateLink(firstLink, true);
		}
	},

	updateLink: function(link, selected)
	{
		link.update(selected);
	},

	addLinks: function()
	{ 
		var links = [], 
		options = this.options || []; 
		
		for(var i = 0, length = options.length; i < length; i++)
		{ 
			var link = this.addLink(options[i]);
			this.links.push(link);
			links.push(link);
		}
		return links; 
	}, 

	addLink: function(option)
	{
		return new SwitchLink(
        {
			text: option.text, 
            href: option.href, 
            children: option.children
		});
    }
});