class HealthManager

  heartScale: 0.08

  constructor: ->
    @hearts = game.add.group()

    for i in [1..player.health]
      heart = @hearts.create(GameResolution.width - 60*i, 15, 'heart')
      heart.scale.setTo(@heartScale, @heartScale)
      heart.fixedToCamera = true


  loseHealth: ->
    player.health--
    if player.health > 0
      @hearts.children[player.health].destroy()
    else
      enemyList = []
      game.state.start('Menu')