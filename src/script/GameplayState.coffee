GameplayState =

  preload: () ->

  load: () ->

  create: () ->
    # Enable game physics
    game.physics.startSystem(Phaser.Physics.ARCADE)

    levelInit()
    playerInit()
    inputInit()
    scoreInit()
    collectablesInit()
    
    return


  update: () ->
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(stars, platforms)

    game.physics.arcade.overlap(player, stars, collectStar, null, this)

    playerMovement()
    
    return