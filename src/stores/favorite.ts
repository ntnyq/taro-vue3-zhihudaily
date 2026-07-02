import { defineStore } from 'pinia'
import { shallowRef } from 'vue'
import * as Storage from '@/utils/storage'
import type { StoryMeta } from '@/types'

export const useFavoriteStore = defineStore('favorite', () => {
  const list = shallowRef<StoryMeta[]>([])

  function reset() {
    list.value = []
  }

  function addStory(story: StoryMeta) {
    const nextList = [story, ...list.value]
    list.value = nextList
    Storage.setFavoriteStoryList(nextList)
  }

  function removeStory(id: string) {
    const nextList = list.value.filter(item => item.id !== id)
    list.value = nextList
    Storage.setFavoriteStoryList(nextList)
  }

  function dispose() {
    Storage.removeFavoriteStoryList()
    reset()
  }

  function init() {
    const favoriteStoryList = Storage.getFavoriteStoryList()
    if (!favoriteStoryList || favoriteStoryList.length === 0) {
      return
    }
    list.value = favoriteStoryList
  }

  return {
    list,
    reset,
    addStory,
    removeStory,
    dispose,
    init,
  }
})
