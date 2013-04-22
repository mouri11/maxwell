// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['cs!Settings', 'cs!DrawHelper', 'cs!Polygon', 'cs!Rectangle', 'cs!Point', 'cs!CircuitComponent', 'cs!Units'], function(Settings, DrawHelper, Polygon, Rectangle, Point, CircuitComponent, Units) {
    var InductorElm;
    InductorElm = (function(_super) {

      __extends(InductorElm, _super);

      function InductorElm(xa, ya, xb, yb, f, st) {
        InductorElm.__super__.constructor.call(this, xa, ya, xb, yb, f);
        this.ind = new Inductor();
        this.inductance = 0;
        if (st) {
          if (typeof st === "string") {
            st = st.split(" ");
          }
          this.inductance = parseFloat(st[0]);
          this.current = parseFloat(st[1]);
        }
        this.ind.setup(this.inductance, this.current, this.flags);
      }

<<<<<<< HEAD
      InductorElm.prototype.draw = function() {
        var hs, i, s, v1, v2;
        this.doDots();
        v1 = this.volts[0];
        v2 = this.volts[1];
        i = void 0;
=======
      InductorElm.prototype.draw = function(renderContext) {
        var hs, s, v1, v2;
        this.doDots();
        v1 = this.volts[0];
        v2 = this.volts[1];
>>>>>>> reorganize_packages
        hs = 8;
        this.setBboxPt(this.point1, this.point2, hs);
        this.draw2Leads();
        this.setPowerColor(false);
        this.drawCoil(8, this.lead1, this.lead2, v1, v2);
        if (Circuit.showValuesCheckItem) {
          s = CircuitComponent.getShortUnitText(this.inductance, "H");
          this.drawValues(s, hs);
        }
        return this.drawPosts();
      };

      InductorElm.prototype.dump = function() {
        return CircuitComponent.prototype.dump.call(this) + " " + this.inductance + " " + this.current;
      };

      InductorElm.prototype.getDumpType = function() {
        return "l";
      };

      InductorElm.prototype.startIteration = function() {
        return this.ind.startIteration(this.volts[0] - this.volts[1]);
      };

      InductorElm.prototype.nonLinear = function() {
        return this.ind.nonLinear();
      };

      InductorElm.prototype.calculateCurrent = function() {
        var voltdiff;
        voltdiff = this.volts[0] - this.volts[1];
        return this.current = this.ind.calculateCurrent(voltdiff);
      };

      InductorElm.prototype.doStep = function() {
        var voltdiff;
        voltdiff = this.volts[0] - this.volts[1];
        return this.ind.doStep(voltdiff);
      };

      InductorElm.prototype.getInfo = function(arr) {
        arr[0] = "inductor";
        this.getBasicInfo(arr);
        arr[3] = "L = " + CircuitComponent.getUnitText(this.inductance, "H");
        return arr[4] = "P = " + CircuitComponent.getUnitText(this.getPower(), "W");
      };

      InductorElm.prototype.reset = function() {
        this.current = this.volts[0] = this.volts[1] = this.curcount = 0;
        return this.ind.reset();
      };

      InductorElm.prototype.getEditInfo = function(n) {
        var ei;
        if (n === 0) {
          return new EditInfo("Inductance (H)", this.inductance, 0, 0);
        }
        if (n === 1) {
          ei = new EditInfo("", 0, -1, -1);
          ei.checkbox = "Trapezoidal Approximation";
          return ei;
        }
        return null;
      };

      InductorElm.prototype.setEditValue = function(n, ei) {
        if (n === 0) {
          this.inductance = ei.value;
        }
        if (n === 1) {
          if (ei.checkbox.getState()) {
            this.flags &= ~Inductor.FLAG_BACK_EULER;
          } else {
            this.flags |= Inductor.FLAG_BACK_EULER;
          }
        }
        return this.ind.setup(this.inductance, this.current, this.flags);
      };

      InductorElm.prototype.setPoints = function() {
        InductorElm.__super__.setPoints.call(this);
        return this.calcLeads(32);
      };

      InductorElm.prototype.stamp = function() {
        return this.ind.stamp(this.nodes[0], this.nodes[1]);
      };

      return InductorElm;

    })(CircuitComponent);
    return InductorElm;
  });

}).call(this);
