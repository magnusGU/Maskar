function Player(){
    this.worms = [
        new Worm(350, 590, 100, new Bazooka()),
        new Worm(map.grid.sizex/2 - 3,map.grid.sizey/2 + 2, 99, new Bazooka()),
        new Worm(map.grid.sizex/2 - 1,map.grid.sizey/2 + 3, 98, new Bazooka()),
        new Worm(map.grid.sizex/2 + 1,map.grid.sizey/2 + 4, 97, new Bazooka()),
        new Worm(map.grid.sizex/2 + 3,map.grid.sizey/2 + 5, 96, new Bazooka())
    ];
}

Player.prototype.constructor = Player;

Player.prototype.update = function(){
    //Check if any worms are dead and do something with them
    this.worms.forEach(worm => {
        console.log(worm.health);
    });
}