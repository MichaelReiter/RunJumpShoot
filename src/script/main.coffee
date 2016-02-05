GameResolution =
  width: 800
  height: 600

game = null
platforms = null

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
  game.load.spritesheet('dude', 'img/dude.png', 32, 48)
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
  return

update = () ->
  return