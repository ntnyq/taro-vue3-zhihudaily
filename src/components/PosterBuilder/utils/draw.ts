import { getLinearColor, getTextX, toPx } from './tools'
import type {
  DrawBlockData,
  DrawImageData,
  DrawLineData,
  DrawOptions,
  DrawRadiusGroupRectConfig,
  DrawRadiusRectConfig,
  DrawTextData,
} from './types'

/**
 * 绘制圆角矩形
 * @description arcTo 比 arc 更加简洁，三点画弧，但是比较难理解 参考资料：http://www.yanghuiqing.com/web/346
 * ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise(是否逆时针画弧))
 * ctx.arcTo(x1, y1, x2, y2, radius); // 当前点-x1点 画切线 x1点到x2点画切线， 用半径为radius的圆弧替换掉切线部分
 */
export function _drawRadiusRect(
  config: DrawRadiusRectConfig,
  { ctx }: DrawOptions,
) {
  let { x, y, w, h, r } = config

  const minSize = Math.min(w, h)

  if (r > minSize / 2) {
    r = minSize / 2
  }

  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r) // 绘制上边框和右上角弧线
  ctx.arcTo(x + w, y + h, x, y + h, r) // 绘制右边框和右下角弧线
  ctx.arcTo(x, y + h, x, y, r) // 绘制下边框和左下角弧线
  ctx.arcTo(x, y, x + w, y, r) // 绘制左边框和左上角弧线
  ctx.closePath()
}

/**
 * 绘制圆角矩形
 */
export function _drawRadiusGroupRect(
  config: DrawRadiusGroupRectConfig,
  { ctx }: DrawOptions,
) {
  const { x, y, w, h, g } = config
  const [
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
  ] = g

  ctx.beginPath()
  ctx.arc(
    x + w - borderBottomRightRadius,
    y + h - borderBottomRightRadius,
    borderBottomRightRadius,
    0,
    Math.PI * 0.5,
  )
  ctx.lineTo(x + borderBottomLeftRadius, y + h)
  // 左下角
  ctx.arc(
    x + borderBottomLeftRadius,
    y + h - borderBottomLeftRadius,
    borderBottomLeftRadius,
    Math.PI * 0.5,
    Math.PI,
  )
  ctx.lineTo(x, y + borderTopLeftRadius)
  // 左上角
  ctx.arc(
    x + borderTopLeftRadius,
    y + borderTopLeftRadius,
    borderTopLeftRadius,
    Math.PI,
    Math.PI * 1.5,
  )
  ctx.lineTo(x + w - borderTopRightRadius, y)
  // 右上角
  ctx.arc(
    x + w - borderTopRightRadius,
    y + borderTopRightRadius,
    borderTopRightRadius,
    Math.PI * 1.5,
    Math.PI * 2,
  )
  ctx.lineTo(x + w, y + h - borderBottomRightRadius)
  // ctx.arcTo(x + w, y, x + w, y + h, r); // 绘制上边框和右上角弧线
  // ctx.arcTo(x + w, y + h, x, y + h, r); // 绘制右边框和右下角弧线
  // ctx.arcTo(x, y + h, x, y, r); // 绘制下边框和左下角弧线
  // ctx.arcTo(x, y, x + w, y, r); // 绘制左边框和左上角弧线
  ctx.closePath()
}

/**
 * 计算文本长度
 */
export function _getTextWidth(
  text: DrawTextData | DrawTextData[],
  drawOptions: DrawOptions,
) {
  const { ctx } = drawOptions
  let texts: any[] = []
  if (Array.isArray(text)) {
    texts = text
  } else {
    texts.push(text)
  }
  let width = 0
  texts.forEach(
    ({
      fontSize,
      text: textStr,
      fontStyle = 'normal',
      fontWeight = 'normal',
      fontFamily = 'sans-serif',
      marginLeft = 0,
      marginRight = 0,
    }) => {
      ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
      width += ctx.measureText(textStr).width + marginLeft + marginRight
    },
  )
  return width
}

/**
 * 渲染一段文字
 */
export function _drawSingleText(data: DrawTextData, drawOptions: DrawOptions) {
  const {
    x = 0,
    y = 0,
    text,
    color,
    width,
    fontSize = 28,
    baseLine = 'top',
    textAlign = 'left',
    opacity = 1,
    textDecoration = 'none',
    lineNum = 1,
    lineHeight = 0,
    fontWeight = 'normal',
    fontStyle = 'normal',
    fontFamily = 'sans-serif',
  } = data
  const { ctx } = drawOptions

  if (Array.isArray(text)) return

  // 画笔初始化
  ctx.save()
  ctx.beginPath()
  ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  ctx.textBaseline = baseLine
  ctx.textAlign = textAlign

  let textWidth = ctx.measureText(text).width // 测量文本宽度
  const textArr: string[] = []

  // 文本超出换行
  if (textWidth > width) {
    // 如果超出一行 ，则判断要分为几行
    let fillText = '' // 当前行已拼接的文字
    let line = 1 // 当前是第几行
    for (let i = 0; i <= text.length - 1; i++) {
      // 将文字转为数组，一行文字一个元素
      fillText += text[i] // 当前已拼接文字串
      const nextText = i < text.length - 1 ? fillText + text[i + 1] : fillText // 再拼接下一个文字
      const restWidth = width - ctx.measureText(nextText).width // 拼接下一个文字后的剩余宽度

      if (restWidth < 0) {
        // 如果拼接下一个字就超出宽度则添加者省略号或者换行
        if (line === lineNum) {
          // 已经是最后一行，就拼接省略号
          if (
            restWidth + ctx.measureText(text[i + 1]).width
            > ctx.measureText('...').width
          ) {
            // 剩余宽度能否放下省略号
            fillText = `${fillText}...`
          } else {
            fillText = `${fillText.slice(0, Math.max(0, fillText.length - 1))}...`
          }
          textArr.push(fillText)
          break
        } else {
          // 如果不是最后一行，就换行
          textArr.push(fillText)
          line++
          fillText = ''
        }
      } else if (i === text.length - 1) {
        textArr.push(fillText)
      }
    }
    textWidth = width
  } else {
    textArr.push(text)
  }

  // 按行渲染文字
  textArr.forEach((item, index) =>
    ctx.fillText(
      item,
      getTextX(textAlign, x, width), // 根据文本对齐方式和宽度确定 x 坐标
      y + (lineHeight || fontSize) * index, // 根据行数、行高 || 字体大小确定 y 坐标
    ),
  )
  ctx.restore()

  // 文本修饰，下划线、删除线什么的
  if (textDecoration !== 'none') {
    let lineY = y
    if (textDecoration === 'line-through') {
      // 目前只支持贯穿线
      lineY = y
    }
    ctx.save()
    ctx.moveTo(x, lineY)
    ctx.lineTo(x + textWidth, lineY)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.restore()
  }
  return textWidth
}

/**
 * 渲染文字
 */
export function drawText(data: DrawTextData, drawOptions: DrawOptions) {
  const { x = 0, y = 0, text, baseLine } = data
  if (Array.isArray(text)) {
    const preText = { x, y, baseLine }

    // 遍历多行文字，一行一行渲染
    text.forEach(item => {
      preText.x += item.marginLeft || 0
      // TODO: 多段文字超出一行的处理
      const textWidth = _drawSingleText(
        Object.assign(item, { ...preText, y: y + (item.marginTop || 0) }),
        drawOptions,
      )
      preText.x += textWidth + (item.marginRight || 0) // 下一段文字的 x 坐标为上一段字 x坐标 + 文字宽度 + marginRight
    })
  } else {
    _drawSingleText(data, drawOptions)
  }
}

/**
 * 渲染线
 */
export function drawLine(data: DrawLineData, drawOptions: DrawOptions) {
  const { startX, startY, endX, endY, color, width } = data
  const { ctx } = drawOptions

  if (!width) return

  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = color
  ctx.lineWidth = width
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.stroke()
  ctx.closePath()
  ctx.restore()
}

/**
 * 渲染矩形
 */
export function drawBlock(data: DrawBlockData, drawOptions: DrawOptions) {
  const {
    x,
    y,
    text,
    width = 0,
    height,
    opacity = 1,
    paddingLeft = 0,
    paddingRight = 0,
    borderWidth,
    backgroundColor,
    borderColor,
    borderRadius = 0,
    borderRadiusGroup,
  } = data
  const { ctx } = drawOptions

  ctx.save() // 先保存画笔样式，等下恢复回来
  ctx.globalAlpha = opacity

  let blockWidth = 0 // 块的宽度
  let textX = 0
  let textY = 0

  // 渲染块内文字
  if (text) {
    // 如果文字宽度超出块宽度，则块的宽度为：文字的宽度 + 内边距
    const textWidth = _getTextWidth(
      typeof text.text === 'string' ? text : text.text,
      drawOptions,
    )
    blockWidth = Math.max(textWidth, width)
    blockWidth += paddingLeft + paddingLeft

    const { textAlign = 'left' } = text
    textY = y // 文字默认定位在块的左上角
    textX = x + paddingLeft

    // 文字居中
    if (textAlign === 'center') {
      textX = blockWidth / 2 + x
    } else if (textAlign === 'right') {
      textX = x + blockWidth - paddingRight
    }
    drawText(Object.assign(text, { x: textX, y: textY }), drawOptions)
  } else {
    blockWidth = width
  }

  // 画矩形背景
  if (backgroundColor) {
    const grd = getLinearColor(ctx, backgroundColor, x, y, blockWidth, height)
    ctx.fillStyle = grd

    // 画圆角矩形
    if (borderRadius > 0) {
      _drawRadiusRect(
        {
          x,
          y,
          w: blockWidth,
          h: height,
          r: borderRadius,
        },
        drawOptions,
      )
      ctx.fill() // 填充路径
    } else if (borderRadiusGroup) {
      _drawRadiusGroupRect(
        {
          x,
          y,
          w: blockWidth,
          h: height,
          g: borderRadiusGroup,
        },
        drawOptions,
      )
      ctx.fill() // 填充路径
    } else {
      ctx.fillRect(x, y, blockWidth, height) // 绘制矩形
    }
  }

  // 画边框
  if (borderWidth && borderRadius > 0) {
    ctx.strokeStyle = borderColor
    ctx.lineWidth = borderWidth
    if (borderRadius > 0) {
      // 画圆角矩形边框
      _drawRadiusRect(
        {
          x,
          y,
          w: blockWidth,
          h: height,
          r: borderRadius,
        },
        drawOptions,
      )
      ctx.stroke()
    } else {
      ctx.strokeRect(x, y, blockWidth, height)
    }
  }
  ctx.restore() // 将 canvas 恢复到最近的保存状态的方法
}

/**
 * 渲染图片
 */
export const drawImage = (data: DrawImageData, drawOptions: DrawOptions) =>
  new Promise<void>(resolve => {
    const { canvas, ctx } = drawOptions
    const {
      x,
      y,
      w,
      h,
      sx,
      sy,
      sw,
      sh,
      imgPath,
      borderRadius = 0,
      borderWidth = 0,
      borderColor,
      borderRadiusGroup,
    } = data

    ctx.save()
    if (borderRadius > 0) {
      _drawRadiusRect(
        {
          x,
          y,
          w,
          h,
          r: borderRadius,
        },
        drawOptions,
      )
      ctx.clip() // 裁切，后续绘图限制在这个裁切范围内，保证图片圆角
      ctx.fill()
      const img = canvas.createImage() // 创建图片对象
      img.src = imgPath
      img.addEventListener('load', () => {
        ctx.drawImage(img, toPx(sx), toPx(sy), toPx(sw), toPx(sh), x, y, w, h)
        if (borderWidth > 0) {
          ctx.strokeStyle = borderColor
          ctx.lineWidth = borderWidth
          ctx.stroke()
        }
        resolve()
        ctx.restore()
      })
    } else if (borderRadiusGroup) {
      _drawRadiusGroupRect(
        {
          x,
          y,
          w,
          h,
          g: borderRadiusGroup,
        },
        drawOptions,
      )
      ctx.clip() // 裁切，后续绘图限制在这个裁切范围内，保证图片圆角
      ctx.fill()
      const img = canvas.createImage() // 创建图片对象
      img.src = imgPath
      img.addEventListener('load', () => {
        ctx.drawImage(img, toPx(sx), toPx(sy), toPx(sw), toPx(sh), x, y, w, h)
        resolve()
        ctx.restore()
      })
    } else {
      const img = canvas.createImage() // 创建图片对象
      img.src = imgPath
      img.addEventListener('load', () => {
        ctx.drawImage(img, toPx(sx), toPx(sy), toPx(sw), toPx(sh), x, y, w, h)
        resolve()
        ctx.restore()
      })
    }
  })
