// Generated by CoffeeScript 1.10.0
var InputManager;

InputManager = (function() {
  InputManager.prototype.Buttons = {
    left: false,
    right: false,
    jump: false,
    shoot: false
  };

  function InputManager() {
    this.keyboard = game.input.keyboard.createCursorKeys();
    this.spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.button_left = game.add.sprite(0, game.world.height - 320, 'button_left');
    this.button_right = game.add.sprite(160, game.world.height - 320, 'button_right');
    this.button_jump = game.add.sprite(320, game.world.height - 320, 'button_jump');
    this.button_shoot = game.add.sprite(480, game.world.height - 320, 'button_shoot');
    this.button_left.inputEnabled = true;
    this.button_right.inputEnabled = true;
    this.button_jump.inputEnabled = true;
    this.button_shoot.inputEnabled = true;
    this.button_left.fixedToCamera = true;
    this.button_right.fixedToCamera = true;
    this.button_jump.fixedToCamera = true;
    this.button_shoot.fixedToCamera = true;
  }

  InputManager.prototype.keyboardMovement = function() {
    player.ref.body.velocity.x = 0;
    if (this.keyboard.left.isDown || this.Buttons.left) {
      player.moveLeft();
    } else if (this.keyboard.right.isDown || this.Buttons.right) {
      player.moveRight();
    } else if (player.ref.body.touching.down) {
      player.idle();
    }
    if (player.ref.body.touching.down && (this.keyboard.up.isDown || this.Buttons.jump)) {
      player.jump();
    }
    if (this.keyboard.up.isDown || this.Buttons.jump) {
      player.extendJump();
    }
    if (player.canShoot() && (this.spacebar.isDown || this.Buttons.shoot)) {
      player.shoot();
    }
  };

  InputManager.prototype.buttonMovement = function() {
    this.button_left.events.onInputDown.add(this.buttonSetLeft, this);
    this.button_right.events.onInputDown.add(this.buttonSetRight, this);
    this.button_jump.events.onInputDown.add(this.buttonSetJump, this);
    this.button_shoot.events.onInputDown.add(this.buttonSetShoot, this);
    this.button_left.events.onInputUp.add(this.buttonSetLeftOff, this);
    this.button_right.events.onInputUp.add(this.buttonSetRightOff, this);
    this.button_jump.events.onInputUp.add(this.buttonSetJumpOff, this);
    this.button_shoot.events.onInputUp.add(this.buttonSetShootOff, this);
  };

  InputManager.prototype.buttonSetLeft = function() {
    this.Buttons.left = true;
  };

  InputManager.prototype.buttonSetRight = function() {
    this.Buttons.right = true;
  };

  InputManager.prototype.buttonSetJump = function() {
    this.Buttons.jump = true;
  };

  InputManager.prototype.buttonSetShoot = function() {
    this.Buttons.shoot = true;
  };

  InputManager.prototype.buttonSetLeftOff = function() {
    this.Buttons.left = false;
  };

  InputManager.prototype.buttonSetRightOff = function() {
    this.Buttons.right = false;
  };

  InputManager.prototype.buttonSetJumpOff = function() {
    this.Buttons.jump = false;
  };

  InputManager.prototype.buttonSetShootOff = function() {
    this.Buttons.shoot = false;
  };

  return InputManager;

})();
