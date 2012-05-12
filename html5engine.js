(function(window,undefined){
	var h5e = {};

	// html5engine class
	h5e.object = function(cnv,url){
		if( h5e.toString.call(cnv) == '[object String]' ) this.cnv = document.querySelectorAll(cnv)[0];
		else this.cnv = cnv;
		this.context2d = this.cnv.getContext('2d');
		this.contextGL = this.cnv.getContext('webgl') || this.cnv.getContext('-moz-webgl') || this.cnv.getContext('-webkit-webgl') || {};
		this.cnv.tabIndex = 0;

		this.worker = new Worker(h5e.workerURL);
		this.worker.postMessage('furl|' + escape(url));
		this.action();
	}
	h5e.object.prototype = {
		events:[
			// Mouse Events
			'click', 'mousedown', 'mouseup', 'mousemove', 'mouseover', 'mouseout', 'dblclick', 'contextmenu',

			// Key Events
			'keydown', 'keypress', 'keyup',

			// Focus Events
			'focus', 'blur'
		],
		onmessage:function(){},
		post:function(msg){
			this.worker.postMessage('msg|' + escape(msg));
		},
		action:function(){
			var self = this;
			this.worker.addEventListener('message', function(e){
				self._onmessage(e.data);
			});
			for(var i = 0, l = this.events.length; i < l; i++){
				this.cnv.addEventListener(this.events[i], function(e){
					self.worker.postMessage(
						[
							'event',
							 e.type,
							 e.button,
							 e.clientX - self.cnv.offsetLeft,
							 e.clientY - self.cnv.offsetTop,
							 e.ctrlKey,
							 e.altKey,
							 e.shiftKey,
							 e.metaKey,
							 e.keyCode,
							 e.charCode,
							 e.which
						].join('|')
					);
				}, false);
			}
		},
		_onmessage:function(data){
			data = data.split('|');
			this._ = { // binding
				ctx:function(){
					if(data[1] == 'call') this.context2d[ data[2] ].apply(this.context2d, data.slice(3));
					else this.context2d[ data[2] ] = data[3];
				},
				gl:function(){
					if(data[1] == 'call') this.contextGL[ data[2] ].apply(this.contextGL, data.slice(3));
					else this.contextGL[ data[2] ] = data[3];
				},
				h5e:function(){
					this.scriptable[ data[2] ].apply(this, data.slice(3));
				},
				'h5e.ctx':function(){
					this.ctx[ data[2] ].apply(this, data.slice(3));
				}
			};
			this._[ data[0] ].call(this);
		},
		scriptable:{
			alert:function(abc){ alert(unescape(abc)) }
		},
		ctx:{
			createLinearGradient:function(i,x1,y1,x2,y2){
				this.objects || (this.objects = []);
				
				this.objects[i] = this.context2d.createLinearGradient(x1,y1,x2,y2);
			},
			addColorStop:function(i,step,color){
				this.objects[i].addColorStop(step, color);
			},

			setFill:function(i){
				this.context2d.fillStyle = this.objects[i];
			},
			setStroke:function(i){
				this.context2d.strokeStyle = this.objects[i];
			},

			isPointInPath:function(x,y){
				this.worker.postMessage('data|isPointInPath|' + this.context2d.isPointInPath(x,y) );
			}
		}
	};

	// private
	h5e.workerURL = 'worker.js';

	// public functions
	h5e.start = function(cnv,url){
		return new h5e.object(cnv,url);
	}

	window.h5e = window.html5engine = h5e;
})(window);