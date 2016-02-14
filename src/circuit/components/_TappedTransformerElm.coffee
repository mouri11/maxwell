CircuitComponent = require("../CircuitComponent.coffee")
Util = require('../../util/util.coffee')

class TappedTransformerElm extends CircuitComponent

  @Fields = {
    inductance: {
      name: "Inductance"
      data_type: parseFloat
    }
    ratio: {
      name: "Ratio"
      data_type: parseInt
    }
    current: {
      name: "Current"
      data_type: parseFloat
    }
  }


  constructor: (xa, xb, ya, yb, params, f) ->
    super(xa, xb, ya, yb, params, f)

  getDumpType: ->
    "169"


module.exports = TappedTransformerElm