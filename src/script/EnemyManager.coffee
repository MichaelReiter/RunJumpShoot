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
      @spawn(player.ref.x+500, GameWorld.groundHeight)
      # game.time.events.add(Phaser.Timer.SECOND * 0.5, @spawn, this)