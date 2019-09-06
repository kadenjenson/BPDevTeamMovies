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
                click: base.bind(this, this.toggleSuggestions),
                className: 'movie bttn',
				text: 'Add Movies'
            }),
            this.cache('suggestionContainer', new SuggestionsContainer()),
			this.addSubmit()
        ]
    },

    toggleSuggestions: function()
    {
        console.log(this.suggestionContainer)
        // var test = new SuggestionsContainer();
        // test.setup(this.suggestionContainer);
    }
});

var SuggestionsContainer = base.Component.extend(
{
    render: function()
    {
        console.log(this.state)
        return {
            className: 'suggestion-container',
            // onState: ''
        }
    }
});