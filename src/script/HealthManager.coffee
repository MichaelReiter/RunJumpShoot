class HealthManager

  tint: 0x666666

  constructor: ->
    @hearts = game.add.group()
    @hearts.fixedToCamera = true
    @hearts.smoothed = false

    for i in [1..player.health]
      @hearts.create(GameResolution.width - 60*i, 15, 'heart')


  updateHealthUI: ->
    for i in [0..@hearts.children.length-1]
      if player.health > i
        @hearts.children[i].frame = 0
      else
        @hearts.children[i].frame = 1


  loseHealth: ->
    player.health--
    @updateHealthUI()
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