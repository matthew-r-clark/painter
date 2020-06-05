$(() => {
  let brushDiameters = {
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
    linePosition: {},
    brushColor: 'black',
    isDrawing: false,

    handleBrushMovement: function(event) {
      let x = event.offsetX,
          y = event.offsetY;
      this.setBrushPosition(event.clientX, event.clientY);
      if (this.isDrawing) {
        this.setLineEndPosition(x, y);
        if (!this.linePosition.startX) {
          this.setLineStartPosition(x, y);
        }
        this.drawLine();
        this.resetLineStartPosition();
      }
    },

    setLineEndPosition: function(x, y) {
      this.linePosition.endX = x;
      this.linePosition.endY = y;
    },

    setLineStartPosition: function(x, y) {
      this.linePosition.startX = x;
      this.linePosition.startY = y;
    },

    resetLineStartPosition: function() {
      this.linePosition.startX = this.linePosition.endX;
      this.linePosition.startY = this.linePosition.endY;
    },

    drawLine: function() {
      this.context.beginPath();
      this.context.moveTo(this.linePosition.startX, this.linePosition.startY);
      this.context.lineTo(this.linePosition.endX, this.linePosition.endY);
      this.context.strokeStyle = this.brushColor;
      this.context.lineWidth = brushDiameters[this.brushSize] - 2;
      this.context.stroke();
      this.drawCircle();
    },

    drawCircle: function() {
      let x = this.linePosition.endX,
          y = this.linePosition.endY,
          radius = this.getBrushRadius() - 1.5;
      this.context.beginPath();
      this.context.fillStyle = this.brushColor;
      this.context.arc(x, y, radius, 0, 360);
      this.context.fill();
    },

    setBrushPosition: function(x, y) {
      let radius = this.getBrushRadius();
      this.brushPosition = {
        x: x - radius,
        y: y - radius,
      };
      this.displayBrush();
      this.drawBrush();
    },

    getBrushRadius: function() {
      return brushDiameters[this.brushSize] / 2;
    },

    displayBrush: function() {
      this.$brush.toggle(true);
    },

    drawBrush: function() {
      this.changeBrushPosition();
      this.changeBrushColor();
      this.changeBrushSize();
    },

    startDrawing: function() {
      this.isDrawing = true;
      this.context.beginPath();
    },

    stopDrawing: function() {
      this.isDrawing = false;
      this.linePosition.startX = undefined;
      this.linePosition.startY = undefined;
      this.context.save();
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
      let pixels = brushDiameters[this.brushSize];
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
      this.$canvas = $('canvas');
      this.$body = $('body');
      this.$toolbar = $('#toolbar, .brush-size, .brush-color');
      this.$brush = $('#brush');
      this.$brushColors = $('.brush-color');
      this.$brushSizes = $('.brush-size');

      let canvas = document.querySelector('canvas');
      this.context = canvas.getContext('2d');
    },

    bindEvents: function() {
      this.$canvas.mousemove(this.handleBrushMovement.bind(this));
      this.$body.mousedown(this.startDrawing.bind(this));
      this.$body.mouseup(this.stopDrawing.bind(this));
      this.$body.mouseover(this.hideBrush.bind(this));
      this.$toolbar.mouseover(this.hideBrush.bind(this));
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