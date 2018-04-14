function Game(){
    this.once = true;
}

Game.prototype.constructor = Game;

Game.prototype.update = function(){

}

Game.prototype.init = function(){
    //init stuff
    this.player1 = new Player();
    this.player2 = new Player();
}