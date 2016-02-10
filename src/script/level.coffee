platforms = null

levelInit = () ->
  # Add background
  game.add.sprite(0, 0, 'background')

  platforms = game.add.group()
  platforms.enableBody = true

  # Add ground and ledges
  ground = platforms.create(0, game.world.height - 352, 'platform')
  ground.smoothed = false
  ground.scale.setTo(2, 1)
  ground.body.immovable = true

  ledge = platforms.create(400, 400, 'platform')
  ledge.smoothed = false
  ledge.body.immovable = true

  ledge = platforms.create(-150, 250, 'platform')
  ledge.body.immovable = true

  return