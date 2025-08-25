import { useLayoutEffect, useMemo, useRef } from 'react'
import { Application } from 'pixi.js'
import routerStore from '@app/modules/router/store.js'
import SceneManager from './SceneManager.js'
import GameMenuScene from './scenes/GameMenuScene.js'
import GameLoadingScene from './scenes/GameLoadingScene.js'
import GameLobbyScene from './scenes/GameLobbyScene.js'
import { SETTING } from '@app/utils/browser.js'
import PreloadScene from './scenes/PreloadScene.js'
import route from '@app/modules/router/route.js'

export default function SceneRoot() {
  const hostRef = useRef(null)
  const state = useMemo(() => ({ app: null, manager: null }), [])

  useLayoutEffect(() => {
    let destroyed = false
    let unsub = null

    ;(async () => {
      const app = new Application()
      await app.init({
        background: 0x000000,
        antialias: true,
        hello: false,
        resizeTo: hostRef.current,
        width: SETTING.width,
        height: SETTING.height,
        resolution: Math.min(3, window.devicePixelRatio),
        autoDensity: true
      })
      if (destroyed) return
      hostRef.current.appendChild(app.canvas)

      const manager = new SceneManager(app)
      app.stage.addChild(manager)

      state.app = app
      state.manager = manager
      app.canvas.style.touchAction = 'none'

      const applyScene = sceneName => {
        const params = routerStore.getState().params

        switch (sceneName) {
          case route.preload:
            state.manager.switchTo(new PreloadScene(app), params)
            break
          case route.gameMenu:
            state.manager.switchTo(new GameMenuScene(app), params)
            break
          case route.gameLoading:
            state.manager.switchTo(new GameLoadingScene(), params)
            break
          case route.gameLobby:
            state.manager.switchTo(new GameLobbyScene(app), params)
            break
        }
      }
      // initial
      applyScene(routerStore.getState().scene)

      // subscribe with selector (now works)
      unsub = routerStore.subscribe(
        s => ({ scene: s.scene, level: s.params?.level }),
        (next, prev) => {
          if (!prev || next.scene !== prev.scene || next.level !== prev.level) {
            applyScene(next.scene)
          }
        }
      )
    })()

    return () => {
      destroyed = true
      unsub && unsub()
      state.manager?.destroy({ children: true })
      state.app?.destroy(true)
      state.app = null
      state.manager = null
    }
  }, [state])

  return <div ref={hostRef} className="fixed inset-0 z-0" />
}
