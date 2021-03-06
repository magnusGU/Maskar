function Vector(_x, _y) {
    this.x = _x || 0;
    this.y = _y || 0;
}

Vector.prototype = {
    constructor: Vector,

    add: function(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    },

    sub: function(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    },

    scale: function(n) {
        return new Vector(this.x * n, this.y * n);
    },

    floor: function() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }
}