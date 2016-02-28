class SuperSpeed extends Powerup
  
  tint: 0xf1c40f #golden

  collected: ->
    super
    player.enableSuperSpeed()