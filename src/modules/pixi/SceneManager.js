import { Container } from 'pixi.js'

function tween(app, obj, prop, to, durationSec) {
  return new Promise(resolve => {
    const from = obj[prop]
    let elapsed = 0
    const tick = () => {
      const dt = app.ticker.deltaMS / 1000
      elapsed += dt
      const p = Math.min(elapsed / durationSec, 1)
      obj[prop] = from + (to - from) * p
      if (p === 1) {
        app.ticker.remove(tick)
        resolve()
      }
    }
    app.ticker.add(tick)
  })
}

export default class SceneManager extends Container {
  constructor(app) {
    super()
    this.app = app
    this.current = null
    this.app.ticker.add(this.#update, this)
  }

  async switchTo(scene, data) {
    const prev = this.current
    if (prev) {
      await tween(this.app, prev, 'alpha', 0, 0.2)
      await prev.exit(data)
      this.removeChild(prev)
      prev.destroy({ children: true })
    }
    this.current = scene
    scene.alpha = 0
    this.addChild(scene)
    await scene.enter(data)
    await tween(this.app, scene, 'alpha', 1, 0.2)
  }

  #update() {
    if (this.current && this.current.update) {
      this.current.update(this.app.ticker.deltaMS / 1000)
    }
  }
}
