class Player extends Entity

  jumpExtendFactor: 0

  hit: (entity, bullet) =>
    healthManager.loseHealth()
    @hurtTint()
    super


  hurtTint: ->
    @ref.tint = 0xff0000
    game.time.events.add(Phaser.Timer.SECOND * 0.05, @resetTint, this)


  resetTint: ->
    @ref.tint = 0xffffff


  jump: ->
    super
    @jumpExtendFactor = 1


  extendJump: ->
    @ref.body.velocity.y -= @jumpSpeed * 0.1 * @jumpExtendFactor
    if @jumpExtendFactor > 0.1
      @jumpExtendFactor *= 0.9
    else
      @jumpExtendFactor = 0