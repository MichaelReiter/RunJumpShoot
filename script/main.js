var AudioManager, EffectsManager, Enemy, EnemyManager, Entity, Explosion, GameResolution, GameWorld, GameplayState, HealthManager, Heart, InputManager, Invincible, LevelManager, LevelSelectState, Levels, LoadingState, MenuState, Player, Powerup, PowerupManager, RapidFire, ScoreManager, Shell, SuperJump, SuperSpeed, audioManager, currentLevel, effectsManager, enemies, enemyList, enemyManager, game, healthManager, inputManager, levelManager, main, music, platforms, player, powerupList, powerupManager, powerups, scoreManager,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

EffectsManager = (function() {
  function EffectsManager() {
    this.shells = game.add.group();
    this.shells.enableBody = true;
  }

  return EffectsManager;

})();

player = null;

levelManager = null;

healthManager = null;

scoreManager = null;

inputManager = null;

enemyManager = null;

powerupManager = null;

effectsManager = null;

audioManager = null;

currentLevel = null;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    levelManager = new LevelManager();
    player = new Player(150, GameWorld.groundHeight);
    enemyManager = new EnemyManager();
    healthManager = new HealthManager();
    scoreManager = new ScoreManager();
    inputManager = new InputManager();
    audioManager = new AudioManager();
    powerupManager = new PowerupManager();
    effectsManager = new EffectsManager();
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    return game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER);
  },
  update: function() {
    var enemy, j, k, l, len, len1, len2, powerup, random1, random2;
    game.physics.arcade.collide(player.ref, platforms);
    game.physics.arcade.collide(enemies, platforms);
    game.physics.arcade.collide(powerups, platforms);
    game.physics.arcade.collide(effectsManager.shells, platforms);
    for (j = 0, len = powerupList.length; j < len; j++) {
      powerup = powerupList[j];
      powerup.checkCollisions();
    }
    for (k = 0, len1 = enemyList.length; k < len1; k++) {
      enemy = enemyList[k];
      if (enemy != null) {
        game.physics.arcade.overlap(player.ref, enemy.bullets, player.hit, null, this);
        game.physics.arcade.overlap(enemy.ref, player.bullets, enemy.hit, null, this);
      }
    }
    inputManager.keyboardMovement();
    inputManager.buttonMovement();
    player.animate();
    for (l = 0, len2 = enemyList.length; l < len2; l++) {
      enemy = enemyList[l];
      enemy.AI();
    }
    if (GameWorld.shake > 0) {
      random1 = game.rnd.integerInRange(-GameWorld.shakeMagnitude, GameWorld.shakeMagnitude);
      random2 = game.rnd.integerInRange(-GameWorld.shakeMagnitude, GameWorld.shakeMagnitude);
      game.world.setBounds(random1, random2, GameWorld.width + random1, GameWorld.height + random2);
      GameWorld.shake--;
      if (GameWorld.shake === 0) {
        game.world.setBounds(0, 0, GameWorld.width, GameWorld.height);
        return GameWorld.shakeMagnitude = 1.75;
      }
    }
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
      level: 'one'
    }, 0, 0, 1, 0);
    this.levelOne.tint = Levels['one'].tint;
    game.add.existing(this.levelOne);
    text = game.add.text(this.levelOne.x + this.levelOne.width / 2, this.levelOne.y + this.levelOne.height / 2 - 15, '1', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelTwo = new Phaser.Button(game, GameResolution.width * 0.6, GameResolution.height * 0.5, 'button_square', this.levelSelected, {
      level: 'two'
    }, 0, 0, 1, 0);
    this.levelTwo.tint = Levels['two'].tint;
    game.add.existing(this.levelTwo);
    text = game.add.text(this.levelTwo.x + this.levelTwo.width / 2, this.levelTwo.y + this.levelTwo.height / 2 - 15, '2', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelThree = new Phaser.Button(game, GameResolution.width * 0.2, GameResolution.height * 0.75, 'button_square', this.levelSelected, {
      level: 'three'
    }, 0, 0, 1, 0);
    this.levelThree.tint = Levels['three'].tint;
    game.add.existing(this.levelThree);
    text = game.add.text(this.levelThree.x + this.levelThree.width / 2, this.levelThree.y + this.levelThree.height / 2 - 15, '3', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    text.anchor.set(0.5);
    this.levelFour = new Phaser.Button(game, GameResolution.width * 0.6, GameResolution.height * 0.75, 'button_square', this.levelSelected, {
      level: 'four'
    }, 0, 0, 1, 0);
    this.levelFour.tint = Levels['four'].tint;
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
    game.load.image('bricks', 'img/bricks.png');
    game.load.image('platform', 'img/platform.png');
    game.load.image('bullet', 'img/player_bullet.png');
    game.load.spritesheet('heart', 'img/heart.png', 44, 38, 2);
    game.load.image('powerup', 'img/powerup.png');
    game.load.image('shell', 'img/shell.png');
    game.load.spritesheet('button_rectangle', 'img/button_rectangle.png', 384, 128);
    game.load.spritesheet('button_square', 'img/button_square.png', 128, 128);
    game.load.image('button_left', 'img/button_left.png');
    game.load.image('button_right', 'img/button_right.png');
    game.load.image('button_jump', 'img/button_jump.png');
    game.load.image('button_shoot', 'img/button_shoot.png');
    game.load.spritesheet('player', 'img/player.png', 39, 34);
    game.load.spritesheet('enemy', 'img/enemy.png', 39, 34);
    game.load.spritesheet('explosion', 'img/explosion.png', 33, 32);
    game.load.audio('music', 'audio/music.wav');
    game.load.audio('explosion', 'audio/explosion.wav');
    game.load.audio('jump', 'audio/jump.wav');
    game.load.audio('shot', 'audio/shot.wav');
    game.load.audio('enemyShot', 'audio/enemyShot.wav');
    game.load.audio('hit', 'audio/hit.wav');
    game.load.audio('powerup', 'audio/powerup.wav');
    return game.load.audio('spawn', 'audio/spawn.wav');
  },
  load: function() {},
  create: function() {
    this.setScaling();
    return game.state.start('Menu');
  },
  update: function() {}
};

MenuState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var background, highscore, text, title;
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
    text.anchor.set(0.5);
    highscore = game.add.text(GameResolution.width * 0.5, GameResolution.height * 0.9, 'High Score: ' + window.localStorage['highscore'] || 0, {
      font: '32px invasion2000',
      fill: 'white',
      align: 'center'
    });
    return highscore.anchor.set(0.5);
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

music = null;

main = function() {
  var playMusic;
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'game');
  game.state.add('Gameplay', GameplayState, false);
  game.state.add('Menu', MenuState, false);
  game.state.add('LevelSelect', LevelSelectState, false);
  game.state.add('Loading', LoadingState, true);
  playMusic = function() {
    return music.play();
  };
  setInterval(function() {
    playMusic();
  }, 12437);
  return setTimeout(function() {
    music = game.add.audio('music');
    playMusic();
  }, 50);
};

GameWorld = {
  height: GameResolution.height,
  width: 2000,
  groundHeight: 608,
  l1: 470,
  l2: 350,
  l3: 230,
  shake: 0,
  shakeMagnitude: 1.75,
  musicIsPlaying: false,
  screenshake: function(magnitude, duration) {
    this.shakeMagnitude = magnitude;
    return this.shake = duration;
  }
};

Powerup = (function() {
  Powerup.prototype.gravity = 500;

  Powerup.prototype.tint = 0xffffff;

  function Powerup(x, y) {
    this.ref = game.add.sprite(x, y, 'powerup');
    this.ref.scale.setTo(player.scale, player.scale);
    this.ref.smoothed = false;
    this.ref.tint = this.tint;
    game.physics.arcade.enable(this.ref);
    this.ref.body.gravity.y = this.gravity;
    this.ref.body.collideWorldBounds = true;
    powerups.add(this.ref);
    powerupList.push(this);
  }

  Powerup.prototype.collected = function(entity, powerup) {
    powerup.destroy();
    powerupManager.powerupsOnScreen--;
    return audioManager.playSound('powerup');
  };

  Powerup.prototype.checkCollisions = function() {
    return game.physics.arcade.overlap(player.ref, this.ref, this.collected, null, this);
  };

  return Powerup;

})();

AudioManager = (function() {
  function AudioManager() {
    this.music = game.add.audio('music');
    this.explosion = game.add.audio('explosion');
    this.jump = game.add.audio('jump');
    this.shot = game.add.audio('shot');
    this.enemyShot = game.add.audio('enemyShot');
    this.hit = game.add.audio('hit');
    this.powerup = game.add.audio('powerup');
    this.spawn = game.add.audio('spawn');
  }

  AudioManager.prototype.playSound = function(sound) {
    switch (sound) {
      case 'explosion':
        return this.explosion.play();
      case 'jump':
        return this.jump.play();
      case 'shot':
        return this.shot.play();
      case 'enemyShot':
        return this.enemyShot.play();
      case 'hit':
        return this.hit.play();
      case 'powerup':
        return this.powerup.play();
      case 'spawn':
        return this.spawn.play();
    }
  };

  AudioManager.prototype.playMusic = function() {
    return this.music.play();
  };

  AudioManager.prototype.stopPlayingMusic = function() {
    return this.music.stop();
  };

  return AudioManager;

})();

enemies = null;

enemyList = [];

EnemyManager = (function() {
  EnemyManager.prototype.maxEnemies = 15;

  function EnemyManager() {
    this.enemiesOnScreen = 0;
    enemies = game.add.group();
    enemies.enableBody = true;
    switch (currentLevel) {
      case 'one':
        this.spawnFrequency = 3;
        break;
      case 'two':
        this.spawnFrequency = 2.5;
        break;
      case 'three':
        this.spawnFrequency = 2;
        break;
      case 'four':
        this.spawnFrequency = 1.5;
    }
    game.time.events.loop(Phaser.Timer.SECOND * this.spawnFrequency, this.spawnWrapper, this);
  }

  EnemyManager.prototype.spawn = function(x, y) {
    var enemy;
    this.enemiesOnScreen++;
    enemy = new Enemy(x, y);
    enemies.add(enemy.ref);
    enemyList.push(enemy);
    return audioManager.playSound('spawn');
  };

  EnemyManager.prototype.spawnWrapper = function() {
    var x, y;
    if (this.enemiesOnScreen < this.maxEnemies) {
      x = Math.floor(Math.random() * (player.ref.x + 300) + player.ref.x - 300);
      while (Math.abs(player.ref.x - x) <= 175) {
        x = Math.floor(Math.random() * (player.ref.x + 300) + player.ref.x - 300);
      }
      y = Math.floor(Math.random() * (GameWorld.groundHeight - 1000) + GameWorld.groundHeight - 100);
      new Explosion(x - 60, y - 95, 0xffffff, player.scale * 1.5, 10);
      return this.spawn(x, y);
    }
  };

  return EnemyManager;

})();

Entity = (function() {
  Entity.prototype.movementSpeed = 250;

  Entity.prototype.jumpSpeed = 220;

  Entity.prototype.bulletSpeed = 900;

  Entity.prototype.scale = 2;

  Entity.prototype.facing = 'right';

  Entity.prototype.fireRate = 10;

  Entity.prototype.lastFired = 0;

  Entity.prototype.gravity = 500;

  Entity.prototype.health = 5;

  Entity.prototype.knockback = 5;

  Entity.prototype.accuracy = 0;

  Entity.prototype.alive = true;

  Entity.prototype.isShooting = false;

  Entity.prototype.shootingKnockbackSpeed = 50;

  Entity.prototype.resetTintValue = 0xffffff;

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
    this.facing = 'left';
    if (this.ref.body != null) {
      this.ref.body.velocity.x = -this.movementSpeed;
      return this.setFacingDirection();
    }
  };

  Entity.prototype.moveRight = function() {
    this.facing = 'right';
    if (this.ref.body != null) {
      this.ref.body.velocity.x = this.movementSpeed;
      return this.setFacingDirection();
    }
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
    if (this.facing === 'right' && this.ref.scale.x < 0) {
      return this.ref.scale.x *= -1;
    } else if (this.facing === 'left' && this.ref.scale.x > 0) {
      return this.ref.scale.x *= -1;
    }
  };

  Entity.prototype.canShoot = function() {
    return (game.time.now - this.lastFired) > (1000 / this.fireRate);
  };

  Entity.prototype.shoot = function() {
    var projectile, projectileVector, sign;
    this.lastFired = game.time.now;
    if (this.facing === 'right') {
      projectile = this.bullets.create(this.ref.x + 30, this.ref.y - 50, 'bullet');
      projectileVector = this.bulletSpeed;
    } else {
      projectile = this.bullets.create(this.ref.x - 30, this.ref.y - 50, 'bullet');
      projectileVector = -this.bulletSpeed;
    }
    projectile.scale.setTo(this.scale, this.scale);
    projectile.smoothed = false;
    projectile.body.velocity.x = projectileVector;
    projectile.body.velocity.y = Math.random() * this.accuracy;
    if (Math.floor(Math.random() * 2) === 1) {
      sign = 1;
    } else {
      sign = -1;
    }
    projectile.body.velocity.y *= sign;
    projectile.checkWorldBounds = true;
    projectile.outOfBoundsKill = true;
    if (this.facing === 'left') {
      projectile.scale.x *= -1;
    }
    return projectile;
  };

  Entity.prototype.hit = function(entity, bullet) {
    var sign;
    sign = bullet.body.velocity.x / Math.abs(bullet.body.velocity.x);
    this.ref.x += sign * this.knockback;
    bullet.destroy();
    return audioManager.playSound('hit');
  };

  Entity.prototype.hurtTint = function() {
    this.ref.tint = 0xff0000;
    return game.time.events.add(Phaser.Timer.SECOND * 0.05, this.resetTint, this);
  };

  Entity.prototype.resetTint = function() {
    return this.ref.tint = this.resetTintValue;
  };

  Entity.prototype.animate = function() {
    if (this.ref.body.touching.down) {
      if (this.ref.body.velocity.x !== 0) {
        if (this.isShooting && ((this.ref.body.velocity.x > 0 && this.facing === 'left') || (this.ref.body.velocity.x < 0 && this.facing === 'right'))) {
          if (Math.abs(this.ref.body.velocity.x) < this.movementSpeed - this.shootingKnockbackSpeed) {
            this.ref.animations.stop();
            return this.ref.frame = 6;
          } else {
            return this.ref.animations.play('walking');
          }
        } else {
          return this.ref.animations.play('walking');
        }
      } else {
        this.ref.animations.stop();
        return this.ref.frame = 6;
      }
    } else if (this.ref.body.velocity.y !== 0) {
      return this.ref.animations.play('jumping');
    }
  };

  return Entity;

})();

Explosion = (function() {
  function Explosion(x, y, tint, scale, magnitude) {
    this.ref = game.add.sprite(x, y, 'explosion');
    this.ref.tint = tint;
    this.ref.scale.setTo(scale, scale);
    this.ref.smoothed = false;
    this.ref.animations.add('boom', [0, 1, 2], 12, false);
    this.ref.animations.play('boom');
    game.physics.arcade.enable(this.ref);
    this.ref.body.collideWorldBounds = true;
    GameWorld.screenshake(magnitude, 10);
    game.time.events.add(Phaser.Timer.SECOND * 0.3, this.selfdestruct, this);
  }

  Explosion.prototype.selfdestruct = function() {
    return this.ref.destroy();
  };

  return Explosion;

})();

HealthManager = (function() {
  HealthManager.prototype.tint = 0x666666;

  function HealthManager() {
    var i, j, ref;
    this.hearts = game.add.group();
    this.hearts.fixedToCamera = true;
    this.hearts.smoothed = false;
    for (i = j = 1, ref = player.health; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
      this.hearts.create(GameResolution.width - 60 * i, 15, 'heart');
    }
  }

  HealthManager.prototype.updateHealthUI = function() {
    var i, j, ref, results;
    results = [];
    for (i = j = 0, ref = this.hearts.children.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
      if (player.health > i) {
        results.push(this.hearts.children[i].frame = 0);
      } else {
        results.push(this.hearts.children[i].frame = 1);
      }
    }
    return results;
  };

  HealthManager.prototype.loseHealth = function() {
    player.health--;
    this.updateHealthUI();
    if (player.health <= 0) {
      player.die();
      scoreManager.setHighscore();
      return game.time.events.add(Phaser.Timer.SECOND * 0.3, this.backToMenu, this);
    }
  };

  HealthManager.prototype.tintHearts = function() {
    var heart, j, len, ref, results;
    ref = this.hearts.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      heart = ref[j];
      results.push(heart.tint = this.tint);
    }
    return results;
  };

  HealthManager.prototype.resetHeartTint = function() {
    var heart, j, len, ref, results;
    ref = this.hearts.children;
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      heart = ref[j];
      results.push(heart.tint = 0xffffff);
    }
    return results;
  };

  HealthManager.prototype.backToMenu = function() {
    return game.state.start('Menu');
  };

  return HealthManager;

})();

Heart = (function(superClass) {
  extend(Heart, superClass);

  function Heart(x, y) {
    this.ref = game.add.sprite(x, y, 'heart');
    this.ref.scale.setTo(1, 1);
    this.ref.smoothed = false;
    game.physics.arcade.enable(this.ref);
    this.ref.body.gravity.y = this.gravity;
    this.ref.body.collideWorldBounds = true;
    powerups.add(this.ref);
    powerupList.push(this);
  }

  Heart.prototype.collected = function() {
    Heart.__super__.collected.apply(this, arguments);
    return player.collectedHeart();
  };

  return Heart;

})(Powerup);

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
    } else if (player.ref.body.touching.down && player.isShooting === false) {
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
    if (this.spacebar.isDown || this.Buttons.shoot) {
      player.isShooting = true;
      return player.shootingKnockback();
    } else {
      return player.isShooting = false;
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

Invincible = (function(superClass) {
  extend(Invincible, superClass);

  function Invincible() {
    return Invincible.__super__.constructor.apply(this, arguments);
  }

  Invincible.prototype.tint = 0x9b59b6;

  Invincible.prototype.collected = function() {
    Invincible.__super__.collected.apply(this, arguments);
    return player.becomeInvincible();
  };

  return Invincible;

})(Powerup);

platforms = null;

LevelManager = (function() {
  function LevelManager() {
    var background, ground, groundBeneath;
    background = game.add.sprite(-100, -100, 'background');
    background.scale.setTo(GameResolution.width * 2, 1);
    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(-game.world.height.width / 2, game.world.height - 352, 'platform');
    ground.smoothed = false;
    ground.scale.setTo(20, 2.5);
    ground.body.immovable = true;
    groundBeneath = platforms.create(-game.world.height.width / 2, game.world.height - 300, 'platform');
    groundBeneath.scale.setTo(20, -2.5);
    this.addBricks();
    this.loadLevel(background);
    game.world.bringToTop(platforms);
  }

  LevelManager.prototype.createLedge = function(x, y, scale) {
    var ledge;
    ledge = platforms.create(x, y, 'platform');
    ledge.scale.setTo(scale, 1);
    ledge.smoothed = false;
    ledge.body.immovable = true;
    ledge.body.checkCollision.down = false;
    ledge.body.checkCollision.left = false;
    return ledge.body.checkCollision.right = false;
  };

  LevelManager.prototype.loadLevel = function(background) {
    var j, ledge, len, ref, ref1, scale, x, y;
    ref = Levels[currentLevel].platforms;
    for (j = 0, len = ref.length; j < len; j++) {
      ledge = ref[j];
      ref1 = [ledge[0], ledge[1], ledge[2]], x = ref1[0], y = ref1[1], scale = ref1[2];
      this.createLedge(x, y, scale);
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

  LevelManager.prototype.addBricks = function() {
    var bricks, i, lastY, randomY, results;
    i = 100;
    lastY = Math.floor(Math.random() * GameWorld.groundHeight - 500 + 500);
    randomY = Math.floor(Math.random() * GameWorld.groundHeight - 500 + 500);
    results = [];
    while (i < GameWorld.width - 100) {
      while (Math.abs(lastY - randomY) < 200) {
        randomY = Math.floor(Math.random() * GameWorld.groundHeight - 600 + 600);
      }
      lastY = randomY;
      bricks = game.add.sprite(i, randomY, 'bricks');
      bricks.tint = Levels[currentLevel].tint;
      results.push(i += 100);
    }
    return results;
  };

  return LevelManager;

})();

powerups = null;

powerupList = [];

PowerupManager = (function() {
  PowerupManager.prototype.maxPowerups = 3;

  PowerupManager.prototype.spawnFrequency = 7;

  function PowerupManager() {
    this.powerupsOnScreen = 0;
    powerups = game.add.group();
    powerups.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * this.spawnFrequency, this.spawnWrapper, this);
  }

  PowerupManager.prototype.spawnWrapper = function() {
    var randomX, randomY, type, types;
    types = ['invincible', 'rapidfire', 'superjump', 'superspeed', 'heart'];
    type = types[Math.floor(Math.random() * types.length)];
    randomX = Math.floor(Math.random() * (player.ref.x + 300) + player.ref.x - 300);
    randomY = Math.floor(Math.random() * (GameWorld.groundHeight - 1000) + GameWorld.groundHeight - 100);
    if (this.powerupsOnScreen < this.maxPowerups) {
      return this.spawn(type, randomX, randomY);
    }
  };

  PowerupManager.prototype.spawn = function(type, x, y) {
    this.powerupsOnScreen++;
    new Explosion(x - 10, y + 2, 0xffffff, player.scale, 5);
    audioManager.playSound('spawn');
    switch (type) {
      case 'invincible':
        return new Invincible(x, y);
      case 'rapidfire':
        return new RapidFire(x, y);
      case 'superjump':
        return new SuperJump(x, y);
      case 'superspeed':
        return new SuperSpeed(x, y);
      case 'heart':
        return new Heart(x, y);
    }
  };

  return PowerupManager;

})();

RapidFire = (function(superClass) {
  extend(RapidFire, superClass);

  function RapidFire() {
    return RapidFire.__super__.constructor.apply(this, arguments);
  }

  RapidFire.prototype.tint = 0xe74c3c;

  RapidFire.prototype.collected = function() {
    RapidFire.__super__.collected.apply(this, arguments);
    return player.increaseFirerate();
  };

  return RapidFire;

})(Powerup);

ScoreManager = (function() {
  function ScoreManager() {
    this.score = 0;
    this.scoreText = game.add.text(16, 4, 'Score: 0', {
      font: '32px invasion2000',
      fill: 'white'
    });
    this.scoreText.fixedToCamera = true;
    this.initializeHighscore();
  }

  ScoreManager.prototype.increment = function(amount) {
    this.score += amount;
    return this.scoreText.text = 'Score: ' + this.score;
  };

  ScoreManager.prototype.initializeHighscore = function() {
    if (!window.localStorage['highscore']) {
      return window.localStorage['highscore'] = 0;
    }
  };

  ScoreManager.prototype.setHighscore = function() {
    if (this.score > window.localStorage['highscore']) {
      return window.localStorage['highscore'] = this.score;
    }
  };

  return ScoreManager;

})();

Shell = (function() {
  Shell.prototype.gravity = 400;

  Shell.prototype.lifetime = 1;

  function Shell(x, y) {
    var rotationMagnitude, sign;
    this.ref = game.add.sprite(x, y, 'shell');
    effectsManager.shells.add(this.ref);
    game.physics.arcade.enable(this.ref);
    this.ref.body.gravity.y = this.gravity;
    this.ref.body.bounce.y = 0.5;
    if (player.facing === 'right') {
      sign = -1;
    } else {
      sign = 1;
    }
    this.ref.body.velocity.x = sign * Math.floor(Math.random() * 50 + 150);
    this.ref.body.velocity.y = -Math.floor(Math.random() * 50 + 75);
    game.time.events.add(Phaser.Timer.SECOND * this.lifetime, this.removeShell, this);
    rotationMagnitude = Math.random() * 0.1;
    this.ref.update = function() {
      return this.rotation += rotationMagnitude;
    };
  }

  Shell.prototype.removeShell = function() {
    effectsManager.shells.remove(this.ref);
    return this.ref.destroy();
  };

  return Shell;

})();

SuperJump = (function(superClass) {
  extend(SuperJump, superClass);

  function SuperJump() {
    return SuperJump.__super__.constructor.apply(this, arguments);
  }

  SuperJump.prototype.tint = 0x16a085;

  SuperJump.prototype.collected = function() {
    SuperJump.__super__.collected.apply(this, arguments);
    return player.enableSuperJump();
  };

  return SuperJump;

})(Powerup);

SuperSpeed = (function(superClass) {
  extend(SuperSpeed, superClass);

  function SuperSpeed() {
    return SuperSpeed.__super__.constructor.apply(this, arguments);
  }

  SuperSpeed.prototype.tint = 0xf1c40f;

  SuperSpeed.prototype.collected = function() {
    SuperSpeed.__super__.collected.apply(this, arguments);
    return player.enableSuperSpeed();
  };

  return SuperSpeed;

})(Powerup);

Enemy = (function(superClass) {
  extend(Enemy, superClass);

  Enemy.prototype.difficultyScale = 0.5;

  Enemy.prototype.approachDeltaX = 175;

  Enemy.prototype.shootDeltaY = 50;

  Enemy.prototype.jumpDeltaY = 100;

  Enemy.prototype.extendChaseDeltaY = 100;

  Enemy.prototype.resetDeltaY = 25;

  Enemy.prototype.scoreValue = 100;

  Enemy.prototype.gravity = 300;

  Enemy.prototype.jumpSpeed = 300;

  function Enemy(x, y) {
    this.hit = bind(this.hit, this);
    this.scaleDifficulty();
    Enemy.__super__.constructor.call(this, x, y, 'enemy');
    this.facePlayer();
  }

  Enemy.prototype.scaleDifficulty = function() {
    this.movementSpeed = player.mvmtSpd * this.difficultyScale;
    this.fireRate = player.fRate * this.difficultyScale * 0.2;
    return this.bulletSpeed = player.bltSpd * this.difficultyScale * 0.5;
  };

  Enemy.prototype.AI = function() {
    if (this.alive && (this.ref.body != null)) {
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
      this.jump();
    }
    if (this.ref.body.touching.down) {
      if ((player.ref.y - this.ref.y) > this.extendChaseDeltaY) {
        return this.approachDeltaX = 275;
      } else if (Math.abs(player.ref.y - this.ref.y) < this.resetDeltaY) {
        return this.approachDeltaX = 175;
      }
    }
  };

  Enemy.prototype.shootPlayer = function() {
    if (Math.abs(player.ref.y - this.ref.y) < this.shootDeltaY && this.canShoot() && this.facingPlayer()) {
      this.lastFired = game.time.now;
      return game.time.events.add(Phaser.Timer.SECOND * ((Math.random() * 0.65) + 0.4), this.shoot, this);
    }
  };

  Enemy.prototype.facingPlayer = function() {
    return (player.ref.x - this.ref.x > 0 && this.facing === 'right') || (player.ref.x - this.ref.x < 0 && this.facing === 'left');
  };

  Enemy.prototype.facePlayer = function() {
    if (player.ref.x - this.ref.x > 0 && this.facing !== 'right') {
      this.facing = 'right';
      return this.ref.scale.x *= -1;
    } else if (player.ref.x - this.ref.x < 0 && this.facing !== 'left') {
      this.facing = 'left';
      return this.ref.scale.x *= -1;
    }
  };

  Enemy.prototype.hit = function(entity, bullet) {
    this.health--;
    this.hurtTint();
    if (this.health <= 0) {
      this.alive = false;
      enemyManager.enemiesOnScreen--;
      new Explosion(entity.x - 60, entity.y - 95, 0x000000, this.scale * 2, 10);
      entity.destroy();
      audioManager.playSound('explosion');
      scoreManager.increment(this.scoreValue);
    }
    return Enemy.__super__.hit.apply(this, arguments);
  };

  Enemy.prototype.shoot = function() {
    var projectile;
    if (this.alive) {
      audioManager.playSound('enemyShot');
      projectile = Enemy.__super__.shoot.apply(this, arguments);
      projectile.scale.setTo(projectile.scale.x / 2, projectile.scale.y / 2);
      projectile.smoothed = false;
      return projectile.tint = 0;
    }
  };

  return Enemy;

})(Entity);

Levels = {
  one: {
    tint: 0x3498DB,
    platforms: [[-150, GameWorld.l2, 1], [250, GameWorld.l1, 1], [700, GameWorld.l2, 1], [1100, GameWorld.l3, 1], [1200, GameWorld.l1, 1], [1650, GameWorld.l2, 1]]
  },
  two: {
    tint: 0x2ECC71,
    platforms: [[200, GameWorld.l1, 1], [600, GameWorld.l2, 1], [1000, GameWorld.l3, 1], [1400, GameWorld.l2, 1], [1800, GameWorld.l1, 1], [2200, GameWorld.l2, 1], [1000, GameWorld.l1, 1]]
  },
  three: {
    tint: 0xE74C3C,
    platforms: [[200, GameWorld.l1, 1], [400, GameWorld.l1, 1], [200, GameWorld.l3, 1], [400, GameWorld.l3, 1], [600, GameWorld.l2, 1], [800, GameWorld.l2, 1], [1000, GameWorld.l1, 1], [1200, GameWorld.l1, 1], [1000, GameWorld.l3, 1], [1200, GameWorld.l3, 1], [1400, GameWorld.l2, 1], [1600, GameWorld.l2, 1]]
  },
  four: {
    tint: 0xF4D03F,
    platforms: [[0, GameWorld.l2, 0.5], [200, GameWorld.l1, 0.5], [200, GameWorld.l3, 0.5], [400, GameWorld.l2, 0.5], [600, GameWorld.l1, 0.5], [600, GameWorld.l3, 0.5], [800, GameWorld.l2, 0.5], [1000, GameWorld.l1, 0.5], [1000, GameWorld.l3, 0.5], [1200, GameWorld.l2, 0.5], [1400, GameWorld.l1, 0.5], [1400, GameWorld.l3, 0.5], [1600, GameWorld.l2, 0.5], [1800, GameWorld.l1, 0.5], [1800, GameWorld.l3, 0.5]]
  }
};

Player = (function(superClass) {
  extend(Player, superClass);

  Player.prototype.jumpExtendFactor = 0;

  Player.prototype.invincible = false;

  Player.prototype.powerupDuration = 5;

  Player.prototype.powerupFactor = 1.75;

  Player.prototype.accuracy = 100;

  Player.prototype.maxHealth = 5;

  function Player(x, y) {
    this.hit = bind(this.hit, this);
    Player.__super__.constructor.call(this, x, y, 'player');
    this.mvmtSpd = this.movementSpeed;
    this.fRate = this.fireRate;
    this.bltSpd = this.bulletSpeed;
  }

  Player.prototype.hit = function(entity, bullet) {
    if (!this.invincible) {
      healthManager.loseHealth();
      this.hurtTint();
    }
    return Player.__super__.hit.apply(this, arguments);
  };

  Player.prototype.jump = function() {
    Player.__super__.jump.apply(this, arguments);
    audioManager.playSound('jump');
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

  Player.prototype.moveLeft = function() {
    this.ref.body.velocity.x = -this.movementSpeed;
    if (!this.isShooting) {
      this.facing = 'left';
      return this.setFacingDirection();
    }
  };

  Player.prototype.moveRight = function() {
    this.ref.body.velocity.x = this.movementSpeed;
    if (!this.isShooting) {
      this.facing = 'right';
      return this.setFacingDirection();
    }
  };

  Player.prototype.shoot = function() {
    var projectile;
    if (this.alive) {
      projectile = Player.__super__.shoot.apply(this, arguments);
      projectile.scale.setTo(projectile.scale.x * 0.75, projectile.scale.y * 0.75);
      projectile.smoothed = false;
      GameWorld.screenshake(1.75, 10);
      audioManager.playSound('shot');
      return new Shell(this.ref.x, this.ref.y - 50);
    }
  };

  Player.prototype.shootingKnockback = function() {
    var sign;
    if (this.facing === 'right') {
      sign = -1;
    } else {
      sign = 1;
    }
    return this.ref.body.velocity.x += sign * this.shootingKnockbackSpeed;
  };

  Player.prototype.die = function() {
    enemyList = [];
    new Explosion(this.ref.x - 60, this.ref.y - 90, 0xff2e00, this.scale * 2, 10);
    this.ref.kill();
    audioManager.stopPlayingMusic();
    audioManager.playSound('explosion');
    this.alive = false;
    return GameWorld.shake = 0;
  };

  Player.prototype.collectedHeart = function() {
    if (this.health < this.maxHealth) {
      this.health++;
      return healthManager.updateHealthUI();
    } else {
      return scoreManager.increment(1000);
    }
  };

  Player.prototype.becomeInvincible = function() {
    this.invincible = true;
    this.ref.tint = 0x9b59b6;
    this.resetTintValue = 0x9b59b6;
    healthManager.tintHearts();
    return game.time.events.add(Phaser.Timer.SECOND * this.powerupDuration, this.resetInvincibility, this);
  };

  Player.prototype.resetInvincibility = function() {
    this.invincible = false;
    this.ref.tint = 0xffffff;
    this.resetTintValue = 0xffffff;
    return healthManager.resetHeartTint();
  };

  Player.prototype.increaseFirerate = function() {
    GameWorld.shakeMagnitude *= 2;
    this.accuracy = 0;
    this.fireRate *= this.powerupFactor * 2;
    return game.time.events.add(Phaser.Timer.SECOND * this.powerupDuration, this.resetFirerate, this);
  };

  Player.prototype.resetFirerate = function() {
    GameWorld.shakeMagnitude /= 2;
    this.accuracy = 100;
    return this.fireRate /= this.powerupFactor * 2;
  };

  Player.prototype.enableSuperJump = function() {
    this.jumpSpeed *= 1.5;
    this.ref.tint = 0x16a085;
    this.resetTintValue = 0x16a085;
    return game.time.events.add(Phaser.Timer.SECOND * this.powerupDuration, this.resetSuperJump, this);
  };

  Player.prototype.resetSuperJump = function() {
    this.jumpSpeed /= 1.5;
    this.ref.tint = 0xffffff;
    return this.resetTintValue = 0xffffff;
  };

  Player.prototype.enableSuperSpeed = function() {
    this.movementSpeed *= this.powerupFactor;
    this.ref.tint = 0xf1c40f;
    this.resetTintValue = 0xf1c40f;
    return game.time.events.add(Phaser.Timer.SECOND * this.powerupDuration, this.resetSuperSpeed, this);
  };

  Player.prototype.resetSuperSpeed = function() {
    this.movementSpeed /= this.powerupFactor;
    this.ref.tint = 0xffffff;
    return this.resetTintValue = 0xffffff;
  };

  return Player;

})(Entity);
