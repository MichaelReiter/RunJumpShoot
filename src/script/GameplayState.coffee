player = null

GameplayState =

  preload: ->

  load: ->

  create: ->

    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)

    game.physics.startSystem(Phaser.Physics.ARCADE)

    levelInit()
    player = new Player()
    inputInit()
    scoreInit()
    collectablesInit()
    
    return


  update: ->
    game.physics.arcade.collide(player.ref, platforms)
    game.physics.arcade.collide(stars, platforms)

    game.physics.arcade.overlap(player.ref, stars, collectStar, null, this)

    keyboardMovement()
    buttonMovement()
    
    return