describe "Transistor Component", ->
  describe "default initialization", ->
    before ->
      @opampElm = new TransistorElm()

    it "doesn't set any positions", ->
      expect(@opampElm.x2()).to.equal(undefined)
      expect(@opampElm.y2()).to.equal(undefined)
      expect(@opampElm.x1()).to.equal(undefined)
      expect(@opampElm.y1()).to.equal(undefined)

    it "sets default parameters", ->
      expect(@opampElm.pnp).to.equal(-1)
      expect(@opampElm.lastvbe).to.equal(0)
      expect(@opampElm.lastvbc).to.equal(0)
      expect(@opampElm.beta).to.equal(100)

    it "has correct initial rendering conditions", ->
      expect(@opampElm.curcount).to.equal(undefined)
      expect(@opampElm.point1).to.eql({ x: undefined, y: undefined })
      expect(@opampElm.point2).to.eql({ x: undefined, y: undefined })
      expect(@opampElm.lead1).to.equal(undefined)
      expect(@opampElm.lead2).to.equal(undefined)
      expect(@opampElm.rect).to.eql([])
      expect(@opampElm.coll).to.eql([])
      expect(@opampElm.emit).to.eql([])

    it "has correct node relationships", ->
      expect(@opampElm.nodes).to.eql([0, 0, 0])
      expect(@opampElm.volts).to.eql([0, -0, -0])

    it "has default method return values", ->
      @opampElm.getPostCount().should.equal 3
      @opampElm.isWire().should.equal false
      @opampElm.hasGroundConnection().should.equal false
      @opampElm.needsShortcut().should.equal false
      @opampElm.canViewInScope().should.equal true
      @opampElm.getInternalNodeCount().should.equal 0
      @opampElm.orphaned().should.equal true

    it "has correct initial state", ->
      expect(@opampElm.noDiagonal).to.eql(true)
      expect(@opampElm.component_id).to.be
      expect(@opampElm.voltSource).to.equal(0)
      expect(@opampElm.current).to.equal(0)
      expect(@opampElm.ie).to.equal(0)
      expect(@opampElm.ic).to.equal(0)
      expect(@opampElm.ib).to.equal(0)
      expect(@opampElm.getCurrent()).to.equal(0)
      expect(@opampElm.getVoltageDiff()).to.equal(0)

    it "has params", ->
      expect(@opampElm.params).to.eql({
        "beta": 100
        "pnp": -1
        "volts": [
          0
          -0
          -0
        ]
      })

  describe "With params object", ->
    before ->
      @opampElm = new TransistorElm(50, 75, 50, 150, {"pnp": "-1", "lastvbe": "-4.195", "lastvbc": "0.805", "beta": "200.0"})

    it "has params", ->
      expect(@opampElm.params).to.eql({
        "beta": 200
        "pnp": -1
        "volts": [
          0
          4.195
          -0.805
        ]
      })

  describe "With params array", ->
    before ->
      @opampElm = new TransistorElm(50, 75, 50, 150, ["1", "-4.295", "0.705", "200.0"])

      @Circuit = new Circuit("Basic BJT")

      @opampElm.setPoints()
      @opampElm.setup()
      @Circuit.solder(@opampElm)

    it "has params", ->
      expect(@opampElm.beta).to.eql(200)
      expect(@opampElm.pnp).to.eql(1)
      expect(@opampElm.volts).to.eql([0, 4.295, -0.705])
      expect(@opampElm.params).to.eql({
        "beta": 200
        "pnp": 1
        "volts": [
          0
          4.295
          -0.705
        ]
      })

    it "has correct position", ->
      expect(@opampElm.x1()).to.equal(50)
      expect(@opampElm.y1()).to.equal(75)
      expect(@opampElm.x2()).to.equal(50)
      expect(@opampElm.y2()).to.equal(150)

      expect(@opampElm.dx()).to.equal(0)
      expect(@opampElm.dy()).to.equal(75)
      expect(@opampElm.dn()).to.equal(75)
      expect(@opampElm.dsign()).to.equal(1)
      expect(@opampElm.dpx1()).to.equal(1)
      expect(@opampElm.dpy1()).to.equal(0)
      expect(@opampElm.isVertical()).to.equal(true)
      expect(@opampElm.getCenter()).to.eql({x: 50, y: 112.5})

      expect(@opampElm.getBoundingBox()).to.eql({x: 49, y: 75, width: 5, height: 75})

    it "snaps to grid when moved", ->
      @opampElm.moveTo(100, 162.5)
      expect(@opampElm.getCenter()).to.eql({x: 98, y: 160.5})

      expect(@opampElm.x1()).to.equal(98)
      expect(@opampElm.y1()).to.equal(123)
      expect(@opampElm.x2()).to.equal(98)
      expect(@opampElm.y2()).to.equal(198)

    it "can be stringified", ->
      expect(@opampElm.toString()).to.eql("""TransistorElm@[98 123 98 198]: {"beta":200,"pnp":1,"volts":[0,4.295,-0.705]}""")
      expect(@opampElm.getName()).to.eql("Bipolar Junction Transistor (PNP)")

    it "can stamp", ->
      @opampElm.stamp(@Circuit.Solver.Stamper)

    describe "Loading list of parameters", ->
      before ->
        @opampElm = new TransistorElm(100, 200, 100, 300, ["-1", "-4.295", "0.705", "100.0"])

      it "is pnp", ->
        expect(@opampElm.pnp).to.equal(-1)

    describe "Rendering", ->
      before ->
        @Circuit.clearAndReset()
        @Circuit.solder(@opampElm)

        Canvas = require('canvas')
        @canvas = new Canvas(200, 300)

        @renderer = new Renderer(@Circuit, @canvas)
        @renderer.context = @canvas.getContext('2d')
        @renderer.drawComponents()

        @componentImageFileName = "test/fixtures/componentRenders/#{@Circuit.name}_init.png"

      it "renders initial circuit", ->
        fs.writeFileSync(@componentImageFileName, @canvas.toBuffer())

      it "compares buffer", (done) ->

        resemble(@canvas.toBuffer()).compareTo(@componentImageFileName).ignoreAntialiasing().onComplete (data) =>
          console.log(data)

          data.getDiffImage().pack().pipe(fs.createWriteStream(@componentImageFileName + "_diff.png"));

          expect(data.misMatchPercentage).to.be.at.most(0.01)

          done()



