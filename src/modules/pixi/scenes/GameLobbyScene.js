import { Container, Graphics } from 'pixi.js'
import axios from 'axios'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import SceneBase from './SceneBase.js'
import { BASE_SETTING } from '../constants.js'
import Text from '../components/BaseText.js'
import { createMatchCard } from './domain/match.js'
import VpScroller from '../components/VpScroller.js'
import { mapWeekDayDisplay } from '@app/utils/date.js'
import theme from '@app/modules/theme/theme.js'
import { createTournamentBanner } from './domain/tournament.js'
import { createTopic } from './domain/topic.js'

dayjs.extend(weekday)

const repeatArray = (arr, n) => Array.from({ length: n }, () => arr).flat()

export const SETTING = {
  ...BASE_SETTING,
  TAB_HEIGHT: 30,
  TOURNAMENT_HEIGHT: 160,
  MATCH_CARD_HEIGHT: 60,
  MATCH_TEAM_PADDING: 10,
  MATCH_MIDDLE_BLACK_WIDTH: 80,
  MATCH_BOTTOM_LINE_HEIGHT: 20,
  MATCH_TEAM_SPLIT_WIDTH: 2,
  MATCH_TEAM_INCLINE_OFFSET: 5,
  PARTICIPANT_ICON_WIDTH: 40,
  PARTICIPANT_ICON_HEIGHT: 40,
  PARTICIPANT_NAME_MAX_WIDTH: 80,
  MATCH_BOTTOM_OFFSET: 100,
  EVENT_CARD_HEIGHT: 60
}

class GameLobbyScene extends SceneBase {
  #tabs = [
    { name: '社区', code: 1 },
    { name: '賽程', code: 2 },
    { name: '直播', code: 3 },
    { name: '游戏', code: 4 }
  ]
  #selectedTabCode = 1

  constructor(app) {
    super()
    this.app = app
    this.headerTabs = []
    this.header = undefined
    this.tournamentBanner = undefined
    this.contentRefs = []
    this.matches = []
    this.topics = []
  }

  async enter(data) {
    this.gameName = data?.gameName || 'CS GO'

    this.createBackground()
    this.createHeader()

    this.createContent()

    // Make scene interactive
    this.eventMode = 'static'
  }

  // 清除舊的內容
  clearContent() {
    // 移除除了背景和 header 之外的所有子元素
    this.contentRefs.forEach(ref => this.removeChild(ref))
  }

  async createContent() {
    this.clearContent()

    switch (this.#selectedTabCode) {
      case 2:
        this.createMatchList()
        break
      case 1:
      case 3:
      case 4: {
        await this.createTournamentSection()
        await this.createTopicSection()
        break
      }
      default:
        break
    }
  }

  async createMatchList() {
    const resp = await axios.get('assets/game-lobby/data/matches.json')
    const matches = resp.data.data.flatMap(s =>
      s.sports.flatMap(sport => sport.leagues.flatMap(league => league.matches))
    )
    this.matches = repeatArray(matches, 1)

    this.createMatchCards()
  }

  createMatchCards() {
    const container = new Container()
    container.position.set(0, SETTING.TOP_PANEL_HEIGHT + this.header.height)
    container.zIndex = 0
    this.addChild(container)
    const vpScroller = VpScroller({ app: this.app, direction: 'y' })
    container.addChild(vpScroller)
    this.contentRefs.push(container)

    let currentDate = ''
    let yOffset = 0
    for (const match of this.matches) {
      if (match.dateMatch !== currentDate) {
        const date = dayjs(match.dateMatch)
        currentDate = date.format('MM/DD')

        // padding-top
        yOffset += SETTING.SPACING
        const dateHeader = Text({
          text: `${currentDate} ${mapWeekDayDisplay(date.weekday())}`,
          style: {
            fontSize: 16,
            fill: theme.textSecondaryWhite,
            fontWeight: 'bold'
          }
        })
        dateHeader.position.set(20, yOffset)
        vpScroller.addChild(dateHeader)

        yOffset += SETTING.SPACING + dateHeader.height
      }

      // Create match card
      const card = createMatchCard(match)
      card.position.set(10, yOffset)
      vpScroller.addChild(card)

      yOffset += SETTING.SPACING + card.height
    }

    vpScroller.resize(
      this.app.renderer.width,
      this.app.renderer.height,
      vpScroller.worldWidth,
      Math.max(
        this.app.renderer.height,
        yOffset +
          this.header.height +
          SETTING.TOP_PANEL_HEIGHT +
          SETTING.MATCH_BOTTOM_OFFSET
      )
    )
  }

  createBackground() {
    // Dark gradient background
    const bg = new Graphics()
    bg.rect(0, 0, window.innerWidth, window.innerHeight)
    bg.fill({ color: theme.backgroundSecondary })
    this.addChild(bg)
  }

  createHeader() {
    const headerContainer = new Container()
    headerContainer.position.set(0, SETTING.TOP_PANEL_HEIGHT)
    headerContainer.zIndex = 2

    // 背景遮蓋滑動元素
    const bg = new Graphics()
      .rect(0, 0, window.innerWidth, SETTING.TAB_HEIGHT)
      .fill({ color: theme.backgroundSecondary })
    headerContainer.addChild(bg)

    // Navigation tabs
    const tabWidth =
      (window.innerWidth - (this.#tabs.length + 1) * SETTING.SPACING) /
      this.#tabs.length
    const startX = SETTING.SPACING

    this.#tabs.forEach((tab, index) => {
      const tabBtn = new Container()

      const isSelected = tab.code === this.#selectedTabCode
      // Tab background
      const tabBg = new Graphics()
      this.updateTabButtonStyle(tabBg, tabWidth, SETTING.TAB_HEIGHT, isSelected)
      tabBtn.addChild(tabBg)

      // Tab text
      const tabText = Text({
        text: tab.name,
        style: {
          fontSize: 14,
          fill: theme.textPrimaryWhite
        }
      })
      tabText.anchor.set(0.5)
      tabText.position.set(tabWidth / 2, SETTING.TAB_HEIGHT / 2)
      tabBtn.addChild(tabText)

      tabBtn.position.set(startX + index * (tabWidth + SETTING.SPACING), 0)
      tabBtn.eventMode = 'static'
      tabBtn.cursor = 'pointer'

      tabBtn.tab = tab
      tabBtn.bg = tabBg
      tabBtn.tabWidth = tabWidth

      tabBtn.on('pointertap', () => {
        this.#selectedTabCode = tab.code
        this.updateTabSelection()
        this.createContent()
      })

      headerContainer.addChild(tabBtn)
      this.headerTabs.push(tabBtn)
    })
    this.header = headerContainer
    this.addChild(headerContainer)
  }

  updateTabSelection() {
    this.headerTabs.forEach(tabBtn => {
      const isSelected = tabBtn.tab.code === this.#selectedTabCode
      this.updateTabButtonStyle(
        tabBtn.bg,
        tabBtn.tabWidth,
        SETTING.TAB_HEIGHT,
        isSelected
      )
    })
  }

  updateTabButtonStyle(bg, width, height, isSelected) {
    bg.clear()
    bg.roundRect(0, 0, width, height, 5)
    if (isSelected) {
      bg.fill({ color: theme.backgroundIsland })
    } else {
      bg.fill({ color: theme.backgroundSecondary })
    }
  }

  async createTournamentSection() {
    const container = await createTournamentBanner(this)

    container.eventMode = 'static'
    container.cursor = 'pointer'
    container.on('pointertap', () => {
      console.log('click tournament')
    })

    this.contentRefs.push(container)
    this.tournamentBanner = container
    this.addChild(container)
  }

  async createTopicSection() {
    const resp = await axios.get('assets/game-lobby/data/topics.json')
    this.topics = resp.data
    this.createTopics()
  }

  createTopics() {
    const container = new Container()
    container.position.set(
      0,
      SETTING.TOP_PANEL_HEIGHT +
        this.header.height +
        SETTING.SPACING +
        this.tournamentBanner.height +
        SETTING.SPACING
    )

    const vpScroller = VpScroller({ app: this.app, direction: 'x' })
    container.addChild(vpScroller)

    this.topics.forEach((topic, index) => {
      const topicContainer = createTopic(topic)
      topicContainer.position.set(
        SETTING.SPACING + index * window.innerWidth,
        0
      )
      vpScroller.addChild(topicContainer)
    })

    vpScroller.resize(
      this.app.renderer.width,
      this.app.renderer.height,

      Math.max(this.app.renderer.width, this.topics.length * window.innerWidth),
      vpScroller.worldHeight
    )
    vpScroller.on('moved', () => {
      console.log('move')
    })

    this.contentRefs.push(container)
    this.addChild(container)
  }

  async exit() {
    this.header.removeAllListeners()
    this.removeAllListeners()
    this.headerTabs.forEach(tab => tab.removeAllListeners())
    this.contentRefs.forEach(content => content.removeAllListeners())
  }

  update(_dt) {
    // Add any animations here if needed
    // console.log('123123')
  }
}

export default GameLobbyScene
