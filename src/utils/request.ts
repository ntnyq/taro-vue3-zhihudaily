/**
 * @file HTTP Request
 * @module utils/request
 */
import Taro from '@tarojs/taro'

// @ts-expect-error defined constant
export const apiHost = API_HOST

const api = {
  async baseOptions(params: any, method = 'GET') {
    const { url, data, contentType } = params
    const options = {
      url: /^https?/.test(url) ? url : apiHost + url,
      data,
      method,
      header: {
        contentType,
      },
    } as Taro.request.Option

    return Taro.request(options)
      .then(res => {
        const { statusCode, errMsg } = res

        if (statusCode === 200) {
          return res.data || {}
        } else {
          Taro.showToast({
            title: errMsg || `返回成功，但状态码为${statusCode}`,
            icon: 'none',
          })
        }
      })
      .catch(err => {
        Taro.showToast({
          title: err.errorMsg || '小程序数据请求失败',
          icon: 'none',
        })
        return Promise.reject(err)
      })
  },

  get(url: string, data = {}) {
    const options = { url, data }
    return this.baseOptions(options, 'GET')
  },

  post(url: string, data = {}, contentType: string) {
    const options = { url, data, contentType }
    return this.baseOptions(options, 'POST')
  },

  put(url: string, data = {}) {
    const options = { url, data }
    return this.baseOptions(options, 'PUT')
  },

  delete(url: string, data = {}) {
    const options = { url, data }
    return this.baseOptions(options, 'DELETE')
  },
}

export default api
