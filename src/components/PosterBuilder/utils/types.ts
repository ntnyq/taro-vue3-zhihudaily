export type DrawType = 'text' | 'image' | 'block' | 'line'

export interface Text {
  type?: DrawType
  x?: number
  y?: number
  text: string | Text[]
  fontSize?: number
  color?: string
  opacity?: 1 | 0
  lineHeight?: number
  lineNum?: number
  width?: number
  marginTop?: number
  marginLeft?: number
  marginRight?: number
  textDecoration?: 'line-through' | 'none'
  baseLine?: 'top' | 'middle' | 'bottom'
  textAlign?: 'left' | 'center' | 'right'
  fontFamily?: string
  fontWeight?: string
  fontStyle?: string
  zIndex?: number
}

export interface Block {
  type?: DrawType
  x: number
  y: number
  width?: number
  height: number
  paddingLeft?: number
  paddingRight?: number
  borderWidth?: number
  borderColor?: string
  backgroundColor?: string
  borderRadius?: number
  borderRadiusGroup?: number[]
  text?: Text
  opacity?: number
  zIndex?: number
}

export interface Image {
  type?: DrawType
  x: number
  y: number
  url: string
  width: number
  height: number
  borderRadius?: number
  borderRadiusGroup?: number[]
  borderWidth?: number
  borderColor?: string
  zIndex?: number
}

export interface Line {
  type?: DrawType
  startX: number
  startY: number
  endX: number
  endY: number
  width: number
  color?: string
  zIndex?: number
}

export interface DrawConfig {
  width: number
  height: number
  backgroundColor?: string
  debug?: boolean
  blocks?: Block[]
  texts?: Text[]
  images?: Image[]
  lines?: Line[]
}

/**
 * Draw Rect config
 */
export type DrawRadiusRectConfig = {
  x: number
  y: number
  /**
   * width
   */
  w: number
  /**
   * height
   */
  h: number
  /**
   * borderRadius
   */
  r: number
}

/**
 * Draw Radius Group Rect config
 */
export type DrawRadiusGroupRectConfig = {
  x: number
  y: number
  /**
   * width
   */
  w: number
  /**
   * height
   */
  h: number

  /**
   * borderRadius group
   */
  g: number[]
}

/**
 * Draw Line data
 */
export type DrawLineData = {
  type?: DrawType
  zIndex?: number
  startX: number
  startY: number
  endX: number
  endY: number
  width: number
  color: string
}

/**
 * Draw Block data
 */
export type DrawBlockData = {
  type?: DrawType
  zIndex?: number
  x: number
  y: number
  /**
   * @default 0
   */
  width?: number
  height: number
  /**
   * @default 0
   */
  paddingLeft?: number
  /**
   * @default 0
   */
  paddingRight?: number
  text?: DrawTextData
  /**
   * @default 1
   */
  opacity?: number
  borderWidth: number
  backgroundColor: string
  borderColor: string
  /**
   * @default 0
   */
  borderRadius?: number
  borderRadiusGroup?: number[]
}

/**
 * Draw Text data
 */
export type DrawTextData = {
  type?: DrawType
  zIndex?: number
  /**
   * 单位：rpx
   */
  x: number
  /**
   * 单位：rpx
   */
  y: number
  /**
   * 单位：rpx
   */
  fontSize: number
  color: string
  baseLine: 'top' | 'middle' | 'bottom'
  textAlign: 'left' | 'right' | 'center'
  text: string | DrawTextData[]
  opacity: number
  textDecoration: string
  width: number
  lineNum: number
  lineHeight: number

  /**
   * 仅在文本为数组时生效
   */
  marginTop?: number
  marginLeft?: number
  marginRight?: number

  /**
   * 字重，小程序暂时不支持 100 - 900
   */
  fontWeight?: 'bold'

  /**
   * 字体样式
   */
  fontStyle?: 'italic'

  /**
   * 字族
   * @default `sans-serif`
   */
  fontFamily: string
}

/**
 * Draw Image data
 */
export type DrawImageData = {
  type?: DrawType
  zIndex?: number
  x: number
  y: number
  w: number
  h: number
  sx: number
  sy: number
  sw: number
  sh: number
  imgPath: string
  /**
   * @default 0
   */
  borderRadius: number
  /**
   * @default 0
   */
  borderWidth?: number
  borderColor?: string
  borderRadiusGroup?: number[]
}

export interface DrawOptions {
  /**
   * ctx对象
   */
  ctx: any

  canvas: any
}
