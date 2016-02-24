// Generated by CoffeeScript 1.10.0
var MenuState;

MenuState = {
  preload: function() {},
  load: function() {},
  create: function() {
    var background, text, title;
    background = game.add.sprite(0, 0, 'background');
    background.tint = 0x333333;
    title = game.add.text(GameResolution.width / 2, GameResolution.height / 3, ' Run!\n Jump!\n Shoot!', {
      font: '64px invasion2000',
      fill: 'white',
      align: 'center'
    });
    title.anchor.set(0.5);
    this.playButton = new Phaser.Button(game, 128, 640, 'button_general', this.playPressed, this, 0, 0, 1, 0);
    this.playButton.tint = 0xE74C3C;
    game.add.existing(this.playButton);
    text = game.add.text(this.playButton.x + this.playButton.width / 2, this.playButton.y + this.playButton.height / 2 - 15, 'Go!', {
      font: '48px invasion2000',
      fill: 'white',
      align: 'center'
    });
    return text.anchor.set(0.5);
  },
  update: function() {},
  playPressed: function() {
    return game.state.start('Gameplay');
  }
};
