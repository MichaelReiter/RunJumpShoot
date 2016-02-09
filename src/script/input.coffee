keyboard = null
spacebar = null
shootKey = null

inputInit = () ->
  # Create inputs for keyboard
  keyboard = game.input.keyboard.createCursorKeys()
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

  # InputKeys =
  #   left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
  #   right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
  #   up: game.input.keyboard.addKey(Phaser.Keyboard.UP)
  #   down: game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
  #   jump: game.input.keyboard.addKey(Phaser.Keyboard.Z)
  #   shoot: game.input.keyboard.addKey(Phaser.Keyboard.X)
  return