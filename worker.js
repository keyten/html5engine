(function(self,undefined){
	'use strict';
	
	// private
	var msg = function(){
		self.postMessage( Array.prototype.join.call(arguments,'|') );
	}
	var alert = function(abc){
		msg('h5e', 'call', 'alert', escape(abc));
	}
	var data_listeners = {};
	self.addEventListener('message', function(e){
		var data = e.data.split('|');
		var _ = {
			furl:function(){
				self.importScripts(data[1]);
			},
			event:function(){
				self.fireEvent(data[1], {
					type		: data[1],
					button		: data[2],
					clientX		: data[3],
					clientY		: data[4],
					ctrlKey		: data[5],
					altKey		: data[6],
					shiftKey	: data[7],
					metaKey		: data[8],
					keyCode		: data[9],
					charCode	: data[10],
					which		: data[11]
				});
			},
			data:function(){
				if(data_listeners[ data[1] ]) data_listeners[ data[1] ].apply(self, data.slice(2));
			}
		};
		_[ data[0] ]();
	}, false);

	// events
	var events = {};
	self.setEvent = function(evt,fn){
		if(!(evt in events)) events[evt] = [];
		events[evt].push(fn);
	}
	self.fireEvent = function(evt,data){
		if(!(evt in events)) return;
		evt = events[evt];
		for(var i = 0, l = evt.length; i < l; i++){
			evt[i](data);
		}
	}
	self.removeEvent = function(evt,fn){
		if(!(evt in events)) return;
		evt = events[evt];
		for(var i = 0, l = evt.length; i < l; i++){
			if(evt[i] === fn){
				evt[i] = function(){}
			}
		}
	}

	// modules
	self.__moduleURL__ = 'modules';
	self.require = function(module){
		self.importScripts( self.__moduleURL__ + '/' + module + '.js' );
	}
})(self);