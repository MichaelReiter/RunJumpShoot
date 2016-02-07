GameResolution =
  width: 800
  height: 600

PlayerVariables =
  movementSpeed: 150
  jumpSpeed: 300
  playerScale: 2

game = null
platforms = null
player = null
keyboard = null
spacebar = null
stars = null
score = 0
scoreText = null

main = () ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, '', {preload: preload, create: create, update: update})
  # game.state.add('LevelSelect', LevelSelectState, false)
  # game.state.add('Gameplay', GameplayState, false)
  # game.state.add('TitleScreen', TitleScreenState, false)
  # game.state.add('Options', OptionsState, false)
  # game.state.add('Loading', LoadingState, true)

preload = () ->
  game.load.image('sky', 'img/sky.png')
  game.load.image('ground', 'img/platform.png')
  game.load.image('star', 'img/star.png')
  game.load.spritesheet('dude', 'img/contra.png', 39, 39)
  return

create = () ->
  # Enable game physics
  game.physics.startSystem(Phaser.Physics.ARCADE)

  # Add background
  game.add.sprite(0, 0, 'sky')

  platforms = game.add.group()
  platforms.enableBody = true

  # Add ground and ledges
  ground = platforms.create(0, game.world.height - 64, 'ground')
  ground.scale.setTo(2, 2)
  ground.body.immovable = true

  ledge = platforms.create(400, 400, 'ground')
  ledge.body.immovable = true

  ledge = platforms.create(-150, 250, 'ground')
  ledge.body.immovable = true

  # Add player, configure physics and animations
  player = game.add.sprite(32, game.world.height - 250, 'dude')
  player.scale.setTo(PlayerVariables.playerScale, PlayerVariables.playerScale)
  player.smoothed = false

  game.physics.arcade.enable(player)
  player.body.bounce.y = 0.2
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true

  player.animations.add('walking', [0, 1, 2, 3, 4, 5], 10, true)

  # Add collectable stars
  stars = game.add.group()
  stars.enableBody = true
  for i in [1..12]
    star = stars.create(i*70, 0, 'star')
    star.body.gravity.y = 300
    star.body.bounce.y = 0.7 + Math.random() * 0.2

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

  player.body.velocity.x = 0

  # Handle left/right movement
  if keyboard.left.isDown
    player.body.velocity.x = -PlayerVariables.movementSpeed
    player.animations.play('walking')
    if player.scale.x > 0
      player.scale.x *= -1
  else if keyboard.right.isDown
    player.body.velocity.x = PlayerVariables.movementSpeed
    player.animations.play('walking')
    if player.scale.x < 0
      player.scale.x *= -1
  else
    player.animations.stop()
    player.frame = 4

  # enable jump if player is touching the ground
  if player.body.touching.down and keyboard.up.isDown
    player.body.velocity.y = -PlayerVariables.jumpSpeed

  if spacebar.isDown
    shoot(player.x, player.y, 300)
  return

shoot = (x, y, velocity) ->
  projectile = stars.create(x, y-50, 'star')
  direction = player.body.velocity.x / Math.abs(PlayerVariables.movementSpeed)
  if direction is 0
    projectile
  else
    projectileVector = velocity * direction
  projectile.body.velocity.x = projectileVector
  projectile.body.gravity.y = 300
  return

collectStar = (player, star) ->
  star.kill()
  score += 10
  scoreText.text = 'Score: ' + score
  return