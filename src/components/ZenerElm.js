let CircuitComponent = require('./CircuitComponent');

let Polygon = require('../geom/Polygon');
let Rectangle = require('../geom/Rectangle');
let Point = require('../geom/Point');
let DiodeElm = require('./DiodeElm');
let Util = require('../util/Util');

class ZenerElm extends DiodeElm {
  static get Fields() {
    return Util.extend(DiodeElm.Fields, {
      zvoltage: {
        title: "Voltage",
        unit: "Voltage",
        symbol: "V",
        default_value: DiodeElm.DEFAULT_DROP,
        data_type: parseFloat
      }
    });
  }

  constructor(xa, ya, xb, yb, params, f) {
    super(xa, ya, xb, yb, params, f);

    this.setup();
  }

  draw(renderContext) {
    if (this.Circuit && this.Circuit.debugModeEnabled()) {
      super.debugdraw(renderContext);
    }

    this.updateDots();
    this.calcLeads(16);
    let pa = Util.newPointArray(2);
    this.wing = Util.newPointArray(2);

    [pa[0], pa[1]] = Util.interpolateSymmetrical(this.lead1, this.lead2, 0, this.hs);
    [this.cathode[0], this.cathode[1]] = Util.interpolateSymmetrical(this.lead1, this.lead2, 1, this.hs);
    this.wing[0] = Util.interpolate(this.cathode[0], this.cathode[1], -0.2, -this.hs);
    this.wing[1] = Util.interpolate(this.cathode[1], this.cathode[0], -0.2, -this.hs);

    this.poly = Util.createPolygonFromArray([pa[0], pa[1], this.lead2]);

    let v1 = this.volts[0];
    let v2 = this.volts[1];

    renderContext.drawLeads(this);

    // draw arrow vector
    // setPowerColor(g, true)
    let color = renderContext.getVoltageColor(v1);
    renderContext.drawPolygon(this.poly, {stroke: color});

    // PLATE:
    // setVoltageColor(g, v2)
    color = renderContext.getVoltageColor(v2);
    renderContext.drawLinePt(this.cathode[0], this.cathode[1], color);

    // Cathode "Wings"
    renderContext.drawLinePt(this.wing[0], this.cathode[0], color);
    renderContext.drawLinePt(this.wing[1], this.cathode[1], color);

    renderContext.drawDots(this.point2, this.point1, this);
    return renderContext.drawPosts(this);
  }


  nonlinear() {
    return true;
  }

  static get NAME() {
    return "Zener Diode"
  }

  setup() {
    this.leakage = 5e-6;
    return super.setup();
  }

  needsShortcut() {
    return false;
  }
}

module.exports = ZenerElm;
