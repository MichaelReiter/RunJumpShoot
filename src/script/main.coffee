# This is the resolution of the iPhone 4/4s
GameResolution =
  width: 640
  height: 480

game = null

main = () ->
  game = new Phaser.Game(GameResolution.width, GameResolution.height, Phaser.AUTO, 'gameWindow')
  # game.state.add('LevelSelect', LevelSelectState, false)
  # game.state.add('Gameplay', GameplayState, false)
  # game.state.add('TitleScreen', TitleScreenState, false)
  # game.state.add('Options', OptionsState, false)
  # game.state.add('Loading', LoadingState, true)
