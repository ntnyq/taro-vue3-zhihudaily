import { defineStore } from 'pinia'
import { StoreModule } from '@/types'
import * as Storage from '@/utils/storage'

export interface IUserState {
  avatar: string
  nickname: string
}

export const useUserStore = defineStore(StoreModule.user, {
  state: (): IUserState => ({
    avatar: '',
    nickname: '',
  }),

  actions: {
    setNickname(nickname = '') {
      this.$patch({ nickname })
      Storage.setNickname(nickname)
    },

    setAvatar(avatar = '') {
      this.$patch({ avatar })
      Storage.setAvatar(avatar)
    },

    dispose() {
      Storage.removeNickname()
      Storage.removeAvatar()
      this.$reset()
    },

    init() {
      const nickname = Storage.getNickname() ?? ''
      const avatar = Storage.getAvatar() ?? ''
      this.$patch({ avatar, nickname })
    },
  },
})
