/* --
	module: Accessors
	description: module for working with getters & setters
	authors: Pavel Ponomarenko aka TheShock
			  and
			 Dmitriy Miroshnichenko aka Keyten
	ported from Atom.js (lookup, define, has, inherit functions)
*/
(function(self,undefined){
	self.Accessors = {};
	self.Accessors.support = Object.getOwnPropertyDescriptor ? 'standart' : {}.__defineGetter__ ? 'no-standart' : 'no-support';
	self.Accessors.lookup =
		(self.Accessors.support == 'non-standart' ? 
			function(from, key){
				return { get:from.__lookupGetter__(key), set:from.__lookupSetter__(key) };
			}
				:
		self.Accessors.support == 'standart' ?
			function(from, key,    descriptor){
				descriptor = Object.getOwnPropertyDescriptor(from, key);
				if(!descriptor){
					descriptor = Object.getPrototypeOf(from);
					if(descriptor) return self.Accessors.lookup(descriptor, key);
				}
				else if(descriptor.get || descriptor.set) {
					return { get:descriptor.get, set:descriptor.set };
				}
				return null;
			}
				:
			null
		);
	self.Accessors.define =
		(self.Accessors.support == 'non-standart' ?
			function(obj, prop, desc){
				if(desc){
					if(desc.get) obj.__defineGetter__(prop, desc.get);
					if(desc.set) obj.__defineSetter__(prop, desc.set);
				}
				return obj;
			}
				:
		self.Accessors.support == 'standart' ?
			function(obj, prop, desc){
				if(desc){
					Object.defineProperty(obj, prop, {
						get:desc.get,
						set:desc.set,
						enumerable:true,
						configurable:true
					});
				}
				return obj;
			}
				:
			null
		);
	self.Accessors.has = function(obj, prop){
		return (obj = self.Accessors.lookup(obj,prop)) != null && (!!(obj.get || obj.set));
	}
	self.Accessors.inherit = function(from, to, prop){
		from = self.Accessors.lookup(from, prop);
		if(from){
			self.Accessors.define(to, prop, from);
			return true;
		}
		return false;
	}
	self.Accessors.property = function(obj, prop, desc){
		var value = desc.value;
		self.Accessors.define(obj, prop, {
			get:function(){
				var t;
				return desc.get ? ((t = desc.get(value)) === undefined ? value : t) : value;
			},
			set:function(v){
				value = (desc.set ? ((value = desc.set(v,value)) === undefined ? v : value) : v);
			}
		});
	}
	self.Accessors.toString = function(){ return '[object Accessors]' };

})(self);