class HealthManager

  tint: 0x666666

  constructor: ->
    @hearts = game.add.group()
    @hearts.fixedToCamera = true
    @hearts.smoothed = false

    for i in [1..player.health]
      heart = game.add.sprite(GameResolution.width - 60*i, 15, 'heart')
      @hearts.add(heart)


  loseHealth: ->
    player.health--
    @hearts.children[player.health].frame = 1
    if player.health <= 0
      player.die()
      scoreManager.setHighscore()
      game.time.events.add(Phaser.Timer.SECOND * 0.3, @backToMenu, this)


  tintHearts: ->
    for heart in @hearts.children
      heart.tint = @tint


  resetHeartTint: ->
    for heart in @hearts.children
      heart.tint = 0xffffff


  backToMenu: ->
    game.state.start('Menu')