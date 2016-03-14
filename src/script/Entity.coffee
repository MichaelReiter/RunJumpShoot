class Entity
  
  movementSpeed: 250
  jumpSpeed: 220
  bulletSpeed: 900
  scale: 2
  facing: 'right'
  fireRate: 10 # bullets/second
  lastFired: 0
  gravity: 500
  health: 5
  knockback: 5
  accuracy: 0 # lower is better
  alive: true
  isShooting: false
  shootingKnockbackSpeed: 50
  resetTintValue: 0xffffff

  # Add entity, configure physics and animations
  constructor: (x, y, sprite) ->
    @ref = game.add.sprite(x, y, sprite)
    @ref.scale.setTo(@scale, @scale)
    @ref.smoothed = false
    @ref.anchor.setTo(.5, 1)
    @ref.frame = 6

    game.physics.arcade.enable(@ref)
    @ref.body.gravity.y = @gravity
    @ref.body.collideWorldBounds = true

    @ref.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true)
    @ref.animations.add('jumping', [7, 8, 9], 12, true)

    @bullets = game.add.group()
    @bullets.enableBody = true


  moveLeft: ->
    @facing = 'left'
    @ref.body.velocity.x = -@movementSpeed
    @setFacingDirection()


  moveRight: ->
    @facing = 'right'
    @ref.body.velocity.x = @movementSpeed
    @setFacingDirection()


  jump: ->
    @ref.body.velocity.y = -@jumpSpeed


  idle: ->
    @ref.body.velocity.x = 0
    @ref.animations.stop()
    @ref.frame = 6


  setFacingDirection: ->
    if @facing is 'right' and @ref.scale.x < 0
      @ref.scale.x *= -1
    else if @facing is 'left' and @ref.scale.x > 0
      @ref.scale.x *= -1


  canShoot: ->
    (game.time.now - @lastFired) > (1000 / @fireRate)


  shoot: ->
    @lastFired = game.time.now
    if @facing is 'right'
      projectile = @bullets.create(@ref.x+30, @ref.y-50, 'bullet')
      projectileVector = @bulletSpeed
    else
      projectile = @bullets.create(@ref.x-30, @ref.y-50, 'bullet')
      projectileVector = -@bulletSpeed

    projectile.scale.setTo(@scale, @scale)
    projectile.smoothed = false
    projectile.body.velocity.x = projectileVector

    projectile.body.velocity.y  = Math.random() * @accuracy
    if Math.floor(Math.random()*2) is 1 then sign = 1 else sign = -1
    projectile.body.velocity.y *= sign

    projectile.checkWorldBounds = true
    projectile.outOfBoundsKill  = true
    if @facing is 'left'
      projectile.scale.x *= -1
    projectile


  hit: (entity, bullet) ->
    sign = bullet.body.velocity.x / Math.abs(bullet.body.velocity.x)
    @ref.x += sign * @knockback
    bullet.destroy()
    audioManager.playSound('hit')


  hurtTint: ->
    @ref.tint = 0xff0000
    game.time.events.add(Phaser.Timer.SECOND * 0.05, @resetTint, this)


  resetTint: ->
    @ref.tint = @resetTintValue


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