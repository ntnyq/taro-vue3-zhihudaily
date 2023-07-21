import Taro from '@tarojs/taro'
import { StorageKey } from '@/types'
import type { StoryMeta } from '@/types'

export function getNickname() {
  return Taro.getStorageSync<string>(StorageKey.nickname)
}

export function setNickname(nickname: string) {
  return Taro.setStorageSync(StorageKey.nickname, nickname)
}

export function removeNickname() {
  return Taro.removeStorageSync(StorageKey.nickname)
}

export function getAvatar() {
  return Taro.getStorageSync<string>(StorageKey.avatar)
}

export function setAvatar(avatar: string) {
  return Taro.setStorageSync(StorageKey.avatar, avatar)
}

export function removeAvatar() {
  return Taro.removeStorageSync(StorageKey.avatar)
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
