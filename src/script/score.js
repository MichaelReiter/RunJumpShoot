// Generated by CoffeeScript 1.10.0
var score, scoreInit, scoreText;

score = 0;

scoreText = null;

scoreInit = function() {
  return scoreText = game.add.text(16, 4, 'Score: 0', {
    font: '32px invasion2000',
    fill: '#fff'
  });
};
