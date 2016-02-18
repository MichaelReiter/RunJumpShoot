playerBullets = null

class Player extends Entity

  jumpExtendFactor: 0

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


  jump: ->
    super
    @jumpExtendFactor = 1
    return


  extendJump: ->
    @ref.body.velocity.y -= @jumpSpeed * 0.1 * @jumpExtendFactor
    if @jumpExtendFactor > 0.1
      @jumpExtendFactor *= 0.9
    else
      @jumpExtendFactor = 0
    return