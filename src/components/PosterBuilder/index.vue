<script lang="ts">
import Taro from '@tarojs/taro'
import { defineComponent, onMounted, ref } from 'vue'
import { drawBlock, drawImage, drawLine, drawText } from './utils/draw'
import {
  getImageInfo,
  getLinearColor,
  getRandomId,
  toPx,
  toRpx,
} from './utils/tools'
import type { PropType } from 'vue'
import type { DrawConfig, Image } from './utils/types'

export default defineComponent({
  name: 'PosterBuilder',
  props: {
    showLoading: {
      type: Boolean,
      default: false,
    },
    config: {
      type: Object as PropType<DrawConfig>,
      default: () => ({}),
    },
  },
  emits: ['success', 'fail'],
  setup(props, context) {
    const count = ref(1)
    const {
      width,
      height,
      backgroundColor,
      texts = [],
      blocks = [],
      lines = [],
      debug = false,
    } = props.config || {}

    const canvasId = getRandomId()

    /**
     * step1: 初始化图片资源
     * @param images - = imgTask
     * @returns downloadImagePromise
     */
    const initImages = (images: Image[]) => {
      const imageList = images.filter(item => item.url)
      const drawList = imageList.map((item, index) => getImageInfo(item, index))
      return Promise.all(drawList)
    }

    /**
     * step2: 初始化 canvas && 获取其 dom 节点和实例
     * @returns resolve 里返回其 dom 和实例
     */
    const initCanvas = () =>
      new Promise(resolve => {
        setTimeout(() => {
          const pageInstance = Taro.getCurrentInstance()?.page || {} // 拿到当前页面实例
          const query = Taro.createSelectorQuery().in(pageInstance) // 确定在当前页面内匹配子元素
          query
            .select(`#${canvasId}`)
            .fields({ node: true, size: true, context: true }, res => {
              const canvas = res.node
              const ctx = canvas.getContext('2d')
              resolve({ ctx, canvas })
            })
            .exec()
        }, 300)
      })

    /**
     * @description 保存绘制的图片
     * @param canvas
     */
    const getTempFile = (canvas: Taro.Canvas) => {
      Taro.canvasToTempFilePath(
        {
          canvas,
          success: result => {
            Taro.hideLoading()
            context.emit('success', result)
          },
          fail: error => {
            const { errMsg } = error
            if (errMsg === 'canvasToTempFilePath:fail:create bitmap failed') {
              count.value += 1
              if (count.value <= 3) {
                getTempFile(canvas)
              } else {
                Taro.hideLoading()
                Taro.showToast({
                  icon: 'none',
                  title: errMsg || '绘制海报失败',
                })
                context.emit('fail', errMsg)
              }
            }
          },
        },
        context,
      )
    }

    /**
     * step2: 开始绘制任务
     * @param drawTasks - 待绘制任务
     */
    const startDrawing = async (drawTasks: any[]) => {
      // TODO: check
      // const configHeight = getHeight(config)
      const { ctx, canvas } = (await initCanvas()) as any

      canvas.width = width
      canvas.height = height

      // 设置画布底色
      if (backgroundColor) {
        ctx.save() // 保存绘图上下文
        const grd = getLinearColor(ctx, backgroundColor, 0, 0, width, height)
        ctx.fillStyle = grd // 设置填充颜色
        ctx.fillRect(0, 0, width, height) // 填充一个矩形
        ctx.restore() // 恢复之前保存的绘图上下文
      }
      // 将要画的方块、文字、线条放进队列数组
      const queue = drawTasks
        .concat(
          texts.map(item => {
            item.type = 'text'
            item.zIndex = item.zIndex || 0
            return item
          }),
        )
        .concat(
          blocks.map(item => {
            item.type = 'block'
            item.zIndex = item.zIndex || 0
            return item
          }),
        )
        .concat(
          lines.map(item => {
            item.type = 'line'
            item.zIndex = item.zIndex || 0
            return item
          }),
        )

      queue.sort((a, b) => a.zIndex - b.zIndex) // 按照层叠顺序由低至高排序, 先画低的，再画高的

      for (const element of queue) {
        const drawOptions = {
          canvas,
          ctx,
          toPx,
          toRpx,
        }
        if (element.type === 'image') {
          await drawImage(element, drawOptions)
        } else if (element.type === 'text') {
          drawText(element, drawOptions)
        } else if (element.type === 'block') {
          drawBlock(element, drawOptions)
        } else if (element.type === 'line') {
          drawLine(element, drawOptions)
        }
      }

      setTimeout(() => {
        getTempFile(canvas) // 需要做延时才能能正常加载图片
      }, 300)
    }

    // start: 初始化 canvas 实例 && 下载图片资源
    const init = () => {
      if (props.showLoading) {
        Taro.showLoading({ mask: true, title: '生成中...' })
      }
      if (props.config?.images?.length) {
        initImages(props.config.images)
          .then(result => {
            // 1. 下载图片资源
            startDrawing(result)
          })
          .catch(err => {
            Taro.showToast({
              icon: 'none',
              title: err.errMsg || '下载图片失败',
            })
            context.emit('fail', err)
          })
          .finally(() => {
            Taro.hideLoading()
          })
      } else {
        startDrawing([])
      }
    }

    onMounted(() => {
      init()
    })

    return {
      canvasId,
      debug,
      width,
      height,
    }
  },
})
</script>

<template>
  <canvas
    :style="`height: ${height}rpx; width:${width}rpx; position: absolute;
    ${debug ? '' : 'transform:translate3d(-9999rpx, 0, 0)'}`"
    :id="canvasId"
    type="2d"
  />
</template>
