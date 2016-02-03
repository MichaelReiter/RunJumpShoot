var GameResolution, game, main;

GameResolution = {
  width: 640,
  height: 960
};

game = null;

main = function() {
  return game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow');
};
