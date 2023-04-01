import Taro from '@tarojs/taro'
import { StorageKey } from '@/types'
import type { StoryMeta, UserInfo } from '@/types'

export function getUserInfo() {
  return Taro.getStorageSync<UserInfo>(StorageKey.userInfo)
}

export function setUserInfo(userInfo: UserInfo) {
  return Taro.setStorageSync(StorageKey.userInfo, userInfo)
}

export function removeUserInfo() {
  return Taro.removeStorageSync(StorageKey.userInfo)
}

export function getFavoriteStoryList() {
  return Taro.getStorageSync<StoryMeta[]>(StorageKey.favoriteList)
}

export function setFavoriteStoryList(list: StoryMeta[]) {
  return Taro.setStorageSync(StorageKey.favoriteList, list)
}

export function removeFavoriteStoryList() {
  return Taro.removeStorageSync(StorageKey.favoriteList)
}
