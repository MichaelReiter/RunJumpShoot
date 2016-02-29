enemies = null
enemyList = []

class EnemyManager

  enemiesOnScreen: 0

  constructor: ->
    enemies = game.add.group()
    enemies.enableBody = true


  spawn: (x, y) ->
    @enemiesOnScreen++
    enemy = new Enemy(x, y)
    enemies.add(enemy.ref)
    enemyList.push(enemy)


  spawnLoop: ->
    if @enemiesOnScreen is 0
      for i in [1..3]
        @spawn(player.ref.x+i*200, GameWorld.groundHeight)