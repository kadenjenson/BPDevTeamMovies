"use strict"; 

var CastPanel = MainPanel.extend(
{ 
	render: function()
	{ 
		return MainSection(
		{
			className: 'cast-panel', 
			children: 
			[
				MainTitle({
					text: 'Cast'
				}),
				{ 
					tag: 'section',
					className: 'body',
					row: 
					{
						className: 'row',
						children: 
						[
							{ className: 'col'},
							{ className: 'col'}
						]
					}
				}
			]
		}); 
	}
});