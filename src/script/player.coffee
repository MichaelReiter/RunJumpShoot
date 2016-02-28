class Player extends Entity

  jumpExtendFactor: 0
  health: 4
  invincible: false
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
    @ref.tint   = 0x9b59b6
    healthManager.tintHearts()
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetInvincibility, this)


  resetInvincibility: ->
    @invincible = false
    @ref.tint   = 0xffffff
    healthManager.tintHearts()


  increaseFirerate: ->
    @fireRate = 15
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetFirerate, this)


  resetFirerate: ->
    @fireRate = 3


  enableSuperJump: ->
    @jumpSpeed *= 1.5
    @ref.tint   = 0x16a085
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetSuperJump, this)


  resetSuperJump: ->
    @jumpSpeed /= 1.5
    @ref.tint   = 0xffffff