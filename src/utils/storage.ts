import Taro from '@tarojs/taro'
import type { UserInfo } from '../types'
import { StorageKey } from '../types'

export function getUserInfo () {
  return Taro.getStorageSync<UserInfo>(StorageKey.userInfo)
}

export function setUserInfo (userInfo: UserInfo) {
  return Taro.setStorageSync(StorageKey.userInfo, userInfo)
}

export function removeUserInfo () {
  return Taro.removeStorageSync(StorageKey.userInfo)
}
