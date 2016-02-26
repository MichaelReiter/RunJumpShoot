class RapidFire extends Powerup
  
  constructor: (x, y) ->
    super(x, y, 'powerup_invincible')


  collected: ->
    super
    player.increaseFirerate()