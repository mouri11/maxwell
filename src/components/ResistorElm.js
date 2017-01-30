let CircuitComponent = require('./CircuitComponent.js');
let Settings = require('../settings/Settings.js');
let Polygon = require('../geom/Polygon.js');
let Rectangle = require('../geom/Rectangle.js');
let Point = require('../geom/Point.js');
let Util = require('../util/Util.js');
//Maxwell = require('../Maxwell.js')

class ResistorElm extends CircuitComponent {
  static get Fields() {
    return {
      "resistance": {
        name: "Resistance",
        description: "Amount of current per unit voltage applied to this resistor (ideal).",
        unit: "Ohms",
        default_value: 1000,
        symbol: "Ω",
        data_type: parseFloat,
        range: [0, Infinity],
        type: "physical"
      }
    };
  }

  constructor(xa, ya, xb, yb, params, f) {
    super(xa, ya, xb, yb, params, f);
  }

  value() {
    return this.resistance;
  }

  draw(renderContext) {
    this.calcLeads(32);

    renderContext.drawLeads(this);

    this.updateDots();
    renderContext.drawDots(this.point1, this.lead1, this);
    renderContext.drawDots(this.lead2, this.point2, this);

    renderContext.drawZigZag(this.lead1, this.lead2, this.volts[0], this.volts[1])

    renderContext.drawValue(10, 0, this, Util.getUnitText(this.resistance, this.unitSymbol(), Settings.COMPONENT_DECIMAL_PLACES));

    renderContext.drawPosts(this);

    if (this.Circuit && this.Circuit.debugModeEnabled()) {
      super.debugDraw(renderContext);
    }
  }

  unitSymbol() {
    return "Ω";
  }
  
  static get NAME() {
    return "Resistor"
  }

  needsShortcut() {
    return true;
  }

  calculateCurrent() {
    return this.current = (this.volts[0] - this.volts[1]) / this.resistance;
  }

  stamp(stamper) {
    if (this.orphaned()) {
      console.warn("attempting to stamp an orphaned resistor");
    }

    return stamper.stampResistor(this.nodes[0], this.nodes[1], this.resistance);
  }
}
ResistorElm.initClass();

module.exports = ResistorElm;