<template>
  <view class="page-detail">
    <view v-if="news.image" class="detail-banner">
      <image :src="news.image" mode="aspectFill" class="detail-banner-image" />
      <view class="detail-banner-overlay" />
      <text class="detail-banner-title">
        {{ news.title }}
      </text>
      <text class="detail-banner-source" />
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import {
  setNavigationBarTitle,
  useRouter,
  useShareAppMessage,
  useShareTimeline,
} from '@tarojs/taro'
import { getNewsDetail } from '../../services'

const newsId = ref(``)
const router = useRouter()
const news = reactive<any>({})

const fetchNewsDetail = async (id: string) => {
  try {
    const res = await getNewsDetail(id)
    const { title, image, body } = res

    news.image = image
    news.title = title
    setNavigationBarTitle({ title })
  } catch (err) {
    console.log(err)
  }
}

useShareAppMessage(() => ({
  title: news.title,
  path: `/pages/deatil/index?id=${newsId.value}`,
}))

useShareTimeline(() => ({
  title: news.title,
  path: `/pages/deatil/index?id=${newsId.value}`,
}))

onMounted(() => {
  const id = router.params.id
  if (!id) return
  newsId.value = id
  fetchNewsDetail(id)
})
</script>

<style lang="scss">
.page-detail {
  .detail {
    position: relative;
    height: 100%;
    padding-bottom: 100px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &-banner {
      position: relative;
      height: 450px;

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
        background-color: rgba(91, 115, 145, 0.5);
      }

      &-title {
        position: absolute;
        left: 5%;
        bottom: 40px;
        width: 60%;
        line-height: 60px;
        font-weight: bold;
        font-size: 36px;
        color: rgba(255, 255, 255, 0.9);
        text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      }

      &-source {
        position: absolute;
        right: 2%;
        bottom: 20px;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      }
    }

    &-content {
      position: relative;
      padding: 20px;
      line-height: 1.8em;
    }

    .question {
      position: relative;
      padding: 25px;

      &-title {
        margin-bottom: 20px;
        line-height: 1.6em;
        font-weight: 500;
        font-size: 36px;
      }

      &-main {
        position: relative;
      }

      &-answer {
        position: relative;

        &-meta {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 30px;

          .meta {
            &-avatar {
              display: block;
              width: 80px;
              height: 80px;
              margin-right: 20px;
              border-radius: 50%;
            }

            &-main {
              position: relative;
              flex: 1 0;
              overflow: hidden;
            }

            &-author {
              margin-bottom: 6px;
              font-weight: 500;
              font-size: 28px;
            }

            &-bio {
              font-size: 24px;
              color: #666;
              @include ellipsis;
            }
          }
        }

        &-main {
          position: relative;

          .paragraph {
            margin-bottom: 20px;
            line-height: 1.8em;
          }
        }
      }
    }

    &-action {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      width: 100%;
      border-top: 1px solid #efefef;

      .action-item {
        position: relative;
        width: 100%;
        padding: 0;
        background-color: #fff;
        border-radius: 0;

        &::after {
          border: none;
        }

        &-icon {
          margin-right: 20px;
          font-size: 40px;
          color: darkblue;
        }

        &-text {
          font-size: 28px;
        }

        &-line {
          position: absolute;
          top: 50%;
          right: 0;
          display: block;
          width: 2px;
          height: 40%;
          background-color: darkblue;
          transform: translateY(-50%);
        }
      }
    }

    .at-fab {
      position: fixed;
      right: 30px;
      bottom: 100px;
    }
  }
}
</style>
