<template>
  <div class="page-thank">
    <nut-noticebar :close-mode="true"> 点击链接，即可复制 URL 至浏览器中打开。 </nut-noticebar>
    <view class="card">
      感谢
      <text
        @tap="onCopyLink(`https://www.zhihu.com`)"
        class="highlight"
      >
        知乎 (Zhihu.Inc)
      </text>
      提供 API。
    </view>

    <view class="card">
      感谢
      <text
        @tap="onCopyLink(`https://github.com/izzyleung/ZhihuDailyPurify`)"
        class="highlight"
      >
        izzyleung/ZhihuDailyPurify
      </text>
      项目提供 API 接口文档。
    </view>

    <view class="card">
      感谢
      <text
        @tap="onCopyLink(`https://github.com/walleeeee/daily-zhihu`)"
        class="highlight"
      >
        walleeeee/daily-zhihu
      </text>
      项目提供部分页面设计。
    </view>
  </div>
</template>

<script lang="ts" setup>
import Taro from '@tarojs/taro'

const onCopyLink = async (link: string) => {
  await Taro.setClipboardData({ data: link })
  Taro.showToast({ title: '复制 URL 成功', icon: 'success' })
}
</script>

<style lang="scss">
.page-thank {
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: 0 30px;

  .nut-noticebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    text-align: center;
  }

  .card {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    min-height: 200px;
    padding: 20px 40px;
    margin-bottom: 30px;
    background-color: #fff;
    line-height: 1.8em;
    text-align: center;
    font-size: 28px;
    color: #555;
    box-shadow: 0 6px 20px 0 rgba(91, 115, 145, 0.15);
  }

  .highlight {
    font-weight: bold;
    text-decoration: underline;
    color: darkblue;
  }
}
</style>
