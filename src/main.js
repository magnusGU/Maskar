
//Global variables
const physics = new Physics();
const map = new Map(800,600);

var entities = [];
var canvas = new Canvas(document.getElementById("map")); 

console.log(canvas);

function main() {
    var b = new Bazooka();

    var proj = b.use(
        new Vector(100, 600), 
        new Vector(0,0), 
        1.0
    );

    
    entities.push(proj);
    
    setInterval(() => game(), 1000);
}

function game() {
    canvas.clearCanvas();
    canvas.drawMap(map);
    for(i = 0; i < entities.length; i++) {
	entities[i].update();
	entities[i].draw(canvas);
    }
    canvas.renderCanvas();
}

main();
