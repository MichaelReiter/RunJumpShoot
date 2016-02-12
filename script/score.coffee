score = 0
scoreText = null

scoreInit = () ->
  scoreText = game.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#fff'
  })