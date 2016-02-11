keyboard = null
spacebar = null

inputInit = () ->
  # Create inputs for keyboard
  keyboard = game.input.keyboard.createCursorKeys()
  spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

  left = game.add.sprite(0, game.world.height-320, 'button_left')
  right = game.add.sprite(160, game.world.height-320, 'button_right')
  jump = game.add.sprite(320, game.world.height-320, 'button_jump')
  shoot = game.add.sprite(480, game.world.height-320, 'button_shoot')

  return


keyboardMovement = () ->
  player.body.velocity.x = 0

  # Handle left/right movement
  if keyboard.left.isDown
    moveLeft()
  else if keyboard.right.isDown
    moveRight()
  else
    playerIdle()

  # Enable jumping if player is touching the ground
  if player.body.touching.down and keyboard.up.isDown
    jump()

  # Enable shooting
  if (game.time.now - PlayerVariables.lastFired) > (1000 / PlayerVariables.fireRate) and spacebar.isDown
    shoot()

  return