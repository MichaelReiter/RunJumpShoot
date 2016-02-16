playerBullets = null

class Player extends Entity

  takeDamage: ->
    healthManager.loseHealth()
    return