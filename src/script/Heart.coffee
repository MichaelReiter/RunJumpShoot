class Heart extends Powerup

  constructor: (x, y) ->
    @ref = game.add.sprite(x, y, 'heart')
    @ref.scale.setTo(1, 1)
    @ref.smoothed = false

    game.physics.arcade.enable(@ref)
    @ref.body.gravity.y = @gravity
    @ref.body.collideWorldBounds = true

    powerups.add(@ref)
    powerupList.push(this)


  collected: ->
    super
    player.collectedHeart()