<script lang="ts" setup>
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import { onMounted, ref } from 'vue'
import { getLatestNewsList, getNewsListByDate } from '@/services'
import { formatTime } from '@/utils'
import type { Story, TopStory } from '@/types'

const INIT_DATE_OFFSET = 0

interface INews {
  date: string
  stories: Story[]
}

const slides = ref<TopStory[]>([])
const newsList = ref<INews[]>([])
const latestDate = ref('')
const dateOffset = ref(INIT_DATE_OFFSET)

const onGoNewsDetail = (news: Story | TopStory) => {
  if (!news.id) return
  Taro.navigateTo({ url: `/pages/detail/index?id=${news.id}` })
}
const fetchNewsByDate = async () => {
  const year = latestDate.value.slice(0, 4)
  const month = latestDate.value.slice(4, 6)
  const day = latestDate.value.slice(-2)
  const time = new Date(`${year}/${month}/${day}`)
  time.setDate(time.getDate() + dateOffset.value)
  const date = formatTime(time, { format: 'YYYYMMDD' })
  dateOffset.value = --dateOffset.value
  const res = await getNewsListByDate(date)
  newsList.value.push(res)
}
const fetchLatestNews = async () => {
  try {
    const res = await getLatestNewsList()
    // eslint-disable-next-line camelcase
    const { date, top_stories = [] } = res
    // eslint-disable-next-line camelcase
    slides.value = top_stories
    latestDate.value = date
    newsList.value = [res]
    if (res.stories.length > 3) return
    fetchNewsByDate()
  } catch (err) {
    console.log(err)
  }
}

usePullDownRefresh(async () => {
  Taro.showLoading({ title: '加载中，请稍等' })
  try {
    await fetchLatestNews()
    dateOffset.value = INIT_DATE_OFFSET
  } catch (err) {
    console.log(err)
  } finally {
    Taro.stopPullDownRefresh()
    Taro.hideLoading()
  }
})

useReachBottom(() => {
  fetchNewsByDate()
})

onMounted(() => {
  fetchLatestNews()
})
</script>

<template>
  <view class="page-index">
    <swiper
      :autoplay="true"
      :circular="true"
      :indicator-dots="true"
      indicator-color="#ccc"
      indicator-active-color="#ffd300"
      class="index-swiper"
    >
      <swiper-item
        @tap="onGoNewsDetail(slide)"
        v-for="slide in slides"
        :key="slide.id"
      >
        <image
          :src="slide.image"
          :alt="slide.title"
          mode="aspectFill"
          class="index-swiper-image"
        />
        <view class="index-swiper-overlay" />
        <text class="index-swiper-title">
          {{ slide.title }}
        </text>
      </swiper-item>
    </swiper>

    <view class="index-list-wrap">
      <view
        v-for="item in newsList"
        :key="item.date"
        class="index-list-item"
      >
        <view class="index-list-item-header">
          <text class="index-list-item-title">
            {{ item.date }}
          </text>
        </view>
        <view class="index-list-item-main">
          <view
            @tap="onGoNewsDetail(story)"
            v-for="story in item.stories || []"
            :key="story.id"
            class="index-list-item-news"
          >
            <image
              v-if="Array.isArray(story.images)"
              :src="story.images[0]"
              mode="aspectFill"
              class="index-list-item-news-image"
            />
            <view class="index-list-item-news-title">
              {{ story.title }}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.page-index {
  flex-direction: column;
  width: 100%;
  background-color: #f9faff;

  .index {
    &-swiper {
      position: relative;
      height: 600px;

      &-image {
        display: block;
        width: 100%;
        height: 100%;
      }

      &-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #5b7492;
        opacity: 0.4;
      }

      &-title {
        position: absolute;
        right: 5%;
        bottom: 100px;
        width: 70%;
        text-align: right;
        line-height: 1.6em;
        font-weight: bold;
        font-size: 40px;
        color: #fff;
        text-shadow: 2px 2px 20px rgba(0, 0, 0, 0.5);

        &:before {
          content: '';
          position: absolute;
          bottom: -20px;
          right: 0;
          display: block;
          width: 300px;
          border: 4px solid $primary-color;
        }
      }
    }

    &-list {
      &-wrap {
        position: relative;
      }

      &-item {
        position: relative;
        width: 90%;
        margin: 60px auto 0;

        &-title {
          display: block;
          width: 320px;
          padding: 0 70px;
          background-color: $primary-color;
          border-radius: 30px;
          letter-spacing: 6px;
          line-height: 2em;
          font-weight: bold;
          text-align: center;
          color: #fff;
          box-shadow: 0 6px 20px 0 rgba(91, 115, 145, 0.15);
          transform: translateY(-50%);
        }

        &-news {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 10px;
          background-color: #fff;
          box-shadow: 0 6px 20px 0 rgba(91, 115, 145, 0.15);

          &-image {
            display: block;
            width: 150px;
            height: 150px;
            margin-right: 20px;
            border-radius: 8px;
          }

          &-title {
            flex: 1 0;
            font-size: 28px;
            font-weight: 500;
            text-align: justify;
            color: #5b7492;
          }
        }
      }
    }
  }

  .at-fab {
    position: fixed;
    right: 30px;
    bottom: 100px;
  }
}
</style>
