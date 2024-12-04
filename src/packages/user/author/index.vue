<script lang="ts" setup>
import { Service } from '@nutui/icons-vue-taro'
import { ref } from 'vue'

const contributors = ref([
  {
    name: 'ntnyq',
    avatar: 'https://avatars1.githubusercontent.com/u/22659150',
    description: '前端工程师，喜欢技术，喜欢折腾，喜欢小说，喜欢打游戏。',
  },
])
</script>

<template>
  <view class="page-author">
    <view class="contributor-list">
      <view
        v-for="item in contributors"
        :key="item.name"
        class="contributor-item"
      >
        <nut-avatar :icon="item.avatar" />
        <view class="contributor-item-main">
          <view class="contributor-item-name">
            {{ item.name }}
          </view>
          <view class="contributor-item-description">
            {{ item.description }}
          </view>
        </view>
        <view class="contributor-item-wechat">
          <button
            class="contributor-item-wechat-btn"
            hover-class="none"
            open-type="contact"
            type="button"
          >
            <service class="contributor-item-wechat-icon" />
          </button>
        </view>
      </view>
    </view>
    <nut-divider
      :dashed="true"
      :hairline="true"
    >
      点击图标，直接与作者对话
    </nut-divider>
  </view>
</template>

<style lang="scss">
.page-author {
  .contributor {
    &-list {
      position: relative;
      padding: 24px;
    }

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;

      &-main {
        position: relative;
        flex: 1 0;
        margin-left: 20px;
      }

      &-name {
        margin-bottom: 10px;
        font-size: 32px;
      }

      &-description {
        font-size: 22px;
        color: #666;
      }

      &-wechat {
        width: 60px;
        margin-left: 20px;
        text-align: right;

        &-btn {
          padding: 0;
          background-color: transparent;

          &::after {
            border: none;
          }
        }

        &-icon {
          font-size: 32px;
          color: $primary-color;
        }
      }
    }
  }
}
</style>
