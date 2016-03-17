class AudioManager

  constructor: ->
    @music      = game.add.audio('music')
    @explosion  = game.add.audio('explosion')
    @jump       = game.add.audio('jump')
    @shot       = game.add.audio('shot')
    @enemyShot  = game.add.audio('enemyShot')
    @hit        = game.add.audio('hit')
    @powerup    = game.add.audio('powerup')
    @spawn      = game.add.audio('spawn')

    # @playMusic()
    # game.time.events.loop(Phaser.Timer.SECOND * 12.387, @playMusic, this)


  playSound: (sound) ->
    switch sound
      when 'explosion' then @explosion.play()
      when 'jump'      then @jump.play()
      when 'shot'      then @shot.play()
      when 'enemyShot' then @enemyShot.play()
      when 'hit'       then @hit.play()
      when 'powerup'   then @powerup.play()
      when 'spawn'     then @spawn.play()


  playMusic: ->
    @music.play()


  stopPlayingMusic: ->
    @music.stop()