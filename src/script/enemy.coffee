class Enemy extends Entity

  difficultyScale: 0.75
  approachDeltaX: 200
  shootDeltaY: 50
  alive: true

  constructor: ->
    @scaleDifficulty()
    super
    console.log @ref.scale
    @facePlayer()
  

  scaleDifficulty: ->
    @movementSpeed = player.movementSpeed * @difficultyScale
    @fireRate = player.fireRate * @difficultyScale/4
    @bulletSpeed = player.bulletSpeed * @difficultyScale
    return


  AI: ->
    if @alive
      @followPlayer()
      @shootPlayer()
    return


  followPlayer: ->
    if Math.abs(player.ref.x - @ref.x) < 3
      @facing = player.facing
      @setFacingDirection()

    if player.ref.x - @ref.x > @approachDeltaX
      @moveRight()
    else if player.ref.x - @ref.x < -@approachDeltaX
      @moveLeft()
    else
      @idle()
    return


  shootPlayer: ->
    if Math.abs(player.ref.y - @ref.y) < @shootDeltaY and @canShoot() and @facingPlayer()
      @shoot()
      # game.time.events.add(Phaser.Timer.SECOND * 0.3, @shoot, this)
    return


  facingPlayer: ->
    (player.ref.x - @ref.x > 0 and @facing == "right") or (player.ref.x - @ref.x < 0 and @facing == "left")


  facePlayer: ->
    if player.ref.x - @ref.x > 0 and @facing != "right"
      @facing = "right"
      @ref.scale.x *= -1
    else if player.ref.x - @ref.x < 0 and @facing != "left"
      @facing = "left"
      @ref.scale.x *= -1
    return


  hit: (entity, bullet) =>
    this.alive = false
    entity.destroy()
    super
    return