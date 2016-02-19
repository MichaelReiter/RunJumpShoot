// Generated by CoffeeScript 1.10.0
var Enemy,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Enemy = (function(superClass) {
  extend(Enemy, superClass);

  Enemy.prototype.difficultyScale = 0.75;

  Enemy.prototype.approachDeltaX = 175;

  Enemy.prototype.shootDeltaY = 50;

  Enemy.prototype.jumpDeltaY = 100;

  Enemy.prototype.alive = true;

  Enemy.prototype.scoreValue = 100;

  Enemy.prototype.gravity = 300;

  Enemy.prototype.jumpSpeed = 300;

  Enemy.prototype.health = 3;

  function Enemy() {
    this.hit = bind(this.hit, this);
    this.scaleDifficulty();
    Enemy.__super__.constructor.apply(this, arguments);
    this.facePlayer();
  }

  Enemy.prototype.scaleDifficulty = function() {
    this.movementSpeed = player.movementSpeed * this.difficultyScale;
    this.fireRate = player.fireRate * this.difficultyScale / 2;
    return this.bulletSpeed = player.bulletSpeed * this.difficultyScale;
  };

  Enemy.prototype.AI = function() {
    if (this.alive) {
      this.followPlayer();
      this.shootPlayer();
      return this.animate();
    }
  };

  Enemy.prototype.followPlayer = function() {
    if (Math.abs(player.ref.x - this.ref.x) < 3) {
      this.facing = player.facing;
      this.setFacingDirection();
    }
    if (player.ref.x - this.ref.x > this.approachDeltaX) {
      this.moveRight();
    } else if (player.ref.x - this.ref.x < -this.approachDeltaX) {
      this.moveLeft();
    }
    if (this.ref.body.touching.down && (this.ref.y - player.ref.y) > this.jumpDeltaY && Math.random() < 0.05) {
      return this.jump();
    }
  };

  Enemy.prototype.shootPlayer = function() {
    if (Math.abs(player.ref.y - this.ref.y) < this.shootDeltaY && this.canShoot() && this.facingPlayer()) {
      this.lastFired = game.time.now;
      return game.time.events.add(Phaser.Timer.SECOND * 0.5, this.shoot, this);
    }
  };

  Enemy.prototype.facingPlayer = function() {
    return (player.ref.x - this.ref.x > 0 && this.facing === "right") || (player.ref.x - this.ref.x < 0 && this.facing === "left");
  };

  Enemy.prototype.facePlayer = function() {
    if (player.ref.x - this.ref.x > 0 && this.facing !== "right") {
      this.facing = "right";
      return this.ref.scale.x *= -1;
    } else if (player.ref.x - this.ref.x < 0 && this.facing !== "left") {
      this.facing = "left";
      return this.ref.scale.x *= -1;
    }
  };

  Enemy.prototype.hit = function(entity, bullet) {
    this.health--;
    this.hurtTint();
    if (this.health <= 0) {
      this.alive = false;
      entity.destroy();
      scoreManager.increment(this.scoreValue);
    }
    return Enemy.__super__.hit.apply(this, arguments);
  };

  Enemy.prototype.shoot = function() {
    var bullet, i, len, ref, results;
    if (this.alive) {
      Enemy.__super__.shoot.apply(this, arguments);
      ref = this.bullets.children;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        bullet = ref[i];
        results.push(bullet.tint = 0);
      }
      return results;
    }
  };

  return Enemy;

})(Entity);
