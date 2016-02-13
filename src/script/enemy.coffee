enemy = null

class Enemy
  constructor: (x, y) ->
    enemy = game.add.sprite(x, y, 'enemy')