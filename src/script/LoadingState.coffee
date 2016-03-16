LoadingState =

  resizeGame: ->
    scale = Math.min(window.innerWidth / GameResolution.width, window.innerHeight / GameResolution.height)
    game.scale.setUserScale(scale, scale)
    game.scale.refresh()


  setScaling: ->
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true
    game.scale.setResizeCallback(@resizeGame, this)
    @resizeGame()


  preload: ->
    game.load.image('background', 'img/background.png')
    game.load.image('bricks', 'img/bricks.png')
    game.load.image('platform', 'img/platform.png')
    game.load.image('bullet', 'img/player_bullet.png')
    game.load.spritesheet('heart', 'img/heart.png', 44, 38, 2)
    game.load.image('powerup', 'img/powerup.png')
    game.load.image('shell', 'img/shell.png')

    game.load.spritesheet('button_rectangle', 'img/button_rectangle.png', 384, 128)
    game.load.spritesheet('button_square', 'img/button_square.png', 128, 128)
    game.load.image('button_left', 'img/button_left.png')
    game.load.image('button_right', 'img/button_right.png')
    game.load.image('button_jump', 'img/button_jump.png')
    game.load.image('button_shoot', 'img/button_shoot.png')

    game.load.spritesheet('player', 'img/player.png', 39, 34)
    game.load.spritesheet('enemy', 'img/enemy.png', 39, 34)
    game.load.spritesheet('explosion', 'img/explosion.png', 33, 32)

    game.load.audio('music', 'audio/music.wav')
    game.load.audio('explosion', 'audio/explosion.wav')
    game.load.audio('jump', 'audio/jump.wav')
    game.load.audio('shot', 'audio/shot.wav')
    game.load.audio('enemyShot', 'audio/enemyShot.wav')
    game.load.audio('hit', 'audio/hit.wav')
    game.load.audio('powerup', 'audio/powerup.wav')
    game.load.audio('spawn', 'audio/spawn.wav')


  load: ->

  create: ->
    @setScaling()
    game.state.start('Menu')

  update: ->