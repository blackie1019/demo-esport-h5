import { Container, Graphics } from 'pixi.js'
import { SETTING } from '../GameLobbyScene.js'
import Text from '@app/modules/pixi/components/BaseText.js'
import theme from '@app/modules/theme/theme.js'
import AsyncImage from '@app/modules/pixi/components/AsyncImage.js'
import { RADIUS } from '@app/modules/pixi/constants.js'

export function createMatchCard(match, index) {
  const card = new Container()
  const cardWidth = window.innerWidth - SETTING.SPACING * 2
  const cardHeight = SETTING.MATCH_CARD_HEIGHT

  // Left dark purple background
  const leftBg = new Graphics()
    .skewRoundRect4(
      0,
      0,
      cardWidth / 2 - SETTING.MATCH_TEAM_SPLIT_WIDTH / 2,
      cardHeight,
      {
        tr: +SETTING.MATCH_TEAM_INCLINE_OFFSET,
        br: -SETTING.MATCH_TEAM_INCLINE_OFFSET
      },
      { tl: RADIUS.NORMAL }
    )
    .fill(theme.buttonPrimaryPurple)
  card.addChild(leftBg)

  // Right light purple background1
  const rightBg = new Graphics()
    .skewRoundRect4(
      cardWidth / 2 + SETTING.MATCH_TEAM_SPLIT_WIDTH / 2,
      0,
      cardWidth / 2,
      cardHeight,
      {
        tl: +SETTING.MATCH_TEAM_INCLINE_OFFSET,
        bl: -SETTING.MATCH_TEAM_INCLINE_OFFSET
      },
      { tr: RADIUS.NORMAL }
    )
    .fill(theme.buttonSecondaryPurple)
  card.addChild(rightBg)

  // Middle black section
  const middleBg = new Graphics()
    .roundRect(
      cardWidth / 2,
      0,
      SETTING.MATCH_MIDDLE_BLACK_WIDTH,
      cardHeight - SETTING.SPACING * 2,
      5
    )
    .fill(theme.backgroundIsland) // Black
  middleBg.position.set(-SETTING.MATCH_MIDDLE_BLACK_WIDTH / 2, SETTING.SPACING)
  card.addChild(middleBg)

  // Bottom black line
  const bottomLine = new Graphics()
    .roundRect4(0, cardHeight, cardWidth, SETTING.MATCH_BOTTOM_LINE_HEIGHT, {
      bl: RADIUS.NORMAL,
      br: RADIUS.NORMAL
    })
    .fill(theme.backgroundIsland)
  card.addChild(bottomLine)

  // Team 1 info (left side - dark purple)
  const team1Container = createTeamInfo(
    {
      name: match.homeName,
      logo: match.homeIcon,
      score: match.homeScore
    },
    true
  )
  team1Container.position.set(SETTING.SPACING, SETTING.MATCH_TEAM_PADDING)
  card.addChild(team1Container)

  // VS text (middle - black)
  const middleContainer = createMiddleInfo(match)
  middleContainer.position.set(cardWidth / 2, cardHeight / 2)
  card.addChild(middleContainer)

  // Team 2
  const team2Container = createTeamInfo(
    {
      name: match.awayName,
      logo: match.awayIcon,
      score: match.awayScore
    },
    false,
    index
  )
  team2Container.position.set(
    cardWidth - SETTING.SPACING - SETTING.PARTICIPANT_ICON_WIDTH,
    SETTING.MATCH_TEAM_PADDING
  )
  card.addChild(team2Container)

  // // Bottom line
  const bottomLineContainer = createBottomLineContainer({
    cardWidth
  })
  bottomLineContainer.position.set(cardWidth / 2, cardHeight)
  card.addChild(bottomLineContainer)

  return card
}

function createBottomLineContainer({ cardWidth }) {
  const container = new Container()
  const marketText = Text({
    text: '全場獨贏',
    style: {
      fontSize: 12,
      fill: theme.textTertiary,
      fontWeight: 'bold'
    }
  })
  marketText.anchor.set(0.5)
  marketText.position.set(0, 10)
  container.addChild(marketText)

  const allMarketPointerText = Text({
    text: '⮕',
    style: {
      fontSize: 12,
      fill: theme.textPrimaryWhite,
      fontWeight: 'bold'
    }
  })
  allMarketPointerText.anchor.set(0.5)
  allMarketPointerText.position.set(
    cardWidth / 2 - allMarketPointerText.width / 2 - SETTING.SPACING,
    10
  )
  container.addChild(allMarketPointerText)

  return container
}

function createMiddleInfo(match) {
  const container = new Container()
  const vsText = Text({
    text: 'VS',
    style: {
      fontSize: 16,
      fill: 0xbb86fc, // Light purple
      fontWeight: 'bold'
    }
  })
  vsText.anchor.set(0.5)
  vsText.position.set(0, -25)
  container.addChild(vsText)

  const scoreText = Text({
    text: `${match.homeDisplayScore} - ${match.awayDisplayScore}`,
    style: {
      fontSize: 18,
      fill: theme.textSecondaryWhite,
      fontWeight: 'bold'
    }
  })
  scoreText.anchor.set(0.5)
  scoreText.position.set(0, 0)
  container.addChild(scoreText)

  // Match time
  const timeText = Text({
    text: match.time,
    style: {
      fontSize: 12,
      fill: 0xbb86fc // Light purple
    }
  })
  timeText.anchor.set(0.5)
  timeText.position.set(0, 25)
  container.addChild(timeText)

  return container
}

function createTeamInfo(team, isHome = true) {
  const container = new Container()

  const logo = AsyncImage(
    `https://cdn.xn--rcr21ak70l.club/flag_webp/${team.logo.split('.')[0] || (isHome ? 'home' : 'away')}.webp`,
    `/assets/game-lobby/team-icons/${isHome ? 'home' : 'away'}.png`
  )
  logo.width = SETTING.PARTICIPANT_ICON_WIDTH
  logo.height = SETTING.PARTICIPANT_ICON_HEIGHT
  logo.position.set(0, 0)
  container.addChild(logo)

  const name = Text({
    text: team.name,
    style: {
      fontSize: 14,
      fill: theme.textSecondaryWhite,
      fontWeight: 'bold'
    }
  })

  const scaleX = SETTING.PARTICIPANT_NAME_MAX_WIDTH / name.width
  const scale = Math.min(scaleX, 1, 1)
  name.scale.set(scale)
  if (isHome) {
    name.position.set(SETTING.PARTICIPANT_ICON_WIDTH + SETTING.SPACING, 5)
  } else {
    name.anchor.set(1, 0)
    name.position.set(-SETTING.SPACING, 5)
  }
  container.addChild(name)

  const odds = Text({
    text: '1.83',
    style: {
      fontSize: 14,
      fill: theme.textPrimaryWhite,
      fontWeight: 'bold'
    }
  })
  if (isHome) {
    odds.position.set(SETTING.PARTICIPANT_ICON_WIDTH + SETTING.SPACING, 20)
  } else {
    odds.anchor.set(1, 0)
    odds.position.set(-SETTING.SPACING, 20)
  }
  container.addChild(odds)

  return container
}
