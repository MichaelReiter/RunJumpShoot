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
    if Math.abs(player.ref.y - @ref.y) < @shootDeltaY and @canShoot()
      @shoot()
    return


  hit: (entity, bullet) =>
    this.alive = false
    entity.destroy()
    super
    return