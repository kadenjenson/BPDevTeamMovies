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
					className: 'content-container',
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