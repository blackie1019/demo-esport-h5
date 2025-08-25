import { useLayoutEffect, useMemo, useRef } from 'react'
import { Application } from 'pixi.js'
import { SETTING } from '@app/utils/browser.js'
import '@app/utils/extension.js'
import BetSlip from '@app/modules/betSlip/BetSlip.js'

export default function BetSlipRoot() {
  const hostRef = useRef(null)
  const state = useMemo(() => ({ app: null }), [])

  useLayoutEffect(() => {
    let destroyed = false

    ;(async () => {
      const app = new Application()
      await app.init({
        background: 0x000000,
        backgroundAlpha: 0,
        antialias: true,
        hello: false,
        resizeTo: hostRef.current,
        width: SETTING.width,
        height: 1,
        resolution: Math.min(3, window.devicePixelRatio),
        autoDensity: true
      })
      if (destroyed) return
      hostRef.current.appendChild(app.canvas)

      const betSlip = new BetSlip(app)
      betSlip.init()
      app.stage.addChild(betSlip)

      state.app = app
    })()

    return () => {
      destroyed = true
      state.app?.destroy(true)
      state.app = null
    }
  }, [state])

  return <div ref={hostRef} className="fixed bottom-0 z-[3]" />
}
