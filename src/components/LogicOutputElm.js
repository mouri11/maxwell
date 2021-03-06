let CircuitComponent = require('./CircuitComponent');

let Polygon = require('../geom/Polygon');
let Rectangle = require('../geom/Rectangle');
let Point = require('../geom/Point');
let Util = require('../util/Util');

class LogicOutputElm extends CircuitComponent {
  static initClass() {
    this.FLAG_TERNARY = 1;
    this.FLAG_NUMERIC = 2;
    this.FLAG_PULLDOWN = 4;
  }

  static get Fields() {
    return {
      threshold: {
        title: "Threshold Voltage",
        data_type: parseFloat,
        default_value: 2.5,
        unit: "Voltage",
        symbol: "V",
      }
    };
  }

  constructor(xa, ya, xb, yb, params, f) {
    super(xa, ya, xb, yb, params, f);

    this.place()
  }


  isTernary() {
    return (this.flags & LogicOutputElm.FLAG_TERNARY) !== 0;
  }

  isNumeric() {
    return (this.flags & (LogicOutputElm.FLAG_TERNARY | LogicOutputElm.FLAG_NUMERIC)) !== 0;
  }

  needsPullDown() {
    return (this.flags & LogicOutputElm.FLAG_PULLDOWN) !== 0;
  }

  numPosts() {
    return 1;
  }

  static get NAME() {
    return "Logic Output Terminal"
  }

  draw(renderContext) {
    let s = this.volts < this.threshold ? "0" : "1";

    if (this.isTernary()) {
      if (this.volts[0] > 3.75) {
        s = "2";
      } else if (this.volts[0] > 1.25) {
        s = "1";
      } else {
        s = "0";
      }
    } else if (this.isNumeric()) {
      s = (this.volts[0] < this.threshold) ? "0" : "1";
    }

    this.value = s;

    renderContext.drawText(s, this.point2.x - 1, this.point2.y + 6, renderContext.TEXT_COLOR, 1.5*renderContext.TEXT_SIZE);

    let color = renderContext.getVoltageColor(this.volts[0]);
    renderContext.drawLinePt(this.point1, this.lead1, color);
    renderContext.drawPosts(this);

    if (this.Circuit && this.Circuit.debugModeEnabled()) {
      return super.debugdraw(renderContext);
    }
  }

  place() {
    this.lead1 = Util.interpolate(this.point1, this.point2, 1 - (12 / this.dn()));
  }


  stamp(stamper) {
    if (this.needsPullDown()) {
      return stamper.stampResistor(this.nodes[0], 0, 1e6);
    }
  }

  getVoltageDiff() {
    return this.volts[0];
  }
}
LogicOutputElm.initClass();



module.exports = LogicOutputElm;
