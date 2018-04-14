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
}

Canvas.prototype.getColor = function (n) {
    
    switch(n) {
    case 0: return Color(255,255,255,255);
    case 1: return Color(255,0,0,255);
    case 2: return Color(0,0,255,255);
    case 3: return Color(0,255,0,255);
    }

    return Color(255,0,0,255);
};

Canvas.prototype.show = function (map) {
    clear();
    loadMap(map);
    loadPixels();
    draw();
};

Canvas.prototype.loadPixels = function () {
    for (i = 0; i < pixels.length; i++) {
	var pos = pixels[i].pos;
	var color = pixels[i].color;
	this.image.data[pos.x * 4 + pos.y * this.canvas.height * 4] = color.r;
	this.image.data[pos.x * 4 + 1 + pos.y * this.canvas.height * 4] = color.g;
	this.image.data[pos.x * 4 + 2 + pos.y * this.canvas.height * 4] = color.b;
	this.image.data[pos.x * 4 + 3 + pos.y * this.canvas.height * 4] = color.a;
    }
}
    
Canvas.prototype.loadMap = function (map) {
    var texture = map.grid;
    for (col = 0; col < texture.length; col++) {
	for(row = 0; row < texture[0].length; row++) {
	    var color = this.getColor(texture[col][texture[0].length - row]);
	    this.image.data[col * 4 + row * texture.length * 4] = color.r;
            this.image.data[col * 4 + 1 + row * texture.length * 4] = color.g;
            this.image.data[col * 4 + 2 + row * texture.length * 4] = color.b;
	    this.image.data[col * 4 + 3 + row * texture.length * 4] = color.a;
	}
    }
}

Canvas.prototype.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.pixels = [];
}

Canvas.prototype.draw = function() {
    this.context.putImageData(this.image, 0, 0);
}


