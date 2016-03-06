powerups = null
powerupList = []

class PowerupManager

  spawnFrequency: 5 #seconds

  constructor: ->
    powerups = game.add.group()
    powerups.enableBody = true

    game.time.events.loop(Phaser.Timer.SECOND * @spawnFrequency, @spawnWrapper, this)


  spawnWrapper: ->
    types = [
      'invincible'
      'rapidfire'
      'superjump'
      'superspeed'
    ]
    type = types[Math.floor((Math.random() * types.length))]
    randomX = Math.floor(Math.random() * (GameWorld.width-200))
    @spawn(type, randomX, GameWorld.groundHeight-300)


  spawn: (type, x, y) ->
    switch type
      when 'invincible' then new Invincible(x, y)
      when 'rapidfire'  then new RapidFire(x, y)
      when 'superjump'  then new SuperJump(x, y)
      when 'superspeed' then new SuperSpeed(x, y)