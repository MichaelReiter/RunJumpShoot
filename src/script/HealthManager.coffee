class HealthManager

  hearts: null
  currentHealth: 3

  constructor: ->
    @hearts = game.add.group()

    for i in [1..3]
      heart = @hearts.create(GameResolution.width - 60*i, 15, 'heart')
      heart.scale.setTo(0.08, 0.08)
      heart.fixedToCamera = true


  loseHealth: ->
    @currentHealth--
    if @currentHealth > 0
      @hearts.children[@currentHealth].destroy()
    else
      game.state.start('Menu')