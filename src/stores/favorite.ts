import { defineStore } from 'pinia'
import { StoreModule } from '@/types'
import * as Storage from '@/utils/storage'
import type { StoryMeta } from '@/types'

export interface IFavoriteState {
  list: StoryMeta[]
}

export const useFavoriteStore = defineStore(StoreModule.favorite, {
  state: (): IFavoriteState => ({
    list: [],
  }),

  actions: {
    addStory(story: StoryMeta) {
      const list = [story, ...this.list]
      this.$patch({ list })
      Storage.setFavoriteStoryList(list)
    },

    removeStory(id: string) {
      const list = this.list.filter(item => item.id !== id)
      this.$patch({ list })
      Storage.setFavoriteStoryList(list)
    },

    dispose() {
      Storage.removeFavoriteStoryList()
      this.$reset()
    },

    init() {
      const list = Storage.getFavoriteStoryList()
      if (!list || list.length === 0) {
        return
      }
      this.$patch({ list })
    },
  },
})
