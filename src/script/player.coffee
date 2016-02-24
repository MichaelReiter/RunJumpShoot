class Player extends Entity

  jumpExtendFactor: 0
  health: 40

  hit: (entity, bullet) =>
    healthManager.loseHealth()
    @hurtTint()
    super


  jump: ->
    super
    @jumpExtendFactor = 1


  extendJump: ->
    @ref.body.velocity.y -= @jumpSpeed * 0.1 * @jumpExtendFactor
    if @jumpExtendFactor > 0.1
      @jumpExtendFactor *= 0.9
    else
      @jumpExtendFactor = 0