playerBullets = null

class Player extends Entity

  hit: (entity, bullet) =>
    healthManager.loseHealth()
    @hurtTint()
    super
    return


  hurtTint: ->
    @ref.tint = 0xff0000
    game.time.events.add(Phaser.Timer.SECOND * 0.05, @resetTint, this)
    return


  resetTint: ->
    @ref.tint = 0xffffff
    return