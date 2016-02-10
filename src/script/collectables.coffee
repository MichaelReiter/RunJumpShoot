stars = null

collectablesInit = () ->
  # Add collectable stars
  stars = game.add.group()
  stars.enableBody = true
  for i in [1..12]
    star = stars.create(i*70, 0, 'star')
    star.body.gravity.y = 300
    # star.body.bounce.y = 0.7 + Math.random() * 0.2
  return

collectStar = (player, star) ->
  star.kill()
  score += 10
  scoreText.text = 'Score: ' + score
  return