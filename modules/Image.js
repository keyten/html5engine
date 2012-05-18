/* --
	module: Image
	description: module for working with images
	authors: Dmitriy Miroshnichenko aka Keyten
*/
(function(self,undefined){
	'use strict';

	self.require('Accessors');

	self.Image = function(){}
	self.Image.prototype = {
		toString:function(){
			return '[object Image]';
		}
	};

	var onload = null;
	Accessors.define(self.Image.prototype, 'onload', {
		get:function(){
			return onload;
		},
		set:function(v){
			onload = v;
			v.call(this);
		}
	});
})(self);