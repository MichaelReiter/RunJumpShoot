powerups = null
powerupList = []

class Powerup

  gravity: 500

  constructor: (x, y, sprite) ->
    @ref = game.add.sprite(x, y, sprite)
    @ref.scale.setTo(player.scale, player.scale)
    @ref.smoothed = false

    game.physics.arcade.enable(@ref)
    @ref.body.gravity.y = @gravity
    @ref.body.collideWorldBounds = true

    powerups = game.add.group()
    powerups.enableBody = true

    powerups.add(@ref)
    powerupList.push(this)

  collected: (entity, powerup) ->
    powerup.destroy()