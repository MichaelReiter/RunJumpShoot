class ScoreManager

  constructor: ->
    @score = 0
    @scoreText = game.add.text(16, 4, 'Score: 0', {
      font: '32px invasion2000',
      fill: 'white'
    })
    @scoreText.fixedToCamera = true


  increment: (amount) ->
    @score += amount
    @scoreText.text = 'Score: ' + @score