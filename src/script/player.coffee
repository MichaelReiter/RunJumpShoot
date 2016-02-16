playerBullets = null

class Player extends Entity

  hit: (entity, bullet) ->
    healthManager.loseHealth()
    super
    return