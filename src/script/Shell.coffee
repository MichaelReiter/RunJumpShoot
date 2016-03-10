class Shell
  
  gravity: 400
  lifetime: 1 #seconds

  constructor: (x, y) ->
    @ref = game.add.sprite(x, y, 'shell')
    effectsManager.shells.add(@ref)
    game.physics.arcade.enable(@ref)
    @ref.body.gravity.y  = @gravity
    @ref.body.bounce.y   = 0.5
    if player.facing is 'right' then sign = -1 else sign = 1
    @ref.body.velocity.x = sign * Math.floor(Math.random()*50 + 150)
    @ref.body.velocity.y = -Math.floor(Math.random()*50 + 75)
    game.time.events.add(Phaser.Timer.SECOND * @lifetime, @removeShell, this)
    
    rotationMagnitude = Math.random() * 0.1
    @ref.update = ->
      @rotation += rotationMagnitude


  removeShell: ->
    effectsManager.shells.remove(@ref)
    @ref.destroy()
