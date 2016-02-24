class InputManager

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

    @tintButtons(currentLevel)


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

    if @keyboard.up.isDown or @Buttons.jump
      player.extendJump()

    # Enable shooting
    if player.canShoot() and (@spacebar.isDown or @Buttons.shoot)
      player.shoot()


  buttonMovement: ->
    @button_left.events.onInputDown.add(@buttonSetLeft, this)
    @button_right.events.onInputDown.add(@buttonSetRight, this)
    @button_jump.events.onInputDown.add(@buttonSetJump, this)
    @button_shoot.events.onInputDown.add(@buttonSetShoot, this)

    @button_left.events.onInputUp.add(@buttonSetLeftOff, this)
    @button_right.events.onInputUp.add(@buttonSetRightOff, this)
    @button_jump.events.onInputUp.add(@buttonSetJumpOff, this)
    @button_shoot.events.onInputUp.add(@buttonSetShootOff, this)


  tintButtons: (level) ->
    @button_left.tint = Levels[level].tint
    @button_right.tint = Levels[level].tint
    @button_jump.tint = Levels[level].tint
    @button_shoot.tint = Levels[level].tint


  buttonSetLeft: ->
    @Buttons.left = true


  buttonSetRight: ->
    @Buttons.right = true


  buttonSetJump: ->
    @Buttons.jump = true


  buttonSetShoot: ->
    @Buttons.shoot = true


  buttonSetLeftOff: ->
    @Buttons.left = false


  buttonSetRightOff: ->
    @Buttons.right = false


  buttonSetJumpOff: ->
    @Buttons.jump = false


  buttonSetShootOff: ->
    @Buttons.shoot = false