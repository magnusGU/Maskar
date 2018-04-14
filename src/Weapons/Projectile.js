function Projectile(_position, _direction, _speed) {
    this.position = _position;
    //TODO: look into normalizing int vector
    this.direction = _direction;
    this.speed = _speed || 1;
}

Projectile.prototype.constructor = Projectile;

Projectile.prototype.getNextPosition = function() {
    this.position = this.position.add(new Vector(this.direction.x * this.speed, this.direction.y * this.speed));
    
    return this.position;
}

Projectile.prototype.hit = function(_map) {
    var nextFrameTravelPath = this.collisionPath();
    for(var i = 0; i < nextFrameTravelPath.length; i++) {
        //Check if projectile hits inbetween "frames"
        var hit = hit(nextFrameTravelPath[i]);
        if(hit.hit)
            return hit;
    }

    return { 'hit': 0, 'hitPosition': new Vector(0, 0)};
}

Projectile.prototype.checkHitPoint = function(_point, _map) {
    const hit = _map.grid[_point.x][_point.y];
    return { 'hit': hit, 'hitPosition': _point };
}

Projectile.prototype.collisionPath = function() {
    var coordinatesArray = new Array();

    var startPos = this.position;
    var endPos = this.position.add(this.direction);

    var dx = Math.abs(endPos.x - startPos.x);
    var dy = Math.abs(endPos.y - startPos.y);
    var sx = (startPos.x < endPos.x) ? 1 : -1;
    var sy = (startPos.y < endPos.y) ? 1 : -1;
    var err = dx - dy;

    coordinatesArray.push(new Vector(startPos.y, startPos.x));

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

      coordinatesArray.push(new Vector(startPos.y, startPos.x));
    }

    return coordinatesArray;
}