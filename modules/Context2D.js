/* --
	module: Context2D
	description: 2D context realisation for html5engine
	authors: Dmitriy Miroshnichenko aka Keyten
*/
(function(self,undefined){
	'use strict';
	self.require('Accessors');

	self.ctx = self.context = {};

	var index = 0;
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

	Accessors.define(self.ctx, 'fillStyle', {
		get:function(i){
			return parameters[i];
		},
		set:function(s){
			if(s instanceof grad)
				msg( 'h5e.ctx', 'call', 'setFill', s.index );
			else
				set( 'fillStyle', s );

			parameters.fillStyle = s;
		}
	});
	Accessors.define(self.ctx, 'strokeStyle', {
		get:function(i){
			return parameters[i];
		},
		set:function(s){
			if(s instanceof grad)
				msg( 'h5e.ctx', 'call', 'setStroke', s.index );
			else
				set( 'strokeStyle', s );
			
			parameters.strokeStyle = s;
		}
	});


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
		},

		// paths
		beginPath:function(){
			call( 'beginPath' );
		},
		moveTo:function(x,y){
			call( 'moveTo', [ x, y ] );
		},
		lineTo:function(x,y){
			call( 'lineTo', [ x, y ] );
		},
		quadraticCurveTo:function(cx1,cy1,x,y){
			call( 'quadraticCurveTo', [ cx1, cy1, x, y ] );
		},
		bezierCurveTo:function(cx1,cy1,cx2,cy2,x,y){
			call( 'bezierCurveTo', [ cx1, cy1, cx2, cy2, x, y ] );
		},
		arc:function(x,y,r,start,end,clock){
			call( 'arc', [ x, y, r, start, end, clock ] );
		},
		arcTo:function(x1,y1,x2,y2,r){
			call( 'arcTo', [ x1, y1, x2, y2, r ] );
		},
		rect:function(x,y,w,h){
			call( 'rect', [ x, y, w, h ] );
		},
		closePath:function(){
			call( 'closePath' );
		},

		fill:function(){
			call( 'fill' );
		},
		stroke:function(){
			call( 'stroke' );
		},
		clip:function(){
			call( 'clip' );
		},

		isPointInPath:function(x,y,fn){
			msg( 'h5e.ctx', 'call', 'isPointInPath', x, y );
			self.__data_listeners__.isPointInPath = function(is){
				fn( is == 'false' ? false : true );
				delete self.__data_listeners__.isPointInPath;
			}
		},

		// gradients
		createLinearGradient:function(x1,y1,x2,y2){
			msg( 'h5e.ctx', 'call', 'createLinearGradient', index, x1, y1, x2, y2  );
			return new grad;
		},
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
		msg.apply( 0, ['ctx', 'call', n].concat(v || [])  );
	}

	function grad(){
		this.index = index++;
	}
	grad.prototype = {
		addColorStop:function(step,color){
			msg( 'h5e.ctx', 'call', 'addColorStop', this.index, step, color );
		},
		toString:function(){ return '[object CanvasGradient]' }
	};
})(self);