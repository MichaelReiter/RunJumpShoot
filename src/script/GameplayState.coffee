player         = null
levelManager   = null
healthManager  = null
scoreManager   = null
inputManager   = null
enemyManager   = null
powerupManager = null
currentLevel   = null

GameplayState =

  preload: ->

  load: ->

  create: ->
    levelManager   = new LevelManager()
    player         = new Player(150, GameWorld.groundHeight)
    enemyManager   = new EnemyManager()
    healthManager  = new HealthManager()
    scoreManager   = new ScoreManager()
    inputManager   = new InputManager()
    powerupManager = new PowerupManager()

    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER)

    powerupManager.spawn("invincible", player.ref.x+100, player.ref.y-300)
    powerupManager.spawn("rapidfire", player.ref.x+300, player.ref.y-300)
    powerupManager.spawn("superjump", player.ref.x+500, player.ref.y-300)
    powerupManager.spawn("superspeed", player.ref.x+700, player.ref.y-300)


  update: ->
    game.physics.arcade.collide(player.ref, platforms)
    game.physics.arcade.collide(enemies, platforms)
    game.physics.arcade.collide(powerups, platforms)
    game.physics.arcade.collide(enemies, enemies)
    
    for powerup in powerupList
      powerup.checkCollisions()

    for enemy in enemyList
      if enemy?
        game.physics.arcade.overlap(player.ref, enemy.bullets, player.hit, null, this)
        game.physics.arcade.overlap(enemy.ref, player.bullets, enemy.hit, null, this)

    inputManager.keyboardMovement()
    inputManager.buttonMovement()
    player.animate()

    enemyManager.spawnLoop()
    for enemy in enemyList
      enemy.AI()