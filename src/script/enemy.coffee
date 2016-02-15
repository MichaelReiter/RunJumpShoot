class Enemy extends Entity

  approachDistance: 150

  constructor: ->
    super
  
  followPlayer: ->
    # this.facing = player.facing
    if player.ref.x - this.ref.x > this.approachDistance
      console.log "right"
      this.moveRight()
    else if player.ref.x - this.ref.x < -this.approachDistance
      this.moveLeft()
    else
      console.log "idle"
      this.idle()

    return