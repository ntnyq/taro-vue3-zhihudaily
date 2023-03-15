<template>
  <view class="page-user">
    <view class="user-header">
      <view
        v-if="userStore.hasAuth"
        class="has-auth"
      >
        <image
          class="user-avatar"
          :src="userStore.userInfo.avatarUrl"
          mode="aspectFill"
        />
        <span class="username">{{ userStore.userInfo.nickName }}</span>
      </view>
      <view
        v-else
        class="no-auth"
      >
        <text class="no-auth-text"> 授权后，获取个性化内容 </text>
        <nut-button
          @tap="onGetUserInfo"
          type="primary"
          size="small"
        >
          点击授权
        </nut-button>
      </view>
    </view>
    <view class="user-section">
      <view class="user-section-title">
        <view class="user-section-title-line" />
        <text>用户设置</text>
      </view>
      <nut-cell-group>
        <nut-cell
          @click="onCellClick(`favorite`)"
          title="我的收藏"
        />
        <nut-cell
          @click="onCellClick(`permission`)"
          title="权限管理"
        />
        <nut-cell
          @click="onCellClick(`cache`)"
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
          @click="onCellClick(`feedback`)"
          title="意见反馈"
        >
          <view class="feedback-wrap">
            <button
              class="feedback-btn"
              hover-class="none"
              open-type="feedback"
            >
              意见反馈
            </button>
          </view>
        </nut-cell>
        <nut-cell
          @click="onCellClick(`copy`)"
          title="版权声明"
        />
        <nut-cell
          @click="onCellClick(`author`)"
          title="关于作者"
        />
        <nut-cell
          @click="onCellClick(`thank`)"
          title="致谢"
        />
      </nut-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorite'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const onGetUserInfo = async () => {
  try {
    const res = await Taro.getUserProfile({ desc: '用于展示用户信息' })
    if (!res.userInfo) return
    userStore.setUserInfo(res.userInfo)
  } catch (err) {
    console.log(err)
  }
}
const onClearAllCache = async () => {
  userStore.clearUserInfo()
  favoriteStore.clearStoryList()
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

<style lang="scss">
.page-user {
  .user {
    position: relative;
    height: 100%;
    background-color: #f9faff;

    &-header {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 160px;
      margin-bottom: 30px;
      background-color: #fff;

      .has-auth {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding: 0 30px;

        .user-avatar {
          display: block;
          width: 120px;
          height: 120px;
          margin-right: 20px;
          border-radius: 50%;
          padding: 4px;
          border: 1px solid #f1f2f3;
        }

        .username {
          flex: 1 0;
          margin-left: 20px;
          font-size: 40px;
          color: #666;
        }
      }

      .no-auth {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &-text {
          display: block;
          margin-bottom: 24px;
          font-size: 28px;
          color: #999;
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
