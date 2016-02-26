class Player extends Entity

  jumpExtendFactor: 0
  health: 4
  invincible: true
  powerupDuration: 5 #seconds

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
    @ref.tint = 0x34495e
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetPowerup, this)


  resetPowerup: ->
    @invincible = false
    @ref.tint = 0xffffff