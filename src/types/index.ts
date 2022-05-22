/**
 * @file types
 * @module types/index
 */

export interface Story {
  id: number
  hint: string
  url: string
  title: string
  type: number
  image_hue: string
  images: string[]
}

export type TopStory = Omit<Story, `images`> & { image: string }
