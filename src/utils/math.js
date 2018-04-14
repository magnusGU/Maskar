Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
}
function distance(fromx,fromy,tox,toy) {
  return Math.sqrt(Math.pow(Math.abs(fromx - tox),2) + Math.pow(Math.abs(fromy - toy),2));
}

