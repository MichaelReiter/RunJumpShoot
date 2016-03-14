class Explosion
  
  constructor: (x, y, tint, scale, magnitude) ->
    @ref = game.add.sprite(x, y, 'explosion')
    @ref.tint = tint
    @ref.scale.setTo(scale, scale)
    @ref.smoothed = false
    @ref.animations.add('boom', [0, 1, 2], 12, false)
    @ref.animations.play('boom')
    GameWorld.screenshake(magnitude, 10)
    game.time.events.add(Phaser.Timer.SECOND * 0.3, @selfdestruct, this)


  selfdestruct: ->
    @ref.destroy()