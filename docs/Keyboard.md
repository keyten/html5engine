# Keyboard
Module for defining and dispatching keyboard shortcuts

### Keyboard.key and Keyboard.keyCode
Contains key, which pressed in the current moment (or null).

    setEvent('keypress', function(){ // for example, Ctrl+K
    	Keyboard.key; // 'K'
    	Keyboard.keyCode; // 75
    });

### Keyboard.on
Defines the shortcut.

    Keyboard.on('Ctrl+K', function(e){
    	Keyboard.key; // 'K'
    	Keyboard.keyCode; // 75
    });

### Keyboard.off
Disables all shortcuts.

    Keyboard.off();
