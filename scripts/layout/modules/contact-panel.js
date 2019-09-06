"use strict";

var ContactPanel = MainPanel.extend(
{
    beforeSetup: function()
    {
        this.data = new ContactModel();
    },

    render: function()
    {
        return MainSection(
        {
            className: 'contact-panel', 
            children: 
            [
                MainTitle({
                    text: 'Contact Us'
                }),
                { 
                    tag: 'section',
                    className: 'content-container',
                    row: 
                    {
                        className: 'row',
                        contactForm: new MovieContactForm({
                            className: 'movie-contact-form'
                        })
                    }
                }
            ]
        });
    }
});

var MovieContactForm = Form.extend(
{
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
                state: this.state
            })),
			this.addSubmit()
        ]
    }
});

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
                    base.addClass(ele, 'open');

                    var suggestions = [];
                    for (var i = 0, len = self.state.get('movies'); i < len; i++)
                    {
                        suggestions.push({
                            className: 'suggestion-box ' + i
                        })
                    }

                    return suggestions;
                }

                base.removeClass(ele, 'open');
                return {};
            }]
        }
    }
});