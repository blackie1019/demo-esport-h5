import { create } from 'zustand'
import chatData from '@app/pages/match/Comments/chat/assets/data.json'

export const useMatchStore = create(set => ({
  chatData,
  likeChat: id =>
    set(s => ({
      chatData: s.chatData.map(item =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    })),
  dislikeChat: id =>
    set(s => ({
      chatData: s.chatData.map(item =>
        item.id === id ? { ...item, likes: item.likes - 1 } : item
      )
    }))
}))
