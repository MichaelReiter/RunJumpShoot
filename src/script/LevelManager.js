// Generated by CoffeeScript 1.10.0
var GameWorld, LevelManager, background, platforms;

platforms = null;

background = null;

GameWorld = {
  height: GameResolution.height,
  width: 2000,
  groundHeight: 608
};

LevelManager = (function() {
  function LevelManager() {
    var ground;
    background = game.add.sprite(0, 0, 'background');
    background.scale.setTo(GameResolution.width, 1);
    platforms = game.add.group();
    platforms.enableBody = true;
    ground = platforms.create(-game.world.height.width / 2, game.world.height - 352, 'platform');
    ground.smoothed = false;
    ground.scale.setTo(10, 1);
    ground.body.immovable = true;
  }

  LevelManager.prototype.createLedge = function(x, y) {
    var ledge;
    ledge = platforms.create(x, y, 'platform');
    ledge.smoothed = false;
    return ledge.body.immovable = true;
  };

  LevelManager.prototype.loadLevel = function(level) {
    var i, ledge, len, ref, ref1, results, x, y;
    ref = levels[level];
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      ledge = ref[i];
      ref1 = [ledge[0], ledge[1]], x = ref1[0], y = ref1[1];
      results.push(this.createLedge(x, y));
    }
    return results;
  };

  return LevelManager;

})();
