// Generated by CoffeeScript 1.10.0
var Entity;

Entity = (function() {
  Entity.prototype.movementSpeed = 200;

  Entity.prototype.jumpSpeed = 220;

  Entity.prototype.bulletSpeed = 300;

  Entity.prototype.scale = 2;

  Entity.prototype.facing = "right";

  Entity.prototype.fireRate = 3;

  Entity.prototype.lastFired = 0;

  Entity.prototype.gravity = 500;

  function Entity(x, y, sprite) {
    this.ref = game.add.sprite(x, y, sprite);
    this.ref.scale.setTo(this.scale, this.scale);
    this.ref.smoothed = false;
    this.ref.anchor.setTo(.5, 1);
    this.ref.frame = 6;
    game.physics.arcade.enable(this.ref);
    this.ref.body.gravity.y = this.gravity;
    this.ref.body.collideWorldBounds = true;
    this.ref.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true);
    this.ref.animations.add('jumping', [7, 8, 9], 12, true);
    this.bullets = game.add.group();
    this.bullets.enableBody = true;
  }

  Entity.prototype.moveLeft = function() {
    this.facing = "left";
    this.ref.body.velocity.x = -this.movementSpeed;
    if (this.ref.body.touching.down) {
      this.ref.animations.play('walking');
    }
    return this.setFacingDirection();
  };

  Entity.prototype.moveRight = function() {
    this.facing = "right";
    this.ref.body.velocity.x = this.movementSpeed;
    if (this.ref.body.touching.down) {
      this.ref.animations.play('walking');
    }
    return this.setFacingDirection();
  };

  Entity.prototype.jump = function() {
    this.ref.body.velocity.y = -this.jumpSpeed;
    return this.ref.animations.play('jumping');
  };

  Entity.prototype.idle = function() {
    this.ref.body.velocity.x = 0;
    this.ref.animations.stop();
    return this.ref.frame = 6;
  };

  Entity.prototype.setFacingDirection = function() {
    if (this.facing === "right" && this.ref.scale.x < 0) {
      return this.ref.scale.x *= -1;
    } else if (this.facing === "left" && this.ref.scale.x > 0) {
      return this.ref.scale.x *= -1;
    }
  };

  Entity.prototype.canShoot = function() {
    return (game.time.now - this.lastFired) > (1000 / this.fireRate);
  };

  Entity.prototype.shoot = function() {
    var projectile, projectileVector;
    this.lastFired = game.time.now;
    if (this.facing === "right") {
      projectile = this.bullets.create(this.ref.x + 30, this.ref.y - 48, 'bullet');
      projectileVector = this.bulletSpeed;
    } else {
      projectile = this.bullets.create(this.ref.x - 40, this.ref.y - 48, 'bullet');
      projectileVector = -this.bulletSpeed;
    }
    projectile.scale.setTo(this.scale, this.scale);
    projectile.body.velocity.x = projectileVector;
    projectile.checkWorldBounds = true;
    return projectile.outOfBoundsKill = true;
  };

  Entity.prototype.hit = function(entity, bullet) {
    return bullet.destroy();
  };

  Entity.prototype.hurtTint = function() {
    this.ref.tint = 0xff0000;
    return game.time.events.add(Phaser.Timer.SECOND * 0.05, this.resetTint, this);
  };

  Entity.prototype.resetTint = function() {
    return this.ref.tint = 0xffffff;
  };

  Entity.prototype.animate = function() {
    if (this.ref.body.touching.down) {
      if (this.ref.body.velocity.x !== 0) {
        return this.ref.animations.play('walking');
      }
    } else if (this.ref.body.velocity.y !== 0) {
      return this.ref.animations.play('jumping');
    }
  };

  return Entity;

})();
