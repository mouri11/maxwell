Settings = require('../../settings/settings.coffee')
DrawHelper = require('../../render/drawHelper.coffee')
Polygon = require('../../geom/polygon.coffee')
Rectangle = require('../../geom/rectangle.coffee')
Point = require('../../geom/point.coffee')
CircuitComponent = require('../circuitComponent.coffee')

class OutputElm extends CircuitComponent

  @FLAG_VALUE: 1

  constructor: (xa, ya, xb, yb, f, st) ->
    # st not used for OutputElm
    super xa, ya, xb, yb, f


  getDumpType: ->
    "O"

  getPostCount: ->
    1

  setPoints: ->
    super()
    @lead1 = new Point()

  draw: (renderContext) ->
#      selected = (@needsHighlight() or Circuit.plotYElm is this)
    selected = @needsHighlight()

    #Font f = new Font("SansSerif", selected ? Font.BOLD : 0, 14);
    #g.setFont(f);
    color = (if selected then Settings.SELECT_COLOR else "#FFF")
    s = (if (@flags & OutputElm.FLAG_VALUE) isnt 0 then DrawHelper.getVoltageText(@volts[0]) else "out")

    #FontMetrics fm = g.getFontMetrics();
#      s = "X"  if this is Circuit.plotXElm
#      s = "Y"  if this is Circuit.plotYElm

    @lead1 = DrawHelper.interpPoint @point1, @point2, 1 - (3 * s.length / 2 + 8) / @dn

    @setBboxPt @point1, @lead1, 0
    @drawCenteredText s, @x2, @y2, true, renderContext

    if selected
      color = DrawHelper.getVoltageColor(@volts[0])
    else
      color = Settings.SELECT_COLOR

    renderContext.drawThickLinePt @point1, @lead1, color
    @drawPosts(renderContext)

  getVoltageDiff: ->
    @volts[0]

  getInfo: (arr) ->
    arr[0] = "output"
    arr[1] = "V = " + DrawHelper.getVoltageText(@volts[0])

  getEditInfo: (n) ->
    if n is 0
      ei = new EditInfo("", 0, -1, -1)

      #ei.checkbox = new Checkbox("Show Voltage", (flags & FLAG_VALUE) != 0);
      ei.checkbox = "Show Voltage"
      return ei
    null

  stamp: (stamper) ->

  toString: ->
    "OutputElm"

  setEditValue: (n, ei) ->

  # Todo: fix
  #if (n == 0)
  #   this.flags = (ei.checkbox.getState()) ? (this.flags | OutputElm.FLAG_VALUE) : (this.flags & ~OutputElm.FLAG_VALUE);

module.exports = OutputElm