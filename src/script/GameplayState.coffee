player = null
healthManager = null
scoreManager = null
inputManager = null
enemyManager = null

GameplayState =

  preload: ->

  load: ->

  create: ->
    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)

    game.physics.startSystem(Phaser.Physics.ARCADE)

    levelManager = new LevelManager()
    levelManager.loadLevel(1)

    # levelManager.createLedge(300, 470)
    # levelManager.createLedge(-150, 350)

    player = new Player(150, GameWorld.groundHeight, 'player')
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER)

    enemyManager = new EnemyManager()
    healthManager = new HealthManager()
    scoreManager = new ScoreManager()
    inputManager = new InputManager()


  update: ->
    game.physics.arcade.collide(player.ref, platforms)
    game.physics.arcade.collide(enemies, platforms)

    for enemy in enemyList
      game.physics.arcade.overlap(player.ref, enemy.bullets, player.hit, null, this)
      game.physics.arcade.overlap(enemy.ref, player.bullets, enemy.hit, null, this)

    inputManager.keyboardMovement()
    inputManager.buttonMovement()
    player.animate()

    enemyManager.spawnLoop()
    for enemy in enemyList
      enemy.AI()