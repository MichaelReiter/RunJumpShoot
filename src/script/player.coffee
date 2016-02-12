player = null
bullets = null

PlayerVariables =
  movementSpeed: 200
  jumpSpeed: 300
  bulletSpeed: 300
  playerScale: 2
  facing: "right"
  fireRate: 3     # in bullets/second
  lastFired: 0

# Add player, configure physics and animations
playerInit = () ->
  player = game.add.sprite(32, GameResolution.height/2, 'player')
  player.scale.setTo(PlayerVariables.playerScale, PlayerVariables.playerScale)
  player.smoothed = false
  player.anchor.setTo(.5, 1)
  player.frame = 6

  game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER)

  game.physics.arcade.enable(player)
  player.body.gravity.y = 300
  player.body.collideWorldBounds = true

  # Initialize bullets
  bullets = game.add.group()
  bullets.enableBody = true

  player.animations.add('walking', [0, 1, 2, 3, 4, 5], 12, true)
  player.animations.add('jumping', [6, 7, 8, 9], 12, true)
  return


moveLeft = () ->
  PlayerVariables.facing = "left"
  player.body.velocity.x = -PlayerVariables.movementSpeed
  if player.body.touching.down
    player.animations.play('walking')
  if player.scale.x > 0
    player.scale.x *= -1
  return


moveRight = () ->
  PlayerVariables.facing = "right"
  player.body.velocity.x = PlayerVariables.movementSpeed
  if player.body.touching.down
    player.animations.play('walking')
  if player.scale.x < 0
    player.scale.x *= -1
  return


jump = () ->
  player.body.velocity.y = -PlayerVariables.jumpSpeed
  player.animations.play('jumping')
  return


playerIdle = () ->
  player.animations.stop()
  player.frame = 6
  return


shoot = () ->
  PlayerVariables.lastFired = game.time.now
  if PlayerVariables.facing is "right"
    projectile = bullets.create(player.x+30, player.y-46, 'bullet')
    projectileVector = PlayerVariables.bulletSpeed
  else
    projectile = bullets.create(player.x-40, player.y-46, 'bullet')
    projectileVector = -PlayerVariables.bulletSpeed

  projectile.scale.setTo(1.5, 1.5)
  projectile.body.velocity.x = projectileVector
  projectile.checkWorldBounds = true
  projectile.outOfBoundsKill = true
  return