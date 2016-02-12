var Buttons, GameResolution, GameplayState, LoadingState, PlayerVariables, bullets, buttonMovement, buttonSetJump, buttonSetJumpOff, buttonSetLeft, buttonSetLeftOff, buttonSetRight, buttonSetRightOff, buttonSetShoot, buttonSetShootOff, button_jump, button_left, button_right, button_shoot, collectStar, collectablesInit, game, inputInit, jump, keyboard, keyboardMovement, levelInit, main, moveLeft, moveRight, platforms, player, playerIdle, playerInit, playerMovement, score, scoreInit, scoreText, shoot, spacebar, stars;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    levelInit();
    playerInit();
    inputInit();
    scoreInit();
    collectablesInit();
  },
  update: function() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    keyboardMovement();
    buttonMovement();
  }
};

LoadingState = {
  resizeGame: function() {
    var scale;
    scale = Math.min(window.innerWidth / GameResolution.width, window.innerHeight / GameResolution.height);
    game.scale.setUserScale(scale, scale);
    return game.scale.refresh();
  },
  setScaling: function() {
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setResizeCallback(this.resizeGame, this);
    return this.resizeGame();
  },
  preload: function() {
    game.load.image('background', 'img/background.png');
    game.load.image('platform', 'img/platform.png');
    game.load.image('star', 'img/star.png');
    game.load.image('bullet', 'img/bullet.png');
    game.load.image('button_left', 'img/button_left.png');
    game.load.image('button_right', 'img/button_right.png');
    game.load.image('button_jump', 'img/button_jump.png');
    game.load.image('button_shoot', 'img/button_shoot.png');
    game.load.spritesheet('player', 'img/player.png', 39, 34);
  },
  load: function() {},
  create: function() {
    this.setScaling();
    game.state.start('Gameplay');
  },
  update: function() {}
};

GameResolution = {
  width: 640,
  height: 960
};

game = null;

main = function() {
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'game');
  game.state.add('Gameplay', GameplayState, false);
  return game.state.add('Loading', LoadingState, true);
};

stars = null;

collectablesInit = function() {
  var i, j, star;
  stars = game.add.group();
  stars.enableBody = true;
  for (i = j = 1; j <= 12; i = ++j) {
    star = stars.create(i * 70, 0, 'star');
    star.body.gravity.y = 300;
  }
};

collectStar = function(player, star) {
  star.kill();
  score += 10;
  scoreText.text = 'Score: ' + score;
};

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

platforms = null;

levelInit = function() {
  var ground, ledge;
  game.add.sprite(0, 0, 'background');
  platforms = game.add.group();
  platforms.enableBody = true;
  ground = platforms.create(0, game.world.height - 352, 'platform');
  ground.smoothed = false;
  ground.scale.setTo(2, 1);
  ground.body.immovable = true;
  ledge = platforms.create(400, 470, 'platform');
  ledge.smoothed = false;
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 350, 'platform');
  ledge.smoothed = false;
  ledge.body.immovable = true;
};

player = null;

bullets = null;

PlayerVariables = {
  movementSpeed: 200,
  jumpSpeed: 300,
  bulletSpeed: 300,
  playerScale: 2,
  facing: "right",
  fireRate: 3,
  lastFired: 0
};

playerInit = function() {
  player = game.add.sprite(32, 100, 'player');
  player.scale.setTo(PlayerVariables.playerScale, PlayerVariables.playerScale);
  player.smoothed = false;
  player.anchor.setTo(.5, 1);
  game.physics.arcade.enable(player);
  player.body.gravity.y = 300;
  player.body.collideWorldBounds = true;
  bullets = game.add.group();
  bullets.enableBody = true;
  player.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true);
  player.animations.add('jumping', [6, 7, 8, 9], 12, true);
};

playerMovement = function() {
  player.body.velocity.x = 0;
  if (keyboard.left.isDown) {
    moveLeft();
  } else if (keyboard.right.isDown) {
    moveRight();
  } else {
    playerIdle();
  }
  if (player.body.touching.down && keyboard.up.isDown) {
    jump();
  }
  if ((game.time.now - PlayerVariables.lastFired) > (1000 / PlayerVariables.fireRate) && spacebar.isDown) {
    shoot();
  }
};

moveLeft = function() {
  PlayerVariables.facing = "left";
  player.body.velocity.x = -PlayerVariables.movementSpeed;
  if (player.body.touching.down) {
    player.animations.play('walking');
  }
  if (player.scale.x > 0) {
    player.scale.x *= -1;
  }
};

moveRight = function() {
  PlayerVariables.facing = "right";
  player.body.velocity.x = PlayerVariables.movementSpeed;
  if (player.body.touching.down) {
    player.animations.play('walking');
  }
  if (player.scale.x < 0) {
    player.scale.x *= -1;
  }
};

jump = function() {
  player.body.velocity.y = -PlayerVariables.jumpSpeed;
  player.animations.play('jumping');
};

playerIdle = function() {
  player.animations.stop();
  player.frame = 6;
};

shoot = function() {
  var projectile, projectileVector;
  PlayerVariables.lastFired = game.time.now;
  if (PlayerVariables.facing === "right") {
    projectile = bullets.create(player.x + 30, player.y - 46, 'bullet');
    projectileVector = PlayerVariables.bulletSpeed;
  } else {
    projectile = bullets.create(player.x - 40, player.y - 46, 'bullet');
    projectileVector = -PlayerVariables.bulletSpeed;
  }
  projectile.body.velocity.x = projectileVector;
};

score = 0;

scoreText = null;

scoreInit = function() {
  return scoreText = game.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#fff'
  });
};
