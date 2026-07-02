import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import * as Storage from '@/utils/storage'

export const useUserStore = defineStore('user', () => {
  const avatar = shallowRef('')
  const nickname = shallowRef('')

  function reset() {
    avatar.value = ''
    nickname.value = ''
  }

  function setNickname(value = '') {
    nickname.value = value
    Storage.setNickname(value)
  }

  function setAvatar(value = '') {
    avatar.value = value
    Storage.setAvatar(value)
  }

  function dispose() {
    Storage.removeNickname()
    Storage.removeAvatar()
    reset()
  }

  function init() {
    nickname.value = Storage.getNickname() ?? ''
    avatar.value = Storage.getAvatar() ?? ''
  }

  return {
    avatar,
    nickname,
    reset,
    setNickname,
    setAvatar,
    dispose,
    init,
  }
})
