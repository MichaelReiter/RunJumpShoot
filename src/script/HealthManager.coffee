class HealthManager

  tint: 0x666666

  constructor: ->
    @hearts = game.add.group()

    for i in [1..player.health]
      heart = game.add.sprite(GameResolution.width - 60*i, 15, 'heart')
      @hearts.add(heart)

    @hearts.fixedToCamera = true
    @hearts.smoothed = false


  loseHealth: ->
    player.health--
    @hearts.children[player.health].frame = 1
    if player.health <= 0
      player.die()
      scoreManager.setHighscore()
      game.time.events.add(Phaser.Timer.SECOND * 0.3, @backToMenu, this)


  tintHearts: ->
    for heart in @hearts.children
      if heart.tint != @tint
        heart.tint = @tint
      else
        heart.tint = 0xffffff


  backToMenu: ->
    game.state.start('Menu')