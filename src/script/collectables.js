// Generated by CoffeeScript 1.10.0
var collectStar, collectablesInit, stars;

stars = null;

collectablesInit = function() {
  var i, j, star;
  stars = game.add.group();
  stars.enableBody = true;
  for (i = j = 1; j <= 12; i = ++j) {
    star = stars.create(i * 70, 0, 'star');
    star.body.gravity.y = 300;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }
};

collectStar = function(player, star) {
  star.kill();
  score += 10;
  scoreText.text = 'Score: ' + score;
};
