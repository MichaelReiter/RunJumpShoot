class Entity
  
  movementSpeed: 200
  jumpSpeed: 220
  bulletSpeed: 300
  scale: 2
  facing: "right"
  fireRate: 3     # in bullets/second
  lastFired: 0
  gravity: 500

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
    @facing = "left"
    @ref.body.velocity.x = -@movementSpeed
    if @ref.body.touching.down
      @ref.animations.play('walking')
    @setFacingDirection()


  moveRight: ->
    @facing = "right"
    @ref.body.velocity.x = @movementSpeed
    if @ref.body.touching.down
      @ref.animations.play('walking')
    @setFacingDirection()


  jump: ->
    @ref.body.velocity.y = -@jumpSpeed
    @ref.animations.play('jumping')


  idle: ->
    @ref.body.velocity.x = 0
    @ref.animations.stop()
    @ref.frame = 6


  setFacingDirection: ->
    if @facing is "right" and @ref.scale.x < 0
      @ref.scale.x *= -1
    else if @facing is "left" and @ref.scale.x > 0
      @ref.scale.x *= -1


  canShoot: ->
    (game.time.now - @lastFired) > (1000 / @fireRate)


  shoot: ->
    @lastFired = game.time.now
    if @facing is "right"
      projectile = @bullets.create(@ref.x+30, @ref.y-48, 'bullet')
      projectileVector = @bulletSpeed
    else
      projectile = @bullets.create(@ref.x-40, @ref.y-48, 'bullet')
      projectileVector = -@bulletSpeed

    projectile.scale.setTo(@scale, @scale)
    projectile.body.velocity.x = projectileVector
    projectile.checkWorldBounds = true
    projectile.outOfBoundsKill = true


  hit: (entity, bullet) ->
    bullet.destroy()