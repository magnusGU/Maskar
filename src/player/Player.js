function Player(){
    this.worms = [
        new Worm(350, 350, new Bazooka()),
        new Worm(map.grid.sizex/2 - 3,map.grid.sizey/2 + 2, new Bazooka()),
        new Worm(map.grid.sizex/2 - 1,map.grid.sizey/2 + 3, new Bazooka()),
        new Worm(map.grid.sizex/2 + 1,map.grid.sizey/2 + 4, new Bazooka()),
        new Worm(map.grid.sizex/2 + 3,map.grid.sizey/2 + 5, new Bazooka())
    ];
}

Player.prototype.constructor = Player;

Player.prototype.update = function(){
    //Check if any worms are dead and do something with them
    this.worms.forEach(worm => {
        console.log(worm.status);
    });
}