# Accessors
Module for working with getters & setters.

## Accessors.lookup(obj, key)
Receives and returns a getter and setter functions, if they are defined.

    var obj = {
      _abc:0,
      get abc(v){
        return this._abc;
      },
      set abc(){
        ++this._abc;
      }
    };
    
    Accessors.lookup(obj, 'abc');
    /* => { get:function(v){
      return this._abc;
    }, set:function(){
      ++this._abc;
    } } */

## Accessors.define(obj, key, desc)
Defines getter & setter.

    var obj = { _abc:0 };
    
    Accessors.define(obj, 'abc', {
      get:function(v){ return this._abc },
      set:function(){ ++this._abc }
    });
    
    obj.abc; // 0
    obj.abc = 10;
    obj.abc; // 1

## Accessors.has(obj, key)
Returns true if the object has a getter or setter.

    var obj = {
      get abc(){}
    };

    Accessors.has(obj, 'abc'); // true
    Accessors.has(obj, 'xxx'); // false

## Accessors.inherit(from, to, key)
Transfers getter and setter from one object to another.

    var obj = {
      get abc(){ return Math.random() }
    };
    var foo = {};
    
    Accessors.inherit(obj, foo, 'abc');
    
    foo.abc; // returns random number

## Accessors.property(obj, key, desc)
Defines a property with possibility to change getter and/or setter.

    var obj = {};
    
    Accessors.property(obj, 'abc', {
      value:10,
      get: function(v){
        if(v == 12) return 100;
      },
      set: function(v,val){
        // v - new value, val - old value
        // if the setter returns a value, it is set variable.
        if(v == 10 && val == 20) return 0;
      }
    });
    
    // getter
    obj.abc;       // 10
    obj.abc++;     // 11
    obj.abc = 12;
    obj.abc;       // 100, value intercepted
    
    // setter
    obj.abc = 20;
    obj.abc = 10;  // v == 10 && val == 20
    obj.abc;       // 0, value intercepted by setter
