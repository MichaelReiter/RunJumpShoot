enemies = null
enemyList = []

class EnemyManager

  constructor: ->
    enemies = game.add.group()
    enemies.enableBody = true


  spawn: (x, y) ->
    enemy = new Enemy(x, y, 'enemy')
    enemies.add(enemy.ref)
    enemyList.push(enemy)