import { createStore } from 'zustand/vanilla'
import { subscribeWithSelector } from 'zustand/middleware'
import { useStore } from 'zustand'
import { useShallow } from 'zustand/react/shallow'

const MAX_SELECTIONS = 10

const betSlipStore = createStore(
  subscribeWithSelector((set, get) => ({
    selectedSelections: [],
    addSelection: selection => {
      if (get().selectedSelections.length >= MAX_SELECTIONS) return
      set({ selectedSelections: [...get().selectedSelections, selection] })
    },
    removeSelection: selection => {
      if (get().selectedSelections.length === 0) return
      // set({
      //   selectedSelections: get().selectedSelections.filter(
      //     s => s.id !== selection.id
      //   )
      // })
      set({
        selectedSelections: get().selectedSelections.slice(0, -1)
      })
    },
    clearSelections: () => set({ selectedSelections: [] })
  }))
)

export default betSlipStore

export const useBetSlipStore = selector =>
  useStore(betSlipStore, useShallow(selector))
