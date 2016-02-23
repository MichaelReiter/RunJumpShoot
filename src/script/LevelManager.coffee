platforms = null

class LevelManager

  constructor: ->
    # Add background
    background = game.add.sprite(0, 0, 'background')
    background.scale.setTo(GameResolution.width, 1)

    platforms = game.add.group()
    platforms.enableBody = true

    # Add ground just above buttons
    ground = platforms.create(-game.world.height.width/2, game.world.height - 352, 'platform')
    ground.smoothed = false
    ground.scale.setTo(10, 1)
    ground.body.immovable = true

    @loadLevel(1)


  createLedge: (x, y) ->
    ledge = platforms.create(x, y, 'platform')
    ledge.smoothed = false
    ledge.body.immovable = true


  loadLevel: (level) ->
    for ledge in levels[level]
      [x, y] = [ledge[0], ledge[1]]
      @createLedge(x, y)
