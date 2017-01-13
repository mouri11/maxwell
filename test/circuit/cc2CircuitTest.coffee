

describe "CC2", ->
  it "updates and renders circuit", () ->
    @circuitJson = [
      {
        "name_unique": "cc2.txt",
        "flags": 1,
        "time_step": 5.0e-06,
        "sim_speed": 10.20027730826997,
        "current_speed": 50.0,
        "voltage_range": 5.0,
        "power_range": 50.0
      },
      {
        "sym": "179",
        "x1": 272,
        "y1": 224,
        "x2": 304,
        "y2": 224,
        "flags": "0",
        "params": [
          "1.0"
        ]
      },
      {
        "sym": "r",
        "x1": 368,
        "y1": 256,
        "x2": 480,
        "y2": 256,
        "flags": "0",
        "params": [
          "100.0"
        ]
      },
      {
        "sym": "g",
        "x1": 480,
        "y1": 256,
        "x2": 480,
        "y2": 288,
        "flags": "0",
        "params": []
      },
      {
        "sym": "172",
        "x1": 272,
        "y1": 288,
        "x2": 192,
        "y2": 288,
        "flags": "0",
        "params": [
          "6",
          "4.5",
          "5.0",
          "0.0",
          "0.0",
          "0.5",
          "Y",
          "Voltage"
        ]
      },
      {
        "sym": "174",
        "x1": 272,
        "y1": 224,
        "x2": 208,
        "y2": 176,
        "flags": "0",
        "params": [
          "1000.0",
          "0.5",
          "X Resistance"
        ]
      },
      {
        "sym": "r",
        "x1": 240,
        "y1": 176,
        "x2": 144,
        "y2": 176,
        "flags": "0",
        "params": [
          "100.0"
        ]
      },
      {
        "sym": "g",
        "x1": 144,
        "y1": 176,
        "x2": 144,
        "y2": 192,
        "flags": "0",
        "params": []
      }
    ]

    @canvas = new Canvas(600, 500)

    @circuit = CircuitLoader.createCircuitFromJsonData(@circuitJson)

    @circuit.updateCircuit()

    @renderer = new Renderer(@circuit, @canvas)

    ctx = @canvas.getContext('2d')
    @renderer.context = ctx
    @renderer.drawComponents()