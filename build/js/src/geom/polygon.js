(function() {
  define(['cs!geom/Point'], function(Point) {
    var Polygon;
    Polygon = (function() {
      function Polygon(vertices) {
        var i;
        this.vertices = [];
        if (vertices && vertices.length % 2 === 0) {
          i = 0;
          while (i < vertices.length) {
            this.addVertex(vertices[i], vertices[i + 1]);
            i += 2;
          }
        }
      }

      Polygon.prototype.addVertex = function(x, y) {
        return this.vertices.push(new Point(x, y));
      };

      Polygon.prototype.getX = function(n) {
        return this.vertices[n].x;
      };

      Polygon.prototype.getY = function(n) {
        return this.vertices[n].y;
      };

      Polygon.prototype.numPoints = function() {
        return this.vertices.length;
      };

      return Polygon;

    })();
    return Polygon;
  });

}).call(this);
