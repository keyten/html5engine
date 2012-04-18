# html5engine
html5engine is a html5 framework for creating html5 canvas applications. For example...

## Setup
Add this code for your html page:

    <script src="html5engine.js"></script>
    <script>
      h5e.start('canv', 'helloworld.js');
    </script>
    <canvas id="canv"></canvas>
    
## helloworld.js

    ctx.fillText('Hello, world!', 10, 10);
  
## Objects

### ctx || context
This is 2D context of canvas.

### setEvent && removeEvent
This functions let you add and remove event callbacks on the canvas. For example:

    setEvent('click', function(e){
      ctx.clearRect(0, 0, 500, 500);
      ctx.fillRect(0, 0, e.clientX, e.clientY);
    });
  
And:
  
    var evt = function(){ ... }
    setEvent('click', evt);
    removeEvent('click', evt);
  
## License
html5engine available under the <a href="http://en.wikipedia.org/wiki/MIT_License">MIT License</a>.