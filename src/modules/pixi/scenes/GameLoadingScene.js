import { Container, Graphics } from 'pixi.js'
import SceneBase from './SceneBase.js'
import routerStore from '@app/modules/router/store.js'
import Text from '../components/BaseText.js'

class GameLoadingScene extends SceneBase {
  constructor() {
    super()
    this.gameIcon = null
    this.lightBeam = null
    this.animationTime = 0
    this.loadingTimer = null
  }

  async enter(data) {
    // Get game name from data or use default
    this.gameName = data?.gameName || '反恐精英'

    // Create dark background
    this.createBackground()

    // Create light beam effect
    this.createLightBeam()

    // Create game icon
    this.createGameIcon()

    // Start animations
    this.startAnimations()

    // Set timer to transition to lobby after 2 seconds
    this.loadingTimer = setTimeout(() => {
      routerStore.getState().goGameLobby({ gameName: this.gameName })
    }, 2000)
  }

  createBackground() {
    const bg = new Graphics()
    bg.rect(0, 0, window.innerWidth, window.innerHeight)
    bg.fill({ color: 0x0a0a0a }) // Very dark background
    this.addChild(bg)
  }

  createLightBeam() {
    const lightContainer = new Container()
    lightContainer.position.set(window.innerWidth / 2, 0)

    // Create multiple layers for realistic light effect
    this.createLightGlow(lightContainer)
    this.createMainBeam(lightContainer)
    this.createInnerCore(lightContainer)

    this.lightBeam = lightContainer
    this.addChild(lightContainer)
  }

  createLightGlow(container) {
    // Outer glow - very soft and wide
    const outerGlow = new Graphics()
    const glowSteps = 15
    const maxGlowWidth = 200
    const glowHeight = window.innerHeight * 0.75

    for (let i = 0; i < glowSteps; i++) {
      const progress = i / glowSteps
      const y = glowHeight * progress
      const width = maxGlowWidth * (1 - progress * 0.7)
      const alpha = (1 - progress) * 0.08 * (1 - progress * 0.5)

      outerGlow.ellipse(0, y, width / 2, 20)
      outerGlow.fill({ color: 0x87ceeb, alpha })
    }

    container.addChild(outerGlow)
  }

  createMainBeam(container) {
    // Main beam with realistic tapering
    const mainBeam = new Graphics()
    const beamSteps = 25
    const maxBeamWidth = 80
    const beamHeight = window.innerHeight * 0.7

    for (let i = 0; i < beamSteps; i++) {
      const progress = i / beamSteps
      const y = beamHeight * progress
      const width = maxBeamWidth * (1 - progress * 0.6)
      const alpha = (1 - progress * 0.7) * 0.3

      // Create tapered beam segments
      mainBeam.moveTo(-width / 2, y)
      mainBeam.lineTo(width / 2, y)
      mainBeam.lineTo((width / 2) * 0.9, y + beamHeight / beamSteps)
      mainBeam.lineTo((-width / 2) * 0.9, y + beamHeight / beamSteps)
      mainBeam.closePath()
      mainBeam.fill({ color: 0xadd8e6, alpha })
    }

    container.addChild(mainBeam)
  }

  createInnerCore(container) {
    // Bright inner core
    const innerCore = new Graphics()
    const coreSteps = 20
    const maxCoreWidth = 25
    const coreHeight = window.innerHeight * 0.65

    for (let i = 0; i < coreSteps; i++) {
      const progress = i / coreSteps
      const y = coreHeight * progress
      const width = maxCoreWidth * (1 - progress * 0.8)
      const alpha = (1 - progress * 0.6) * 0.8

      innerCore.ellipse(0, y, width / 2, 8)
      innerCore.fill({ color: 0xffffff, alpha })
    }

    // Add very bright center line
    const centerLine = new Graphics()
    centerLine.rect(-2, 0, 4, coreHeight * 0.4)
    centerLine.fill({ color: 0xffffff, alpha: 0.9 })

    container.addChild(innerCore)
    container.addChild(centerLine)
  }

  createGameIcon() {
    const iconContainer = new Container()
    iconContainer.position.set(window.innerWidth / 2, window.innerHeight / 2)

    // Game icon background (placeholder)
    const iconBg = new Graphics()
    const iconSize = 80
    iconBg.roundRect(-iconSize / 2, -iconSize / 2, iconSize, iconSize, 8)
    iconBg.fill({ color: 0x2d3748 })
    iconBg.stroke({ color: 0x4a5568, width: 2 })
    iconContainer.addChild(iconBg)

    // Game icon image placeholder
    const iconImage = new Graphics()
    iconImage.roundRect(
      -iconSize / 2 + 4,
      -iconSize / 2 + 4,
      iconSize - 8,
      iconSize - 24,
      4
    )
    iconImage.fill({ color: 0x1a202c })
    iconContainer.addChild(iconImage)

    // Game name text
    const gameText = Text({
      text: this.gameName,
      style: {
        fontSize: 12,
        fill: 0xffffff,
        align: 'center'
      }
    })
    gameText.anchor.set(0.5)
    gameText.position.set(0, iconSize / 2 - 8)
    iconContainer.addChild(gameText)

    // Add glow effect around icon
    const iconGlow = new Graphics()
    iconGlow.roundRect(
      -iconSize / 2 - 10,
      -iconSize / 2 - 10,
      iconSize + 20,
      iconSize + 20,
      12
    )
    iconGlow.fill({ color: 0x87ceeb, alpha: 0.2 })
    iconContainer.addChildAt(iconGlow, 0)

    this.gameIcon = iconContainer
    this.addChild(iconContainer)
  }

  startAnimations() {
    // Initial fade in
    this.gameIcon.alpha = 0
    this.lightBeam.alpha = 0

    // Animate light beam appearing
    const lightFadeIn = () => {
      this.lightBeam.alpha += 0.02
      if (this.lightBeam.alpha < 1) {
        requestAnimationFrame(lightFadeIn)
      }
    }
    lightFadeIn()

    // Animate icon appearing after light beam
    setTimeout(() => {
      const iconFadeIn = () => {
        this.gameIcon.alpha += 0.03
        if (this.gameIcon.alpha < 1) {
          requestAnimationFrame(iconFadeIn)
        }
      }
      iconFadeIn()
    }, 800)
  }

  async exit() {
    this.removeAllListeners()

    // Clear timer if it exists
    if (this.loadingTimer) {
      clearTimeout(this.loadingTimer)
      this.loadingTimer = null
    }
  }

  update(dt) {
    this.animationTime += dt

    // Animate light beam with subtle variations
    if (this.lightBeam) {
      const baseIntensity = 0.9
      const flicker = Math.sin(this.animationTime * 3) * 0.05
      const pulse = Math.sin(this.animationTime * 0.8) * 0.1
      this.lightBeam.alpha = baseIntensity + flicker + pulse

      // Slight horizontal sway
      const sway = Math.sin(this.animationTime * 0.5) * 2
      this.lightBeam.position.x = window.innerWidth / 2 + sway
    }

    // Subtle icon floating animation
    if (this.gameIcon) {
      const float = Math.sin(this.animationTime * 1.2) * 2
      this.gameIcon.position.y = window.innerHeight / 2 + float

      // Add subtle glow pulsing to icon
      const glowPulse = 0.8 + Math.sin(this.animationTime * 2) * 0.2
      if (this.gameIcon.children[0]) {
        this.gameIcon.children[0].alpha = glowPulse * 0.3
      }
    }
  }
}

export default GameLoadingScene
