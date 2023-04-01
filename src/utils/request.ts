/**
 * @file HTTP Request
 * @module utils/request
 */
import Taro from '@tarojs/taro'

/**
 * Injected by `config.defineConstants`
 */
declare const API_HOST: string

export const apiHost = API_HOST
export enum HTTPMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  // patch is not supported by wechat app
}

interface HTTPRequestParams {
  url: string
  data?: Record<string, any>
  contentType?: string
}

export class HTTPClient {
  static async baseRequest(method = HTTPMethod.GET, params: HTTPRequestParams) {
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

      if (statusCode === 200) {
        return res.data || {}
      } else {
        const title = errMsg || `返回成功，但状态码为${statusCode}`
        Taro.showToast({ title, icon: 'none' })
        throw new Error(title)
      }
    } catch (err) {
      const title = err.errorMsg || '小程序数据请求失败'
      Taro.showToast({ title, icon: 'none' })
      throw new Error(title)
    }
  }

  static get<T = any>(url: string, data = {}): Promise<T> {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.GET, options)
  }

  static post(url: string, data = {}, contentType: string) {
    const options = { url, data, contentType }
    return HTTPClient.baseRequest(HTTPMethod.POST, options)
  }

  static put(url: string, data = {}) {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.PUT, options)
  }

  static delete(url: string, data = {}) {
    const options = { url, data }
    return HTTPClient.baseRequest(HTTPMethod.DELETE, options)
  }
}

export default HTTPClient
