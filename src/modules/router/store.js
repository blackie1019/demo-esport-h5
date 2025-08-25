import { createStore } from 'zustand/vanilla'
import { subscribeWithSelector } from 'zustand/middleware'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'
import route from './route'

const routerStore = createStore(
  subscribeWithSelector(set => ({
    scene: route.preload,
    params: {},
    goPreload: () => set({ scene: route.preload, params: {} }),
    goGameMenu: (params = {}) => set({ scene: route.gameMenu, params }),
    goGameLoading: (params = {}) => set({ scene: route.gameLoading, params }),
    goGameLobby: (params = {}) => set({ scene: route.gameLobby, params })
  }))
)

export default routerStore

export const useRouterStore = selector =>
  useStore(routerStore, useShallow(selector))
