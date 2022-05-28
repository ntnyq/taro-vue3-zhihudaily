<template>
  <view class="page-user">
    <view class="user-header">
      <view v-if="user.hasAuth" class="has-auth">
        <open-data class="user-avatar" type="userAvatarUrl" />
        <open-data class="user-name" type="userNickName" />
      </view>
      <view v-else class="no-auth">
        <text class="no-auth-text">
          授权后，获取个性化内容
        </text>
        <nut-button
          open-type="getUserInfo"
          type="primary"
          size="small"
          @getuserinfo="onGetUserInfo"
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
        <nut-cell title="我的收藏" @click="onCellClick(`favorite`)" />
        <nut-cell title="权限管理" @click="onCellClick(`permission`)" />
        <nut-cell title="清理缓存" @click="onCellClick(`cache`)" />
      </nut-cell-group>
    </view>
    <view class="user-section">
      <view class="user-section-title">
        <view class="user-section-title-line" />
        <text>关于应用</text>
      </view>
      <nut-cell-group>
        <nut-cell title="意见反馈" @click="onCellClick(`feedback`)">
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
        <nut-cell title="版权声明" @click="onCellClick(`copy`)" />
        <nut-cell title="关于作者" @click="onCellClick(`author`)" />
        <nut-cell title="致谢" @click="onCellClick(`thank`)" />
      </nut-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'
import { useUserStore } from '@/stores/user'

const user = useUserStore()
const onGetUserInfo = async (evt: any) => {
  const { userInfo = {} } = evt.detail || {}
  user.setUserInfo(userInfo)
}
const onClearAllCache = async () => {
  user.clearUserInfo()
  await Taro.clearStorage()
  Taro.showToast({ title: `清理成功`, icon: `success` })
}
const onCellClick = (key: string) => {
  switch (key) {
    case `copy`:
    case `author`:
    case `thank`:
      Taro.navigateTo({ url: `/packages/user/${key}/index` })
      break
    case `permission`:
      Taro.openSetting()
      break
    case `cache`:
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
          border: 1px solid #f2f3f4;
        }

        .user-name {
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
