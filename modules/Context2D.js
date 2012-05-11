/* --
	module: Context2D
	description: 2D context realisation for html5engine
	authors: Dmitriy Miroshnichenko aka Keyten
*/
(function(self,undefined){
	self.require('Accessors');

	self.ctx = self.context = {};

	var i = 0;
	var parameters = {
		lineWidth:1,
		lineJoin:'miter',
		lineCap:'butt',
		miterLimit:10,

		fillStyle:'#000000',
		strokeStyle:'#000000',
		globalAlpha:1,
		globalCompositeOperation:'source-over',

		font:'10px sans-serif',
		textAlign:'start',
		textBaseline:'alphabetic',

		shadowColor:'rgba(0, 0, 0, 0.0)',
		shadowOffsetY:0,
		shadowOffsetX:0,
		shadowBlur:0,
	};

	for(var i in parameters){
		if(!Object.prototype.hasOwnProperty.call(parameters,i)) continue;
		(function(i){
			Accessors.define(self.ctx, i, {
				get:function(){
					return parameters[i];
				},
				set:function(s){
					set(i, parameters[i] = s);
				}
			});
		})(i);
	}

	var methods = {

		// rects
		fillRect:function(x,y,w,h){
			call( 'fillRect', [ x, y, w, h ] );
		},
		strokeRect:function(x,y,w,h){
			call( 'strokeRect', [ x, y, w, h ] );
		},
		clearRect:function(x,y,w,h){
			call( 'clearRect', [ x, y, w, h ] );
		}

	};

	for(var i in methods){
		self.ctx[i] = methods[i];
	}

	// Utilities
	function msg(){
		self.postMessage( Array.prototype.slice.call(arguments,0).join('|') );
	}
	function set(k,v){
		msg( 'ctx', 'set', k, v );
	}
	function call(n,v){
		msg.apply( null, ['ctx', 'call', n].concat(v || [])  );
	}
})(self);