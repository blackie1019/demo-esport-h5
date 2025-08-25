import { Container, Graphics } from 'pixi.js'
import { BASE_SETTING } from '@app/modules/pixi/constants.js'
import Text from '@app/modules/pixi/components/BaseText.js'

export function groupTexts(...texts) {
  const container = new Container()
  container.addChild(...texts)
  let offsetX = 0
  container.children.forEach(child => {
    child.x = offsetX
    offsetX += BASE_SETTING.SPACING + child.width
  })
  container.pivot.x = container.width / 2
  container.pivot.y = container.height / 2
  return container
}

export function createTextWithCircle(textOptions, color) {
  const container = new Container()
  const text = Text(textOptions)
  text.zIndex = 1
  container.addChild(text)

  // 目前只能支援 2 位數，否則圓形會跑版蓋不到數字
  const circleX =
    `${text.text}`.length === 2
      ? text.x + BASE_SETTING.SPACING / 2 + 1.8
      : text.x + BASE_SETTING.SPACING / 3
  const circleY = text.y + (textOptions.style.fontSize + 2) / 2

  const circle = new Graphics().circle(circleX, circleY, 8).fill({ color })
  circle.zIndex = 0
  container.addChild(circle)

  return container
}
