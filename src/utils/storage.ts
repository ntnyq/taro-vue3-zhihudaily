import Taro from '@tarojs/taro'
import type { StoryMeta } from '@/types'

export function getNickname() {
  return Taro.getStorageSync<string>('nickname')
}

export function setNickname(nickname: string) {
  return Taro.setStorageSync('nickname', nickname)
}

export function removeNickname() {
  return Taro.removeStorageSync('nickname')
}

export function getAvatar() {
  return Taro.getStorageSync<string>('avatar')
}

export function setAvatar(avatar: string) {
  return Taro.setStorageSync('avatar', avatar)
}

export function removeAvatar() {
  return Taro.removeStorageSync('avatar')
}

export function getFavoriteStoryList() {
  return Taro.getStorageSync<StoryMeta[]>('favorite-list')
}

export function setFavoriteStoryList(list: StoryMeta[]) {
  return Taro.setStorageSync('favorite-list', list)
}

export function removeFavoriteStoryList() {
  return Taro.removeStorageSync('favorite-list')
}
