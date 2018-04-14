function Physics(_gravity) {
    this.gravity = _gravity || new Vector(0, -0.092);
}

Physics.prototype.constructor = Physics;