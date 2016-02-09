// Generated by CoffeeScript 1.10.0
var levelInit, platforms;

platforms = null;

levelInit = function() {
  var ground, ledge;
  game.add.sprite(0, 0, 'background');
  platforms = game.add.group();
  platforms.enableBody = true;
  ground = platforms.create(0, game.world.height - 64, 'platform');
  ground.smoothed = false;
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;
  ledge = platforms.create(400, 400, 'platform');
  ledge.smoothed = false;
  ledge.body.immovable = true;
  ledge = platforms.create(-150, 250, 'platform');
  ledge.body.immovable = true;
};
