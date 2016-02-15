player = null

GameplayState =

  preload: ->

  load: ->

  create: ->

    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)

    game.physics.startSystem(Phaser.Physics.ARCADE)

    levelInit()

    player = new Player(300, GameResolution.height/2, 'player')
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER)

    enemyHandler = new EnemyHandler()

    inputInit()
    scoreInit()
    collectablesInit()
    
    return


  update: ->
    game.physics.arcade.collide(player.ref, platforms)
    game.physics.arcade.collide(enemies, platforms)
    game.physics.arcade.collide(stars, platforms)

    game.physics.arcade.overlap(player.ref, stars, collectStar, null, this)

    keyboardMovement()
    buttonMovement()

    enemy?.AI()
    
    return