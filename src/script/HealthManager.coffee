class HealthManager

  heartScale: 0.08
  tint: 0x666666

  constructor: ->
    @hearts = game.add.group()

    for i in [1..player.health]
      heart = game.add.sprite(GameResolution.width - 60*i, 15, 'heart')
      heart.animations.add('loseHealth', [0, 1], 12, true)
      # heart.scale.setTo(@heartScale, @heartScale)
      heart.smoothed = false
      heart.fixedToCamera = true
      @hearts.add(heart)


  loseHealth: ->
    player.health--
    if player.health > 0
      # @hearts.children[player.health].destroy()
      # console.log @hearts.children[player.health].frame = 1
      console.log @hearts.children[player.health].frame
    else
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