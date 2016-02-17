class InputManager

  keyboard: null
  spacebar: null
  button_left: null
  button_right: null
  button_jump: null
  button_shoot: null

  Buttons:
    left: false
    right: false
    jump: false
    shoot: false

  constructor: ->
    # Create inputs for keyboard
    @keyboard = game.input.keyboard.createCursorKeys()
    @spacebar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

    @button_left = game.add.sprite(0, game.world.height-320, 'button_left')
    @button_right = game.add.sprite(160, game.world.height-320, 'button_right')
    @button_jump = game.add.sprite(320, game.world.height-320, 'button_jump')
    @button_shoot = game.add.sprite(480, game.world.height-320, 'button_shoot')

    @button_left.inputEnabled = true
    @button_right.inputEnabled = true
    @button_jump.inputEnabled = true
    @button_shoot.inputEnabled = true

    @button_left.fixedToCamera = true
    @button_right.fixedToCamera = true
    @button_jump.fixedToCamera = true
    @button_shoot.fixedToCamera = true


  keyboardMovement: ->
    player.ref.body.velocity.x = 0

    # Handle left/right movement
    if @keyboard.left.isDown or @Buttons.left
      player.moveLeft()
    else if @keyboard.right.isDown or @Buttons.right
      player.moveRight()
    else if player.ref.body.touching.down
      player.idle()

    # Enable jumping if player is touching the ground
    if player.ref.body.touching.down and (@keyboard.up.isDown or @Buttons.jump)
      player.jump()

    # Enable shooting
    if player.canShoot() and (@spacebar.isDown or @Buttons.shoot)
      player.shoot()

    return


  buttonMovement: ->
    @button_left.events.onInputDown.add(@buttonSetLeft, this)
    @button_right.events.onInputDown.add(@buttonSetRight, this)
    @button_jump.events.onInputDown.add(@buttonSetJump, this)
    @button_shoot.events.onInputDown.add(@buttonSetShoot, this)

    @button_left.events.onInputUp.add(@buttonSetLeftOff, this)
    @button_right.events.onInputUp.add(@buttonSetRightOff, this)
    @button_jump.events.onInputUp.add(@buttonSetJumpOff, this)
    @button_shoot.events.onInputUp.add(@buttonSetShootOff, this)
    return


  buttonSetLeft: ->
    @Buttons.left = true
    return


  buttonSetRight: ->
    @Buttons.right = true
    return


  buttonSetJump: ->
    @Buttons.jump = true
    return


  buttonSetShoot: ->
    @Buttons.shoot = true
    return


  buttonSetLeftOff: ->
    @Buttons.left = false
    return


  buttonSetRightOff: ->
    @Buttons.right = false
    return


  buttonSetJumpOff: ->
    @Buttons.jump = false
    return


  buttonSetShootOff: ->
    @Buttons.shoot = false
    return