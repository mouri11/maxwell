// Generated by CoffeeScript 1.4.0
(function() {

  define([], function() {
    var KeyHandler;
    return KeyHandler = (function() {

      KeyHandler.KEY_DOWN = "KEY_DOWN";

      KeyHandler.KEY_UP = "KEY_UP";

      function KeyHandler(Circuit) {
        this.Circuit = Circuit;
        this.KeyHandler = this.KEY_DOWN;
      }

      KeyHandler.prototype.setState = function(newState) {
        if (newState === this.MOUSE_DOWN || newState === this.MOUSE_UP) {
          return this.keyState = newState;
        } else {
          throw Error("State " + newState + " is not a valid state");
        }
      };

      return KeyHandler;

    })();
  });

}).call(this);