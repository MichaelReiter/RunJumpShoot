class Entity
  
  movementSpeed: 200
  jumpSpeed: 300
  bulletSpeed: 300
  scale: 2
  facing: "right"
  fireRate: 3     # in bullets/second
  lastFired: 0
  ref: null

  # Add entity, configure physics and animations
  constructor: (x, y, sprite) ->
    this.ref = game.add.sprite(x, y, sprite)
    this.ref.scale.setTo(this.scale, this.scale)
    this.ref.smoothed = false
    this.ref.anchor.setTo(.5, 1)
    this.ref.frame = 6

    game.physics.arcade.enable(this.ref)
    this.ref.body.gravity.y = 300
    this.ref.body.collideWorldBounds = true

    this.ref.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true)
    this.ref.animations.add('jumping', [6, 7, 8, 9], 12, true)


  moveLeft: ->
    this.facing = "left"
    this.ref.body.velocity.x = -this.movementSpeed
    if this.ref.body.touching.down
      this.ref.animations.play('walking')
    this.setFacingDirection()
    return


  moveRight: ->
    this.facing = "right"
    this.ref.body.velocity.x = this.movementSpeed
    if this.ref.body.touching.down
      this.ref.animations.play('walking')
    this.setFacingDirection()
    return


  jump: ->
    this.ref.body.velocity.y = -this.jumpSpeed
    this.ref.animations.play('jumping')
    return


  idle: ->
    this.ref.body.velocity.x = 0
    this.ref.animations.stop()
    this.ref.frame = 6
    return


  setFacingDirection: ->
    if this.facing is "right" and this.ref.scale.x < 0
      this.ref.scale.x *= -1
    else if this.facing is "left" and this.ref.scale.x > 0
      this.ref.scale.x *= -1
    return


  canShoot: ->
    return (game.time.now - this.lastFired) > (1000 / this.fireRate)


  shoot: ->
    this.lastFired = game.time.now
    if this.facing is "right"
      projectile = bullets.create(this.ref.x+30, this.ref.y-48, 'bullet')
      projectileVector = this.bulletSpeed
    else
      projectile = bullets.create(this.ref.x-40, this.ref.y-48, 'bullet')
      projectileVector = -this.bulletSpeed

    projectile.scale.setTo(2, 2)
    projectile.body.velocity.x = projectileVector
    projectile.checkWorldBounds = true
    projectile.outOfBoundsKill = true
    return