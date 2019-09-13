"use strict";

/* 
	Modal 
	
	this will create a modal that can be extended and 
	can align to center accept and decline. 
	
	the modal will create a shadow layer behind the 
	modal to allow the modal to be removed by clicking 
	the shadow layer. 
	
	@param (string) container = the modal parent 
	container 
*/  
 
var Modal = base.Component.extend( 
{ 
	beforeSetup: function()
	{
		this.container = document.body;
	},

	render: function()
	{ 
		return {
			className: 'modal ' + this.modalClassName, 
			onState: [
				'displayed', 
				{
					'modal-visible': true
				}
			],
			header: this.addHeader(), 
			body: this.addBody()
		};
	}, 
	
	setupStates: function()
	{
		var self = this;
		return {
			displayed: {
				state: false,
				callBack: function(value)
				{
					if (value === true) 
					{
						// add shadow
						document.body.classList.add('modal-open');
						// self.createShadow();
					}
					else
					{
						document.body.classList.remove('modal-open');
						// self.backdrop.destroy();
						self.destroy();
					}
				}
			}
		};
	},
	
	modalClassName: '',
	
	title: '',

	addHeader: function()
	{ 
		return Header({
			title: this.title || null
		});
	}, 
	
	addBody: function()
	{ 
		return {
			className: 'body-container', 
			children: this.addBodyContent()
		};
	}, 
		
	addBodyContent: function()
	{ 
		return [];
	}, 
	
	addFooter: function()
	{ 
		var id = this.id; 
		return { 
			tag: 'footer', 
			id: id + '_button_container', 
			className: 'button-container', 
			buttons: this.addFooterButtons()
		}; 
	}, 
	
	addFooterButton: function(id, className, label, callBack)
	{ 
		return { 
			tag: 'button',
			className: 'bttn ' + className, 
			textContent: label,
			onclick: callBack,
			id: (id) ? this.id + id : null
		}; 
	}, 
	
	addFooterButtons: function()
	{ 
		return [
			this.addFooterButton('_button_1', 'bttn-red', 'Cancel', base.bind(this, this.decline)), 
			this.addFooterButton('_button_2', 'bttn-green', 'Save', base.bind(this, this.accept))
		]; 
	}, 
	
	getTitle: function() 
	{ 
		return 'Edit Panel'; 
	}, 

	setupHeaderOptions: function()
	{ 
		
	}, 
	
	checkToClose: function() 
	{ 
		this.decline();
	}, 
	
	// createShadow: function() 
	// { 
	// 	this.backdrop = {
	// 		callBack: base.bind(this, this.display)
	// 	};
	// 	this.backdrop.setup(this.container);
	// }, 
	
	returnCallBack: function(data)
	{ 
		var callBack = this.callbackFunction; 
		if(typeof callBack === 'function') 
		{ 
			callBack(data); 
		}
	}, 
	
	removeAndCallBack: function(data)
	{ 
		this.returnCallBack(data); 
		window.setTimeout(base.bind(this, this.display), 200);
	},
	
	accept: function() 
	{ 
		this.removeAndCallBack();  
	}, 
	
	decline: function()
	{     
		this.display(); 
	},
	
	display: function()
	{   
		var state = this.state;
		state.set('displayed', !state.get('displayed'));
	}
});