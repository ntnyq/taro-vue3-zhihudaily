import Taro from '@tarojs/taro'
import type { CanvasContext, CanvasGradient } from '@tarojs/taro'
import type { DrawImageData, Image } from './types'

declare const wx: any

/**
 * @description 生成随机字符串
 * @param length - 字符串长度
 */
export function randomString(length: number) {
  let str = Math.random().toString(36).slice(2)
  if (str.length >= length) {
    return str.slice(0, Math.max(0, length))
  }
  str += randomString(length - str.length)
  return str
}

/**
 * 随机创造一个id
 * @param prefix - ID 前缀
 * @param length - 字符串长度
 * @returns id
 */
export function getRandomId(prefix = 'canvas', length = 10) {
  return prefix + randomString(length)
}

/**
 * 获取最大高度
 * @param config
 */
// export function getHeight (config) {
//   const getTextHeight = text => {
//     const fontHeight = text.lineHeight || text.fontSize
//     let height = 0
//     if (text.baseLine === 'top') {
//       height = fontHeight
//     } else if (text.baseLine === 'middle') {
//       height = fontHeight / 2
//     } else {
//       height = 0
//     }
//     return height
//   }
//   const heightArr: number[] = [];
//   (config.blocks || []).forEach(item => {
//     heightArr.push(item.y + item.height)
//   });
//   (config.texts || []).forEach(item => {
//     let height
//     if (Object.prototype.toString.call(item.text) === '[object Array]') {
//       item.text.forEach(i => {
//         height = getTextHeight({ ...i, baseLine: item.baseLine })
//         heightArr.push(item.y + height)
//       })
//     } else {
//       height = getTextHeight(item)
//       heightArr.push(item.y + height)
//     }
//   });
//   (config.images || []).forEach(item => {
//     heightArr.push(item.y + item.height)
//   });
//   (config.lines || []).forEach(item => {
//     heightArr.push(item.startY)
//     heightArr.push(item.endY)
//   })
//   const sortRes = heightArr.sort((a, b) => b - a)
//   let canvasHeight = 0
//   if (sortRes.length > 0) {
//     canvasHeight = sortRes[0]
//   }
//   if (config.height < canvasHeight || !config.height) {
//     return canvasHeight
//   }
//   return config.height
// }

/**
 * 将 http转为https
 */
export function ensureHttps(url: string) {
  if (!url.includes(':') || url.startsWith('http://tmp')) {
    return url
  }
  return url.replace('http://', 'https://')
}

/**
 * 获取 rpx => px 的转换系数
 * @returns factor 单位转换系数 1rpx = factor * px
 */
export const getFactor = () => {
  const sysInfo = Taro.getSystemInfoSync()
  const { screenWidth } = sysInfo
  return screenWidth / 750
}

/**
 * rpx => px 单位转换
 * @param rpx - 需要转换的数值
 * @param factor - 转化因子
 * @returns px
 */
export const toPx = (rpx: number, factor = getFactor()) =>
  Number.parseInt(String(rpx * factor), 10)

/**
 * px => rpx 单位转换
 * @param px - 需要转换的数值
 * @param factor - 转化因子
 * @returns rpx
 */
export const toRpx = (px: number, factor = getFactor()) =>
  Number.parseInt(String(px / factor), 10)

/**
 * 下载图片资源
 * @param url
 */
export async function downloadFile(url: string) {
  // wx.env.USER_DATA_PATH 文件系统中的用户目录路径
  if (url.startsWith('http') && !new RegExp(wx.env.USER_DATA_PATH).test(url)) {
    const res = await Taro.downloadFile({ url: ensureHttps(url) })
    if (res.statusCode === 0) {
      return res.tempFilePath
    }
  } else {
    // 本地地址文件
    return url
  }
}

/**
 * 下载图片并获取图片信息
 * @param item - 图片参数信息
 * @param index - 图片下标
 * @returns 整理后的图片信息
 */
export async function getImageInfo(item: Image, index: number) {
  const { x, y, width, height, url, zIndex } = item

  const imgPath = await downloadFile(url)

  if (!imgPath) {
    return
  }

  const imageInfo = await Taro.getImageInfo({ src: imgPath })

  // 获取图片信息
  // 根据画布的宽高计算出图片绘制的大小，这里会保证图片绘制不变形， 即宽高比不变，截取再拉伸
  let sx: number // 截图的起点 x 坐标
  let sy: number // 截图的起点 y 坐标
  const borderRadius = item.borderRadius || 0
  const imgWidth = toRpx(imageInfo.width) // 图片真实宽度 单位 px
  const imgHeight = toRpx(imageInfo.height) // 图片真实高度 单位 px
  // 根据宽高比截取图片
  if (imgWidth / imgHeight <= width / height) {
    sx = 0
    sy = (imgHeight - (imgWidth / width) * height) / 2
  } else {
    sy = 0
    sx = (imgWidth - (imgHeight / height) * width) / 2
  }
  // 给 canvas 画图准备参数，详见 ./draw.ts-drawImage
  const result: DrawImageData = {
    type: 'image',
    borderRadius,
    borderWidth: item.borderWidth,
    borderColor: item.borderColor,
    borderRadiusGroup: item.borderRadiusGroup,
    zIndex: zIndex !== undefined ? zIndex : index,
    imgPath: url,
    sx,
    sy,
    sw: imgWidth - sx * 2,
    sh: imgHeight - sy * 2,
    x,
    y,
    w: width,
    h: height,
  }

  return result
}

/**
 * 获取线性渐变色
 * TODO: 待优化, 支持所有角度，多个颜色的线性渐变
 * @param ctx - canvas 实例对象
 * @param color - 线性渐变色,如 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 100%)'
 * @param startX - 起点 x 坐标
 * @param startY - 起点 y 坐标
 * @param w - 宽度
 * @param h - 高度
 * @returns grd
 */
export function getLinearColor(
  ctx: CanvasContext,
  color: string,
  startX: number,
  startY: number,
  w: number,
  h: number,
) {
  if (
    typeof startX !== 'number'
    || typeof startY !== 'number'
    || typeof w !== 'number'
    || typeof h !== 'number'
  ) {
    console.warn('坐标或者宽高只支持数字')
    return color
  }
  let grd: CanvasGradient | string = color
  if (color.includes('linear-gradient')) {
    // fillStyle 不支持线性渐变色
    const colorList = color.match(/\((\d+)deg,\s(.+)\s\d+%,\s(.+)\s\d+%/)
    if (!colorList) {
      return
    }
    const radian = Number.parseInt(colorList[1]) // 渐变弧度（角度）
    const color1 = colorList[2]
    const color2 = colorList[3]

    const L = Math.hypot(w, h)
    const x = Math.ceil(Math.sin(180 - radian) * L)
    const y = Math.ceil(Math.cos(180 - radian) * L)

    // 根据弧度和宽高确定渐变色的两个点的坐标
    if (Number(radian) === 180 || Number(radian) === 0) {
      if (Number(radian) === 180) {
        grd = ctx.createLinearGradient(startX, startY, startX, startY + h)
      }
      if (Number(radian) === 0) {
        grd = ctx.createLinearGradient(startX, startY + h, startX, startY)
      }
    } else if (radian > 0 && radian < 180) {
      grd = ctx.createLinearGradient(startX, startY, x + startX, y + startY)
    } else {
      throw new Error('只支持0 <= 颜色弧度 <= 180')
    }
    ;(grd as CanvasGradient).addColorStop(0, color1)
    ;(grd as CanvasGradient).addColorStop(1, color2)
  }
  return grd
}

/**
 * 根据文字对齐方式设置坐标
 */
export function getTextX(textAlign: string, x: number, width: number) {
  if (textAlign === 'center') {
    return width / 2 + x
  } else if (textAlign === 'right') {
    return width + x
  }
  return x
}
