"use strict";

var Form = base.Component.extend(
{
    render: function () {
        if (this.formType === undefined) {
            this.formType = 'Page';
        }
        return {
            formType: this.formType,
            tag: 'form',
            method: 'post',
            name: this.formTitle || 'Contact Form',
            className: this.className || null,
            children: [
                this.addFormBody(),
                this.addHiddenFields()
            ]
        };
    },

    addFormBody: function () {
        return [];
    },

    addInput: function (props) {
        return {
            tag: 'label',
            text: props.label || '',
            className: props.className || null,
            children: Input(props)
        };
    },

    addPhone: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            tag: 'label',
            for: id,
            className: props.className || null,
            text: props.label || 'Phone',
            input:
            {
                tag: 'input',
                type: 'tel',
                name: props.name || 'Phone',
                id: id,
                placeholder: props.placeholder || null,
                value: props.value || null,
                required: props.required || null
            }
        };
    },

    addEmail: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            tag: 'label',
            for: id,
            className: props.className || null,
            text: props.label || 'Email',
            input:
            {
                tag: 'input',
                type: 'email',
                name: props.name || 'Email',
                id: id,
                placeholder: props.placeholder || null,
                value: props.value || null,
                required: props.required || null
            }
        };
    },

    addTextarea: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            tag: 'label',
            text: props.label || '',
            className: props.className || null,
            textarea:
            {
                tag: 'textarea',
                name: props.name || 'Message',
                id: id,
                placeholder: props.placeholder || null,
                maxLength: props.maxLength || '200'
            }
        };
    },

    addFloatingInput: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'floating-label',
            children:
                [
                    {
                        tag: 'input',
                        type: props.type || 'text',
                        className: props.className || null,
                        name: props.name,
                        id: id,
                        placeholder: props.placeholder || ' ',
                        value: props.value || null,
                        required: props.required || true
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label || ''
                    }
                ]
        };
    },

    addFloatingPhone: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'floating-label',
            children:
                [
                    {
                        tag: 'input',
                        type: 'tel',
                        className: props.className || 'tel',
                        name: props.name,
                        id: id,
                        placeholder: props.placeholder || '(123) 456-7890',
                        value: props.value || null,
                        required: props.required || null,
                        pattern: '[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}',
                        keyup: function () {
                            this.addEventListener('input', function (e) {
                                var pattern = /(\d{0,3})(\d{0,3})(\d{0,4})/,
                                    patternNumber = /\D/g,
                                    x = e.target.value.replace(patternNumber, '').match(pattern);

                                e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
                            });
                        }
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label || 'Phone'
                    }
                ]
        };
    },

    addFloatingEmail: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'floating-label',
            children:
                [
                    {
                        tag: 'input',
                        type: 'email',
                        name: props.name || 'Email',
                        id: id,
                        placeholder: props.placeholder || 'example@email.com',
                        required: props.required || null,
                        value: props.value || null
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label || 'Email'
                    }
                ]
        };
    },

    addFloatingDate: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'floating-label',
            children:
                [
                    {
                        tag: 'input',
                        type: 'date',
                        name: props.name || 'Date',
                        className: props.className || 'date val',
                        id: id,
                        placeholder: props.placeholder || 'mm/dd/yyyy',
                        value: props.value || tomorrow,
                        min: tomorrow
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label || 'Date'
                    }
                ]
        };
    },

    addFloatingTime: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'floating-label',
            children:
                [
                    {
                        tag: 'input',
                        type: 'time',
                        name: props.name || 'Time',
                        id: id,
                        placeholder: props.placeholder || '9:00 AM',
                        value: props.value || '09:00'
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label || 'Time'
                    }
                ]
        };
    },

    addFloatingTextarea: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'floating-label',
            children:
                [
                    {
                        tag: 'textarea',
                        name: props.name || 'Message',
                        id: id,
                        className: props.className,
                        placeholder: props.placeholder || ' ',
                        value: props.value || null,
                        maxLength: props.maxLength || '200'
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label || 'Message'
                    }
                ]
        };
    },

    addCheckbox: function (props) {
        var idName = props.value.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'checkbox-label',
            children:
                [
                    {
                        tag: 'input',
                        type: 'checkbox',
                        name: props.name,
                        id: id,
                        value: props.value
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label
                    }
                ]
        };
    },

    addRadio: function (props) {
        var idName = props.value.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'radio-label',
            children:
                [
                    {
                        tag: 'input',
                        type: 'radio',
                        name: props.name,
                        id: id,
                        value: props.value,
                        checked: props.checked || null
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label
                    }
                ]
        };
    },

    addYesNo: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        return {
            className: 'yes-no-radios radio-row',
            children:
                [
                    {
                        className: 'radio-label',
                        children:
                            [
                                {
                                    tag: 'input',
                                    type: 'radio',
                                    name: props.name,
                                    id: id + '-yes',
                                    value: 'Yes'
                                },
                                {
                                    tag: 'label',
                                    for: id + '-yes',
                                    text: 'Yes'
                                }
                            ]
                    },
                    {
                        className: 'radio-label',
                        children:
                            [
                                {
                                    tag: 'input',
                                    type: 'radio',
                                    name: props.name,
                                    id: id + '-no',
                                    value: 'No'
                                },
                                {
                                    tag: 'label',
                                    for: id + '-no',
                                    text: 'No'
                                }
                            ]
                    }
                ]
        };
    },

    addSwitch: function (props) {
        var idName = props.name.toLowerCase().replace(/\s/g, '-');
        var id = this.getId(idName);
        var switchClass = 'switch-label';
        if (props.className !== undefined) {
            switchClass = 'switch-label ' + props.className
        }
        return {
            className: switchClass,
            children:
                [
                    {
                        tag: 'input',
                        type: 'checkbox',
                        name: props.name,
                        id: id,
                        value: props.value
                    },
                    {
                        tag: 'label',
                        for: id,
                        text: props.label
                    }
                ]
        };
    },

    addSelect: function (props) {
        return {
            tag: 'select',
            name: props.name,
            children: props.children
        };
    },

    addOption: function (props) {
        return {
            tag: 'option',
            value: props.value,
            text: props.text
        };
    },

    addLocations: function () {
        if (locations.length > 0 && locations.length < 6) {
            var options = [];
            for (var i = 0, length = locations.length; i < length; i++) {
                options.push(this.addRadio({
                    name: 'Location',
                    value: locations[i],
                    label: locations[i]
                }));
            }
            return Row({
                className: 'radio-row',
                children: options
            });
        }
        else if (locations.length >= 6) {
            var options = [];
            for (var i = 0, length = locations.length; i < length; i++) {
                options.push(this.addOption({
                    value: locations[i],
                    text: locations[i]
                }));
            }
            return {
                tag: 'label',
                className: 'select-row',
                text: 'Select a Location:',
                children: {
                    tag: 'select',
                    name: 'Location',
                    children: options
                }
            };
        }

        return false;
    },

    addHiddenFields: function () {
        return {
            className: 'hidden-fields',
            children: [
                {
                    tag: 'p',
                    className: 'success',
                    text: 'Your request has been sent. We will be in contact with you shortly.'
                },
                {
                    tag: 'p',
                    className: 'failure',
                    text: 'Please make sure ALL fields are filled out correctly.'
                },
                {
                    tag: 'input',
                    type: 'text',
                    name: 'URL',
                    autocomplete: 'none',
                    className: 'honey'
                },
                {
                    tag: 'input',
                    type: 'hidden',
                    name: 'the_reason',
                    id: 'the_reason',
                    autocomplete: 'none',
                    value: 'contact'
                },
                {
                    tag: 'input',
                    type: 'hidden',
                    name: 'bpi_form_id',
                    autocomplete: 'none',
                    value: 'contact'
                },
                {
                    tag: 'input',
                    type: 'hidden',
                    name: 'bpi_form_name',
                    autocomplete: 'none',
                    value: this.formTitle
                },
                {
                    tag: 'input',
                    type: 'hidden',
                    name: 'bpi_form_subject',
                    autocomplete: 'none',
                    value: this.formTitle + ' Submission'
                },
                {
                    tag: 'input',
                    type: 'hidden',
                    name: 'form_type',
                    autocomplete: 'none',
                    value: this.formType
                },
                {
                    tag: 'input',
                    type: 'hidden',
                    name: 'exclude_fields',
                    autocomplete: 'none',
                    value: 'optional_message_check,the_reason,bpi_form_id,bpi_form_name,bpi_form_subject'
                }
            ]
        };
    },

    addSubmit: function (props) {
        return {
            tag: 'button',
            type: 'submit',
            className: 'send_button main-btn transition',
            text: 'Submit'
        };
    }
});