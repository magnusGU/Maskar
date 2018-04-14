function Player(){
    this.worms = [
        new Worm(1,1, new Bazooka()),
        new Worm(2,2, new Bazooka()),
        new Worm(3,3, new Bazooka()),
        new Worm(4,4, new Bazooka()),
        new Worm(5,5, new Bazooka())
    ];
}

Player.prototype.constructor = Player;