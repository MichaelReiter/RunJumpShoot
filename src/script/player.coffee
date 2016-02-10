player = null
bullets = null

PlayerVariables =
  movementSpeed: 150
  jumpSpeed: 300
  bulletSpeed: 300
  playerScale: 1
  facing: "right"
  fireRate: 3     # in bullets/second
  lastFired: 0

# Add player, configure physics and animations
playerInit = () ->
  player = game.add.sprite(32, 100, 'player')
  player.scale.setTo(PlayerVariables.playerScale, PlayerVariables.playerScale)
  player.smoothed = false
  player.anchor.setTo(.5, 1)

  game.physics.arcade.enable(player)
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true

  # Initialize bullets
  bullets = game.add.group()
  bullets.enableBody = true

  player.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true)
  player.animations.add('jumping', [6, 7, 8, 9], 12, true)
  return


playerMovement = () ->
  player.body.velocity.x = 0

  # Handle left/right movement
  if keyboard.left.isDown
    PlayerVariables.facing = "left"
    player.body.velocity.x = -PlayerVariables.movementSpeed
    if player.body.touching.down
      player.animations.play('walking')
    if player.scale.x > 0
      player.scale.x *= -1
  else if keyboard.right.isDown
    PlayerVariables.facing = "right"
    player.body.velocity.x = PlayerVariables.movementSpeed
    if player.body.touching.down
      player.animations.play('walking')
    if player.scale.x < 0
      player.scale.x *= -1
  else
    player.animations.stop()
    player.frame = 6

  # Enable jumping if player is touching the ground
  if player.body.touching.down and keyboard.up.isDown
    player.body.velocity.y = -PlayerVariables.jumpSpeed
    player.animations.play('jumping')

  # Enable shooting
  if (game.time.now - PlayerVariables.lastFired) > (1000 / PlayerVariables.fireRate) and spacebar.isDown
    PlayerVariables.lastFired = game.time.now
    shoot()

  return


shoot = () ->
  if PlayerVariables.facing is "right"
    projectile = bullets.create(player.x+15, player.y-24, 'bullet')
    projectileVector = PlayerVariables.bulletSpeed
  else
    projectile = bullets.create(player.x-20, player.y-24, 'bullet')
    projectileVector = -PlayerVariables.bulletSpeed

  projectile.body.velocity.x = projectileVector
  return