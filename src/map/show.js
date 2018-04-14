function Pixel (_pos, _color) {
    this.pos = _pos;
    this.color = _color;
    return this;
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

Canvas.prototype.getColor = function (n) {
    
    switch(n) {
    case 0: return Color(255,255,255,255);
    case 1: return Color(255,0,0,255);
    case 2: return Color(0,0,255,255);
    case 3: return Color(0,255,0,255);
    case 4: return Color(0,255,0,255);
    }

    return Color(255,0,0,255);
};
    
Canvas.prototype.drawMap = function (map) {
    var texture = map.grid;
    for (col = 0; col < texture.length; col++) {
	for(row = 0; row < texture[0].length; row++) {
	    var color = this.getColor(texture[col][row]);
	    this.drawPixel(col, row, color);
	}
    }
}

Canvas.prototype.drawPixel = function (x, y, color) {
    var i = x * 4;
    var j = (this.canvas.height - y - 1) * this.canvas.width * 4;
    this.image.data[i + j] = color.r;
    this.image.data[1 + i + j] = color.g;
    this.image.data[2 + i + j] = color.b;
    this.image.data[3 + i + j] = color.a;
}

Canvas.prototype.drawSquare = function (pos, size, n) {
    for(i = 0; i < size; i++) {
	for(j = 0; j < size; j++){
	    this.drawPixel(pos.x + i, pos.y + j, this.getColor(n));
	}
    }
}

Canvas.prototype.drawCircle = function (pos, radius, n) {
    var startx = (pos.x - radius).clamp(0, pos.x + radius);
    var starty = (pos.y - radius).clamp(0, pos.y + radius);
    
    for(var i = startx; i < (startx + radius*2); i++){
        for(var j = starty; j < (starty + radius*2); j++){
            if(distance(i, j, pos.x, pos.y) < radius){
                this.drawPixel(i, j, this.getColor(n));
            }
        }
    }
}

Canvas.prototype.clearCanvas = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Canvas.prototype.renderCanvas = function() {
    this.context.putImageData(this.image, 0, 0);
}


