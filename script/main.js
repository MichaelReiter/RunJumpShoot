var Buttons, Enemy, Entity, GameResolution, GameWorld, GameplayState, LoadingState, Player, background, bullets, buttonMovement, buttonSetJump, buttonSetJumpOff, buttonSetLeft, buttonSetLeftOff, buttonSetRight, buttonSetRightOff, buttonSetShoot, buttonSetShootOff, button_jump, button_left, button_right, button_shoot, collectStar, collectablesInit, enemy, game, inputInit, keyboard, keyboardMovement, levelInit, main, platforms, player, score, scoreInit, scoreText, spacebar, stars,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

player = null;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    levelInit();
    player = new Player(32, GameResolution.height / 2, 'player');
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER);
    inputInit();
    scoreInit();
    collectablesInit();
  },
  update: function() {
    game.physics.arcade.collide(player.ref, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player.ref, stars, collectStar, null, this);
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
    game.load.spritesheet('enemy', 'img/enemy.png', 39, 34);
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
    this.ref.animations.stop();
    this.ref.frame = 6;
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
  star.destroy();
  score += 10;
  scoreText.text = 'Score: ' + score;
};

enemy = null;

Enemy = (function(superClass) {
  extend(Enemy, superClass);

  function Enemy() {
    return Enemy.__super__.constructor.apply(this, arguments);
  }

  return Enemy;

})(Entity);

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
  button_left.fixedToCamera = true;
  button_right.fixedToCamera = true;
  button_jump.fixedToCamera = true;
  button_shoot.fixedToCamera = true;
};

keyboardMovement = function() {
  player.ref.body.velocity.x = 0;
  if (keyboard.left.isDown || Buttons.left) {
    player.moveLeft();
  } else if (keyboard.right.isDown || Buttons.right) {
    player.moveRight();
  } else if (player.ref.body.touching.down) {
    player.idle();
  }
  if (player.ref.body.touching.down && (keyboard.up.isDown || Buttons.jump)) {
    player.jump();
  }
  if ((game.time.now - player.lastFired) > (1000 / player.fireRate) && (spacebar.isDown || Buttons.shoot)) {
    player.shoot();
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

background = null;

GameWorld = {
  height: GameResolution.height,
  width: 2000
};

levelInit = function() {
  var ground, ledge;
  background = game.add.sprite(0, 0, 'background');
  background.scale.setTo(GameResolution.width, 1);
  platforms = game.add.group();
  platforms.enableBody = true;
  ground = platforms.create(-game.world.height.width / 2, game.world.height - 352, 'platform');
  ground.smoothed = false;
  ground.scale.setTo(10, 1);
  ground.body.immovable = true;
  ground.fixedToCamera = true;
  ledge = platforms.create(400, 470, 'platform');
  ledge.smoothed = false;
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 350, 'platform');
  ledge.smoothed = false;
  ledge.body.immovable = true;
};

bullets = null;

Player = (function(superClass) {
  extend(Player, superClass);

  function Player(x, y, sprite) {
    bullets = game.add.group();
    bullets.enableBody = true;
    Player.__super__.constructor.call(this, x, y, sprite);
  }

  return Player;

})(Entity);

score = 0;

scoreText = null;

scoreInit = function() {
  scoreText = game.add.text(16, 4, 'Score: 0', {
    font: '32px invasion2000',
    fill: '#fff'
  });
  return scoreText.fixedToCamera = true;
};
