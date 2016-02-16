// Generated by CoffeeScript 1.10.0
var GameplayState, healthManager, player;

player = null;

healthManager = null;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var enemyManager;
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    levelInit();
    healthManager = new HealthManager();
    player = new Player(300, GameResolution.height / 2, 'player');
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER);
    enemyManager = new EnemyManager();
    enemyManager.spawn(100, GameResolution.height / 2);
    inputInit();
    scoreInit();
    collectablesInit();
  },
  update: function() {
    var enemy, i, len;
    game.physics.arcade.collide(player.ref, platforms);
    game.physics.arcade.collide(enemies, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player.ref, stars, collectStar, null, this);
    keyboardMovement();
    buttonMovement();
    for (i = 0, len = enemyList.length; i < len; i++) {
      enemy = enemyList[i];
      enemy.AI();
    }
  }
};
