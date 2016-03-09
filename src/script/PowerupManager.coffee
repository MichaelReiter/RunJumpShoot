powerups = null
powerupList = []

class PowerupManager

  spawnFrequency: 7 #seconds
  maxPowerups: 3

  constructor: ->
    @powerupsOnScreen = 0
    powerups = game.add.group()
    powerups.enableBody = true

    game.time.events.loop(Phaser.Timer.SECOND * @spawnFrequency, @spawnWrapper, this)


  spawnWrapper: ->
    types = [
      'invincible'
      'rapidfire'
      'superjump'
      'superspeed'
      'heart'
    ]
    type = types[Math.floor((Math.random() * types.length))]
    randomX = Math.floor(Math.random()*(player.ref.x + 300) + player.ref.x - 300)
    randomY = Math.floor(Math.random()*(GameWorld.groundHeight-1000) + GameWorld.groundHeight-100)
    @spawn(type, randomX, randomY) if @powerupsOnScreen < @maxPowerups


  spawn: (type, x, y) ->
    @powerupsOnScreen++
    switch type
      when 'invincible' then new Invincible(x, y)
      when 'rapidfire'  then new RapidFire(x, y)
      when 'superjump'  then new SuperJump(x, y)
      when 'superspeed' then new SuperSpeed(x, y)
      when 'heart'      then new Heart(x, y)