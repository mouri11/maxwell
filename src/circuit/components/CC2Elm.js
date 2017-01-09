let CircuitComponent = require("../circuitComponent.js");
let ChipElm = require("./ChipElm.js");
let Util = require('../../util/util.js');

class CC2Elm extends ChipElm {
//  @Fields = {
//    gain: {
//      name: "Gain"
//      data_type: parseFloat
//    }
//  }

  constructor(xa, xb, ya, yb, params, f) {
    super(xa, xb, ya, yb, params, f);

    if (params) {
      this.gain = parseFloat(params[0]);
    } else {
      this.gain = 1;
    }

    this.params['gain'] = this.gain;
  }
//    @params = { gain: @gain }

  getName() {
    return "CC2";
  }

  setupPins() {
    this.sizeX = 2;
    this.sizeY = 3;

    this.pins = new Array(3);
    this.pins[0] = new ChipElm.Pin(0, ChipElm.SIDE_W, "X");
    this.pins[0].output = true;
    this.pins[1] = new ChipElm.Pin(2, ChipElm.SIDE_W, "Y");
    return this.pins[2] = new ChipElm.Pin(1, ChipElm.SIDE_E, "Z");
  }

  stamp(stamper) {
    stamper.stampVoltageSource(0, this.nodes[0], this.pins[0].voltSource);
    stamper.stampVCVS(0, this.nodes[1], 1, this.pins[0].voltSource);

    return stamper.stampCCCS(0, this.nodes[2], this.pins[0].voltSource, this.gain);
  }

  draw(renderContext) {
    this.pins[2].current = this.pins[0].current * this.gain;
    return this.drawChip(renderContext);
  }

  getPostCount() {
    return 3;
  }

  getVoltageSourceCount() {
    return 1;
  }

  getDumpType() {
    return "179";
  }
}

module.exports = CC2Elm;