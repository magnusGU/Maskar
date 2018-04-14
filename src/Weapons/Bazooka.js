function Bazooka(_damage, _explosionRadius, _projectileMass) {
    this.damage = _damage || 5;
    this.explosionRadius = _explosionRadius || 1;
    this.projectileMass = _projectileMass || 1.0;
}

Bazooka.prototype.constructor = Bazooka;

Bazooka.prototype.use = function(_position, _direction, _power) {
    var projectile = new Projectile(_position, _direction, _power || 1.0, this.projectileMass);
    
    var hit = projectile.hit();
    while(!hit.hit) {
        projectile.update();
        hit = projectile.hit();
    }

    return hit;
}