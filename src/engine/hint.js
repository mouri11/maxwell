// Generated by CoffeeScript 1.4.0
(function() {

  define([], function() {
    var Hint;
    Hint = (function() {

      Hint.HINT_LC = "@HINT_LC";

      Hint.HINT_RC = "@HINT_RC";

      Hint.HINT_3DB_C = "@HINT_3DB_C";

      Hint.HINT_TWINT = "@HINT_TWINT";

      Hint.HINT_3DB_L = "@HINT_3DB_L";

      Hint.hintType = -1;

      Hint.hintItem1 = -1;

      Hint.hintItem2 = -1;

      function Hint(Circuit) {
        this.Circuit = Circuit;
      }

      Hint.prototype.readHint = function(st) {
        if (typeof st === 'string') {
          st = st.split(' ');
        }
        this.hintType = st[0];
        this.hintItem1 = st[1];
        return this.hintItem2 = st[2];
      };

      Hint.prototype.getHint = function() {
        var c1, c2, ce, ie, re;
        c1 = this.Circuit.getElmByIdx(this.hintItem1);
        c2 = this.Circuit.getElmByIdx(this.hintItem2);
        if (!(c1 != null) || !(c2 != null)) {
          return null;
        }
        if (this.hintType === this.HINT_LC) {
          if (!(c1 instanceof InductorElm)) {
            return null;
          }
          if (!(c2 instanceof CapacitorElm)) {
            return null;
          }
          ie = c1;
          ce = c2;
          return "res.f = " + getUnitText(1 / (2 * Math.PI * Math.sqrt(ie.inductance * ce.capacitance)), "Hz");
        }
        if (this.hintType === this.HINT_RC) {
          if (!(c1 instanceof ResistorElm)) {
            return null;
          }
          if (!(c2 instanceof CapacitorElm)) {
            return null;
          }
          re = c1;
          ce = c2;
          return "RC = " + getUnitText(re.resistance * ce.capacitance, "s");
        }
        if (this.hintType === this.HINT_3DB_C) {
          if (!(c1 instanceof ResistorElm)) {
            return null;
          }
          if (!(c2 instanceof CapacitorElm)) {
            return null;
          }
          re = c1;
          ce = c2;
          return "f.3db = " + getUnitText(1 / (2 * Math.PI * re.resistance * ce.capacitance), "Hz");
        }
        if (this.hintType === this.HINT_3DB_L) {
          if (!(c1 instanceof ResistorElm)) {
            return null;
          }
          if (!(c2 instanceof InductorElm)) {
            return null;
          }
          re = c1;
          ie = c2;
          return "f.3db = " + getUnitText(re.resistance / (2 * Math.PI * ie.inductance), "Hz");
        }
        if (this.hintType === this.HINT_TWINT) {
          if (!(c1 instanceof ResistorElm)) {
            return null;
          }
          if (!(c2 instanceof CapacitorElm)) {
            return null;
          }
          re = c1;
          ce = c2;
          return "fc = " + getUnitText(1 / (2 * Math.PI * re.resistance * ce.capacitance), "Hz");
        }
        return null;
      };

      return Hint;

    })();
    return Hint;
  });

}).call(this);