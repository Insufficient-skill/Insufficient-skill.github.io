class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value) {
    super(scene, 0, 0, 'card')
    this.scene = scene
    this.value = value
    this.setOrigin(0.5, 0.5)
    this.scene.add.existing(this)
    this.setInteractive()
    this.opened = false
  }

  init(position) {
    this.position = position
    this.close()
    this.setPosition(-this.width, -this.height)
  }

  flip(callback) {
    this.scene.tweens.add({
      targets: this,
      scaleX: 0,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        this.show(callback)
      }
    })
  }

  move(params) {
    this.scene.tweens.add({
      targets: this,
      x: params.x,
      y: params.y,
      delay: params.delay,
      ease: 'Linear',
      duration: 250,
      onComplete: () => {
        if (params.callback) {
          params.callback()
        }
      }
    })
  }

  show(callback) {
    const texture = this.opened ? 'card' + this.value : 'card'
    this.setTexture(texture)
    this.scene.tweens.add({
      targets: this,
      scaleX: 1,
      ease: 'Linear',
      duration: 150,
      onComplete: () => {
        if (callback) {
          callback()
        }
      }
    })
  }

  open(callback) {
    this.opened = true
    this.flip(callback)
  }

  close() {
    if (this.opened) {
      this.opened = false
      this.flip()
    }
  }
}
