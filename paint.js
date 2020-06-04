$(() => {
  let brushDimensions = {
    large: 17,
    medium: 11,
    small: 5,
  };

  let app = {
    brushSize: 'small',
    brushPosition: {
      x: 0,
      y: 0
    },
    brushColor: 'black',

    setBrushPosition: function(event) {
      let radius = this.getBrushRadius();
      this.brushPosition = {
        x: event.clientX - radius,
        y: event.clientY - radius,
      };
      this.displayBrush();
      this.drawBrush();
    },

    getBrushRadius: function() {
      return brushDimensions[this.brushSize] / 2;
    },

    displayBrush: function() {
      this.$brush.toggle(true);
    },

    drawBrush: function() {
      this.changeBrushPosition();
      this.changeBrushColor();
      this.changeBrushSize();
    },

    changeBrushPosition: function() {
      x = this.pixelsToString(this.brushPosition.x);
      y = this.pixelsToString(this.brushPosition.y);
      this.$brush.css('left', x);
      this.$brush.css('top', y);
    },

    pixelsToString: function(pixels) {
      return String(pixels) + 'px';
    },

    changeBrushColor: function() {
      this.$brush.css('background-color', this.brushColor);
      this.setBrushBorderColor(this.brushColor);
    },

    setBrushBorderColor: function(brushColor) {
      if (brushColor === 'white') {
        this.$brush.css('border', '.25px solid gray');
      } else {
        this.$brush.css('border', 'none');
      }
    },

    changeBrushSize: function() {
      let pixels = brushDimensions[this.brushSize];
      let pixelsString = this.pixelsToString(pixels);
      this.$brush.css('height', pixelsString);
      this.$brush.css('width', pixelsString);
      this.$brush.css('border-radius', pixelsString);
    },

    hideBrush: function(event) {
      if (event.currentTarget === event.target) {
        let $brush = this.$brush
        setTimeout(() => $brush.toggle(false), 0);
      }
    },

    setBrushColor: function(event) {
      let color = this.getColorFromElementId(event.target.id);
      this.brushColor = color;
      this.drawBrush();
    },

    getColorFromElementId: function(id) {
      return this.extractColorOrSizeFromElementId(id);
    },

    extractColorOrSizeFromElementId: function(id) {
      return id.split('-')[1];
    },

    setBrushSize: function(event) {
      let size = this.getSizeFromElementId(event.target.id);
      this.brushSize = size;
      this.drawBrush();
    },

    getSizeFromElementId: function(id) {
      return this.extractColorOrSizeFromElementId(id);
    },

    bindElements: function() {
      this.$brushSizes = $('.brush-size');
      this.$brushColors = $('.brush-color');
      this.$brush = $('#brush');
      this.$canvas = $('canvas');
    },

    bindEvents: function() {
      this.$canvas.mousemove(this.setBrushPosition.bind(this));
      $('body').mouseover(this.hideBrush.bind(this));
      $('#toolbar').mouseover(this.hideBrush.bind(this));
      this.$brush.mousemove(this.displayBrush.bind(this));
      this.$brushColors.click(this.setBrushColor.bind(this));
      this.$brushSizes.click(this.setBrushSize.bind(this));
    },

    init: function() {
      this.bindElements();
      this.bindEvents();
    },
  };

  app.init();
});