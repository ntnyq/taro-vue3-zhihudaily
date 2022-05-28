
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

export interface UserInfo {
  avatarUrl: string
  city: string
  country: string
  gender: number
  nickName: string
  province: string
  language: string
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
