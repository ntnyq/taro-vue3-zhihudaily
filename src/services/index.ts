/**
 * @file services
 * @module services/index
 */

import http from '@/utils/request'
import type { Story, TopStory } from '@/types'

interface INewsListResponse {
  date: string
  top_stories: TopStory[]
  stories: Story[]
}

export function getLatestNewsList() {
  return http.get<INewsListResponse>('/news/latest')
}

export function getNewsListByDate(date: string) {
  return http.get<INewsListResponse>(`/news/before/${date}`)
}

export function getNewsDetail(id: string) {
  return http.get<Story>(`/news/${id}`)
}
