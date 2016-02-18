GameResolution =
  width: 640
  height: 960

game = null

main = ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'game')
  game.state.add('Gameplay', GameplayState, false)
  game.state.add('Menu', MenuState, false)
  game.state.add('Loading', LoadingState, true)