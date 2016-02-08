GameResolution =
  width: 800
  height: 600

PlayerVariables =
  movementSpeed: 150
  jumpSpeed: 300
  bulletSpeed: 300
  playerScale: 1
  facing: "right"
  fireRate: 3 # in bullets/second
  lastFired: 0

game = null
platforms = null
player = null
keyboard = null
spacebar = null
stars = null
bullets = null
score = 0
scoreText = null


main = () ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, '', {preload: preload, create: create, update: update})


preload = () ->
  game.load.image('background', 'img/background.png')
  game.load.image('platform', 'img/platform.png')
  game.load.image('star', 'img/star.png')
  game.load.image('bullet', 'img/bullet.png')
  game.load.spritesheet('player', 'img/player.png', 39, 34)
  return


create = () ->
  # Enable game physics
  game.physics.startSystem(Phaser.Physics.ARCADE)

  levelInit()
  playerInit()

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

  # Create inputs for keyboard
  keyboard = game.input.keyboard.createCursorKeys()
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

  return


update = () ->
  game.physics.arcade.collide(player, platforms)
  game.physics.arcade.collide(stars, platforms)

  game.physics.arcade.overlap(player, stars, collectStar, null, this)

  playerMovement()
  
  return