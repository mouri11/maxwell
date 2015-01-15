(function() {
  define([], function() {
    var CircuitNodeLink;
    CircuitNodeLink = (function() {
      function CircuitNodeLink(num, elm) {
        this.num = num != null ? num : 0;
        this.elm = elm != null ? elm : null;
      }

      CircuitNodeLink.prototype.toString = function() {
        return "" + this.num + " " + (this.elm.toString());
      };

      return CircuitNodeLink;

    })();
    return CircuitNodeLink;
  });

}).call(this);
