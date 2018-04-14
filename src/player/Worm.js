var DirEnum = Object.freeze({"right":1, "left":-1});
var statusEnum = Object.freeze({"dead":0, "alive":1})

function Worm(_x, _y, _health, _weapon){
    this.direction = DirEnum.right;
    this.pos = new Vector(_x,_y);
    this.health = _health || 100;
    this.status = statusEnum.alive;
    this.weapon = _weapon;
}

Worm.prototype.constructor = Worm;

Worm.prototype.move = function(_dir){
    console.log("Move");
    if(this.direction !== _dir){
        this.direction = _dir;
    }else {
        this.checkWorldMovement(_dir);
    }
}

Worm.prototype.jump = function(_dir){
    //Jump 
}

Worm.prototype.shoot = function(){
    weapon.shoot();
}

Worm.prototype.checkWorldMovement = function(_dir){
    //Check new position
    var newPos = map.grid[this.pos.x + _dir][this.pos.y];
    // console.log("newPos: " + newPos);
    switch(newPos){
        case 0:
            //valid move, check if falling
            this.pos.add(_dir,0);
            this.fallHandler(_dir);
            break;
        case 1:
        case 3:
            //Ground, first check if pixel above current pos is ground
            if(map.grid[this.pos.x][this.pos.y + 1] == 1){
                //you are in a tunnel, invalid move
                return;
            }
            //then check if slope, currently possible to walk over two pixels high
            if(map.grid[this.pos.x + _dir][this.pos.y + 1] == 1){
                var i = Map.grid[this.pos.x + _dir][this.pos.y + 2];
                if(i == 1 || i == 3){
                    //To high slope or blocking worm, invalid move
                    return;
                }else if(i == 0){
                    //Check edgecase of ground being two pixels above current pos
                    if(map.grid[this.pos.x][this.pos.y + 2] == 1){
                        //Invalid move
                        // 1 0
                        // 0 1
                        // 3 1
                        // 1 1
                        return;
                    }else{
                        //valid move
                        this.pos.add(_dir,0);
                        break;
                    }
                }
            }
            if(map.grid[this.pos.x + _dir][this.pos.y+1] == 0){
                //valid move
                this.pos.add(_dir,0);
                break;
            }
            break;
        case 2:
            //You are surrounded by water, die
            this.health = 0;
            this.status = statusEnum.dead;
        default:
            return;
    }
}

Worm.prototype.fallHandler = function(_dir){
    console.log("Falling");
    //standing on ground or worm
    var atPosUnder = map.grid[this.pos.x][this.pos.y-1];
    if( atPosUnder == 1 ||atPosUnder == 3){
        return;
    }
    //standing on water, drowning
    if(map.grid[this.pos.x][this.pos.y - 1] == 2){
        this.health = 0;
        this.status = statusEnum.dead;
        return;
    }

    var startPos = new Vector(this.pos.x,this.pos.y);

    while(map.grid[this.pos.x][this.pos.y-1] == 0){
        //fall according to gravity, but remember that the while condition requires ints, not floats
        //this.pos.y += physics.gravity.y;
        this.pos.y -= 1;

    }

    //Hit water, die
    if(map.grid[this.pos.x][this.pos.y-1] == 2){
        this.health = 0;
        this.status = statusEnum.dead;
        return;
    }

    //falldamage based on length of fall, 1 damage for every 4 pixels
    if(startPos.y < this.pos.y+4){
        console.log("No falldamage");
        return;
    }else{
        var damage = startPos.y - this.pos.y;
        this.health -= Math.floor(damage/4);
    }

    if(this.health <= 0){
        this.status = statusEnum.dead;
    }
}
