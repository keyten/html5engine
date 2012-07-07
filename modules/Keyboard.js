/* --
	module: Keyboard
	description: for defining and dispatching keyboard shortcuts
	authors: Dmitriy Miroshnichenko aka Keyten
*/
(function(self,undefined){
	'use strict';
	
	self.Keyboard = {};
	self.Keyboard.key = null;
	self.Keyboard.keyCode = null;

	self.Keyboard.special = {

		esc:27,
		escape:27,
		tab:9,
		space:32,
		'return':13,
		enter:13,
		backspace:8,

		scrolllock:145,
		scroll_lock:145,
		scroll:145,
		capslock:20,
		caps_lock:20,
		caps:20,
		numlock:144,
		num_lock:144,
		num:144,

		pause:19,
		'break':19,

		insert:45,
		home:36,
		'delete':46,
		end:35,

		pageup:33,
		page_up:33,
		pu:33,
		pagedown:34,
		page_down:34,
		pd:34,

		left:37,
		up:38,
		right:39,
		down:40,

		f1:112,
		f2:113,
		f3:114,
		f4:115,
		f5:116,
		f6:117,
		f7:118,
		f8:119,
		f9:120,
		f10:121,
		f11:122,
		f12:123

	};


	var listeners = {
		down:[],
		up:[],
		press:[]
	};

	self.Keyboard.on = function(key,type,fn){

		if(!fn)
			fn = type,
			type = null;

		if(key.indexOf(',')>-1){
	
			key = key.split(',');
	
			for(var i = 0, l = key.length; i < l; i++) this.on(key[i], type, fn)
	
			return this;
		}

		key = key.toLowerCase();
	
		var obj = { key:parseKey(key), fn:fn, modifiers:parseModifiers(key) };
	
		if(type == 'down') listeners.down.push(obj);
		else if(type == 'up') listeners.up.push(obj);
		else listeners.press.push(obj);
	
		return this;
	
	}

	self.Keyboard.onDown = function(key,fn){ return self.Keyboard.on(key,'down',fn) }
	
	self.Keyboard.onUp = function(key,fn){ return self.Keyboard.on(key,'up',fn) }

	self.Keyboard.off = function(key,type,fn){
		// Keyboard.off();
		if(!key) return listeners = { down:[], up:[], press:[] }, this;
	}

	self.Keyboard.fire = function(e,press){
	
		press = listeners[press];

		for(var i = 0, l = press.length; i < l; i++){

			if(e.ctrlKey.toString() == press[i].modifiers.ctrl.toString() && e.shiftKey.toString() == press[i].modifiers.shift.toString() && e.altKey.toString() == press[i].modifiers.alt.toString() && e.metaKey.toString() == press[i].modifiers.meta.toString()){
	
				if(press[i].key in self.Keyboard.special){
	
					if(self.Keyboard.special[press[i].key] == e.which)
	
						press[i].fn(e);
	
				}
				else if(String.fromCharCode(e.which) == press[i].key)
	
					press[i].fn(e);
			}

		}

	}

	self.setEvent('keypress', function(e){ self.Keyboard.fire(e,'press') });
	self.setEvent('keydown', function(e){ setKey(e); self.Keyboard.fire(e,'down') });
	self.setEvent('keyup', function(e){ self.Keyboard.fire(e,'up'); self.Keyboard.key = self.Keyboard.keyCode = null });



	// Utils
	function parseModifiers(req){

		return {
			ctrl:req.indexOf('ctrl')>-1 || req.indexOf('control')>-1 || req.indexOf('⌃')>-1,
			shift:req.indexOf('shift')>-1 || req.indexOf('⇧')>-1,
			alt:req.indexOf('alt')>-1 || req.indexOf('option')>-1 || req.indexOf('⌥')>-1,
			meta:req.indexOf('meta')>-1 || req.indexOf('command')>-1 || req.indexOf('⌘')>-1
		};

	}

	function parseKey(key){

		key = key.split('+');
		return key[key.length-1];

	}

	function setKey(e){

		self.Keyboard.keyCode = e.which;
		for(var i in self.Keyboard.special){

			if(e.which == self.Keyboard.special[i])
				return self.Keyboard.key = i;

		}

		self.Keyboard.key = String.fromCharCode(e.which);

	}


})(self);