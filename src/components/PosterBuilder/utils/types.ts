// export interface DrawData {
//   x: number
//   y: number
//   text: string
//   width?: number
//   height: number
//   opacity?: number
//   paddingLeft?: number
//   paddingRight?: number
//   borderWidth: number
//   backgroundColor: string
//   borderColor: string
//   borderRadius?: number
//   borderRadiusGroup: any[] | any
// }

export type DrawLineData = any
export type DrawBlockData = any
export type DrawTextData = any
export type DrawImageData = any

export interface DrawOptions {
  /**
   * ctx对象
   */
  ctx: any

  canvas: any
}
