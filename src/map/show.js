var canvas = new Canvas(document.getElementById("map")); 

function Color (_r,_g,_b,_a) {
    this.data = [_r,_g,_b,_a];
    this.r = data[0];
    this.g = data[1];
    this.b = data[2];
    this.a = data[3];
    return this;
}

function Canvas (_canvas) {
    this.canvas = _canvas;
    this.context = _canvas.getContext("2d");
    this.pixel = new ImageData(1,1);    
}

Canvas.prototype.constructor = Canvas;

Canvas.prototype.putPixel = function (color, x, y) {
    this.pixel.data[0] = color.r;
    this.pixel.data[1] = color.g;
    this.pixel.data[2] = color.b;
    this.pixel.data[3] = color.a;
    this.context.putImageData(this.pixel, x, this.canvas.height - y);
};

Canvas.prototype.getColor = function (n) {
    
    switch(n) {
    case 0: return Color(255,255,255,255);
    case 1: return Color(255,0,0,255);
    case 2: return Color(0,0,255,255);
    case 3: return Color(0,255,0,255);
    }

    return Color(0,0,0,0);
};

Canvas.prototype.show = function (map) {
    var grid = map.grid;
    
    for (i = 0; i < grid.length; i++) {
	for( j = 0; j < grid[i].length; j++) {
	    this.putPixel(this.getColor(grid[i][j]), i, j);
	}    
    } 
};

canvas.putPixel(canvas.getColor(1), 100,100);
