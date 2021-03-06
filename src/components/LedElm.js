let CircuitComponent = require("./CircuitComponent.js");
let DiodeElm = require("./DiodeElm.js");
let Util = require('../util/Util');


class LedElm extends DiodeElm {
  static get Fields() {
    return {
      colorR: {
        title: "Red Intensity",
        data_type: parseFloat,
        default_value: 0,
        range: [0, 1],
        field_type: "slider"
      },
      colorG: {
        title: "Green Intensity",
        data_type: parseFloat,
        default_value: 0,
        range: [0, 1],
        field_type: "slider"
      },
      colorB: {
        title: "Blue Intensity",
        data_type: parseFloat,
        default_value: 0,
        range: [0, 1],
        field_type: "slider"
      }
      //    fwdrop: {
      //      name: "Voltage drop"
      //      data_type: parseFloat
      //      default_value: DiodeElm.DEFAULT_DROP
      //    }
    };
  }


  constructor(xa, xb, ya, yb, params, f) {
    let fwdrop = 2.1024259;

    if (f) {
      if (params.constructor == Array && params.length > 3) {
        fwdrop = params.shift();
      } else {
        fwdrop = params["fwdrop"] || fwdrop;
      }
    }

    super(xa, xb, ya, yb, params, f);
    // TODO: CHECK!
    // this.params = {};

    //    if (f & DiodeElm.FLAG_FWDROP) == 0
    //      @fwdrop = 2.1024259
    this.fwdrop = fwdrop;

    /*
    if ((f & DiodeElm.FLAG_FWDROP) === 0) {
      this.fwdrop = 2.1024259;  //DiodeElm.DEFAULT_DROP
      this.params['fwdrop'] = 0.805904783;
    } else {
      this.fwdrop = parseFloat(params.shift());
      this.params['fwdrop'] = this.fwdrop;
    }
    */

    this.setup();

    this.place();
  }

  static get NAME() {
    return "Light Emitting Diode (LED)";
  }

  place() {
    let cr = 12;
    this.ledLead1 = Util.interpolate(this.point1, this.point2, 0.5 - (cr / this.dn()));
    this.ledLead2 = Util.interpolate(this.point1, this.point2, 0.5 + (cr / this.dn()));
    this.ledCenter = Util.interpolate(this.point1, this.point2, 0.5);

    this.setBboxPt(this.point1, this.point2, cr);
  }

  needsShortcut() {
    return false;
  }

  draw(renderContext) {
    let cr = 12;
    
    this.setBboxPt(this.point1, this.point2, cr);

    let voltageColor = renderContext.getVoltageColor(this.volts[0]);
    renderContext.drawLinePt(this.point1, this.ledLead1, voltageColor);

    voltageColor = renderContext.getVoltageColor(this.volts[0]);
    renderContext.drawLinePt(this.ledLead2, this.point2, voltageColor);

    renderContext.drawCircle(this.ledCenter.x, this.ledCenter.y, cr);

    cr -= 4;

    let w = Math.min((255 * this.current) / .01, 255);

//    g.fillOval(ledCenter.x - cr, ledCenter.y - cr, cr * 2, cr * 2);
    //console.log(@current, w)
    //console.log("RBG: #{w * @colorR} #{w * @colorG} #{w * @colorB}")
    let hexcolor = Util.rgb2hex(w * this.colorR, w * this.colorG, w * this.colorB);

    renderContext.drawCircle(this.ledCenter.x, this.ledCenter.y, cr, renderContext.LINE_WIDTH, renderContext.STROKE_COLOR, hexcolor);

    this.updateDots();
    renderContext.drawDots(this.point1, this.ledLead1, this.curcount);
    renderContext.drawDots(this.point2, this.ledLead2, -this.curcount);

    renderContext.drawPosts(this);

    if (this.Circuit && this.Circuit.debugModeEnabled()) {
      super.debugdraw(renderContext);
    }
  }
}
LedElm.initClass();


module.exports = LedElm;
