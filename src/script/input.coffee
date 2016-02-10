keyboard = null
spacebar = null

# InputKeys =
#   left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
#   right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
#   jump: game.input.keyboard.addKey(Phaser.Keyboard.UP)
#   shoot: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

inputInit = () ->
  # Create inputs for keyboard
  keyboard = game.input.keyboard.createCursorKeys()
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

  left = game.add.sprite(0, game.world.height-320, 'button_left')
  right = game.add.sprite(160, game.world.height-320, 'button_right')
  jump = game.add.sprite(320, game.world.height-320, 'button_jump')
  shoot = game.add.sprite(480, game.world.height-320, 'button_shoot')

  return

# handleInput = () ->
#   if keyboard.left.isDown
#     InputKeys.left = true
#   else if keyboard.right.isDown
#     InputKeys.right = true
#   else if keyboard.up.isDown
#     InputKeys.jummp = true
#   else if spacebar.isDown
#     InputKeys.shoot = true