// Generated by CoffeeScript 1.10.0
var Entity;

Entity = (function() {
  Entity.prototype.movementSpeed = 200;

  Entity.prototype.jumpSpeed = 300;

  Entity.prototype.bulletSpeed = 300;

  Entity.prototype.scale = 2;

  Entity.prototype.facing = "right";

  Entity.prototype.fireRate = 3;

  Entity.prototype.lastFired = 0;

  Entity.prototype.ref = null;

  function Entity(x, y, sprite) {
    this.ref = game.add.sprite(x, y, sprite);
    this.ref.scale.setTo(this.scale, this.scale);
    this.ref.smoothed = false;
    this.ref.anchor.setTo(.5, 1);
    this.ref.frame = 6;
    game.physics.arcade.enable(this.ref);
    this.ref.body.gravity.y = 300;
    this.ref.body.collideWorldBounds = true;
    this.ref.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true);
    this.ref.animations.add('jumping', [6, 7, 8, 9], 12, true);
  }

  Entity.prototype.moveLeft = function() {
    this.facing = "left";
    this.ref.body.velocity.x = -this.movementSpeed;
    if (this.ref.body.touching.down) {
      this.ref.animations.play('walking');
    }
    if (this.ref.scale.x > 0) {
      this.ref.scale.x *= -1;
    }
  };

  Entity.prototype.moveRight = function() {
    this.facing = "right";
    this.ref.body.velocity.x = this.movementSpeed;
    if (this.ref.body.touching.down) {
      this.ref.animations.play('walking');
    }
    if (this.ref.scale.x < 0) {
      this.ref.scale.x *= -1;
    }
  };

  Entity.prototype.jump = function() {
    this.ref.body.velocity.y = -this.jumpSpeed;
    this.ref.animations.play('jumping');
  };

  Entity.prototype.idle = function() {
    this.ref.body.velocity.x = 0;
    this.ref.animations.stop();
    this.ref.frame = 6;
  };

  Entity.prototype.canShoot = function() {
    return (game.time.now - this.lastFired) > (1000 / this.fireRate);
  };

  Entity.prototype.shoot = function() {
    var projectile, projectileVector;
    this.lastFired = game.time.now;
    if (this.facing === "right") {
      projectile = bullets.create(this.ref.x + 30, this.ref.y - 48, 'bullet');
      projectileVector = this.bulletSpeed;
    } else {
      projectile = bullets.create(this.ref.x - 40, this.ref.y - 48, 'bullet');
      projectileVector = -this.bulletSpeed;
    }
    projectile.scale.setTo(2, 2);
    projectile.body.velocity.x = projectileVector;
    projectile.checkWorldBounds = true;
    projectile.outOfBoundsKill = true;
  };

  return Entity;

})();
