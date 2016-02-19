class Enemy extends Entity

  difficultyScale: 0.75
  approachDeltaX: 175
  shootDeltaY: 50
  jumpDeltaY: 100
  alive: true
  scoreValue: 100
  gravity: 300
  jumpSpeed: 300
  health: 3

  constructor: ->
    @scaleDifficulty()
    super
    @facePlayer()
  

  scaleDifficulty: ->
    @movementSpeed = player.movementSpeed * @difficultyScale
    @fireRate = player.fireRate * @difficultyScale/2
    @bulletSpeed = player.bulletSpeed * @difficultyScale


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


    if @ref.body.touching.down and (@ref.y - player.ref.y) > @jumpDeltaY and Math.random() < 0.05
      @jump()


  shootPlayer: ->
    if Math.abs(player.ref.y - @ref.y) < @shootDeltaY and @canShoot() and @facingPlayer()
      @lastFired = game.time.now
      game.time.events.add(Phaser.Timer.SECOND * 0.5, @shoot, this)


  facingPlayer: ->
    (player.ref.x - @ref.x > 0 and @facing == "right") or (player.ref.x - @ref.x < 0 and @facing == "left")


  facePlayer: ->
    if player.ref.x - @ref.x > 0 and @facing != "right"
      @facing = "right"
      @ref.scale.x *= -1
    else if player.ref.x - @ref.x < 0 and @facing != "left"
      @facing = "left"
      @ref.scale.x *= -1


  hit: (entity, bullet) =>
    @health--
    @hurtTint()
    if @health <= 0
      @alive = false
      entity.destroy()
      scoreManager.increment(@scoreValue)
    super


  shoot: ->
    if @alive
      super
      for bullet in @bullets.children
        bullet.tint = 0