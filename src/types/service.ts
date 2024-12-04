export interface Answer {
  author: string
  avatar: string
  bio: string
  contents: Content[]
}

export interface Content {
  content: string
  type: string
}

export interface Question {
  answers: Answer[]
  title: string
}

export interface Story {
  body: string
  hint: string
  id: string
  image: string
  image_hue: string // color
  images: string[]
  title: string
  type: number
  url: string
}

export type StoryMeta = Pick<TopStory, 'id' | 'image' | 'title'>

export type TopStory = Omit<Story, 'images'> & { image: string }

export interface UserInfo {
  avatarUrl: string
  city: string
  nickName: string
  province: string
}
