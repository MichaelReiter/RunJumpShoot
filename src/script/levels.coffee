GameWorld =
  height: GameResolution.height
  width: 2000
  groundHeight: 608
  l1: 470
  l2: 350
  l3: 230

Levels =
  one: 
    backgroundTint: 0x3498db
    platformTint: 0x2980b9
    platforms: [
      [-150, GameWorld.l2], [250, GameWorld.l1], 
      [700, GameWorld.l2],  [1100, GameWorld.l3], 
      [1200, GameWorld.l1], [1650, GameWorld.l2]
    ]

  two:
    backgroundTint: 0x2ecc71
    platformTint: 0x27ae60
    platforms: [
      [200, GameWorld.l1],  [600, GameWorld.l2],
      [1000, GameWorld.l3], [1400, GameWorld.l2],
      [1800, GameWorld.l1], [2200, GameWorld.l2]
    ]

  three:
    backgroundTint: 0xe74c3c
    platformTint: 0xc0392b
    platforms: [
      
    ]