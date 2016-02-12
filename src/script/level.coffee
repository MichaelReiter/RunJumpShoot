platforms = null
background = null

GameWorld =
  height: GameResolution.height
  width: 2000

levelInit = () ->
  # Add background
  background = game.add.tileSprite(0, 0, 640, 960, 'background')

  platforms = game.add.group()
  platforms.enableBody = true

  # Add ground just above buttons
  ground = platforms.create(-game.world.height.width/2, game.world.height - 352, 'platform')
  ground.smoothed = false
  ground.scale.setTo(10, 1)
  ground.body.immovable = true
  ground.fixedToCamera = true

  # Add ledges
  ledge = platforms.create(400, 470, 'platform')
  ledge.smoothed = false
  ledge.body.immovable = true

  ledge = platforms.create(-150, 350, 'platform')
  ledge.smoothed = false
  ledge.body.immovable = true

  return