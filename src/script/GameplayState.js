// Generated by CoffeeScript 1.10.0
var GameplayState, player;

player = null;

GameplayState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var enemyHandler;
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    levelInit();
    player = new Player(300, GameResolution.height / 2, 'player');
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER);
    enemyHandler = new EnemyHandler();
    inputInit();
    scoreInit();
    collectablesInit();
  },
  update: function() {
    game.physics.arcade.collide(player.ref, platforms);
    game.physics.arcade.collide(enemies, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.overlap(player.ref, stars, collectStar, null, this);
    keyboardMovement();
    buttonMovement();
  }
};
