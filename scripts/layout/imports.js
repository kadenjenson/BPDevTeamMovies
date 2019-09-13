"use strict"; 
			
var add = function(src, defer)
{
	scriptLoader.add({src: src, defer: defer});
}; 

/* this will load in the framework and modules */  
add('scripts/base/base.js', false);  
add('scripts/base/animation.js');

var url = 'scripts/layout/',
	apiUrl = 'scripts/libraries/apis/',
	modelUrl = 'scripts/libraries/models/';

/* models */
add(modelUrl + 'contact-model-class.js');

/* controls */ 
add(url + 'controls/modal.js');
add(url + 'controls/navigation.js');
add(url + 'controls/tab.js');
add(url + 'controls/panel.js');
add(url + 'controls/form.js');

/* atoms */
add(url + 'atoms/atoms.js'); 

/* modules */ 
add(url + 'modules/main-panel.js');
add(url + 'modules/home-panel.js');
add(url + 'modules/synopsis-panel.js');
add(url + 'modules/cast-panel.js');
add(url + 'modules/contact-panel.js');

/* app components */ 
add(url + 'main/app-shell.js');
add(url + 'main/app-control.js');
add(url + 'main/main-navigation.js');

/* this is sthemain script used to start the 
app */ 
add(url + 'main-controller.js');
add(url + 'app-controller.js');