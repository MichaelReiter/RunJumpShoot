enemies = null
enemyList = []

class EnemyManager

  maxEnemies: 15

  constructor: ->
    @enemiesOnScreen = 0
    enemies = game.add.group()
    enemies.enableBody = true

    switch currentLevel
      when 'one'   then @spawnFrequency = 3   #seconds
      when 'two'   then @spawnFrequency = 2.5 #seconds
      when 'three' then @spawnFrequency = 2   #seconds
      when 'four'  then @spawnFrequency = 1.5 #second

    game.time.events.loop(Phaser.Timer.SECOND * @spawnFrequency, @spawnWrapper, this)


  spawn: (x, y) ->
    @enemiesOnScreen++
    enemy = new Enemy(x, y)
    enemies.add(enemy.ref)
    enemyList.push(enemy)
    audioManager.playSound('spawn')


  spawnWrapper: ->
    if @enemiesOnScreen < @maxEnemies
      x = Math.floor(Math.random()*(player.ref.x + 300) + player.ref.x - 300)
      while Math.abs(player.ref.x - x) <= 175
        x = Math.floor(Math.random()*(player.ref.x + 300) + player.ref.x - 300)
      y = Math.floor(Math.random()*(GameWorld.groundHeight-1000) + GameWorld.groundHeight-100)
      new Explosion(x-60, y-95, 0xffffff, player.scale*1.5, 10)
      @spawn(x, y)