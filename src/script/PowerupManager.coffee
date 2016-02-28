powerups = null
powerupList = []

class PowerupManager

  constructor: ->
    powerups = game.add.group()
    powerups.enableBody = true


  spawn: (type, x, y) ->
    switch type
      when "invincible" then new Invincible(x, y)
      when "rapidfire"  then new RapidFire(x, y)
      when "superjump"  then new SuperJump(x, y)