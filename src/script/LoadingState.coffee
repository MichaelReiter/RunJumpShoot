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
    game.load.image('platform', 'img/platform.png')
    game.load.image('bullet', 'img/bullet.png')
    game.load.image('heart', 'img/heart.png')
    game.load.image('powerup', 'img/powerup.png')

    game.load.spritesheet('button_rectangle', 'img/button_rectangle.png', 384, 128)
    game.load.spritesheet('button_square', 'img/button_square.png', 128, 128)
    game.load.image('button_left', 'img/button_left.png')
    game.load.image('button_right', 'img/button_right.png')
    game.load.image('button_jump', 'img/button_jump.png')
    game.load.image('button_shoot', 'img/button_shoot.png')

    game.load.spritesheet('player', 'img/player.png', 39, 34)
    game.load.spritesheet('enemy', 'img/enemy.png', 39, 34)


  load: ->

  create: ->
    @setScaling()
    loadText = game.add.text(GameResolution.width/2, GameResolution.height/3, ' Run!\n Jump!\n Shoot!', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    })
    game.state.start('Menu')

  update: ->