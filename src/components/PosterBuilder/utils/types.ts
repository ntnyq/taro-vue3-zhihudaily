export type DrawType = 'block' | 'image' | 'line' | 'text'

/**
 * Shape
 */
export interface Block {
  height: number
  x: number
  y: number
  backgroundColor?: string
  borderColor?: string
  borderRadius?: number
  borderRadiusGroup?: number[]
  borderWidth?: number
  opacity?: number
  paddingLeft?: number
  paddingRight?: number
  text?: Text
  type?: DrawType
  width?: number
  zIndex?: number
}
export interface Image {
  height: number
  url: string
  width: number
  x: number
  y: number
  borderColor?: string
  borderRadius?: number
  borderRadiusGroup?: number[]
  borderWidth?: number
  type?: DrawType
  zIndex?: number
}
export interface Line {
  endX: number
  endY: number
  startX: number
  startY: number
  width: number
  color?: string
  type?: DrawType
  zIndex?: number
}
export interface Text {
  text: string | Text[]
  baseLine?: 'bottom' | 'middle' | 'top'
  color?: string
  fontFamily?: string
  fontSize?: number
  fontStyle?: string
  fontWeight?: string
  lineHeight?: number
  lineNum?: number
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  opacity?: 0 | 1
  textAlign?: 'center' | 'left' | 'right'
  textDecoration?: 'line-through' | 'none'
  type?: DrawType
  width?: number
  x?: number
  y?: number
  zIndex?: number
}

/**
 * Draw Rect config
 */
export type DrawRadiusRectConfig = {
  h: number
  r: number
  w: number
  x: number
  y: number
}

/**
 * Draw Radius Group Rect config
 */
export type DrawRadiusGroupRectConfig = {
  g: number[]
  h: number
  w: number
  x: number
  y: number
}

/**
 * Draw Line data
 */
export type DrawLineData = {
  color: string
  endX: number
  endY: number
  startX: number
  startY: number
  width: number
  type?: DrawType
  zIndex?: number
}

/**
 * Draw Block data
 */
export type DrawBlockData = {
  backgroundColor: string
  borderColor: string
  borderWidth: number
  height: number
  x: number
  y: number
  borderRadius?: number
  borderRadiusGroup?: number[]
  opacity?: number
  paddingLeft?: number
  paddingRight?: number
  text?: DrawTextData
  type?: DrawType
  width?: number
  zIndex?: number
}

/**
 * Draw Text data
 */
export type DrawTextData = {
  baseLine: 'bottom' | 'middle' | 'top'
  color: string
  fontFamily: string
  fontSize: number
  lineHeight: number
  lineNum: number
  opacity: number
  text: string | DrawTextData[]
  textAlign: 'center' | 'left' | 'right'
  textDecoration: string
  width: number
  x: number
  y: number
  fontStyle?: 'italic'
  fontWeight?: 'bold'
  marginLeft?: number
  marginRight?: number
  marginTop?: number
  type?: DrawType
  zIndex?: number
}

/**
 * Draw Image data
 */
export type DrawImageData = {
  borderRadius: number
  h: number
  imgPath: string
  sh: number
  sw: number
  sx: number
  sy: number
  w: number
  x: number
  y: number
  borderColor?: string
  borderRadiusGroup?: number[]
  borderWidth?: number
  type?: DrawType
  zIndex?: number
}

/**
 * Draw
 */
export interface DrawConfig {
  height: number
  width: number
  backgroundColor?: string
  blocks?: Block[]
  debug?: boolean
  images?: Image[]
  lines?: Line[]
  texts?: Text[]
}
export interface DrawOptions {
  canvas: any
  ctx: any
}
