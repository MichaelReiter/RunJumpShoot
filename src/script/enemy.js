// Generated by CoffeeScript 1.10.0
var Enemy,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Enemy = (function(superClass) {
  extend(Enemy, superClass);

  Enemy.prototype.approachDistance = 150;

  function Enemy() {
    Enemy.__super__.constructor.apply(this, arguments);
  }

  Enemy.prototype.followPlayer = function() {
    if (player.ref.x - this.ref.x > this.approachDistance) {
      console.log("right");
      this.moveRight();
    } else if (player.ref.x - this.ref.x < -this.approachDistance) {
      this.moveLeft();
    } else {
      console.log("idle");
      this.idle();
    }
  };

  return Enemy;

})(Entity);
