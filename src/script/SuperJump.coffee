class SuperJump extends Powerup
  
  tint: 0x16a085 #teal

  collected: ->
    super
    player.enableSuperJump()