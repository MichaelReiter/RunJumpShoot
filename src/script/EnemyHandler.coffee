enemies = null
enemyList = []

class EnemyHandler

  constructor: ->
    enemies = game.add.group()
    enemies.enableBody = true


  spawn: (x, y) ->
    enemy = new Enemy(x, y, 'enemy')
    enemies.add(enemy.ref)
    enemyList.push(enemy)
    return