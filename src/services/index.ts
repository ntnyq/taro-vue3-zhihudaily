/**
 * @file services
 * @module services/index
 */

import http from '@/utils/request'

export function getLatestNewsList () {
  return http.get(`/news/latest`)
}

export function getNewsListByDate (date: string) {
  return http.get(`/news/before/${date}`)
}

export function getNewsDetail (id: string) {
  return http.get(`/news/${id}`)
}
