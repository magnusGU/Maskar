function Projectile(_position, _direction, _speed, _mass) {
    this.position = _position;
    //TODO: look into normalizing int vector
    var speed = _speed || 1;
    this.direction = (_direction || new Vector(0, 0)).scale(speed);
    this.mass = _mass || 1;
}

Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function(_draw) {
    //TODO: normalize direction and change speed
    var nextFrame = this.nextFrame();

    this.direction = nextFrame.direction;

    this.position = this.position.add(this.direction.floor());
    _draw(this.position);
    
    return this.position;
}

Projectile.prototype.nextFrame = function() {
    var dir = this.direction.add(physics.gravity.scale(this.mass));
    var pos = this.position.add(dir);

    return {'position': pos, 'direction': dir};
}

Projectile.prototype.hit = function() {
    let nextFrameTravelPath = this.collisionPath();
    //console.log(nextFrameTravelPath.length);
    for(var i = 0; i < nextFrameTravelPath.length; i++) {
        //Check if projectile hits inbetween "frames"
        let hit = this.checkHitPoint(nextFrameTravelPath[i]);
        if(hit.hit)
            return hit;
    }

    return { 'hit': 0, 'hitPosition': new Vector(0, 0)};
}

Projectile.prototype.checkHitPoint = function(_point) {
    if(_point.x < 0 || _point.x > map.sizex || _point.y < 0 || _point.y > map.sizey)
        return { 'hit': -1, 'hitPosition': new Vector(-1,-1)};

    const hit = map.grid[_point.x][_point.y];
    return { 'hit': hit, 'hitPosition': _point };
}

Projectile.prototype.collisionPath = function() {
    var coordinatesArray = new Array();

    var startPos = this.position;
    var endPos = this.position.add(this.nextFrame().direction.floor());
    
    var dx = Math.abs(endPos.x - startPos.x);
    var dy = Math.abs(endPos.y - startPos.y);
    var sx = (startPos.x < endPos.x) ? 1 : -1;
    var sy = (startPos.y < endPos.y) ? 1 : -1;
    var err = dx - dy;

    coordinatesArray.push(new Vector(startPos.x, startPos.y));

    while (!((startPos.x == endPos.x) && (startPos.y == endPos.y))) {
        var e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            startPos.x += sx;
        }
        if (e2 < dx) {
            err += dx;
            startPos.y += sy;
        }   
        coordinatesArray.push(new Vector(startPos.x, startPos.y));
    }

    return coordinatesArray;
}
