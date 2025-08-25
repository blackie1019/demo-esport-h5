import { Assets, Sprite, Graphics } from 'pixi.js'
import SceneBase from './SceneBase.js'
import routerStore from '@app/modules/router/store.js'
import Text from '../components/BaseText.js'

class PreloadScene extends SceneBase {
  // #app: pixi Application instance
  #app
  constructor(app) {
    super()
    this.#app = app
  }
  async enter() {
    const progressBar = await this.setupLoadingScene()

    // Start the loading simulation
    this.simulateLoading(progressBar)
  }
  async exit() {
    this.removeAllListeners()
    // Clean up ticker if it exists
    if (this.loadingTicker) {
      this.#app.ticker.remove(this.loadingTicker)
      this.loadingTicker = null
    }
  }

  simulateLoading(progressBar) {
    let elapsed = 0
    const loadTime = 2 // Simulate a 2-second load

    this.loadingTicker = ticker => {
      elapsed += ticker.deltaMS / 1000
      const progress = Math.min(elapsed / loadTime, 1)
      const percent = Math.floor(progress * 100)

      // Update progress bar fill
      progressBar.fill.clear()
      progressBar.fill.rect(
        progressBar.x,
        progressBar.y,
        progressBar.width * progress,
        progressBar.height
      )
      progressBar.fill.fill('#ffff00')

      // Update loading text
      progressBar.text.text = `正在加載資源 [${percent}%]`

      if (progress >= 1) {
        // Stop this ticker and go to game-menu scene
        this.#app.ticker.remove(this.loadingTicker)
        this.loadingTicker = null
        routerStore.getState().goGameMenu()
      }
    }

    this.#app.ticker.add(this.loadingTicker)
  }

  async setupLoadingScene() {
    const screenW = this.#app.screen.width
    const screenH = this.#app.screen.height

    // 1. Setup background
    const bgTexture = await Assets.load('/assets/preload/bg.jpg')
    const bg = new Sprite(bgTexture)
    bg.height = screenH // Fit height to screen
    bg.scale.x = bg.scale.y // Maintain aspect ratio
    bg.anchor.set(0.5)
    bg.x = screenW / 2 // Center horizontally
    bg.y = screenH / 2 // Center vertically
    this.addChild(bg)

    // 1.5. Setup Slogan
    const sloganTexture = await Assets.load('/assets/preload/slogan.png')
    const slogan = new Sprite(sloganTexture)
    slogan.width = screenW * 0.6 // Set width to 60% of screen width
    slogan.scale.y = slogan.scale.x // Maintain aspect ratio
    slogan.anchor.set(0.5)
    slogan.x = screenW / 2 + 20
    slogan.y = screenH * 0.65 // Position it above the progress bar
    this.addChild(slogan)

    // 2. Setup progress bar
    const barWidth = screenW * 0.8 // 80% of screen width
    const barHeight = 10
    const barX = (screenW - barWidth) / 2
    const barY = screenH * 0.8 // Position at 80% down the screen

    const progressBarBg = new Graphics()
      .rect(barX, barY, barWidth, barHeight)
      .fill({ color: '#000', alpha: 0.5 })
    this.addChild(progressBarBg)

    const progressBarFill = new Graphics()
    this.addChild(progressBarFill)

    // 3. Setup loading text
    const loadingText = Text({
      text: '正在加載資源 [0%]',
      style: {
        fontSize: 12,
        fill: '#fff',
        align: 'center'
      }
    })
    loadingText.anchor.set(0.5)
    loadingText.x = screenW / 2
    loadingText.y = barY + barHeight + 20 // 20px below the bar
    this.addChild(loadingText)

    return {
      fill: progressBarFill,
      x: barX,
      y: barY,
      width: barWidth,
      height: barHeight,
      text: loadingText
    }
  }
}

export default PreloadScene
