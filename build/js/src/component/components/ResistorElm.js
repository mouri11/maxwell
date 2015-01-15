(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['cs!settings/Settings', 'cs!render/DrawHelper', 'cs!geom/Polygon', 'cs!geom/Rectangle', 'cs!geom/Point', 'cs!component/CircuitComponent'], function(Settings, DrawHelper, Polygon, Rectangle, Point, CircuitComponent) {
    var ResistorElm;
    ResistorElm = (function(_super) {
      __extends(ResistorElm, _super);

      function ResistorElm(xa, ya, xb, yb, f, st) {
        if (f == null) {
          f = 0;
        }
        if (st == null) {
          st = null;
        }
        ResistorElm.__super__.constructor.call(this, xa, ya, xb, yb, f, st);
        if (st && st.length > 0) {
          this.resistance = parseFloat(st);
        } else {
          this.resistance = 500;
        }
        this.ps3 = new Point(100, 50);
        this.ps4 = new Point(100, 150);
      }

      ResistorElm.prototype.draw = function(renderContext) {
        var hs, i, newOffset, oldOffset, pt1, pt2, resistanceVal, segf, segments, volt1, volt2, voltDrop, _i;
        segments = 16;
        oldOffset = 0;
        hs = 6;
        volt1 = this.volts[0];
        volt2 = this.volts[1];
        this.setBboxPt(this.point1, this.point2, hs);
        this.draw2Leads(renderContext);
        DrawHelper.getPowerColor(this.getPower);
        segf = 1 / segments;
        for (i = _i = 0; 0 <= segments ? _i < segments : _i > segments; i = 0 <= segments ? ++_i : --_i) {
          newOffset = 0;
          switch (i & 3) {
            case 0:
              newOffset = 1;
              break;
            case 2:
              newOffset = -1;
              break;
            default:
              newOffset = 0;
          }
          voltDrop = volt1 + (volt2 - volt1) * i / segments;
          pt1 = DrawHelper.interpPoint(this.lead1, this.lead2, i * segf, hs * oldOffset);
          pt2 = DrawHelper.interpPoint(this.lead1, this.lead2, (i + 1) * segf, hs * newOffset);
          renderContext.drawThickLinePt(pt1, pt2, DrawHelper.getVoltageColor(voltDrop));
          oldOffset = newOffset;
        }
        resistanceVal = DrawHelper.getUnitText(this.resistance, "ohm");
        this.drawValues(resistanceVal, hs, renderContext);
        this.drawDots(this.point1, this.point2, renderContext);
        return this.drawPosts(renderContext);
      };

      ResistorElm.prototype.dump = function() {
        return ResistorElm.__super__.dump.call(this) + " " + this.resistance;
      };

      ResistorElm.prototype.getDumpType = function() {
        return "r";
      };

      ResistorElm.prototype.getEditInfo = function(n) {
        if (n === 0) {
          return new EditInfo("Resistance (ohms):", this.resistance, 0, 0);
        }
        return null;
      };

      ResistorElm.prototype.setEditValue = function(n, ei) {
        if (ei.value > 0) {
          return this.resistance = ei.value;
        }
      };

      ResistorElm.prototype.getInfo = function(arr) {
        arr[0] = "resistor";
        this.getBasicInfo(arr);
        arr[3] = "R = " + DrawHelper.getUnitText(this.resistance, DrawHelper.ohmString);
        arr[4] = "P = " + DrawHelper.getUnitText(this.getPower(), "W");
        return arr;
      };

      ResistorElm.prototype.needsShortcut = function() {
        return true;
      };

      ResistorElm.prototype.calculateCurrent = function() {
        return this.current = (this.volts[0] - this.volts[1]) / this.resistance;
      };

      ResistorElm.prototype.setPoints = function() {
        ResistorElm.__super__.setPoints.call(this);
        this.calcLeads(32);
        this.ps3 = new Point(0, 0);
        return this.ps4 = new Point(0, 0);
      };

      ResistorElm.prototype.stamp = function(stamper) {
        console.log("\nStamping Resistor Elm");
        if (this.orphaned()) {
          console.warn("attempting to stamp an orphaned resistor");
        }
        return stamper.stampResistor(this.nodes[0], this.nodes[1], this.resistance);
      };

      ResistorElm.prototype.toString = function() {
        return "ResistorElm";
      };

      return ResistorElm;

    })(CircuitComponent);
    return ResistorElm;
  });

}).call(this);
