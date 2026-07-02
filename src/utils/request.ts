/**
 * @file HTTP Request
 * @module utils/request
 */

import Taro from '@tarojs/taro'

const STATUS_CODE_SUCCESS = 200

/**
 * Injected by `config.defineConstants`
 */
declare const API_HOST: string

export const apiHost = API_HOST

export const HTTPMethod = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  // patch is not supported by wechat app
})
export type HttpMethod = keyof typeof HTTPMethod

interface HTTPRequestParams {
  url: string
  data?: Record<string, any>
  contentType?: string
}

export const HTTPClient = {
  async baseRequest(method: HttpMethod, params: HTTPRequestParams) {
    const { url, data, contentType } = params
    const options: Taro.request.Option = {
      url: /^https?:\/\//i.test(url) ? url : apiHost + url,
      data,
      method,
      header: {
        contentType,
      },
    }

    try {
      const res = await Taro.request(options)
      const { statusCode, errMsg } = res

      if (statusCode === STATUS_CODE_SUCCESS) {
        return res.data || {}
      }

      const title = errMsg || `返回成功，但状态码为${statusCode}`
      Taro.showToast({ title, icon: 'none' })
      throw new Error(title)
    } catch (error) {
      const title =
        (error as { errorMsg: string }).errorMsg || '小程序数据请求失败'
      Taro.showToast({ title, icon: 'none' })
      throw new Error(title, { cause: error })
    }
  },

  get<T = any>(url: string, data = {}): Promise<T> {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.GET, options)
  },

  post(url: string, data = {}) {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.POST, options)
  },

  put(url: string, data = {}) {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.PUT, options)
  },

  delete(url: string, data = {}) {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.DELETE, options)
  },
}

export default HTTPClient
