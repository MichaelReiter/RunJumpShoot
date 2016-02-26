powerups = null
powerupList = []

class Powerup

  constructor: (x, y, sprite) ->
    powerups = game.add.group()
    powerups.enableBody = true

    @ref = game.add.sprite(x, y, sprite)
    @ref.scale.setTo(player.scale, player.scale)
    @ref.smoothed = false

    powerups.add(@ref)
    powerupList.push(this)


  collected: (entity, powerup) ->
    powerup.destroy()