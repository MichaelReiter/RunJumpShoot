// Generated by CoffeeScript 1.10.0
var Buttons, buttonMovement, buttonSetJump, buttonSetJumpOff, buttonSetLeft, buttonSetLeftOff, buttonSetRight, buttonSetRightOff, buttonSetShoot, buttonSetShootOff, button_jump, button_left, button_right, button_shoot, inputInit, keyboard, keyboardMovement, spacebar;

keyboard = null;

spacebar = null;

button_left = null;

button_right = null;

button_jump = null;

button_shoot = null;

Buttons = {
  left: false,
  right: false,
  jump: false,
  shoot: false
};

inputInit = function() {
  keyboard = game.input.keyboard.createCursorKeys();
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  button_left = game.add.sprite(0, game.world.height - 320, 'button_left');
  button_right = game.add.sprite(160, game.world.height - 320, 'button_right');
  button_jump = game.add.sprite(320, game.world.height - 320, 'button_jump');
  button_shoot = game.add.sprite(480, game.world.height - 320, 'button_shoot');
  button_left.inputEnabled = true;
  button_right.inputEnabled = true;
  button_jump.inputEnabled = true;
  button_shoot.inputEnabled = true;
};

keyboardMovement = function() {
  player.body.velocity.x = 0;
  if (keyboard.left.isDown || Buttons.left) {
    moveLeft();
  } else if (keyboard.right.isDown || Buttons.right) {
    moveRight();
  } else {
    playerIdle();
  }
  if (player.body.touching.down && (keyboard.up.isDown || Buttons.jump)) {
    jump();
  }
  if ((game.time.now - PlayerVariables.lastFired) > (1000 / PlayerVariables.fireRate) && (spacebar.isDown || Buttons.shoot)) {
    shoot();
  }
};

buttonMovement = function() {
  button_left.events.onInputDown.add(buttonSetLeft, this);
  button_right.events.onInputDown.add(buttonSetRight, this);
  button_jump.events.onInputDown.add(buttonSetJump, this);
  button_shoot.events.onInputDown.add(buttonSetShoot, this);
  button_left.events.onInputUp.add(buttonSetLeftOff, this);
  button_right.events.onInputUp.add(buttonSetRightOff, this);
  button_jump.events.onInputUp.add(buttonSetJumpOff, this);
  button_shoot.events.onInputUp.add(buttonSetShootOff, this);
};

buttonSetLeft = function() {
  Buttons.left = true;
};

buttonSetRight = function() {
  Buttons.right = true;
};

buttonSetJump = function() {
  Buttons.jump = true;
};

buttonSetShoot = function() {
  Buttons.shoot = true;
};

buttonSetLeftOff = function() {
  Buttons.left = false;
};

buttonSetRightOff = function() {
  Buttons.right = false;
};

buttonSetJumpOff = function() {
  Buttons.jump = false;
};

buttonSetShootOff = function() {
  Buttons.shoot = false;
};
