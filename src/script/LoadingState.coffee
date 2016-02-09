LoadingState =

  resizeGame: () ->
    scale = Math.min(window.innerWidth / GameResolution.width, window.innerHeight / GameResolution.height)
    game.scale.setUserScale(scale, scale)
    game.scale.refresh()


  setScaling: () ->
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
    game.scale.pageAlignHorizontally = true
    game.scale.pageAlignVertically = true

    console.log game

    game.scale.setResizeCallback(this.resizeGame, this)
    this.resizeGame()


  preload: () ->
    game.load.image('background', 'img/background.png')
    game.load.image('platform', 'img/platform.png')
    game.load.image('star', 'img/star.png')
    game.load.image('bullet', 'img/bullet.png')
    game.load.spritesheet('player', 'img/player.png', 39, 34)
    return


  load: () ->


  create: () ->
    # this.setScaling()
    game.state.start('Gameplay')
    return


  update: () ->