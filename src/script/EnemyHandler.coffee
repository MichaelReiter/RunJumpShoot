enemies = null

class EnemyHandler

  constructor: ->
    enemies = game.add.group()
    enemies.enableBody = true

    enemy = new Enemy(100, GameResolution.height/2, 'enemy')
    enemies.add(enemy.ref)