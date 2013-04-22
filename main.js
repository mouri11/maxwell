// Top-level script:

// Define shortcut aliases
require.config({
  paths: {

    // LIBRARIES:
    jquery: 'libs/jquery-1.8.3.min',
    'coffee-script': 'libs/coffee-script',
    cs: 'libs/cs',
    color: 'libs/color',
    mocha: 'libs/mocha',
    chai: 'libs/chai',

    // CORE:
    Circuit: 'src/core/circuit',
    CircuitEngineParams: 'src/core/simulationParams',

    // ENGINE:
    MatrixStamper: 'src/engine/matrixStamper',
    RowInfo: 'src/engine/rowInfo',
    CircuitSolver: 'src/engine/circuitSolver',
    Hint: 'src/engine/hint',
    CircuitNode: 'src/engine/graphTraversal/circuitNode',
    CircuitNodeLink: 'src/engine/graphTraversal/circuitNodeLink',
    Pathfinder: 'src/engine/graphTraversal/pathfinder',

    // SETTINGS:
    Settings: 'src/settings/settings',

    // IO:
    Logger: 'src/io/logger',
    CircuitLoader: 'src/io/circuitLoader',
    ConfigurationLoader: 'src/io/configurationLoader',

    // GEOM:
    Point: 'src/geom/point',
    Polygon: 'src/geom/polygon',
    Rectangle: 'src/geom/rectangle',

    // RENDERING:
    CircuitCanvas: 'src/render/circuitCanvas',
    CanvasContext: 'src/render/canvasContext',
    DrawHelper: 'src/render/drawHelper',

    // OSCILLOSCOPE:
    Oscilloscope: 'src/scope/oscilloscope',

    // STATE:
    CircuitState: 'src/state/circuitState',
    ColorMapState: 'src/state/colorMapState',
    KeyboardState: 'src/state/keyboardState',
    MouseState: 'src/state/mouseState',

    // COMPONENT:
    CircuitComponent: 'src/component/circuitComponent',
    ComponentRegistry: 'src/component/componentRegistry',

    // COMPONENTS:
    AntennaElm: 'src/component/components/AntennaElm',
    CapacitorElm: 'src/component/components/CapacitorElm',
    CurrentElm: 'src/component/components/CurrentElm',
    DiodeElm: 'src/component/components/DiodeElm',
    GroundElm: 'src/component/components/GroundElm',
    InductorElm: 'src/component/components/InductorElm',
    JFetElm: 'src/component/components/JFetElm',
    LogicInputElm: 'src/component/components/LogicInputElm',
    LogicOutputElm: 'src/component/components/LogicOutputElm',
    MosfetElm: 'src/component/components/MosfetElm',
    OpAmpElm: 'src/component/components/OpAmpElm',
    OutputElm: 'src/component/components/OutputElm',
    ProbeElm: 'src/component/components/ProbeElm',
    RailElm: 'src/component/components/RailElm',
    ResistorElm: 'src/component/components/ResistorElm',
    SparkGapElm: 'src/component/components/SparkGapElm',
    SweepElm: 'src/component/components/SweepElm',
    Switch2Elm: 'src/component/components/Switch2Elm',
    SwitchElm: 'src/component/components/SwitchElm',
    TextElm: 'src/component/components/TextElm',
    TransistorElm: 'src/component/components/TransistorElm',
    VarRailElm: 'src/component/components/VarRailElm',
    VoltageElm: 'src/component/components/VoltageElm',
    WireElm: 'src/component/components/WireElm',

    // USER INTERFACE:
    CommandHistory: 'src/ui/commandHistory',
    Grid: 'src/ui/grid',
    KeyHandler: 'src/ui/keyHandler',
    MouseHandler: 'src/ui/mouseHandler',

    // Utils
    ColorScale: 'src/util/colorScale',
    Module: 'src/util/module',
    Observer: 'src/util/observer',
    ColorPalette: 'src/util/colorPalette',
    MathUtils: 'src/util/mathUtils',
    ArrayUtils: 'src/util/arrayUtils',
    FormatUtils: 'src/util/formatUtils',
    ConsoleUtils: 'src/util/consoleUtils',
    Units: 'src/util/units',


    ////////////////////////////////////////////////////////
    // TESTS:
    ////////////////////////////////////////////////////////

    TestHelper: 'test/_helper',
    CircuitTest: 'test/circuit/circuitTest',

    // Components
    ResistorTest: 'test/component/components/resistorTest',
    VoltageElmTest: 'test/component/components/voltageTest',
    GroundTest: 'test/component/components/groundTest',
    WireTest: 'test/component/components/wireTest',
    CapacitorTest: 'test/component/components/capacitorTest',
    ComponentTest: 'test/component/circuitComponentTest',

    // Engine:
    ComponentNodeLinkTest: 'test/circuit/circuitNodeLinkTest',
    ComponentNodeTest: 'test/circuit/circuitNodeTest',

    // Solvers
    CircuitSolverTest: 'test/solver/circuitSolverTest',
    MatrixSolverTest: 'test/solver/matrixSolverTest',
    CircuitStamperTest: 'test/solver/matrixStamperTest',

    // Utils
    ArraysTest: 'test/util/arraysTest',
    FormatsTest: 'test/util/formatsTest',
    MathTest: 'test/util/mathTest',
    UnitsTest: 'test/util/unitsTest',

    // IO
    AjaxTest: 'test/io/ajaxTest',
    CircuitLoaderTest: 'test/io/circuitLoaderTest',

    // UI
    PrimitivesTest: 'test/util/primitivesTest',

    // Integration tests:
    voltdivideIntegration: 'test/integration/voltdividesimpleTest',
    observerTest: 'test/observers/observerTest'
  }

});

// Filename: main.js
console.log("Loading main.js");

require([
  // Load our app module and pass it to our definition function
  'jquery',

  'cs!Circuit',
  'cs!CircuitCanvas',
  'cs!CircuitLoader',
  'cs!ResistorElm',
  'cs!WireElm',
  'cs!GroundElm',
  'cs!VoltageElm',

  'cs!ArrayUtils',
  'cs!ConsoleUtils'

], function ($, Circuit, CircuitCanvas, CircuitLoader, Resistor, Wire, Ground, Voltage) {

  var circuitName = $('canvas').data('circuit');
  var circuitFileName = "../circuits/" + circuitName + ".json";

  $(document).ready(function (event) {
    CircuitLoader.createCircuitFromJSON(circuitFileName, function (circuit) {
      "use strict";
      console.log("loading: " + circuitFileName);

      var canvas = $('canvas.maxwell');

      var renderer = new CircuitCanvas(circuit, canvas);

      setInterval(function () {
        circuit.updateCircuit();
      }, 0);
    });
  });

//    var voltageSource = new Voltage(112, 368, 112, 48, 0, [0, 40.0, 10.0, 0.0]);
//    var wire1 = new Wire(112, 48, 240, 48, 0, []);
//    var res1 = new Resistor(240, 48, 240, 368, 0, [10000]);
//    var wire2 = new Wire(112, 368, 240, 368, 0, []);
//    var wire3 = new Wire(240, 48, 432, 48, 0, []);
//    var wire4 = new Wire(240, 368, 432, 368, 0, []);
//    var re2 = new Resistor(432, 48, 432, 368, 0, [20000]);
//
//    circuit.solder(voltageSource);
//    circuit.solder(wire1);
//    circuit.solder(wire2);
//    circuit.solder(wire3);
//    circuit.solder(wire4);
//    circuit.solder(res1);
//    circuit.solder(re2);
//
//    circuit.restartAndRun();

  runTests();

  $('#run_tests').click(function (e) {
    "use strict";
    mocha.setup('bdd');
    mocha.run();
  });
});

function runTests() {
  "use strict";

  mocha.setup('bdd');

  require([
    'test/_helper',
    'cs!CircuitTest',
    'cs!ResistorTest',
    'cs!VoltageElmTest',
    'cs!GroundTest',
    'cs!WireTest',
    'cs!CapacitorTest',
    'cs!ComponentTest',
    'cs!ComponentNodeLinkTest',
    'cs!ComponentNodeTest',

    'cs!CircuitSolverTest',
    'cs!MatrixSolverTest',
    'cs!CircuitStamperTest',

    'cs!ArraysTest',
    'cs!FormatsTest',
    'cs!MathTest',
    'cs!UnitsTest',
    'cs!UnitsTest',

    'cs!PrimitivesTest',
    'cs!AjaxTest',
    'cs!CircuitLoaderTest',
    'cs!voltdivideIntegration',
    'cs!observerTest'
  ], function () {
    "use strict";
      mocha.run();
  });
}