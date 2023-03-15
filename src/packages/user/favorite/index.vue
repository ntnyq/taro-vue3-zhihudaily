<template>
  <view class="page-favorite">
    <view
      v-if="favoriteStore.list.length"
      class="favorite-list"
    >
      <view class="favorite-list-count">
        <text class="count-text"> 共计 {{ favoriteStore.list.length }} 篇收藏 </text>
        <nut-button
          @tap="clearFaveriteList"
          class="count-clear-btn"
          type="primary"
          size="small"
        >
          清空收藏
        </nut-button>
      </view>

      <view
        @tap="goStoryDetail(item.id)"
        v-for="item in favoriteStore.list"
        :key="item.id"
        class="favorite-item"
      >
        <image
          :src="item.image"
          mode="aspectFill"
          class="favorite-item-image"
        />
        <view class="favorite-item-title">
          {{ item.title }}
        </view>
      </view>
    </view>
    <view
      v-else
      class="no-content"
    >
      <text class="no-content-tip"> 暂无收藏日推 </text>
      <nut-button
        @tap="goHome"
        type="primary"
      >
        点击回到首页
      </nut-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()

const clearFaveriteList = async () => {
  const res = await Taro.showModal({
    title: '提示',
    content: '确定清除所有收藏吗，清除后无法恢复？',
  })
  if (!res.confirm) return
  favoriteStore.clearStoryList()
}
const goStoryDetail = async (id: string) => {
  if (!id) return
  Taro.navigateTo({ url: `/pages/detail/index?id=${id}` })
}
const goHome = () => {
  Taro.switchTab({ url: '/pages/index/index' })
}
</script>

<style lang="scss">
.page-favorite {
  .favorite {
    position: relative;
    height: 100%;
    background-color: #f7f7f7;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &-list {
      position: relative;
      width: 90%;
      margin: 40px auto 0;

      &-count {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;

        .count-clear-btn {
          height: 56px;
          line-height: 54px;
          font-size: 24px;
        }

        .count-text {
          font-size: 24px;
          color: #999;
        }
      }
    }

    &-item {
      position: relative;
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

  .no-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 500px;

    &-tip {
      margin-bottom: 60px;
      font-size: 28px;
      color: #aaa;
    }
  }
}
</style>
