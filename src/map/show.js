function Pixel (_pos, _color) {
    this.pos = _pos;
    this.color = _color;
}

function Color (_r,_g,_b,_a) {
    this.data = [_r,_g,_b,_a];
    this.r = data[0];
    this.g = data[1];
    this.b = data[2];
    this.a = data[3];
    return this;
}

function Canvas (_canvas) {
    this.pixels = [];
    this.canvas = _canvas;
    this.context = _canvas.getContext("2d");
    this.image = this.context.createImageData(this.canvas.width, this.canvas.height);    
    this.pixel = this.context.createImageData(1,1);
}

Canvas.prototype.constructor = Canvas;

Canvas.prototype.queuePixel = function (pos, n) {
    this.pixels.push(Pixel(pos, this.getColor(n)));
    canvas.show(map);
}

Canvas.prototype.getColor = function (n) {
    
    switch(n) {
    case 0: return Color(255,255,255,255);
    case 1: return Color(255,0,0,255);
    case 2: return Color(0,0,255,255);
    case 3: return Color(0,255,0,255);
    case 4: return Color(0,0,0,255);
    }

    return Color(255,0,0,255);
};

Canvas.prototype.show = function (map) {
    this.clearCanvas();
    this.loadMap(map);
    this.loadPixels();
    this.resetQueue();
    this.drawCanvas();
};

Canvas.prototype.loadPixels = function () {
    for (i = 0; i < this.pixels.length; i++) {
	var pos = this.pixels[i].pos;
	var i = pos.x * 4;
	var j = (this.canvas.height - pos.y) * this.canvas.height * 4;
	var color = this.pixels[i].color;
	this.image.data[i + j] = color.r;
	this.image.data[1 + i + j] = color.g;
	this.image.data[2 + i + j] = color.b;
	this.image.data[3 + i + j] = color.a;
    }
}

Canvas.prototype.resetQueue = function () {
    this.pixels = [];
}
    
Canvas.prototype.loadMap = function (map) {
    var texture = map.grid;
    for (col = 0; col < texture.length; col++) {
	for(row = 0; row < texture[0].length; row++) {
	    var color = this.getColor(texture[col][texture[0].length - row]);
	    var i = col * 4;
	    var j = row * texture.length * 4;
	    this.image.data[i + j] = color.r;
            this.image.data[1 + i + j] = color.g;
            this.image.data[2 + i + j] = color.b;
	    this.image.data[3 + i + j] = color.a;
	}
    }
}

Canvas.prototype.clearCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Canvas.prototype.drawCanvas = function() {
    this.context.putImageData(this.image, 0, 0);
}


