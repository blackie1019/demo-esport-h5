import { Container, Graphics, Assets, Sprite } from 'pixi.js'
import theme from '@app/modules/theme/theme.js'
import Text from '@app/modules/pixi/components/BaseText.js'
import { SETTING } from '../GameLobbyScene.js'

export async function createTournamentBanner(scene) {
  const container = new Container()
  container.position.set(0, scene.header.height + SETTING.TOP_PANEL_HEIGHT)

  let yOffset = 0
  // Tournament title
  const title = Text({
    text: '我们邀请您参加 CS Go',
    style: {
      fontSize: 18,
      fill: theme.textSecondaryWhite,
      fontWeight: 'bold'
    }
  })
  title.anchor.set(0.5)
  yOffset += title.height + SETTING.SPACING
  title.position.set(window.innerWidth / 2, yOffset)
  title.zIndex = 1
  container.addChild(title)

  // Tournament subtitle
  const subtitle = Text({
    text: '2025 锦标赛',
    style: {
      fontSize: 16,
      fill: theme.textSecondaryWhite
    }
  })
  yOffset += subtitle.height + SETTING.SPACING
  subtitle.anchor.set(0.5)
  subtitle.position.set(window.innerWidth / 2, yOffset)
  subtitle.zIndex = 1
  container.addChild(subtitle)

  // Banner image
  const imageTexture = await Assets.load('/assets/game-lobby/banner.png')
  const image = new Sprite(imageTexture)
  image.width = window.innerWidth - SETTING.SPACING * 2
  image.scale.y = image.scale.x

  image.anchor.set(0.5)
  image.x = window.innerWidth / 2
  yOffset += image.height / 2 + SETTING.SPACING * 2
  image.y = yOffset
  image.zIndex = 1
  container.addChild(image)

  const fullHeight = yOffset + image.height / 2 - SETTING.SPACING
  const background = new Graphics()
    .roundRect(
      SETTING.SPACING,
      SETTING.SPACING,
      window.innerWidth - SETTING.SPACING * 2,
      fullHeight,
      5
    )
    .fill({ color: theme.backgroundIsland })
  background.zIndex = 0
  container.addChild(background)

  return container
}
