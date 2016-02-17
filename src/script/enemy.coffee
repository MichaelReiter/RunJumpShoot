class Enemy extends Entity

  difficultyScale: 0.75
  approachDeltaX: 200
  shootDeltaY: 50
  alive: true

  constructor: ->
    @scaleDifficulty()
    # @setFacingDirection()
    super
  

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


  canShoot: ->
    return (game.time.now - @lastFired) > (1000 / @fireRate)


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


  hit: (entity, bullet) =>
    this.alive = false
    entity.destroy()
    super
    return