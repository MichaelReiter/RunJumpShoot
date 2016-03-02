class HealthManager

  heartScale: 0.08
  tint: 0x666666

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
      new Explosion(player.ref.x-30, player.ref.y-70)
      player.ref.kill()
      audioManager.playSound('explosion')
      player.alive = false
      game.time.events.add(Phaser.Timer.SECOND * 0.3, @backToMenu, this)


  tintHearts: ->
    for heart in @hearts.children
      if heart.tint != @tint
        heart.tint = @tint
      else
        heart.tint = 0xffffff


  backToMenu: ->
    game.state.start('Menu')