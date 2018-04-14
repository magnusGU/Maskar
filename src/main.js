//Global variables
const physics = new Physics();
const map = new Map(800,600);

var canvas = new Canvas(document.getElementById("map")); 

function main() {
    var b = new Bazooka();
    b.use(
        new Vector(100, 600), 
        new Vector(0,0), 
        1.0, 
        (pos) => canvas.queuePixel(pos, 4)
    );
    var p = new Player();
    p.worms[0].move(1);
    p.update();
    setInterval(game(), 100);
}

function game() {
    canvas.show(map);
}

main(canvas);
