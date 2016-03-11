platforms = null

class LevelManager

  constructor: ->
    background = game.add.sprite(-100, -100, 'background')
    background.scale.setTo(GameResolution.width*2, 1)

    platforms = game.add.group()
    platforms.enableBody = true

    # Add ground just above buttons
    ground = platforms.create(-game.world.height.width/2, game.world.height - 352, 'platform')
    ground.smoothed = false
    ground.scale.setTo(20, 2.5)
    ground.body.immovable = true
    groundBeneath = platforms.create(-game.world.height.width/2, game.world.height - 300, 'platform')
    groundBeneath.scale.setTo(20, -2.5)

    @addBricks()
    @loadLevel(background)
    game.world.bringToTop(platforms)


  createLedge: (x, y, scale) ->
    ledge = platforms.create(x, y, 'platform')
    ledge.scale.setTo(scale, 1)
    ledge.smoothed                  = false
    ledge.body.immovable            = true
    ledge.body.checkCollision.down  = false
    ledge.body.checkCollision.left  = false
    ledge.body.checkCollision.right = false


  loadLevel: (background) ->
    for ledge in Levels[currentLevel].platforms
      [x, y, scale] = [ledge[0], ledge[1], ledge[2]]
      @createLedge(x, y, scale)
    @tintLevel(background)


  tintLevel: (background) ->
    background.tint = Levels[currentLevel].tint
    for platform in platforms.children
      platform.tint = Levels[currentLevel].tint


  addBricks: ->
    i = 100
    lastY = Math.floor(Math.random()*GameWorld.groundHeight-500 + 500)
    randomY = Math.floor(Math.random()*GameWorld.groundHeight-500 + 500)
    while i < GameWorld.width-100
      while Math.abs(lastY - randomY) < 200
        randomY = Math.floor(Math.random()*GameWorld.groundHeight-600 + 600)
      lastY = randomY
      bricks = game.add.sprite(i, randomY, 'bricks')
      bricks.tint = Levels[currentLevel].tint
      i += 100