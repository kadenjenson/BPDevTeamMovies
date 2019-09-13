"use strict"; 

/**
 * This will create a route object. 
 * @param {string} uri 
 * @param {function} component 
 * @param {string} [title] 
 */
var addRoute = function(uri, component, title)
{
	return {
		uri: uri, 
		component: component, 
		title: title
	}; 
};

/**
 * AppController 
 * 
 * This will extend the main class to override 
 * the app settings. 
 * @class
 */
var AppController = MainController.extend(
{ 
	/**
	 * This will get the router settings. 
	 * @return {object}
	 */
	getRouterSettings: function()
	{ 
		return {
			baseUrl: '/bpdev-movies/', 
			title: 'BP Dev Movies'
		}; 
	}, 
	
	/**
	 * This will get the routes that will be used in 
	 * the app shell. 
	 * 
	 * @return {array}
	 */
	getRoutes: function()
	{ 
		return [
			addRoute('./', HomePanel, 'Home'),
			addRoute('/contact/', ContactPanel, 'Contact Us'),
			addRoute('/synopsis/:page?*/', SynopsisPanel, 'Synopsis'),
			addRoute('/cast/', CastPanel, 'Cast')
		]; 
	}, 

	/**
	 * This will get the options to create the app 
	 * navigation. 
	 * 
	 * @return {array}
	 */
	getNavOptions: function()
	{ 
		return [
			{
				label: 'HOME', 
				href: './'
			},
			{
				label: 'CONTACT', 
				href: '/contact'
			},
			{
				label: 'SYNOPSIS', 
				href: '/synopsis', 
				options: 
				[
					{
						label: 'STORY', 
						href: '/synopsis/story'
					}, 
					{
						label: 'BOOK', 
						href: '/synopsis/book'
					}, 
					{
						label: 'CONCEPTS', 
						href: '/synopsis/concepts'
					}
				]
			}, 
			{
				label: 'CAST', 
				href: '/cast'
			}
		];
	}
}); 