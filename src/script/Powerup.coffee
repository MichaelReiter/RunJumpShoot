powerupList = []

class Powerup

  constructor: (x, y, sprite) ->
    @ref = game.add.sprite(x, y, sprite)
    powerupList.push(this)
    @ref.scale.setTo(player.scale, player.scale)
    @ref.smoothed = false


  collected: (entity, powerup) ->
    # @ref.destroy()