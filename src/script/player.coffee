class Player extends Entity

  jumpExtendFactor: 0
  health: 4
  invincible: true

  constructor: (x, y) ->
    super(x, y, 'player')


  hit: (entity, bullet) =>
    unless @invincible
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


  becomeInvincible: ->
    @invincible = true
    player.tint = 0xffff00
    game.time.events.add(Phaser.Timer.SECOND * 3, resetPowerup, this)


  resetPowerup: ->
    @invincible = false
    player.tint = 0xffffff