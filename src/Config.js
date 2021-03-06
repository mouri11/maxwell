let default_config = {
  RENDER_STRATEGY: 'canvas',

  CURRENT_TYPE_DOTS: 'DOTS',
  CURENT_TYPE_DOTS: 'DOTS',
  CURRENT_TYPE_DASHES: 'DASHES',
  CURENT_TYPE_DASHES: 'DASHES',

  FRACTIONAL_DIGITS: 2,
  CURRENT_SEGMENT_LENGTH: 16,
  WIRE_POSTS: true,

  // LINE WIDTHS:
  POST_RADIUS: 2.1,
  POST_OUTLINE_SIZE: 0,
  CURRENT_RADIUS: 2,
  CURRENT_COLOR: 'rgba(255, 255, 255, 0.7)',
  LINE_WIDTH: 2,
  POLY_LINE_WIDTH: 1,
  BOLD_LINE_WIDTH: 4,

  // GRID
  GRID_SIZE: 8,

  SHOW_VALUES: false,

  TEXT_STROKE_COLOR: '#FFF',

  CURRENT_DISPLAY_TYPE: 'DASHES',

  SELECT_COLOR: '#573400',
  HIGHLIGHT_COLOR: '#FF4500',

  LIGHT_POST_COLOR: '#333',
  POST_COLOR: '#000',
  OUTLINE_COLOR: '#666',
  POST_SELECT_COLOR: '#FF8C00',
  POST_SELECT_OUTLINE_COLOR: '#F0F',

  DOTS_COLOR: '#FF0',
  DOTS_OUTLINE: '#FFA500',

  CHIP_OUTLINE_WIDTH: 0,

  TEXT_COLOR: '#000',
  TEXT_ERROR_COLOR: '#F00',
  TEXT_WARNING_COLOR: '#FF0',

  TEXT_SIZE: 7.5,
  FONT: 'MONACO',
  TEXT_STYLE: 'BOLD',
  LABEL_COLOR: '#0000CD',
  PIN_LABEL_COLOR: '#444',
  SECONDARY_COLOR: '#777',

  SELECTION_MARQUEE_COLOR: '#FFA500',

  GREY: '#666',
  GRAY: '#666',

  COMPONENT_DECIMAL_PLACES: 1,

  GRID_COLOR: '#F0F',
  SWITCH_COLOR: '#666',
  FILL_COLOR: '#FFF',
  BG_COLOR: '#FFF',
  FG_COLOR: '#FFF',
  STROKE_COLOR: '#000',
  ERROR_COLOR: '#8B0000',
  WARNING_COLOR: '#FFA500',

  'Gradients': {
    'voltage_default': ["#FF0000", "#F40000", "#EA0000", "#E00000", "#D60000", "#CC0000", "#C10000", "#B70000", "#AD0000", "#A30000", "#990000", "#8E0000", "#840000", "#7A0000", "#700000", "#660000", "#5B0000", "#510000", "#470000", "#3D0000", "#320000", "#280000", "#1E0000", "#140000", "#0A0000", "#000000", "#000700", "#000F00", "#001700", "#001F00", "#002700", "#002F00", "#003600", "#003E00", "#004600", "#004E00", "#005600", "#005E00", "#006500", "#006D00", "#007500", "#007D00", "#008500", "#008D00", "#009400", "#009C00", "#00A400", "#00AC00", "#00B400", "#00BC00", "#00C400"],
    'power_default': ["#00FFFF", "#00F4F4", "#00EAEA", "#00E0E0", "#00D6D6", "#00CCCC", "#00C1C1", "#00B7B7", "#00ADAD", "#00A3A3", "#009999", "#008E8E", "#008484", "#007A7A", "#007070", "#006666", "#005B5B", "#005151", "#004747", "#003D3D", "#003232", "#002828", "#001E1E", "#001414", "#000A0A", "#000000", "#0A000A", "#140014", "#1E001E", "#280028", "#330033", "#3D003D", "#470047", "#510051", "#5B005B", "#660066", "#700070", "#7A007A", "#840084", "#8E008E", "#990099", "#A300A3", "#AD00AD", "#B700B7", "#C100C1", "#CC00CC", "#D600D6", "#E000E0", "#EA00EA", "#F400F4", "#FF00FF"]
  }

};

module.exports = default_config;
