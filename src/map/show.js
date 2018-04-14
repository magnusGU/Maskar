var canvas = new Canvas(document.getElementById("map").element.getContext("2d")); 

function Canvas (_context) {
    this.context = _context;
    this.pixel = this.context.createImageData(1,1);

    
}

Canvas.prototype.colorPixel = function (color) {
    this.pixel.data = color;
};

Canvas.prototype.putPixel = function (pos) {
    this.context.putImageData(this.pixel, pos.x, pos.y);
};

Canvas.prototype.getColor = function (n) {
    
    switch(n) {
    case 0: return [1,1,1,1];
    case 1: return [1,0,0,1];
    case 2: return [0,0,1,1];
    case 3: return [0,1,0,1];
    }

    return [0,0,0,1];
};

Canvas.prototype.show = function (map) {
    var grid = map.grid;
    
    for (i = 0; i < grid.length; i++) {
	for( j = 0; j < grid[i].length; j++) {
	    this.colorPixel(this.getColor(grid[i][j]));
	    this.putPixel(i, j);
	}    
    } 
};
