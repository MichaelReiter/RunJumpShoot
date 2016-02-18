MenuState =

  preload: ->

  load: ->

  create: ->
    game.add.sprite(0, 0, 'background')

    @playButton = new Phaser.Button(game, 128, 416, 'button_general', @playPressed, this, 0, 0, 1, 0)
    @playButton.tint = 0xE74C3C #red
    game.add.existing(@playButton)
    text = game.add.text(@playButton.x + @playButton.width / 2, @playButton.y + @playButton.height / 2, 'Play', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    })
    text.anchor.set(0.5)

  update: ->

  playPressed: ->
    game.state.start('Gameplay')