<template>
  <view class="page-detail">
    <view v-if="newsImage" class="detail-banner">
      <image :src="newsImage" mode="aspectFill" class="detail-banner-image" />
      <view class="detail-banner-overlay" />
      <text class="detail-banner-title">
        {{ newsTitle }}
      </text>
      <text class="detail-banner-source" />
    </view>
    <view v-for="(question, idx) in questions" :key="idx" class="question">
      <view class="question-title">
        <text class="question-title-text">
          {{ question.title }}
        </text>
      </view>
      <view class="question-main">
        <view
          v-for="answer in question.answers"
          :key="answer.author"
          class="question-answer"
        >
          <view class="question-answer-meta">
            <image :src="answer.avatar" mode="aspectFill" class="meta-avatar" />
            <view class="meta-main">
              <view class="meta-author">
                {{ answer.author }}
              </view>
              <view class="meta-bio">
                {{ answer.bio }}
              </view>
            </view>
          </view>
          <view class="question-answer-main">
            <view
              v-for="node in answer.contents"
              :key="node.content"
              class="paragraph"
            >
              <rich-text
                v-if="node.type === `PARAGRAPH`"
                :nodes="node.content"
                class="p-text"
              />
              <image
                v-if="node.type === `IMAGE`"
                :src="node.content"
                mode="widthFix"
                class="p-image"
                @click="onPreviewImages(node.content)"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
    <nut-divider :dashed="true" :hairline="true">
      没有更多了
    </nut-divider>
    <view class="detail-action">
      <button hover-class="none" class="action-item" open-type="share">
        <nut-icon class="action-item-icon" name="share" />
        <text class="action-item-text">
          分享给好友
        </text>
        <view class="action-item-line" />
      </button>
      <button hover-class="none" class="action-item" @click="onGeneratePoster">
        <nut-icon class="action-item-icon" name="photograph" />
        <text class="action-item-text">
          生成海报
        </text>
      </button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
  previewImage,
  setNavigationBarTitle,
  showToast,
  useRouter,
  useShareAppMessage,
  useShareTimeline,
} from '@tarojs/taro'
import { getNewsDetail } from '../../services'
import { normalizeStory } from '../../utils/translators'
import type { Question } from '../../types'

const router = useRouter()
const newsId = ref(``)
const newsImage = ref(``)
const newsTitle = ref(``)
const questions = ref<Question[]>([])
const images = ref<string[]>([])

const fetchNewsDetail = async (id: string) => {
  try {
    const res = await getNewsDetail(id)
    const { title, image, body } = res
    const story = normalizeStory(body)
    newsTitle.value = title
    newsImage.value = image
    images.value = story.images
    questions.value = story.questions
    setNavigationBarTitle({ title: newsTitle.value })
  } catch (err) {
    console.log(err)
  }
}
const onPreviewImages = async (image: string) => {
  try {
    await previewImage({ current: image, urls: images.value })
  } catch (err) {
    showToast({ title: `预览图片失败，请重试`, icon: `error` })
  }
}
const onGeneratePoster = async () => {

}

useShareAppMessage(() => ({
  title: newsTitle.value,
  path: `/pages/detail/index?id=${newsId.value}`,
}))

useShareTimeline(() => ({
  title: newsTitle.value,
  path: `/pages/detail/index?id=${newsId.value}`,
}))

onMounted(() => {
  const id = router.params.id || `9748999`
  if (!id) return
  newsId.value = id
  fetchNewsDetail(id)
})
</script>

<style lang="scss">
.page-detail {
  padding-bottom: 80px;

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

    &-action {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      width: 100%;
      height: 80px;
      border-top: 1px solid #efefef;

      .action-item {
        position: relative;
        width: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #fff;
        border-radius: 0;

        &::after {
          border: none;
        }

        &-icon {
          margin-right: 16px;
          font-size: 32px;
          color: $primary-color;
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
          background-color: $primary-color;
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

        .p-image {
          display: block;
          max-width: 100%;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
