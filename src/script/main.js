// Generated by CoffeeScript 1.10.0
var GameResolution, game, main;

GameResolution = {
  width: 640,
  height: 480
};

game = null;

main = function() {
  return game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow');
};
