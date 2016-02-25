class Powerup

  constructor: (x, y, sprite) ->
    @ref = game.add.sprite(x, y, sprite)
    powerupList.push(this)


  collected: (entity, powerup) ->
    # @ref.destroy()