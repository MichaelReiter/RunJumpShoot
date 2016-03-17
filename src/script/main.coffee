GameResolution =
  width: 640
  height: 960

game = null
music = null

main = ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'game')
  game.state.add('Gameplay', GameplayState, false)
  game.state.add('Menu', MenuState, false)
  game.state.add('LevelSelect', LevelSelectState, false)
  game.state.add('Loading', LoadingState, true)

  playMusic = ->
    music.play()
  
  setInterval(->
    playMusic()
    return
  , 12437)

  setTimeout(->
    music = game.add.audio('music')
    playMusic()
    return
  , 50)
