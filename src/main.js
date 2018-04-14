//Global variables
const physics = new Physics();
const map = new Map(800,600);

var canvas = new Canvas(document.getElementById("map")); 

function main() {
    var b = new Bazooka();

    var proj = b.use(
        new Vector(100, 600), 
        new Vector(0,0), 
        1.0
    );
    
    setInterval(() => game(proj), 1000);
}

function game(proj) {
    canvas.show(map);
    proj.update((pos, size = 10) => canvas.queueSquare(pos.sub(new Vector(size/2,size/2)), size, 4));
    console.log(proj.position.y);
    //console.log("hej");
}

main(canvas);
