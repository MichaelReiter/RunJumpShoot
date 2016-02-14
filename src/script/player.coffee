bullets = null

class Player extends Entity

  constructor: (x, y, sprite) ->

    game.camera.follow(this.ref, Phaser.Camera.FOLLOW_PLATFORMER)

    # Initialize bullets
    bullets = game.add.group()
    bullets.enableBody = true
    super(x, y, sprite)