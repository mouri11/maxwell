// Generated by CoffeeScript 1.4.0
(function() {

  define(['cs!Circuit', 'cs!CircuitCanvas'], function(Circuit, CircuitCanvas) {
    return describe("Render should receive a notification when a Circuit updates", function() {
      beforeEach(function() {
        this.Circuit = new Circuit();
        return this.Renderer = new CircuitCanvas(this.Circuit);
      });
      return it("Calling update() should also call @Renderer.clear()", function() {
        this.Circuit.updateCircuit();
        this.Circuit.updateCircuit();
        this.Circuit.updateCircuit();
        this.Circuit.updateCircuit();
        return this.Circuit.updateCircuit();
      });
    });
  });

}).call(this);