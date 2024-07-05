<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import {
  authorize,
  getSetting,
  openSetting,
  previewImage,
  saveImageToPhotosAlbum,
  setNavigationBarTitle,
  showModal,
  showToast,
  useRouter,
  useShareAppMessage,
  useShareTimeline,
} from '@tarojs/taro'
import { Photograph, Share } from '@nutui/icons-vue-taro'
import PosterBuilder from '@/components/PosterBuilder/index.vue'
import { getNewsDetail } from '@/services'
import { formatTime } from '@/utils'
import { normalizeStory } from '@/utils/translators'
import { useFavoriteStore } from '@/stores/favorite'
import type { DrawConfig } from '@/components/PosterBuilder/types'
import type { Question } from '@/types'

const INIT_DRAW_CONFIG: DrawConfig = {
  width: 750,
  height: 1100,
  backgroundColor: '#ffffff',
}

const router = useRouter()
const newsId = ref('')
const newsImage = ref('')
const newsTitle = ref('')
const questions = ref<Question[]>([])
const images = ref<string[]>([])
const nickName = ''
const isChecked = ref(false)
const posterConfig = ref<DrawConfig>(INIT_DRAW_CONFIG)
const favoriteStore = useFavoriteStore()
const shouldRenderPoster = computed(
  () =>
    posterConfig.value.blocks?.length ||
    posterConfig.value.images?.length ||
    posterConfig.value.texts?.length,
)

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
  } catch {
    showToast({ title: '预览图片失败，请重试', icon: 'error' })
  }
}
const onToggleFavoriteStory = () => {
  const storyMeta = {
    id: newsId.value,
    title: newsTitle.value,
    image: newsImage.value,
  }
  if (isChecked.value) {
    favoriteStore.addStory(storyMeta)
  } else {
    favoriteStore.removeStory(newsId.value)
  }
}
const onGeneratePoster = async () => {
  const time = formatTime(new Date(), { format: 'YYYY年MM月DD日' })
  posterConfig.value = {
    ...posterConfig.value,
    blocks: [
      {
        y: INIT_DRAW_CONFIG.height - 120,
        x: 0,
        width: 750,
        height: 120,
        backgroundColor: '#eccdb0',
        zIndex: 10,
      },
    ],
    images: [
      {
        x: 0,
        y: 0,
        width: 750,
        height: 450,
        url: newsImage.value,
      },
    ],
    texts: [
      {
        x: 40,
        y: 470,
        width: 500,
        fontSize: 36,
        lineHeight: 50,
        lineNum: 2,
        color: '#333333',
        text: newsTitle.value,
      },
      {
        x: 40,
        y: 600,
        color: '#999999',
        text: '来自：「知乎日报」',
      },
      {
        x: 40,
        y: 700,
        width: 300,
        lineNum: 1,
        fontSize: 24,
        color: '#333333',
        text: nickName ? `${nickName} - 邀请你来读文章` : '来源: 文章分享',
      },
      {
        x: 40,
        y: 750,
        width: 300,
        lineNum: 1,
        fontSize: 24,
        color: '#333333',
        text: `分享于: ${time}`,
      },
      {
        x: INIT_DRAW_CONFIG.width - 40 - 200,
        y: 700,
        width: 200,
        fontSize: 32,
        lineHeight: 48,
        lineNum: 2,
        color: '#666666',
        text: '假装这里是小程序二维码',
      },
      {
        x: 40,
        y: INIT_DRAW_CONFIG.height - 90,
        fontSize: 24,
        lineHeight: 30,
        lineNum: 1,
        color: '#914d4d',
        text: '长按小程序码',
        zIndex: 20,
      },
      {
        x: 40,
        y: INIT_DRAW_CONFIG.height - 50,
        fontSize: 24,
        lineHeight: 30,
        lineNum: 1,
        color: '#914d4d',
        text: '进入喔喔日推小程序查看',
        zIndex: 20,
      },
    ],
  }
}
const saveImage = async (filePath: string) => {
  try {
    await saveImageToPhotosAlbum({ filePath })
    showModal({
      showCancel: false,
      title: '图片已保存到系统相册',
      content: '快去分享给小伙伴们吧~~',
      confirmText: '我知道了',
      confirmColor: '#2d8cf0',
    })
  } catch (err) {
    console.log(err)
  }
}
const onPosterGenerateSuccess = async (result: { tempFilePath: string }) => {
  const { authSetting = {} } = await getSetting()
  const filePath = result.tempFilePath
  if (!filePath) {
    return showToast({ title: '图片生成失败，请重试', icon: 'error' })
  }
  if (authSetting['scope.writePhotosAlbum']) return saveImage(filePath)
  authorize({
    scope: 'scope.writePhotosAlbum',
    success() {
      saveImage(filePath)
    },
    async fail() {
      const res = await showModal({
        title: '提示',
        content: '保存图片需要您的授权',
        showCancel: true,
        cancelText: '取消',
        cancelColor: '#7f7f7f',
        confirmText: '去设置',
        confirmColor: '#2d8cf0',
      })
      if (!res.confirm) return
      openSetting()
    },
  })
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
  const id = router.params.id
  if (!id) return
  newsId.value = id
  isChecked.value = favoriteStore.list.map(item => item.id).includes(id)
  fetchNewsDetail(id)
})
</script>

<template>
  <view class="page-detail">
    <view
      v-if="newsImage"
      class="detail-banner"
    >
      <image
        :src="newsImage"
        mode="aspectFill"
        class="detail-banner-image"
      />
      <view class="detail-banner-overlay" />
      <text class="detail-banner-title">
        {{ newsTitle }}
      </text>
      <text class="detail-banner-source" />
    </view>
    <view
      v-for="(question, idx) in questions"
      :key="idx"
      class="question"
    >
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
            <image
              :src="answer.avatar"
              mode="aspectFill"
              class="meta-avatar"
            />
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
                v-if="node.type === 'PARAGRAPH'"
                :nodes="node.content"
                class="p-text"
              />
              <rich-text
                v-if="node.type === 'LIST'"
                :nodes="node.content"
                class="p-list"
              />
              <image
                @tap="onPreviewImages(node.content)"
                v-if="node.type === 'IMAGE'"
                :src="node.content"
                mode="widthFix"
                class="p-image"
              />
            </view>
          </view>
        </view>
      </view>
    </view>
    <nut-divider
      :dashed="true"
      :hairline="true"
    >
      没有更多了
    </nut-divider>
    <template v-if="newsImage">
      <view class="detail-collection">
        <nut-checkbox
          @change="onToggleFavoriteStory"
          v-model="isChecked"
          icon-size="20"
        >
          收藏此文章
        </nut-checkbox>
      </view>
      <view class="detail-action">
        <button
          hover-class="none"
          class="action-item"
          open-type="share"
        >
          <share class="action-item-icon" />
          <text class="action-item-text"> 分享给好友 </text>
          <view class="action-item-line" />
        </button>
        <button
          @click="onGeneratePoster"
          hover-class="none"
          class="action-item"
        >
          <photograph class="action-item-icon" />
          <text class="action-item-text"> 生成海报 </text>
        </button>
      </view>
    </template>
    <poster-builder
      @success="onPosterGenerateSuccess"
      v-if="shouldRenderPoster"
      :config="posterConfig"
      :show-loading="true"
    />
  </view>
</template>

<style lang="scss">
.page-detail {
  position: relative;
  height: 100%;
  padding-bottom: 100px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  .detail-banner {
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

  .detail-action {
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
        height: 60%;
        background-color: $primary-color;
        transform: translateY(-50%);
      }
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

  .detail-collection {
    position: relative;
    padding: 10px 20px 40px;
  }
}
</style>
