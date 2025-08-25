import { Container, Graphics } from 'pixi.js'
import theme from '@app/modules/theme/theme.js'
import Text from '@app/modules/pixi/components/BaseText.js'
import { RADIUS } from '@app/modules/pixi/constants.js'
import { SETTING } from '../GameLobbyScene.js'

export function createTopic(topic) {
  const container = new Container()
  container.position.set(SETTING.SPACING, 0)

  const title = Text({
    text: topic.title,
    style: {
      fontSize: 16,
      fill: 0xffffff,
      fontWeight: 'bold'
    }
  })
  container.addChild(title)

  topic.contents.forEach((content, index) => {
    const isFirst = index === 0
    const isLast = index === topic.contents.length - 1
    const card = createTopicContent({
      content,
      isFirst,
      isLast
    })
    card.position.set(
      0,
      title.height + SETTING.SPACING + index * SETTING.EVENT_CARD_HEIGHT + index
    )
    container.addChild(card)
  })

  return container
}

export function createTopicContent({ content, isFirst, isLast }) {
  const card = new Container()

  // Card background
  const cardBg = new Graphics()
    .roundRect4(0, 0, window.innerWidth - SETTING.SPACING * 2, 60, {
      tl: isFirst ? RADIUS.NORMAL : 0,
      tr: isFirst ? RADIUS.NORMAL : 0,
      bl: isLast ? RADIUS.NORMAL : 0,
      br: isLast ? RADIUS.NORMAL : 0
    })
    .fill({ color: theme.backgroundIsland })
  if (!isLast) {
    cardBg.drawUnderline({
      x: 0,
      y: SETTING.EVENT_CARD_HEIGHT + 1,
      width: window.innerWidth - SETTING.SPACING * 2,
      color: theme.dividerDark
    })
  }
  card.addChild(cardBg)

  // Trophy icon placeholder
  const icon = new Graphics()
    .circle(SETTING.EVENT_CARD_HEIGHT / 2, SETTING.EVENT_CARD_HEIGHT / 2, 10)
    .fill({ color: 0xffd700 })
  card.addChild(icon)

  // Event title
  const title = Text({
    text: content.title,
    style: {
      fontSize: 14,
      fill: theme.textSecondaryWhite
    }
  })
  title.position.set(
    SETTING.EVENT_CARD_HEIGHT / 2 + icon.width + SETTING.SPACING,
    15
  )
  card.addChild(title)

  // Event subtitle
  if (content.subtitle) {
    const subtitle = Text({
      text: content.subtitle,
      style: {
        fontSize: 10,
        fill: theme.textSecondaryWhite
      }
    })
    subtitle.position.set(
      SETTING.EVENT_CARD_HEIGHT / 2 + icon.width + SETTING.SPACING,
      35
    )
    card.addChild(subtitle)
  }

  // Arrow icon
  const arrow = Text({
    text: '→',
    style: {
      fontSize: 16,
      fill: 0xffd700
    }
  })
  arrow.position.set(card.width - SETTING.SPACING - arrow.width, 20)
  card.addChild(arrow)

  card.eventMode = 'static'
  card.cursor = 'pointer'
  card.on('pointertap', () => {
    console.log('click topic content', content.title)
  })

  return card
}
