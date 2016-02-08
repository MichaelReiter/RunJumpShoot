# Add player, configure physics and animations
playerInit = () ->
  player = game.add.sprite(32, game.world.height - 250, 'player')
  player.scale.setTo(PlayerVariables.playerScale, PlayerVariables.playerScale)
  player.smoothed = false
  player.anchor.setTo(.5, 1)

  game.physics.arcade.enable(player)
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true

  player.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true)
  player.animations.add('jumping', [6, 7, 8, 9], 12, true)

  return


playerMovement = () ->
  player.body.velocity.x = 0

  # Handle left/right movement
  if keyboard.left.isDown
    player.body.velocity.x = -PlayerVariables.movementSpeed
    if player.body.touching.down
      player.animations.play('walking')
    if player.scale.x > 0
      player.scale.x *= -1
  else if keyboard.right.isDown
    player.body.velocity.x = PlayerVariables.movementSpeed
    if player.body.touching.down
      player.animations.play('walking')
    if player.scale.x < 0
      player.scale.x *= -1
  else
    player.animations.stop()
    player.frame = 6

  # enable jump if player is touching the ground
  if player.body.touching.down and keyboard.up.isDown
    player.body.velocity.y = -PlayerVariables.jumpSpeed
    player.animations.play('jumping')
  if spacebar.isDown
    shoot(player.x, player.y, 300)

  return


shoot = (x, y, velocity) ->
  projectile = stars.create(x, y-50, 'star')
  direction = player.body.velocity.x / Math.abs(PlayerVariables.movementSpeed)
  if direction is 0
    
  else
    projectileVector = velocity * direction
  projectile.body.velocity.x = projectileVector
  projectile.body.gravity.y = 300
  return


collectStar = (player, star) ->
  star.kill()
  score += 10
  scoreText.text = 'Score: ' + score
  return