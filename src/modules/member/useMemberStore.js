import { create } from 'zustand'

export const useMemberStore = create(set => ({
  photo: null,
  setPhoto: photo =>
    set(s => {
      if (s.photo?.url) URL.revokeObjectURL(s.photo.url)
      return { photo }
    }),
  clearPhoto: () =>
    set(s => {
      if (s.photo?.url) URL.revokeObjectURL(s.photo.url)
      return { photo: null }
    }),
  nickname: '',
  setNickname: nickname => set({ nickname }),
  clearNickname: () => set({ nickname: '' })
}))
