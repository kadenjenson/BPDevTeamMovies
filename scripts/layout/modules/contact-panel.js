"use strict";

var ContactPanel = MainPanel.extend(
{
    panelClass: 'contact-panel',

    panelTitle: 'Contact Us',

    addBody: function()
    {
        return new MovieContactForm({
            className: 'movie-contact-form'
        });
    }
});

var MovieContactForm = Form.extend(
{
    beforeSetup: function()
    {
        this.data = new ContactModel();
    },

    setupStates: function()
    {
        return {
            open: false,
            movies: 3
        }
    },

    addFormBody: function()
    {
        var self = this;
        return [
            this.addFloatingInput({
				name: 'Name',
				label: 'Name',
				placeholder: 'First Last'
			}),
			Row({
				children: [
					this.addFloatingPhone({
                        name: 'Phone',
                        required: true
                    }),
                    this.addFloatingEmail({
                        name: 'Email',
                        required: true
                    })
				]
			}),
			this.addFloatingTextarea({
				name: 'Message',
				className: 'appointment-message',
				placeholder: 'I would like to schedule an appointment.'
			}),
			Button({
                click: function()
                {
                    var open = self.state.get('open');
                    self.state.set('open', !open);
                },
                className: 'movie bttn',
				text: 'Add Movies'
            }),
            this.cache('suggestionContainer', new SuggestionsContainer({
                state: this.state,
                data: this.data
            })),
			this.addSubmit()
        ]
    }
});

var placeholders = [
    'Something inspiring?',
    'Dramatic much?',
    'Will it make you laugh out loud?',
    "I'm not crying you are!",
    'Meant for children but I too, am a child.'
];

var SuggestionsContainer = base.Component.extend(
{
    render: function()
    {
        var self = this;
        return {
            className: 'suggestion-container',
            onState: ['open', function(ele, val)
            {
                if (val)
                {
                    var suggestions = [
                        H1({
                            className: 'suggestion-label',
                            text: 'What are some of your favorite movies?'
                        })
                    ];
                    for (var i = 0, len = self.state.get('movies'); i < len; i++)
                    {
                        suggestions.push({
                            className: 'suggestion-box',
                            children: [
                                Input({
                                    keyup: function(e)
                                    {
                                        console.log(e);
                                    },
                                    className: 'suggestion-' + (i + 1),
                                    placeholder: placeholders[i],
                                    name: 'Suggestion ' + (i + 1),
                                    required: (i === 0)
                                })
                            ]
                        })
                    }

                    base.addClass(ele, 'open');
                    return suggestions;
                }

                base.removeClass(ele, 'open');
                return {};
            }]
        }
    }
});