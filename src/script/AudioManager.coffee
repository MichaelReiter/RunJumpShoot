class AudioManager

  constructor: ->
    @music     = game.add.audio('music')#new Phaser.Sound(game, 'music', 1, true)
    @explosion = game.add.audio('explosion')
    @jump      = game.add.audio('jump')
    @shot      = game.add.audio('shot')
    @hit       = game.add.audio('hit')


  playSound: (sound) ->
    switch sound
      when "music"     then @music.play()
      when "explosion" then @explosion.play()
      when "jump"      then @jump.play()
      when "shot"      then @shot.play()
      when "hit"       then @hit.play()