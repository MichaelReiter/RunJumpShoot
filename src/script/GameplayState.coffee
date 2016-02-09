stars = null
bullets = null

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

    # Initialize bullets
    bullets = game.add.group()
    bullets.enableBody = true

    # Add collectable stars
    stars = game.add.group()
    stars.enableBody = true
    for i in [1..12]
      star = stars.create(i*70, 0, 'star')
      star.body.gravity.y = 300
      # star.body.bounce.y = 0.7 + Math.random() * 0.2

    scoreText = game.add.text(16, 16, 'Score: 0', {
      fontSize: '32px', fill: '#fff'
    })

    return


  update: () ->
    game.physics.arcade.collide(player, platforms)
    game.physics.arcade.collide(stars, platforms)

    game.physics.arcade.overlap(player, stars, collectStar, null, this)

    playerMovement()
    
    return