<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { useFavoriteStore } from '@/stores/favorite'
import { useUserStore } from '@/stores/user'
import type { MpEvent } from '@tarojs/taro'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()

const handleChooseAvatar = (evt: MpEvent) => {
  const { avatarUrl } = evt.detail as { avatarUrl: string }
  if (!avatarUrl) return
  userStore.setAvatar(avatarUrl)
}
const handleNicknameChange = async (evt: MpEvent) => {
  const { value: nickname } = evt.detail as { value: string }
  const res = await Taro.showModal({
    title: '提示',
    content: '确定设置该昵称吗？',
  })
  if (!res.confirm) return
  userStore.setNickname(nickname)
}
const onClearAllCache = async () => {
  const res = await Taro.showModal({
    title: '提示',
    content: '确定清理全部缓存吗？',
  })
  if (!res.confirm) return
  userStore.dispose()
  favoriteStore.dispose()
  await Taro.clearStorage()
  Taro.showToast({ title: '清理成功', icon: 'success' })
}
const onCellClick = (key: string) => {
  switch (key) {
    case 'copy':
    case 'author':
    case 'thank':
    case 'favorite':
      Taro.navigateTo({ url: `/packages/user/${key}/index` })
      break
    case 'permission':
      Taro.openSetting()
      break
    case 'cache':
      onClearAllCache()
      break
    default:
      break
  }
}
</script>

<template>
  <view class="page-user">
    <view class="user-header">
      <view class="user-meta">
        <div class="user-avatar">
          <image
            v-if="userStore.avatar"
            :src="userStore.avatar"
            class="user-avatar-image"
            mode="aspectFill"
          />
          <nut-button
            @chooseavatar="handleChooseAvatar"
            v-else
            open-type="chooseAvatar"
            type="primary"
            size="small"
          >
            获取头像
          </nut-button>
        </div>
        <view class="user-name">
          <text
            v-if="userStore.nickname"
            class="user-name-text"
          >
            {{ userStore.nickname }}
          </text>
          <input
            @confirm="handleNicknameChange"
            v-else
            type="nickname"
            placeholder="请输入昵称"
            class="user-name-input"
          />
        </view>
      </view>
    </view>
    <view class="user-section">
      <view class="user-section-title">
        <view class="user-section-title-line" />
        <text>用户设置</text>
      </view>
      <nut-cell-group>
        <nut-cell
          @click="onCellClick('favorite')"
          title="我的收藏"
        />
        <nut-cell
          @click="onCellClick('permission')"
          title="权限管理"
        />
        <nut-cell
          @click="onCellClick('cache')"
          title="清理缓存"
        />
      </nut-cell-group>
    </view>
    <view class="user-section">
      <view class="user-section-title">
        <view class="user-section-title-line" />
        <text>关于应用</text>
      </view>
      <nut-cell-group>
        <nut-cell
          @click="onCellClick('feedback')"
          title="意见反馈"
        >
          <view class="feedback-wrap">
            <button
              class="feedback-btn"
              hover-class="none"
              open-type="feedback"
              type="button"
            >
              意见反馈
            </button>
          </view>
        </nut-cell>
        <nut-cell
          @click="onCellClick('copy')"
          title="版权声明"
        />
        <nut-cell
          @click="onCellClick('author')"
          title="关于作者"
        />
        <nut-cell
          @click="onCellClick('thank')"
          title="致谢"
        />
      </nut-cell-group>
    </view>
  </view>
</template>

<style lang="scss">
.page-user {
  .user {
    position: relative;
    height: 100%;
    background-color: #f9faff;
    overflow-y: auto;

    &-header {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 30px;
      background-color: #fff;

      .user-meta {
        position: relative;
        padding: 20px 30px;

        .user-avatar {
          position: relative;
          margin-bottom: 20px;
          text-align: center;

          &-image {
            position: relative;
            display: block;
            width: 120px;
            height: 120px;
            margin: 0 auto;
            border-radius: 50%;
            padding: 4px;
            border: 1px solid #f1f2f3;
          }
        }

        .user-name {
          position: relative;
          text-align: center;

          &-text {
            position: relative;
            font-size: 36px;
            color: #333;
          }

          &-input {
            position: relative;
          }
        }
      }
    }

    &-section {
      position: relative;
      margin-bottom: 30px;
      background-color: #fff;
      color: #333;

      &-title {
        position: relative;
        padding: 16px 24px 16px 50px;

        &-line {
          position: absolute;
          top: 50%;
          left: 24px;
          width: 8px;
          height: 40px;
          border-radius: 4px;
          background-color: $primary-color;
          transform: translateY(-50%);
        }

        text {
          font-weight: bold;
          font-size: 28px;
          color: #444;
        }
      }
    }
  }

  .feedback {
    &-wrap {
      position: relative;
      width: 100%;
    }

    &-line {
      position: absolute;
      bottom: 0;
      left: 24px;
      right: 0;
      border-bottom: 1px solid #eee;
    }

    &-btn {
      display: block;
      width: 100%;
      height: 40px;
      line-height: 40px;
      background-color: transparent !important;
      padding: 0;
      text-align: left;
      border: none;
      font-size: 30px;
      font-family: inherit;
      color: #333;

      &::after {
        border: none;
      }
    }

    &-arrow {
      position: absolute;
      top: 50%;
      right: 12px;
      font-size: 32px;
      transform: translateY(-50%);
    }
  }
}
</style>
