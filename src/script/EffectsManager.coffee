class EffectsManager
  
  constructor: ->
    @shells = game.add.group()
    @shells.enableBody = true