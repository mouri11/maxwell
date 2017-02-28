describe "CC2", ->
  it "updates and renders circuit", () ->
    @circuitJson = {
      params: {
        "type": "cc2.txt",
        "timeStep": 0.000005,
        "simSpeed": 172,
        "currentSpeed": 50,
        "voltageRange": 5,
        "powerRange": 50,
        "flags": 1
      },
      components: [
        {
          "name": "CC2Elm",
          "pos": [272, 224, 304, 224],
          "flags": 0,
          "params": {
            "volts": [],
            "gain": 1
          }
        },
        {
          "name": "ResistorElm",
          "pos": [368, 256, 480, 256],
          "flags": 0,
          "params": {
            "resistance": 100
          }
        },
        {
          "name": "GroundElm",
          "pos": [480, 256, 480, 288],
          "flags": 0,
          "params": {}
        },
        {
          "name": "VarRailElm",
          "pos": [272, 288, 192, 288],
          "flags": 0,
          "params": {
            "waveform": 6,
            "frequency": 4.5,
            "maxVoltage": 5,
            "bias": 0,
            "phaseShift": 0,
            "dutyCycle": 0.5,
            "sliderText": "Y Voltage"
          }
        },
        {
          "name": "PotElm",
          "pos": [272, 224, 208, 224],
          "flags": 0,
          "params": {
            "maxResistance": 1000,
            "position": 0.5,
            "sliderText": "X Resistance"
          }
        },
        {
          "name": "ResistorElm",
          "pos": [240, 176, 144, 176],
          "flags": 0,
          "params": {
            "resistance": 100
          }
        },
        {
          "name": "GroundElm",
          "pos": [144, 176, 144, 192],
          "flags": 0,
          "params": {}
        }]
    }

    @canvas = new Canvas(600, 500)

    @circuit = CircuitLoader.createCircuitFromJsonData(@circuitJson)

    @circuit.updateCircuit()

    @renderer = new CircuitApplication(@circuit, @canvas)

    ctx = @canvas.getContext('2d')
    @renderer.context = ctx
    @renderer.draw()
    