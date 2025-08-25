import { Container, Graphics } from 'pixi.js'
import { BASE_SETTING, RADIUS } from '@app/modules/pixi/constants.js'
import Text from '@app/modules/pixi/components/BaseText.js'
import betSlipStore from '@app/modules/betSlip/store.js'
import { BET_SLIP_MODE } from '@app/modules/betSlip/constants.js'
import theme from '@app/modules/theme/theme.js'
import { groupTexts, createTextWithCircle } from '@app/utils/pixi/text.js'
import {
  bounceAnimation,
  slideInAnimation,
  slideOutAnimation
} from '@app/utils/pixi/animation.js'

const SETTING = {
  ...BASE_SETTING,
  MINI_BET_SLIP_HEIGHT: 70
}

export default class BetSlip extends Container {
  constructor(app) {
    super()
    this.app = app
    this.selections = []
    this.unsub = null
    this.mode = BET_SLIP_MODE.MINI
  }

  async init() {
    // initial
    this.selections = betSlipStore.getState().selectedSelections

    // subscribe with selector (now works)
    this.unsub = betSlipStore.subscribe(
      s => ({ selections: s.selectedSelections }),
      (next, prev) => {
        if (!prev || next.selections !== prev.selections) {
          this.selections = next.selections
          this.render({
            slideIn: prev.selections.length === 0 && next.selections.length > 0,
            slideOut: prev.selections.length > 0 && next.selections.length === 0
          })
        }
      }
    )

    this.render()
  }

  render({ slideIn = false, slideOut = false } = {}) {
    // 清除原本的內容，才開始 render 新的
    this.clearContainer()

    let container
    switch (this.mode) {
      case BET_SLIP_MODE.MINI:
      case BET_SLIP_MODE.FULL:
      case BET_SLIP_MODE.QUICK: {
        container = this.renderMini()
        if (slideIn) {
          slideInAnimation(container, {
            from: 'bottom',
            distance: SETTING.MINI_BET_SLIP_HEIGHT
          })
        }
        if (slideOut) {
          slideOutAnimation(container, {
            to: 'bottom',
            distance: SETTING.MINI_BET_SLIP_HEIGHT,
            onComplete: () => {
              this.clearContainer()
            }
          })
        }
        break
      }
    }

    // 呼叫 resize 調整 canvas 大小
    this.app.renderer.resize(container.width, container.height)
  }

  renderMini() {
    const container = new Container()
    this.addChild(container)

    if (this.selections.length === 0) {
      return container
    }

    const bg = new Graphics()
      .roundRect4(0, 0, window.innerWidth, SETTING.MINI_BET_SLIP_HEIGHT, {
        tl: RADIUS.NORMAL,
        tr: RADIUS.NORMAL
      })
      .fill({ color: theme.backgroundIsland })
    container.addChild(bg)

    const text = Text({
      text: '投注單',
      style: {
        fontSize: 14,
        fill: theme.textPrimaryWhite
      }
    })

    const selectionCount = createTextWithCircle(
      {
        text: this.selections.length.toString(),
        style: {
          fontSize: 12,
          fill: theme.textPrimaryWhite
        }
      },
      theme.textAccentSecondary
    )
    bounceAnimation(selectionCount)

    const textContainer = groupTexts(text, selectionCount)
    textContainer.position.set(window.innerWidth / 2, 30)
    container.addChild(textContainer)

    const arrow = Text({
      text: '▲',
      style: {
        fontSize: 14,
        fill: theme.textTertiary
      }
    })

    arrow.position.set(window.innerWidth - SETTING.SPACING - arrow.width, 24)
    container.addChild(arrow)

    container.eventMode = 'static'
    container.cursor = 'pointer'
    container.on('pointertap', () => {
      betSlipStore.getState().removeSelection()
    })

    return container
  }

  renderFull() {
    const container = new Container()
    this.addChild(container)
    // this.selections.forEach(selection => {
    //   const selectionContainer = new Container()
    //   selectionContainer.position.set(0, 0)
    //   container.addChild(selectionContainer)
    //   const bg = new Graphics().rect(50, 50, 100, 100).fill({ color: 'green' })
    //   bg.eventMode = 'static'
    //   bg.cursor = 'pointer'
    //   bg.on('pointertap', () => {
    //     console.log('tap', selection)
    //   })
    //   selectionContainer.addChild(bg)
    //   const text = Text({
    //     text: selection.name,
    //     style: {
    //       fontSize: 14,
    //       fill: 'red'
    //     }
    //   })
    //   selectionContainer.addChild(text)
    // })
    return container
  }

  clearContainer() {
    this.removeChildren()
  }
}
