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

    changeBrushPosition: function(event) {
      this.displayBrush();
      let radius = this.getBrushRadius();
      this.brushPosition = {
        x: event.clientX - radius,
        y: event.clientY - radius,
      };
      this.drawBrush();
    },

    getBrushRadius: function() {
      return brushDimensions[this.brushSize] / 2;
    },

    displayBrush: function() {
      this.$brush.toggle(true);
    },

    hideBrush: function(event) {
      if (event.currentTarget === event.target) {
        let $brush = this.$brush
        setTimeout(() => $brush.toggle(false), 0);
      }
    },

    changeBrushColor: function(event) {
      let color = event.target.id.split('-')[1];
      this.brushColor = color;
      this.drawBrush();
    },

    setBrushBorderColor: function(brushColor) {
      if (brushColor === 'white') {
        this.$brush.css('border', '.25px solid gray');
      } else {
        this.$brush.css('border', 'none');
      }
    },

    changeBrushSize: function(event) {
      let size = event.target.id.split('-')[1];
      this.brushSize = size;
      this.drawBrush();
    },

    applyPaint: function(event) {
      console.log('mouse button: ' + event.button);
    },

    drawBrush: function() {
      this.positionBrush();
      this.setBrushColor();
      this.setBrushSize();
    },

    positionBrush: function() {
      x = this.pixelsToString(this.brushPosition.x);
      y = this.pixelsToString(this.brushPosition.y);
      this.$brush.css('left', x);
      this.$brush.css('top', y);
    },

    setBrushColor: function() {
      this.$brush.css('background-color', this.brushColor);
      this.setBrushBorderColor(this.brushColor);
    },

    setBrushSize: function() {
      let pixels = brushDimensions[this.brushSize];
      let pixelsString = this.pixelsToString(pixels);
      this.$brush.css('height', pixelsString);
      this.$brush.css('width', pixelsString);
      this.$brush.css('border-radius', pixelsString);
    },

    pixelsToString: function(pixels) {
      return String(pixels) + 'px';
    },

    bindElements: function() {
      this.$brushSizes = $('.brush-size');
      this.$brushColors = $('.brush-color');
      this.$brush = $('#brush');
      this.$canvas = $('canvas');
    },

    bindEvents: function() {
      this.$canvas.mousemove(this.changeBrushPosition.bind(this));
      // this.$canvas.click(this.applyPaint.bind(this));
      this.$brush.mousedown(this.applyPaint.bind(this));
      $('body').mouseover(this.hideBrush.bind(this));
      $('#toolbar').mouseover(this.hideBrush.bind(this));
      this.$brush.mousemove(this.displayBrush.bind(this));
      this.$brushColors.click(this.changeBrushColor.bind(this));
      this.$brushSizes.click(this.changeBrushSize.bind(this));
    },

    init: function() {
      this.bindElements();
      this.bindEvents();
    },
  };

  app.init();
});