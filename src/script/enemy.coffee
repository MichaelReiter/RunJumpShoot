class Enemy extends Entity

  difficultyScale: 0.75
  approachDeltaX: 200
  shootDeltaY: 50

  constructor: ->
    this.scaleDifficulty()
    super
  

  scaleDifficulty: ->
    this.movementSpeed = player.movementSpeed * this.difficultyScale
    this.fireRate = player.fireRate * this.difficultyScale/4
    this.bulletSpeed = player.bulletSpeed * this.difficultyScale
    return


  AI: ->
    this.followPlayer()
    this.shootPlayer()
    return


  followPlayer: ->
    if Math.abs(player.ref.x - this.ref.x) < 3
      this.facing = player.facing
      this.setFacingDirection()

    if player.ref.x - this.ref.x > this.approachDeltaX
      this.moveRight()
    else if player.ref.x - this.ref.x < -this.approachDeltaX
      this.moveLeft()
    else
      this.idle()
    return


  shootPlayer: ->
    if Math.abs(player.ref.y - this.ref.y) < this.shootDeltaY and this.canShoot()
      this.shoot()
    return