class Player extends Entity

  jumpExtendFactor: 0
  invincible: true
  powerupDuration: 5 #seconds
  powerupFactor: 1.75
  accuracy: 100 #lower is better
  maxHealth: 5

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
    audioManager.playSound('jump')
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
      audioManager.playSound('shot')


  shootingKnockback: ->
    if @facing is 'right' then sign = -1 else sign = 1
    @ref.body.velocity.x += sign * 10 * @knockback


  die: ->
    enemyList = []
    new Explosion(@ref.x-30, @ref.y-70)
    @ref.kill()
    audioManager.playSound('explosion')
    @alive = false


  collectedHeart: ->
    if @health < @maxHealth
      @health++
      healthManager.updateHealthUI()
    else
      scoreManager.increment(1000)


  becomeInvincible: ->
    @invincible     = true
    @ref.tint       = 0x9b59b6
    @resetTintValue = 0x9b59b6
    healthManager.tintHearts()
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetInvincibility, this)


  resetInvincibility: ->
    @invincible     = false
    @ref.tint       = 0xffffff
    @resetTintValue = 0xffffff
    healthManager.resetHeartTint()


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
    @jumpSpeed     *= 1.5
    @ref.tint       = 0x16a085
    @resetTintValue = 0x16a085
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetSuperJump, this)


  resetSuperJump: ->
    @jumpSpeed     /= 1.5
    @ref.tint       = 0xffffff
    @resetTintValue = 0xffffff


  enableSuperSpeed: ->
    @movementSpeed *= @powerupFactor
    @ref.tint       = 0xf1c40f
    @resetTintValue = 0xf1c40f
    game.time.events.add(Phaser.Timer.SECOND * @powerupDuration, @resetSuperSpeed, this)


  resetSuperSpeed: ->
    @movementSpeed /= @powerupFactor
    @ref.tint       = 0xffffff
    @resetTintValue = 0xffffff