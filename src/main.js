//Global variables
const physics = new Physics();
const map = new Map(800,600);

var canvas = new Canvas(document.getElementById("map")); 

function main() {
    
    //var b = new Bazooka();
    //console.log(b.use(new Vector(100, 600), new Vector(0,0)));
    var p = new Player();
    p.worms[0].move(1);
    console.log(p.worms[0].direction);
    setInterval(game, 100);
}

function game() {
    canvas.show(map);
}

main(canvas);
