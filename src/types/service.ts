export interface Story {
  id: string
  hint: string
  url: string
  title: string
  type: number
  image: string
  image_hue: string // color
  images: string[]
  body: string
}

export type TopStory = Omit<Story, 'images'> & { image: string }

export type StoryMeta = Pick<TopStory, 'id' | 'title' | 'image'>

export interface UserInfo {
  avatarUrl: string
  city: string
  nickName: string
  province: string
}

export interface Content {
  type: string
  content: string
}

export interface Answer {
  avatar: string
  author: string
  bio: string
  contents: Content[]
}

export interface Question {
  title: string
  answers: Answer[]
}
