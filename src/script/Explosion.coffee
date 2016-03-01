class Explosion
  
  constructor: (x, y) ->
    @ref = game.add.sprite(x, y, 'explosion')
    @ref.scale.setTo(player.scale, player.scale)
    @ref.smoothed = false
    @ref.animations.add('boom', [0, 1, 2], 12, false)
    @ref.animations.play('boom')
    game.time.events.add(Phaser.Timer.SECOND * 0.3, @selfdestruct, this)


  selfdestruct: ->
    @ref.destroy()