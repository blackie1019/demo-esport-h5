import { Container, Graphics, Assets, Sprite } from 'pixi.js'
import axios from 'axios'
import routerStore from '@app/modules/router/store.js'
import SceneBase from './SceneBase.js'
import { BASE_SETTING } from '../constants.js'
import Text from '../components/BaseText.js'

const SETTING = {
  ...BASE_SETTING,
  LEFT_PANEL_WIDTH: 80,
  CATEGORY_WIDTH: 70,
  CATEGORY_HEIGHT: 50,
  BANNER_HEIGHT: 150
}

class GameMenuScene extends SceneBase {
  #selectedCategoryCode = null
  #gameData = null
  #categories = null

  constructor() {
    super()
    this.menuItems = []
    this.categories = []
    this.categoryButtons = []
    this.gameGridContainer = null
  }

  async enter() {
    await this.getData()

    // Create background
    this.createBackground()

    // Create banner
    this.createBanner()

    // Create category navigation
    this.createCategoryNav()

    // Create game grid
    this.createGameGrid()

    // Make scene interactive
    this.eventMode = 'static'
  }

  async getData() {
    const [games, categories] = await Promise.all([
      axios.get('/assets/game-menu/games.json'),
      axios.get('/assets/game-menu/categories.json')
    ])
    this.#gameData = games.data
    this.#categories = categories.data
    this.#selectedCategoryCode = this.#categories[0].code
  }

  createBackground() {
    const bg = new Graphics()
    bg.rect(0, 0, window.innerWidth, window.innerHeight)
    bg.fill({ color: 0x1a1a2e })
    this.addChild(bg)
  }

  async createBanner() {
    const bgTexture = await Assets.load('/assets/game-menu/banner.jpg')
    const bg = new Sprite(bgTexture)
    bg.height = SETTING.BANNER_HEIGHT
    bg.width = window.innerWidth - SETTING.SPACING * 2
    bg.scale.x = bg.scale.y
    bg.anchor.set(0.5)
    bg.x = window.innerWidth / 2
    bg.y = SETTING.TOP_PANEL_HEIGHT + SETTING.BANNER_HEIGHT / 2
    this.addChild(bg)
  }

  createCategoryNav() {
    const navContainer = new Container()
    navContainer.position.set(
      SETTING.SPACING,
      SETTING.TOP_PANEL_HEIGHT + SETTING.BANNER_HEIGHT + SETTING.SPACING
    )

    const categoryWidth = SETTING.CATEGORY_WIDTH
    const categoryHeight = SETTING.CATEGORY_HEIGHT
    const spacing = SETTING.SPACING

    this.#categories.forEach((category, index) => {
      const categoryBtn = new Container()
      const isSelected = category.code === this.#selectedCategoryCode

      // Category background
      const bg = new Graphics()
      this.updateCategoryButtonStyle(
        bg,
        categoryWidth,
        categoryHeight,
        isSelected
      )
      categoryBtn.addChild(bg)

      // Category text
      const text = Text({
        text: category.name,
        style: {
          fontSize: 16,
          fill: 0xffffff
        }
      })
      text.anchor.set(0.5)
      text.position.set(categoryWidth / 2, categoryHeight / 2)
      categoryBtn.addChild(text)

      categoryBtn.position.set(0, index * (categoryHeight + spacing))
      categoryBtn.eventMode = 'static'
      categoryBtn.cursor = 'pointer'

      // Store references for easy access
      categoryBtn.category = category
      categoryBtn.bg = bg
      categoryBtn.categoryWidth = categoryWidth
      categoryBtn.categoryHeight = categoryHeight

      categoryBtn.on('pointertap', () => {
        this.#selectedCategoryCode = category.code
        this.updateCategorySelection()
        this.createGameGrid() // Refresh game grid with filtered data
      })

      navContainer.addChild(categoryBtn)
      this.categories.push(categoryBtn)
      this.categoryButtons.push(categoryBtn)
    })

    this.addChild(navContainer)
  }

  createGameGrid() {
    // Remove existing grid if it exists
    if (this.gameGridContainer) {
      this.removeChild(this.gameGridContainer)
      this.gameGridContainer.destroy({ children: true })
      this.menuItems = []
    }

    const leftPanelWidth = SETTING.LEFT_PANEL_WIDTH // Space for category nav
    const gridContainer = new Container()
    gridContainer.position.set(
      leftPanelWidth + SETTING.SPACING,
      SETTING.TOP_PANEL_HEIGHT + SETTING.BANNER_HEIGHT + SETTING.SPACING
    )
    this.gameGridContainer = gridContainer

    const cardWidth = 90
    const cardHeight = 110
    const spacing = 10
    const availableWidth = window.innerWidth - leftPanelWidth - 10
    const cols = Math.floor(availableWidth / (cardWidth + spacing))
    const maxRows = Math.floor(
      (window.innerHeight - 100) / (cardHeight + spacing)
    )
    const maxCards = cols * maxRows

    const filteredData = this.#gameData.filter(
      game => game.categoryCode === this.#selectedCategoryCode
    )

    filteredData.slice(0, maxCards).forEach((game, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols

      const card = this.createGameCard(game.name, cardWidth, cardHeight)
      card.position.set(
        col * (cardWidth + spacing),
        row * (cardHeight + spacing)
      )

      gridContainer.addChild(card)
      this.menuItems.push(card)
    })

    this.addChild(gridContainer)
  }

  createGameCard(gameName, width, height) {
    const card = new Container()

    // Card background with gradient effect
    const bg = new Graphics()
    bg.roundRect(0, 0, width, height, 12)
    bg.fill({ color: 0x2d3748 })
    bg.stroke({ color: 0x4a5568, width: 2 })
    card.addChild(bg)

    // Game image placeholder (dark overlay)
    const imageBg = new Graphics()
    imageBg.roundRect(8, 8, width - 16, height - 40, 8)
    imageBg.fill({ color: 0x1a202c })
    card.addChild(imageBg)

    // Game title
    const title = Text({
      text: gameName,
      style: {
        fontSize: 14,
        fill: 0xffffff,
        align: 'center'
      }
    })
    title.anchor.set(0.5)
    title.position.set(width / 2, height - 20)
    card.addChild(title)

    // Add hover effect
    card.eventMode = 'static'
    card.cursor = 'pointer'

    card.on('pointerover', () => {
      bg.clear()
      bg.roundRect(0, 0, width, height, 12)
      bg.fill({ color: 0x4a5568 })
      bg.stroke({ color: 0x63b3ed, width: 2 })
    })

    card.on('pointerout', () => {
      bg.clear()
      bg.roundRect(0, 0, width, height, 12)
      bg.fill({ color: 0x2d3748 })
      bg.stroke({ color: 0x4a5568, width: 2 })
    })

    card.on('pointertap', () => {
      // Add game selection logic here
      console.log(`Selected game: ${gameName}`)
      routerStore.getState().goGameLoading({ level: 1 })
    })

    return card
  }

  createButton(text, x, y, width, height) {
    const button = new Container()

    const bg = new Graphics()
    bg.roundRect(0, 0, width, height, 8)
    bg.fill({ color: 0x4a5568 })
    button.addChild(bg)

    const buttonText = Text({
      text: text,
      style: {
        fontSize: 16,
        fill: 0xffffff
      }
    })
    buttonText.anchor.set(0.5)
    buttonText.position.set(width / 2, height / 2)
    button.addChild(buttonText)

    button.position.set(x, y)
    button.eventMode = 'static'
    button.cursor = 'pointer'

    button.on('pointerover', () => {
      bg.clear()
      bg.roundRect(0, 0, width, height, 8)
      bg.fill({ color: 0x63b3ed })
    })

    button.on('pointerout', () => {
      bg.clear()
      bg.roundRect(0, 0, width, height, 8)
      bg.fill({ color: 0x4a5568 })
    })

    return button
  }

  async exit() {
    this.removeAllListeners()
    this.menuItems.forEach(item => item.removeAllListeners())
    this.categories.forEach(category => category.removeAllListeners())
  }

  updateCategoryButtonStyle(bg, width, height, isSelected) {
    bg.clear()
    bg.roundRect(0, 0, width, height, 8)
    if (isSelected) {
      bg.fill({ color: 0x6b46c1 }) // Purple background
      bg.stroke({ color: 0xa78bfa, width: 2 }) // Light purple border
    } else {
      bg.fill({ color: 0x2d3748 })
      bg.stroke({ color: 0x4a5568, width: 1 })
    }
  }

  updateCategorySelection() {
    this.categoryButtons.forEach(btn => {
      const isSelected = btn.category.code === this.#selectedCategoryCode

      // Update background style
      this.updateCategoryButtonStyle(
        btn.bg,
        btn.categoryWidth,
        btn.categoryHeight,
        isSelected
      )
    })
  }

  update(_dt) {}
}

export default GameMenuScene
