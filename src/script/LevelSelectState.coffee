LevelSelectState =

  preload: ->

  load: ->

  create: ->
    background = game.add.sprite(0, 0, 'background')
    background.tint = 0x333333
    title = game.add.text(GameResolution.width/2, GameResolution.height*0.25, 'Level Select', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    })
    title.anchor.set(0.5)

    @levelOne = new Phaser.Button(game, GameResolution.width*0.2, GameResolution.height*0.5, 'button_square', @levelSelected, {level: 'one'}, 0, 0, 1, 0)
    @levelOne.tint = Levels['one'].tint
    game.add.existing(@levelOne)
    text = game.add.text(@levelOne.x + @levelOne.width / 2, @levelOne.y + @levelOne.height / 2 - 15, '1', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    })
    text.anchor.set(0.5)

    @levelTwo = new Phaser.Button(game, GameResolution.width*0.6, GameResolution.height*0.5, 'button_square', @levelSelected, {level: 'two'}, 0, 0, 1, 0)
    @levelTwo.tint = Levels['two'].tint
    game.add.existing(@levelTwo)
    text = game.add.text(@levelTwo.x + @levelTwo.width / 2, @levelTwo.y + @levelTwo.height / 2 - 15, '2', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    })
    text.anchor.set(0.5)

    @levelThree = new Phaser.Button(game, GameResolution.width*0.2, GameResolution.height*0.75, 'button_square', @levelSelected, {level: 'three'}, 0, 0, 1, 0)
    @levelThree.tint = Levels['three'].tint
    game.add.existing(@levelThree)
    text = game.add.text(@levelThree.x + @levelThree.width / 2, @levelThree.y + @levelThree.height / 2 - 15, '3', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    })
    text.anchor.set(0.5)

    @levelFour = new Phaser.Button(game, GameResolution.width*0.6, GameResolution.height*0.75, 'button_square', @levelSelected, {level: 'four'}, 0, 0, 1, 0)
    @levelFour.tint = Levels['four'].tint
    game.add.existing(@levelFour)
    text = game.add.text(@levelFour.x + @levelFour.width / 2, @levelFour.y + @levelFour.height / 2 - 15, '4', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    })
    text.anchor.set(0.5)

  update: ->

  levelSelected: ->
    currentLevel = @level
    game.state.start('Gameplay')