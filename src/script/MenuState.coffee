MenuState =

  preload: ->

  load: ->

  create: ->
    background = game.add.sprite(0, 0, 'background')
    background.tint = 0x555555
    title = game.add.text(GameResolution.width/2, GameResolution.height/3, ' Run!\n Jump!\n Shoot!', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    })
    title.anchor.set(0.5)

    @playButton = new Phaser.Button(game, 128, 640, 'button_general', @playPressed, this, 0, 0, 1, 0)
    @playButton.tint = 0xE74C3C #red
    game.add.existing(@playButton)
    text = game.add.text(@playButton.x + @playButton.width / 2, @playButton.y + @playButton.height / 2 - 15, 'Go!', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    })
    text.anchor.set(0.5)

  update: ->

  playPressed: ->
    game.state.start('Gameplay')