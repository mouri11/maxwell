// Generated by CoffeeScript 1.4.0
(function() {

  define(['cs!Polygon', 'cs!Rectangle', 'cs!Point', 'cs!CircuitComponent'], function(Polygon, Rectangle, Point, CircuitComponent) {
    return describe("Base Circuit Component", function() {
      specify("class methods", function() {
        CircuitComponent.getScopeUnits(1).should.equal("W");
        return CircuitComponent.getScopeUnits().should.equal("V");
      });
      beforeEach(function() {
        return this.circuitElement = new CircuitComponent(10, 10, 13, 14);
      });
      describe("can instantiate a new Circuit Component", function() {
        specify("with correct position", function() {
          this.circuitElement.x1.should.equal(10);
          this.circuitElement.y1.should.equal(10);
          this.circuitElement.x2.should.equal(13);
          return this.circuitElement.y2.should.equal(14);
        });
        specify("without flag passed as an argument", function() {
          return this.circuitElement.flags.should.equal(0);
        });
        specify("with flag passed as an argument", function() {
          var circuitElm;
          circuitElm = new CircuitComponent(0, 3, 0, 4, 5);
          return circuitElm.flags.should.equal(5);
        });
        specify("should create default parameters", function() {
          this.circuitElement.current.should.equal(0);
          this.circuitElement.getCurrent().should.equal(0);
<<<<<<< HEAD
          this.circuitElement.curcount.should.equal(0);
=======
>>>>>>> reorganize_packages
          this.circuitElement.noDiagonal.should.equal(false);
          return this.circuitElement.selected.should.equal(false);
        });
        specify("default method return values", function() {
          this.circuitElement.getPostCount().should.equal(2);
          this.circuitElement.isSelected().should.equal(false);
          this.circuitElement.isWire().should.equal(false);
          this.circuitElement.hasGroundConnection().should.equal(false);
          this.circuitElement.needsHighlight().should.equal(false);
          this.circuitElement.needsShortcut().should.equal(false);
          return this.circuitElement.canViewInScope().should.equal(true);
        });
        it("should allocate nodes", function() {
          this.circuitElement.nodes.toString().should.equal([0, 0].toString());
          return this.circuitElement.volts.toString().should.equal([0, 0].toString());
        });
        it("should set points", function() {
          var x1, x2, y1, y2;
          x1 = this.circuitElement.x1;
          y1 = this.circuitElement.y1;
          x2 = this.circuitElement.x2;
          y2 = this.circuitElement.y2;
          this.circuitElement.setPoints();
          this.circuitElement.dx.should.equal(3);
          this.circuitElement.dy.should.equal(4);
          this.circuitElement.dn.should.equal(5);
          this.circuitElement.dpx1.should.equal(4 / 5);
          this.circuitElement.dpy1.should.equal(-(3 / 5));
          this.circuitElement.dsign.should.equal(1);
          this.circuitElement.point1.equals(new Point(x1, y1)).should.equal(true);
          return this.circuitElement.point2.equals(new Point(x2, y2)).should.equal(true);
        });
        it("should set bounding box", function() {
          var bBox;
          bBox = this.circuitElement.boundingBox;
          bBox.x.should.equal(10);
          bBox.y.should.equal(10);
          bBox.width.should.equal(4);
          return bBox.height.should.equal(5);
        });
        it("should have correct dump type", function() {
          return this.circuitElement.dump().should.equal('0 10 10 13 14 0');
        });
        return specify("base elements should be linear by default", function() {
          return this.circuitElement.nonLinear().should.equal(false);
        });
      });
      return describe("Should listen for", function() {
        return specify("onDraw(Context)", function() {});
      });
    });
  });

}).call(this);
