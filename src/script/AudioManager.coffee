class AudioManager

  constructor: ->
    @music_audio     = game.add.audio('music')#new Phaser.Sound(game, 'music', 1, true)
    @explosion_audio = game.add.audio('explosion')
    @jump_audio      = game.add.audio('jump')
    @shot_audio      = game.add.audio('shot')
    @hit_audio       = game.add.audio('hit')


  playSound: (sound) ->
    switch sound
      when "music"     then @music_audio.play()
      when "explosion" then @explosion_audio.play()
      when "jump"      then @jump_audio.play()
      when "shot"      then @shot_audio.play()
      when "hit"       then @hit_audio.play()