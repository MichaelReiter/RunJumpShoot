class Invincible extends Powerup
  
  tint: 0x9b59b6 #purple

  collected: ->
    super
    player.becomeInvincible()
    console.log "invincible"