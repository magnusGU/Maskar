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
    this.image = this.context.createImageData(this.canvas.width, this.canvas.height);    
}

Canvas.prototype.constructor = Canvas;

Canvas.prototype.putPixel = function (color, x, y) {
    this.image.data[0] = color.r;
    this.image.data[1] = color.g;
    this.image.data[2] = color.b;
    this.image.data[3] = color.a;
    this.context.putImageData(this.id, x, this.canvas.height - y);
};

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
    var grid = map.grid;
    for (col = 0; col < grid.length; col++) {
	for(row = 0; row < grid[0].length; row++) {
	    var color = this.getColor(grid[col][grid[0].length - row]);
	    this.image.data[col * 4 + row * grid.length*4] = color.r;
            this.image.data[col * 4 + 1 + row * grid.length*4] = color.g;
            this.image.data[col * 4 + 2 + row * grid.length*4] = color.b;
	    this.image.data[col * 4 + 3 + row * grid.length*4] = color.a;
	}
    }

    this.context.putImageData(this.image, 0, 0);
};
