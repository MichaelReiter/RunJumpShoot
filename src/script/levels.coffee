GameWorld =
  height: GameResolution.height
  width: 2000
  groundHeight: 608
  l1: 470
  l2: 350
  l3: 230

levels = []

# Nothing for level 0
levels[0] = []

levels[1] = [
  [-150, GameWorld.l2], [250, GameWorld.l1], 
  [700, GameWorld.l2], [1100, GameWorld.l3], 
  [1200, GameWorld.l1], [1650, GameWorld.l2]
]

levels[2] = [
  [200, GameWorld.l1], [600, GameWorld.l2],
  [1000, GameWorld.l3], [1400, GameWorld.l2],
  [1800, GameWorld.l1], [2200, GameWorld.l2]
]

levels[3] = [
  
]