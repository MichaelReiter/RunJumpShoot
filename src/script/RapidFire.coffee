class RapidFire extends Powerup
  
  tint: 0xe74c3c #red

  collected: ->
    super
    player.increaseFirerate()