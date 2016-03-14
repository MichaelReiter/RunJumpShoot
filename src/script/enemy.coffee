class Enemy extends Entity

  difficultyScale: 0.5
  approachDeltaX: 175
  shootDeltaY: 50
  jumpDeltaY: 100
  extendChaseDeltaY: 100
  resetDeltaY: 25
  scoreValue: 100
  gravity: 300
  jumpSpeed: 300

  constructor: (x, y) ->
    @scaleDifficulty()
    super(x, y, 'enemy')
    @facePlayer()
  

  scaleDifficulty: ->
    @movementSpeed = player.mvmtSpd * @difficultyScale
    @fireRate = player.fRate * @difficultyScale * 0.2
    @bulletSpeed = player.bltSpd * @difficultyScale * 0.5


  AI: ->
    if @alive
      @followPlayer()
      @shootPlayer()
      @animate()


  followPlayer: ->
    if Math.abs(player.ref.x - @ref.x) < 3
      @facing = player.facing
      @setFacingDirection()

    if player.ref.x - @ref.x > @approachDeltaX
      @moveRight()
    else if player.ref.x - @ref.x < -@approachDeltaX
      @moveLeft()

    # if player is above, jump
    if @ref.body.touching.down and (@ref.y - player.ref.y) > @jumpDeltaY and Math.random() < 0.05
      @jump()

    if @ref.body.touching.down
      if (player.ref.y - @ref.y) > @extendChaseDeltaY
        @approachDeltaX = 275
      else if Math.abs(player.ref.y - @ref.y) < @resetDeltaY
        @approachDeltaX = 175


  shootPlayer: ->
    if Math.abs(player.ref.y - @ref.y) < @shootDeltaY and @canShoot() and @facingPlayer()
      @lastFired = game.time.now
      game.time.events.add(Phaser.Timer.SECOND * ((Math.random()*0.85)+0.5), @shoot, this)


  facingPlayer: ->
    (player.ref.x - @ref.x > 0 and @facing == 'right') or (player.ref.x - @ref.x < 0 and @facing == 'left')


  facePlayer: ->
    if player.ref.x - @ref.x > 0 and @facing != 'right'
      @facing = 'right'
      @ref.scale.x *= -1
    else if player.ref.x - @ref.x < 0 and @facing != 'left'
      @facing = 'left'
      @ref.scale.x *= -1


  hit: (entity, bullet) =>
    @health--
    @hurtTint()
    if @health <= 0
      @alive = false
      enemyManager.enemiesOnScreen--
      new Explosion(entity.x-60, entity.y-95, 0x000000, @scale*2, 10)
      entity.destroy()
      audioManager.playSound('explosion')
      scoreManager.increment(@scoreValue)
    super


  shoot: ->
    if @alive
      projectile = super
      projectile.scale.setTo(projectile.scale.x/2, projectile.scale.y/2)
      projectile.smoothed = false
      projectile.tint = 0


  animate: ->
    if @ref.body.touching.down
      if @ref.body.velocity.x isnt 0
        if @isShooting and ((@ref.body.velocity.x > 0 and @facing is 'left') or (@ref.body.velocity.x < 0 and @facing is 'right'))
          if Math.abs(@ref.body.velocity.x) < @movementSpeed - @shootingKnockbackSpeed
            @ref.animations.stop()
            @ref.frame = 6
          else
            @ref.animations.play('walking')
        else
          @ref.animations.play('walking')
      else
        @ref.animations.stop()
        @ref.frame = 6
    else if @ref.body.velocity.y isnt 0
      @ref.animations.play('jumping')