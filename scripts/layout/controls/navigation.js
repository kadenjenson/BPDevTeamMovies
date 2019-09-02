"use strict"; 

/**
 * MainLink
 * 
 * This will setup a navigation link. 
 * @class
 */
var MainLink = base.Component.extend(
{
	render: function()
	{
		return { 
			tag: 'li',  
			className: 'option' + (this.options? ' sub' : ''),
			a: this.addLink(), 
			click: !this.options? this.callBack : null
		};
	}, 
	
	addLink: function()
	{
		return this.cache('link', new NavLink(
		{ 
			href: this.href, 
			activeClass: 'selected', 
			exact: (this.options)? false : true,
			children: 
			[
				Span({
					className: 'icon ' + (this.icon || '')
				}), 
				{
					className: 'label', 
					text: this.label || ''
				}
			]
		})); 
	}
}); 

/**
 * This will return a navigation group. 
 * @params {object} props
 * @return {object}
 */
var NavigationGroup = Atom.extend(function(props)
{
	return {
		className: 'navigation-group',
		text: H2({
			text: props.text
		}),
		children: props.children || null 
	};
}); 

/**
 * Navigation
 * 
 * This will create a navigation component. 
 * @class
 */
var Navigation = base.Component.extend(
{
	render: function() 
	{ 
		return { 
			tag: 'nav', 
			className: 'navigation', 
			ul: 
			{ 
				tag: 'ul', 
				children: this.addLinks(this.options)
			}
		};
	}, 

	addLinks: function(options)
	{ 
		var links = []; 
		var option;
		 
		for(var i = 0, length = options.length; i < length; i++)
		{ 
			option = options[i];
			if(!option.group)
			{
				links.push(this.addLink(option));
				continue; 
			}

			links.push(this.addGroup(option));
			 
		}
		return links; 
	}, 

	addGroup: function(option)
	{
		var childLinks = this.addLinks(option.options); 
			
		return NavigationGroup({
			text: option.group,
			children: childLinks
		}); 
	}, 

	addLink: function(option)
	{
		return new MainLink(option);
	}
});

/**
 * DeepNavigation 
 * 
 * This will create a navigation that has sub 
 * navigations. 
 * 
 * @class 
 * @augments Navigation
 */
var DeepNavigation = Navigation.extend(
{
	beforeSetup: function()
	{
		this.subs = []; 
	}, 

	render: function() 
	{ 
		return { 
			tag: 'nav', 
			className: 'navigation' + (this.sub? ' sub' : ''), 
			onState: this.onState(),
			ul: 
			{ 
				tag: 'ul', 
				children: this.addLinks(this.options)
			}
		};
	}, 

	afterSetup: function()
	{
		var subs = this.subs; 
		if(!subs.length)
		{
			return false; 
		}

		for(var i = 0, length = subs.length; i < length; i++)
		{
			var sub = subs[i]; 
			sub.setup(this.appNav); 
		}
	}, 
	
	onState: function()
	{
		if(!this.sub)
		{
			return null;
		}

		return ['selected', {
			active: true
		}]; 
	}, 

	addSubNav: function(link)
	{
		this.subs.push(new DeepNavigation(
		{
			appNav: this.appNav, 
			sub: true,
			parentLink: link, 
			options: link.options
		})); 
	},

	addLink: function(option)
	{
		option.callBack = function(e)
		{
			base.state.set('app-control', 'ignoreHover', true);
		}; 

		var link = new MainLink(option);
		if(link.options)
		{
			this.addSubNav(link); 
		}
		return link;
	},
	
	setupStates: function()
	{
		if(!this.sub)
		{
			return {};
		}

		return {
			selected: 
			{
				targetId: this.parentLink.link.getId()
			}
		};
	}
});