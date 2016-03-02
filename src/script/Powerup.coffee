class Powerup

  gravity: 500
  tint: 0xffffff

  constructor: (x, y) ->
    @ref = game.add.sprite(x, y, 'powerup')
    @ref.scale.setTo(player.scale, player.scale)
    @ref.smoothed = false
    @ref.tint = @tint

    game.physics.arcade.enable(@ref)
    @ref.body.gravity.y = @gravity
    @ref.body.collideWorldBounds = true

    powerups.add(@ref)
    powerupList.push(this)


  collected: (entity, powerup) ->
    powerup.destroy()
    audioManager.playSound('powerup')


  checkCollisions: ->
    game.physics.arcade.overlap(player.ref, @ref, @collected, null, this)