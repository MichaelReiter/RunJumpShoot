enemies = null
enemyList = []

class EnemyManager

  enemyOnScreen: false

  constructor: ->
    enemies = game.add.group()
    enemies.enableBody = true


  spawn: (x, y) ->
    @enemyOnScreen = true
    enemy = new Enemy(x, y, 'enemy')
    enemies.add(enemy.ref)
    enemyList.push(enemy)


  spawnLoop: ->
    unless @enemyOnScreen
      for i in [1..1]
        @spawn(player.ref.x+i*200, GameWorld.groundHeight)