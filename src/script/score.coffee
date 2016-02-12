score = 0
scoreText = null

scoreInit = () ->
  scoreText = game.add.text(16, 4, 'Score: 0', {
    font: '32px invasion2000',
    fill: '#fff'
  })