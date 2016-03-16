player         = null
levelManager   = null
healthManager  = null
scoreManager   = null
inputManager   = null
enemyManager   = null
powerupManager = null
audioManager   = null
effectsManager = null
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
    audioManager   = new AudioManager()
    effectsManager = new EffectsManager()

    game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)
    game.physics.startSystem(Phaser.Physics.ARCADE)
    game.camera.follow(player.ref, Phaser.Camera.FOLLOW_PLATFORMER)


  update: ->
    game.physics.arcade.collide(player.ref, platforms)
    game.physics.arcade.collide(enemies, platforms)
    game.physics.arcade.collide(powerups, platforms)
    game.physics.arcade.collide(effectsManager.shells, platforms)
    
    for powerup in powerupList
      powerup.checkCollisions()

    for enemy in enemyList
      if enemy?
        game.physics.arcade.overlap(player.ref, enemy.bullets, player.hit, null, this)
        game.physics.arcade.overlap(enemy.ref, player.bullets, enemy.hit, null, this)

    inputManager.keyboardMovement()
    inputManager.buttonMovement()
    player.animate()

    for enemy in enemyList
      enemy.AI()

    if GameWorld.shake > 0
      random1 = game.rnd.integerInRange(-GameWorld.shakeMagnitude, GameWorld.shakeMagnitude)
      random2 = game.rnd.integerInRange(-GameWorld.shakeMagnitude, GameWorld.shakeMagnitude)
      game.world.setBounds(random1, random2, GameWorld.width + random1, GameWorld.height + random2)
      GameWorld.shake--
      if GameWorld.shake is 0
        #reset bounds and shake magnitude
        game.world.setBounds(0, 0, GameWorld.width, GameWorld.height)
        GameWorld.shakeMagnitude = 1.75 