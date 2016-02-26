class Invincible extends Powerup
  
  constructor: (x, y) ->
    super(x, y, 'powerup_invincible')


  collected: ->
    console.log "collected"
    super
    player.becomeInvincible()