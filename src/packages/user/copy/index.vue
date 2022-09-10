<template>
  <view class="page-copy">
    <view class="paragraph">
      本应用所使用 API 均由
      <text class="highlight">
        知乎 (Zhihu.Inc)
      </text>
      提供，本人采取非正常手段获取，仅供学习参考，不得用于其他用途。项目 API
      内容的一切权利属于知乎。此行为或有侵犯知乎权益的嫌疑。若被告知需停止共享与使用，本人会及时删除整个项目。
    </view>
    <view class="paragraph">
      联系邮箱：<text class="highlight">
        {{ email }}
      </text>
    </view>
    <nut-button
      @click="onCopyEmail()"
      class="btn-copy-email"
      size="small"
      type="primary"
    >
      复制邮箱
    </nut-button>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Taro from '@tarojs/taro'

const email = ref(`ntnyq@foxmail.com`)

const onCopyEmail = async () => {
  await Taro.setClipboardData({ data: email.value })
  Taro.showToast({ title: `复制成功`, icon: `success` })
}
</script>

<style lang="scss">
.page-copy {
  position: relative;
  height: 100%;
  padding: 24px;

  .paragraph {
    margin-bottom: 20px;
    text-indent: 2em;
    line-height: 1.8em;
    font-size: 28px;
    color: #666;
  }

  .highlight {
    font-weight: bold;
    color: $primary-color;
  }

  .btn-copy-email {
    display: block;
    width: 400px;
    margin: 30px auto 0;
    font-size: 28px;
  }
}
</style>
