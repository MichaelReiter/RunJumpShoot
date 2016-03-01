class Player extends Entity

  jumpExtendFactor: 0
  health: 5
  invincible: false
  powerupDuration: 5 #seconds
  powerupFactor: 1.75
  accuracy: 100

  constructor: (x, y) ->
    super(x, y, 'player')
    @mvmtSpd = @movementSpeed
    @fRate   = @fireRate
    @bltSpd  = @bulletSpeed


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


  shoot: ->
    if @alive
      projectile = super
      projectile.scale.setTo(projectile.scale.x*0.75, projectile.scale.y*0.75)
      projectile.smoothed = false
      GameWorld.screenshake()


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
    GameWorld.shakeMagnitude *= 2
    @accuracy = 0
    @fireRate *= @powerupFactor*2
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetFirerate, this)


  resetFirerate: ->
    GameWorld.shakeMagnitude /= 2
    @accuracy = 100
    @fireRate /= @powerupFactor*2


  enableSuperJump: ->
    @jumpSpeed *= 1.5
    @ref.tint   = 0x16a085
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetSuperJump, this)


  resetSuperJump: ->
    @jumpSpeed /= 1.5
    @ref.tint   = 0xffffff


  enableSuperSpeed: ->
    @movementSpeed *= @powerupFactor
    @ref.tint   = 0xf1c40f
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetSuperSpeed, this)


  resetSuperSpeed: ->
    @movementSpeed /= @powerupFactor
    @ref.tint   = 0xffffff