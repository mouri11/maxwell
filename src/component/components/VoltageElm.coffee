CircuitComponent = require('../circuitComponent')
DrawHelper = require('../../render/drawHelper')

class VoltageElm extends CircuitComponent

  constructor: (xa, ya, xb, yb, f, st) ->
    super xa, ya, xb, yb, f, st

    @maxVoltage = 5
    @frequency = 40
    @waveform = VoltageElm.WF_DC
    @dutyCycle = 0.5

    if st
      st = st.split(" ")  if typeof st is "string"
      @waveform = (if st[0] then Math.floor(parseInt(st[0])) else VoltageElm.WF_DC)
      @frequency = (if st[1] then parseFloat(st[1]) else 40)
      @maxVoltage = (if st[2] then parseFloat(st[2]) else 5)
      @bias = (if st[3] then parseFloat(st[3]) else 0)
      @phaseShift = (if st[4] then parseFloat(st[4]) else 0)
      @dutyCycle = (if st[5] then parseFloat(st[5]) else 0.5)

    if @flags & VoltageElm.FLAG_COS isnt 0
      @flags &= ~VoltageElm.FLAG_COS
      @phaseShift = Math.PI / 2

    @reset()


VoltageElm.FLAG_COS = 2
VoltageElm.WF_DC = 0
VoltageElm.WF_AC = 1
VoltageElm.WF_SQUARE = 2
VoltageElm.WF_TRIANGLE = 3
VoltageElm.WF_SAWTOOTH = 4
VoltageElm.WF_PULSE = 5
VoltageElm.WF_VAR = 6
VoltageElm::waveform = VoltageElm.WF_DC
VoltageElm::frequency = 40
VoltageElm::maxVoltage = 5
VoltageElm::freqTimeZero = 0
VoltageElm::bias = 0
VoltageElm::phaseShift = 0
VoltageElm::dutyCycle = 0.5
VoltageElm::getDumpType = ->
  "v"

VoltageElm::dump = ->
  CircuitComponent::dump.call(this) + " " + @waveform + " " + @frequency + " " + @maxVoltage + " " + @bias + " " + @phaseShift + " " + @dutyCycle

VoltageElm::reset = ->
  @freqTimeZero = 0
  @curcount = 5

VoltageElm::triangleFunc = (x) ->
  return x * (2 / Math.PI) - 1  if x < Math.PI
  1 - (x - Math.PI) * (2 / Math.PI)

VoltageElm::stamp = ->
  if @waveform is VoltageElm.WF_DC
    @Circuit.Solver.Stamper.stampVoltageSource @nodes[0], @nodes[1], @voltSource, @getVoltage()
  else
    @Circuit.Solver.Stamper.stampVoltageSource @nodes[0], @nodes[1], @voltSource

VoltageElm::doStep = ->
  unless @waveform is VoltageElm.WF_DC
    @Circuit.Solver.updateVoltageSource @nodes[0], @nodes[1], @voltSource, @getVoltage()

VoltageElm::getVoltage = ->
  omega = 2 * Math.PI * (@Circuit.Solver.time - @freqTimeZero) * @frequency + @phaseShift
  switch @waveform
    when VoltageElm.WF_DC
      @maxVoltage + @bias
    when VoltageElm.WF_AC
      Math.sin(omega) * @maxVoltage + @bias
    when VoltageElm.WF_SQUARE
      @bias + (if (omega % (2 * Math.PI) > (2 * Math.PI * @dutyCycle)) then -@maxVoltage else @maxVoltage)
    when VoltageElm.WF_TRIANGLE
      @bias + @triangleFunc(omega % (2 * Math.PI)) * @maxVoltage
    when VoltageElm.WF_SAWTOOTH
      @bias + (omega % (2 * Math.PI)) * (@maxVoltage / Math.PI) - @maxVoltage
    when VoltageElm.WF_PULSE
      if (omega % (2 * Math.PI)) < 1
        @maxVoltage + @bias
      else
        @bias
    else
      0

VoltageElm.circleSize = 17


VoltageElm::setPoints = ->
  super()
  @calcLeads (if (@waveform is VoltageElm.WF_DC or @waveform is VoltageElm.WF_VAR) then 8 else VoltageElm.circleSize * 2)


VoltageElm::draw = (renderContext) ->
  @setBbox @x1, @y2, @x2, @y2

  @updateDotCount()

  if !(@Circuit?.dragElm is this)# && !(@waveform is VoltageElm.WF_DC)
    @drawDots @point1, @lead1, @curcount, renderContext
    @drawDots @point2, @lead2, -@curcount, renderContext

  @draw2Leads(renderContext)

  if @waveform is VoltageElm.WF_DC
    DrawHelper.getPowerColor @getPower, 1
    DrawHelper.interpPoint2 @lead1, @lead2, DrawHelper.ps1, DrawHelper.ps2, 0, 10
    renderContext.drawThickLinePt DrawHelper.ps1, DrawHelper.ps2, DrawHelper.getVoltageColor(@volts[0])

    @setBboxPt @point1, @point2, 16
    DrawHelper.interpPoint2 @lead1, @lead2, DrawHelper.ps1, DrawHelper.ps2, 1, 16
    renderContext.drawThickLinePt DrawHelper.ps1, DrawHelper.ps2, DrawHelper.getVoltageColor(@volts[1])

  else
    @setBboxPt @point1, @point2, VoltageElm.circleSize
    DrawHelper.interpPoint @lead1, @lead2, DrawHelper.ps1, 0.5
    @drawWaveform DrawHelper.ps1, renderContext

  @drawPosts(renderContext)


VoltageElm::drawWaveform = (center, renderContext) ->
  color = (if @needsHighlight() then '0xFF0000')
  
  #g.beginFill();
  #@setPowerColor false
  xc = center.x1
  yc = center.y
  
  # TODO:
  renderContext.fillCircle xc, yc, VoltageElm.circleSize, color
  
  #Main.getMainCanvas().drawThickCircle(xc, yc, circleSize, color);
  wl = 8
  @adjustBbox xc - VoltageElm.circleSize, yc - VoltageElm.circleSize, xc + VoltageElm.circleSize, yc + VoltageElm.circleSize
  xc2 = undefined
  switch @waveform
    when VoltageElm.WF_DC
      break
    when VoltageElm.WF_SQUARE
      xc2 = Math.floor(wl * 2 * @dutyCycle - wl + xc)
      xc2 = Math.max(xc - wl + 3, Math.min(xc + wl - 3, xc2))
      renderContext.drawThickLine xc - wl, yc - wl, xc - wl, yc, color
      renderContext.drawThickLine xc - wl, yc - wl, xc2, yc - wl, color
      renderContext.drawThickLine xc2, yc - wl, xc2, yc + wl, color
      renderContext.drawThickLine xc + wl, yc + wl, xc2, yc + wl, color
      renderContext.drawThickLine xc + wl, yc, xc + wl, yc + wl, color
    when VoltageElm.WF_PULSE
      yc += wl / 2
      renderContext.drawThickLine xc - wl, yc - wl, xc - wl, yc, color
      renderContext.drawThickLine xc - wl, yc - wl, xc - wl / 2, yc - wl, color
      renderContext.drawThickLine xc - wl / 2, yc - wl, xc - wl / 2, yc, color
      renderContext.drawThickLine xc - wl / 2, yc, xc + wl, yc, color
    when VoltageElm.WF_SAWTOOTH
      renderContext.drawThickLine xc, yc - wl, xc - wl, yc, color
      renderContext.drawThickLine xc, yc - wl, xc, yc + wl, color
      renderContext.drawThickLine xc, yc + wl, xc + wl, yc, color
    when VoltageElm.WF_TRIANGLE
      xl = 5
      renderContext.drawThickLine xc - xl * 2, yc, xc - xl, yc - wl, color
      renderContext.drawThickLine xc - xl, yc - wl, xc, yc, color
      renderContext.drawThickLine xc, yc, xc + xl, yc + wl, color
      renderContext.drawThickLine xc + xl, yc + wl, xc + xl * 2, yc, color
      break
    when VoltageElm.WF_AC
      xl = 10
      ox = -1
      oy = -1
      i = -xl
      while i <= xl
        yy = yc + Math.floor(0.95 * Math.sin(i * Math.PI / xl) * wl)
        renderContext.drawThickLine ox, oy, xc + i, yy, color  unless ox is -1
        ox = xc + i
        oy = yy
        i++
      break
  #if true
    #valueString = @frequency
    #@drawValues valueString, VoltageElm.circleSize  if @dx is 0 or @dy is 0

VoltageElm::getVoltageSourceCount = ->
  1

VoltageElm::getPower = ->
  -@getVoltageDiff() * @current

VoltageElm::getVoltageDiff = ->
  @volts[1] - @volts[0]

VoltageElm::getInfo = (arr) ->
  switch @waveform
    when VoltageElm.WF_DC, VoltageElm.WF_VAR
      arr[0] = "voltage source"
    when VoltageElm.WF_AC
      arr[0] = "A/C source"
    when VoltageElm.WF_SQUARE
      arr[0] = "square wave gen"
    when VoltageElm.WF_PULSE
      arr[0] = "pulse gen"
    when VoltageElm.WF_SAWTOOTH
      arr[0] = "sawtooth gen"
    when VoltageElm.WF_TRIANGLE
      arr[0] = "triangle gen"

  arr[1] = "I = " + CircuitComponent.getCurrentText(@getCurrent())
  arr[2] = ((if (this instanceof RailElm) then "V = " else "Vd = ")) + CircuitComponent.getVoltageText(@getVoltageDiff())

  if @waveform isnt VoltageElm.WF_DC and @waveform isnt VoltageElm.WF_VAR
    arr[3] = "f = " + CircuitComponent.getUnitText(@frequency, "Hz")
    arr[4] = "Vmax = " + CircuitComponent.getVoltageText(@maxVoltage)
    i = 5
    unless @bias is 0
      arr[i++] = "Voff = " + @getVoltageText(@bias)
    else arr[i++] = "wavelength = " + CircuitComponent.getUnitText(2.9979e8 / @frequency, "m")  if @frequency > 500
    arr[i++] = "P = " + CircuitComponent.getUnitText(@getPower(), "W")

VoltageElm::getEditInfo = (n) ->
  return new EditInfo((if @waveform is VoltageElm.WF_DC then "Voltage" else "Max Voltage"), @maxVoltage, -20, 20)  if n is 0
  if n is 1
    ei = new EditInfo("Waveform", @waveform, -1, -1)
    ei.choice = new Array()
    ei.choice.push "D/C"
    ei.choice.push "A/C"
    ei.choice.push "Square Wave"
    ei.choice.push "Triangle"
    ei.choice.push "Sawtooth"
    ei.choice.push "Pulse"
    ei.choice.push @waveform
    return ei
  return null  if @waveform is VoltageElm.WF_DC
  return new EditInfo("Frequency (Hz)", @frequency, 4, 500)  if n is 2
  return new EditInfo("DC Offset (V)", @bias, -20, 20)  if n is 3
  return new EditInfo("Phase Offset (degrees)", @phaseShift * 180 / Math.PI, -180, 180).setDimensionless()  if n is 4
  return new EditInfo("Duty Cycle", @dutyCycle * 100, 0, 100).setDimensionless()  if n is 5 and @waveform is VoltageElm.WF_SQUARE

VoltageElm::setEditValue = (n, ei) ->
  @maxVoltage = ei.value  if n is 0
  @bias = ei.value  if n is 3
  if n is 2
    
    # adjust time zero to maintain continuity in the waveform even though the frequency has changed.
    oldfreq = @frequency
    @frequency = ei.value
    maxfreq = 1 / (8 * @Circuit?.timeStep)
    @frequency = maxfreq  if @frequency > maxfreq
    adj = @frequency - oldfreq
    @freqTimeZero = @Circuit?.time - oldfreq * (@Circuit?.time - @freqTimeZero) / @frequency
  if n is 1
    waveform = @waveform
    
    #waveform = ei.choice.getSelectedIndex();
    if @waveform is VoltageElm.WF_DC and waveform isnt VoltageElm.WF_DC
      
      #ei.newDialog = true;
      @bias = 0
    else @waveform isnt VoltageElm.WF_DC and waveform is VoltageElm.WF_DC
    
    #ei.newDialog = true;
    @setPoints()  if (@waveform is VoltageElm.WF_SQUARE or waveform is VoltageElm.WF_SQUARE) and @waveform isnt waveform
  @phaseShift = ei.value * Math.PI / 180  if n is 4
  @dutyCycle = ei.value * 0.01  if n is 5

VoltageElm::toString = ->
  "VoltageElm"



module.exports = VoltageElm
