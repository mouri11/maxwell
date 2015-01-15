(function() {
  define([], function() {
    var CircuitNode;
    CircuitNode = (function() {
      function CircuitNode(x, y, intern, links) {
        this.x = x != null ? x : 0;
        this.y = y != null ? y : 0;
        this.intern = intern != null ? intern : false;
        this.links = links != null ? links : [];
      }

      CircuitNode.prototype.toString = function() {
        return "CircuitNode: " + this.x + " " + this.y + " " + this.intern + " [" + (this.links.toString()) + "]";
      };

      return CircuitNode;

    })();
    return CircuitNode;
  });

}).call(this);
