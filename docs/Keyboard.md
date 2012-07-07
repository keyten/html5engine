# Keyboard
Module for defining and dispatching keyboard shortcuts

### Keyboard.key, Keyboard.keyCode and Keyboard.modifiers
Contains key, which pressed in the current moment (or null) and modifiers.

    setEvent('keypress', function(){ // for example, Ctrl+K
    	Keyboard.key; // 'K'
    	Keyboard.keyCode; // 75
    	Keyboard.modifiers; // { ctrl:true, shift:false, alt:false, meta:false }
    });

### Keyboard.lastKey, Keyboard.lastKeyCode and Keyboard.lastModifiers
Contains last pressed key (or null).

### Keyboard.on
Defines the shortcut.

    Keyboard.on('Ctrl+K', function(e){
    	Keyboard.key; // 'K'
    	Keyboard.keyCode; // 75
    });

### Keyboard.off
Disables all shortcuts.

    Keyboard.off();
