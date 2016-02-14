bullets = null

class Player extends Entity

  constructor: (x, y, sprite) ->

    # Initialize bullets
    bullets = game.add.group()
    bullets.enableBody = true
    super(x, y, sprite)