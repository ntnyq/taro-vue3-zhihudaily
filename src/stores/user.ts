import { defineStore } from 'pinia'
import type { UserInfo } from '../types'
import { StoreModole } from '../types'
import * as Storage from '../utils/storage'

export interface IUserState {
  hasAuth: boolean
  userInfo: UserInfo
}

export const useUserStore = defineStore(StoreModole.user, {
  state: () => <IUserState>({
    hasAuth: false,
    userInfo: {},
  }),

  actions: {
    setUserInfo (userInfo: UserInfo) {
      this.$patch({ userInfo, hasAuth: true })
      Storage.setUserInfo(userInfo)
    },

    clearUserInfo () {
      Storage.removeUserInfo()
      this.$reset()
    },

    init () {
      const userInfo = Storage.getUserInfo()
      if (!userInfo && !Object.keys(userInfo).length) return
      this.$patch({ userInfo, hasAuth: true })
    },
  },
})
