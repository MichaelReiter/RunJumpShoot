player = null
healthManager = null
scoreManager = null

GameplayState =

  preload: ->

  load: ->

  create: ->
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)

    game.physics.startSystem(Phaser.Physics.ARCADE)

    levelInit()

    healthManager = new HealthManager()

    player = new Player(300, GameWorld.groundHeight, 'player')
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER)

    enemyManager = new EnemyManager()
    # enemyManager.spawn(100, GameWorld.groundHeight)
    enemyManager.spawn(800, GameWorld.groundHeight)

    scoreManager = new ScoreManager()

    inputInit()
    # scoreInit()
    # collectablesInit()
    
    return


  update: ->
    game.physics.arcade.collide(player.ref, platforms)
    game.physics.arcade.collide(enemies, platforms)

    for enemy in enemyList
      game.physics.arcade.overlap(player.ref, enemy.bullets, player.hit, null, this)
      game.physics.arcade.overlap(enemy.ref, player.bullets, enemy.hit, null, this)

    # game.physics.arcade.collide(stars, platforms)
    # game.physics.arcade.overlap(player.ref, stars, collectStar, null, this)

    keyboardMovement()
    buttonMovement()

    for enemy in enemyList
      enemy.AI()
    
    return