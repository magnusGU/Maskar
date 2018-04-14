const physics = new Physics();
const map = new Map(800,600);

function main() {
    map.simpleMap();
    var b = new Bazooka();
    console.log(b.use(new Vector(100, 600), new Vector(0,0)));
}

main();