class Shell
  
  gravity: 500
  lifetime: 1.25 #seconds

  constructor: (x, y) ->
    @ref = game.add.sprite(x, y, 'shell')
    effectsManager.shells.add(@ref)
    game.physics.arcade.enable(@ref)
    @ref.body.gravity.y  = @gravity
    @ref.rotation        = Math.floor(Math.random()*360)
    @ref.angularAcceleration = Math.floor(Math.random()*360)
    @ref.body.velocity.x = Math.floor(Math.random()*100 - Math.floor(Math.random()*200))
    @ref.body.velocity.y = -Math.floor(Math.random()*200 + 100)
    game.time.events.add(Phaser.Timer.SECOND * @lifetime, @removeShell, this)
    
    rotationMagnitude = Math.random() * 0.1
    @ref.update = ->
      @rotation += rotationMagnitude


  removeShell: ->
    effectsManager.shells.remove(@ref)
    @ref.destroy()
