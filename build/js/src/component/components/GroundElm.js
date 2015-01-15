(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['cs!settings/Settings', 'cs!render/DrawHelper', 'cs!geom/Polygon', 'cs!geom/Rectangle', 'cs!geom/Point', 'cs!component/CircuitComponent'], function(Settings, DrawHelper, Polygon, Rectangle, Point, CircuitComponent) {
    var GroundElm;
    GroundElm = (function(_super) {
      __extends(GroundElm, _super);

      function GroundElm(xa, ya, xb, yb, f, st) {
        GroundElm.__super__.constructor.call(this, xa, ya, xb, yb, f, st);
      }

      GroundElm.prototype.getDumpType = function() {
        return "g";
      };

      GroundElm.prototype.getPostCount = function() {
        return 1;
      };

      GroundElm.prototype.draw = function(renderContext) {
        var color, endPt, pt1, pt2, row, startPt, _i, _ref;
        color = DrawHelper.getVoltageColor(0);
        renderContext.drawThickLinePt(this.point1, this.point2, color);
        for (row = _i = 0; _i < 3; row = ++_i) {
          startPt = 10 - row * 2;
          endPt = row * 3;
          _ref = DrawHelper.interpPoint2(this.point1, this.point2, 1 + endPt / this.dn, startPt), pt1 = _ref[0], pt2 = _ref[1];
          renderContext.drawThickLinePt(pt1, pt2, color);
        }
        pt2 = DrawHelper.interpPoint(this.point1, this.point2, 1 + 11.0 / this.dn);
        this.setBboxPt(this.point1, pt2, 11);
        this.drawPost(this.x1, this.y1, this.nodes[0], renderContext);
        return this.drawDots(this.point1, this.point2, renderContext);
      };

      GroundElm.prototype.setCurrent = function(x, currentVal) {
        return this.current = -currentVal;
      };

      GroundElm.prototype.stamp = function(stamper) {
        console.log("\nStamping Ground Elm");
        return stamper.stampVoltageSource(0, this.nodes[0], this.voltSource, 0);
      };

      GroundElm.prototype.getVoltageDiff = function() {
        return 0;
      };

      GroundElm.prototype.getVoltageSourceCount = function() {
        return 1;
      };

      GroundElm.prototype.getInfo = function(arr) {
        GroundElm.__super__.getInfo.call(this);
        arr[0] = "ground";
        return arr[1] = "I = " + DrawHelper.getCurrentText(this.getCurrent());
      };

      GroundElm.prototype.hasGroundConnection = function(n1) {
        return true;
      };

      GroundElm.prototype.needsShortcut = function() {
        return true;
      };

      GroundElm.prototype.toString = function() {
        return "GroundElm";
      };

      return GroundElm;

    })(CircuitComponent);
    return GroundElm;
  });

}).call(this);
