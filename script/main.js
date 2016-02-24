var Enemy, EnemyManager, Entity, GameResolution, GameWorld, GameplayState, HealthManager, InputManager, LevelManager, LevelSelectState, Levels, LoadingState, MenuState, Player, ScoreManager, collectStar, collectablesInit, currentLevel, enemies, enemyList, enemyManager, game, healthManager, inputManager, levelManager, main, platforms, player, scoreManager, stars,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

player = null;

levelManager = null;

healthManager = null;

scoreManager = null;

inputManager = null;

enemyManager = null;

currentLevel = null;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    levelManager = new LevelManager();
    player = new Player(150, GameWorld.groundHeight, 'player');
    enemyManager = new EnemyManager();
    healthManager = new HealthManager();
    scoreManager = new ScoreManager();
    inputManager = new InputManager();
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    return game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER);
  },
  update: function() {
    var enemy, j, k, len, len1, results;
    game.physics.arcade.collide(player.ref, platforms);
    game.physics.arcade.collide(enemies, platforms);
    game.physics.arcade.collide(enemies, enemies);
    for (j = 0, len = enemyList.length; j < len; j++) {
      enemy = enemyList[j];
      game.physics.arcade.overlap(player.ref, enemy.bullets, player.hit, null, this);
      game.physics.arcade.overlap(enemy.ref, player.bullets, enemy.hit, null, this);
    }
    inputManager.keyboardMovement();
    inputManager.buttonMovement();
    player.animate();
    enemyManager.spawnLoop();
    results = [];
    for (k = 0, len1 = enemyList.length; k < len1; k++) {
      enemy = enemyList[k];
      results.push(enemy.AI());
    }
    return results;
  }
};

LevelSelectState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var background, text, title;
    background = game.add.sprite(0, 0, 'background');
    background.tint = 0x333333;
    title = game.add.text(GameResolution.width / 2, GameResolution.height * 0.25, 'Level Select', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    });
    title.anchor.set(0.5);
    this.levelOne = new Phaser.Button(game, GameResolution.width * 0.2, GameResolution.height * 0.5, 'button_square', this.levelSelected, {
      level: "one"
    }, 0, 0, 1, 0);
    this.levelOne.tint = Levels["one"].tint;
    game.add.existing(this.levelOne);
    text = game.add.text(this.levelOne.x + this.levelOne.width / 2, this.levelOne.y + this.levelOne.height / 2 - 15, '1', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelTwo = new Phaser.Button(game, GameResolution.width * 0.6, GameResolution.height * 0.5, 'button_square', this.levelSelected, {
      level: "two"
    }, 0, 0, 1, 0);
    this.levelTwo.tint = Levels["two"].tint;
    game.add.existing(this.levelTwo);
    text = game.add.text(this.levelTwo.x + this.levelTwo.width / 2, this.levelTwo.y + this.levelTwo.height / 2 - 15, '2', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelThree = new Phaser.Button(game, GameResolution.width * 0.2, GameResolution.height * 0.75, 'button_square', this.levelSelected, {
      level: "three"
    }, 0, 0, 1, 0);
    this.levelThree.tint = Levels["three"].tint;
    game.add.existing(this.levelThree);
    text = game.add.text(this.levelThree.x + this.levelThree.width / 2, this.levelThree.y + this.levelThree.height / 2 - 15, '3', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelFour = new Phaser.Button(game, GameResolution.width * 0.6, GameResolution.height * 0.75, 'button_square', this.levelSelected, {
      level: "four"
    }, 0, 0, 1, 0);
    this.levelFour.tint = Levels["four"].tint;
    game.add.existing(this.levelFour);
    text = game.add.text(this.levelFour.x + this.levelFour.width / 2, this.levelFour.y + this.levelFour.height / 2 - 15, '4', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    return text.anchor.set(0.5);
  },
  update: function() {},
  levelSelected: function() {
    currentLevel = this.level;
    return game.state.start('Gameplay');
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
    game.load.image('heart', 'img/heart.png');
    game.load.spritesheet('button_rectangle', 'img/button_rectangle.png', 384, 128);
    game.load.spritesheet('button_square', 'img/button_square.png', 128, 128);
    game.load.image('button_left', 'img/button_left.png');
    game.load.image('button_right', 'img/button_right.png');
    game.load.image('button_jump', 'img/button_jump.png');
    game.load.image('button_shoot', 'img/button_shoot.png');
    game.load.spritesheet('player', 'img/player.png', 39, 34);
    return game.load.spritesheet('enemy', 'img/enemy.png', 39, 34);
  },
  load: function() {},
  create: function() {
    var loadText;
    this.setScaling();
    loadText = game.add.text(GameResolution.width / 2, GameResolution.height / 3, ' Run!\n Jump!\n Shoot!', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    });
    return game.state.start('Menu');
  },
  update: function() {}
};

MenuState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var background, text, title;
    background = game.add.sprite(0, 0, 'background');
    background.tint = 0x333333;
    title = game.add.text(GameResolution.width / 2, GameResolution.height / 3, ' Run!\n Jump!\n Shoot!', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    });
    title.anchor.set(0.5);
    this.playButton = new Phaser.Button(game, 128, 640, 'button_rectangle', this.playPressed, this, 0, 0, 1, 0);
    this.playButton.tint = 0x999999;
    game.add.existing(this.playButton);
    text = game.add.text(this.playButton.x + this.playButton.width / 2, this.playButton.y + this.playButton.height / 2 - 15, 'Go!', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    return text.anchor.set(0.5);
  },
  update: function() {},
  playPressed: function() {
    return game.state.start('LevelSelect');
  }
};

GameResolution = {
  width: 640,
  height: 960
};

game = null;

main = function() {
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'game');
  game.state.add('Gameplay', GameplayState, false);
  game.state.add('Menu', MenuState, false);
  game.state.add('LevelSelect', LevelSelectState, false);
  return game.state.add('Loading', LoadingState, true);
};

enemies = null;

enemyList = [];

EnemyManager = (function() {
  EnemyManager.prototype.enemyOnScreen = false;

  function EnemyManager() {
    enemies = game.add.group();
    enemies.enableBody = true;
  }

  EnemyManager.prototype.spawn = function(x, y) {
    var enemy;
    this.enemyOnScreen = true;
    enemy = new Enemy(x, y, 'enemy');
    enemies.add(enemy.ref);
    return enemyList.push(enemy);
  };

  EnemyManager.prototype.spawnLoop = function() {
    var i, j, results;
    if (!this.enemyOnScreen) {
      results = [];
      for (i = j = 1; j <= 1; i = ++j) {
        results.push(this.spawn(player.ref.x + i * 200, GameWorld.groundHeight));
      }
      return results;
    }
  };

  return EnemyManager;

})();

Entity = (function() {
  Entity.prototype.movementSpeed = 200;

  Entity.prototype.jumpSpeed = 220;

  Entity.prototype.bulletSpeed = 300;

  Entity.prototype.scale = 2;

  Entity.prototype.facing = "right";

  Entity.prototype.fireRate = 3;

  Entity.prototype.lastFired = 0;

  Entity.prototype.gravity = 500;

  Entity.prototype.health = 3;

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
    return this.setFacingDirection();
  };

  Entity.prototype.moveRight = function() {
    this.facing = "right";
    this.ref.body.velocity.x = this.movementSpeed;
    return this.setFacingDirection();
  };

  Entity.prototype.jump = function() {
    return this.ref.body.velocity.y = -this.jumpSpeed;
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
      if (this.ref.body.velocity.x === 0) {

      } else {
        return this.ref.animations.play('walking');
      }
    } else if (this.ref.body.velocity.y !== 0) {
      return this.ref.animations.play('jumping');
    }
  };

  return Entity;

})();

HealthManager = (function() {
  HealthManager.prototype.heartScale = 0.08;

  function HealthManager() {
    var heart, i, j, ref;
    this.hearts = game.add.group();
    for (i = j = 1, ref = player.health; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      heart = this.hearts.create(GameResolution.width - 60 * i, 15, 'heart');
      heart.scale.setTo(this.heartScale, this.heartScale);
      heart.fixedToCamera = true;
    }
  }

  HealthManager.prototype.loseHealth = function() {
    player.health--;
    if (player.health > 0) {
      return this.hearts.children[player.health].destroy();
    } else {
      enemyList = [];
      return game.state.start('Menu');
    }
  };

  return HealthManager;

})();

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
    this.tintButtons(currentLevel);
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
      return player.shoot();
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
    return this.button_shoot.events.onInputUp.add(this.buttonSetShootOff, this);
  };

  InputManager.prototype.tintButtons = function(level) {
    this.button_left.tint = Levels[level].tint;
    this.button_right.tint = Levels[level].tint;
    this.button_jump.tint = Levels[level].tint;
    return this.button_shoot.tint = Levels[level].tint;
  };

  InputManager.prototype.buttonSetLeft = function() {
    return this.Buttons.left = true;
  };

  InputManager.prototype.buttonSetRight = function() {
    return this.Buttons.right = true;
  };

  InputManager.prototype.buttonSetJump = function() {
    return this.Buttons.jump = true;
  };

  InputManager.prototype.buttonSetShoot = function() {
    return this.Buttons.shoot = true;
  };

  InputManager.prototype.buttonSetLeftOff = function() {
    return this.Buttons.left = false;
  };

  InputManager.prototype.buttonSetRightOff = function() {
    return this.Buttons.right = false;
  };

  InputManager.prototype.buttonSetJumpOff = function() {
    return this.Buttons.jump = false;
  };

  InputManager.prototype.buttonSetShootOff = function() {
    return this.Buttons.shoot = false;
  };

  return InputManager;

})();

platforms = null;

LevelManager = (function() {
  function LevelManager() {
    var background, ground;
    background = game.add.sprite(0, 0, 'background');
    background.scale.setTo(GameResolution.width, 1);
    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(-game.world.height.width / 2, game.world.height - 352, 'platform');
    ground.smoothed = false;
    ground.scale.setTo(10, 1);
    ground.body.immovable = true;
    this.loadLevel(background);
  }

  LevelManager.prototype.createLedge = function(x, y) {
    var ledge;
    ledge = platforms.create(x, y, 'platform');
    ledge.smoothed = false;
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge.body.checkCollision.left = false;
    return ledge.body.checkCollision.right = false;
  };

  LevelManager.prototype.loadLevel = function(background) {
    var j, ledge, len, ref, ref1, x, y;
    ref = Levels[currentLevel].platforms;
    for (j = 0, len = ref.length; j < len; j++) {
      ledge = ref[j];
      ref1 = [ledge[0], ledge[1]], x = ref1[0], y = ref1[1];
      this.createLedge(x, y);
    }
    return this.tintLevel(background);
  };

  LevelManager.prototype.tintLevel = function(background) {
    var j, len, platform, ref, results;
    background.tint = Levels[currentLevel].tint;
    ref = platforms.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      platform = ref[j];
      results.push(platform.tint = Levels[currentLevel].tint);
    }
    return results;
  };

  return LevelManager;

})();

ScoreManager = (function() {
  function ScoreManager() {
    this.score = 0;
    this.scoreText = game.add.text(16, 4, 'Score: 0', {
      font: '32px invasion2000',
      fill: 'white'
    });
    this.scoreText.fixedToCamera = true;
  }

  ScoreManager.prototype.increment = function(amount) {
    this.score += amount;
    return this.scoreText.text = 'Score: ' + this.score;
  };

  return ScoreManager;

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
      enemyManager.enemyOnScreen = false;
      entity.destroy();
      scoreManager.increment(this.scoreValue);
    }
    return Enemy.__super__.hit.apply(this, arguments);
  };

  Enemy.prototype.shoot = function() {
    var bullet, j, len, ref, results;
    if (this.alive) {
      Enemy.__super__.shoot.apply(this, arguments);
      ref = this.bullets.children;
      results = [];
      for (j = 0, len = ref.length; j < len; j++) {
        bullet = ref[j];
        results.push(bullet.tint = 0);
      }
      return results;
    }
  };

  return Enemy;

})(Entity);

GameWorld = {
  height: GameResolution.height,
  width: 2000,
  groundHeight: 608,
  l1: 470,
  l2: 350,
  l3: 230
};

Levels = {
  one: {
    tint: 0x3498db,
    platforms: [[-150, GameWorld.l2], [250, GameWorld.l1], [700, GameWorld.l2], [1100, GameWorld.l3], [1200, GameWorld.l1], [1650, GameWorld.l2]]
  },
  two: {
    tint: 0x2ecc71,
    platforms: [[200, GameWorld.l1], [600, GameWorld.l2], [1000, GameWorld.l3], [1400, GameWorld.l2], [1800, GameWorld.l1], [2200, GameWorld.l2]]
  },
  three: {
    tint: 0xe74c3c,
    platforms: [[200, GameWorld.l1], [600, GameWorld.l2], [1000, GameWorld.l3], [1400, GameWorld.l2], [1800, GameWorld.l1], [2200, GameWorld.l2]]
  },
  four: {
    tint: 0x8e44ad,
    platforms: [[200, GameWorld.l1], [600, GameWorld.l2], [1000, GameWorld.l3], [1400, GameWorld.l2], [1800, GameWorld.l1], [2200, GameWorld.l2]]
  }
};

Player = (function(superClass) {
  extend(Player, superClass);

  function Player() {
    this.hit = bind(this.hit, this);
    return Player.__super__.constructor.apply(this, arguments);
  }

  Player.prototype.jumpExtendFactor = 0;

  Player.prototype.health = 4;

  Player.prototype.hit = function(entity, bullet) {
    healthManager.loseHealth();
    this.hurtTint();
    return Player.__super__.hit.apply(this, arguments);
  };

  Player.prototype.jump = function() {
    Player.__super__.jump.apply(this, arguments);
    return this.jumpExtendFactor = 1;
  };

  Player.prototype.extendJump = function() {
    this.ref.body.velocity.y -= this.jumpSpeed * 0.1 * this.jumpExtendFactor;
    if (this.jumpExtendFactor > 0.1) {
      return this.jumpExtendFactor *= 0.9;
    } else {
      return this.jumpExtendFactor = 0;
    }
  };

  return Player;

})(Entity);
