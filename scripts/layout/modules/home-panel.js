"use strict";

var posters = [
	'images/fightClub.jpg',
	'images/ghostBusters.jpg',
	'images/isleOfDogs.jpg',
	'images/lotr.jpg',
	'images/silenceOfTheLambs.jpg',
	'images/spooderMan.jpg',
	'images/starWars.jpg',
	'images/thor.jpg',
	'images/starTrek.jpg',
	'images/theOtherGuys.jpg',
	'images/spongeBob.jpg',
	'images/harryPotter.jpg'
];

/**
 * HomePanel
 * 
 * This will create a home panel. 
 * @class
 */
var HomePanel = MainPanel.extend(
{ 
	render: function()
	{ 
		return MainSection(
		{
			className: 'home-panel', 
			children: 
			[
				MainTitle({
					text: 'Development All Time Faves + SpongeBob'
				}),
				{ 
					tag: 'section',
					className: 'content-container',
					row: 
					{
						className: 'row',
						movies: this.movieContainer()
					}
				}
			]
		}); 
	},

	movieContainer: function()
	{
		return this.cache('movieContainer',
		{
			className: 'col movie-container',
			children: this.addMoviePosters()
		});
	},

	addMoviePosters: function()
	{
		var posterList = [];

		for (var i = 0, len = posters.length; i < len; i++)
		{
			var item = posters[i];

			posterList.push(
			{
				className: 'movie-poster ' + i,
				poster:
				{
					tag: 'img',
					src: item,
					alt: 'Movie Poster ' + i
				}
			});
		}

		return posterList;
	}
});





















