/**
 * @file Utils
 * @module utils/index
 */

export function formatTime (value: string | Date, fmt = `yyyy-MM-dd hh:mm:ss`) {
  const time = new Date(value)
  const obj = {
    'M+': time.getMonth() + 1,
    'd+': time.getDate(),
    'h+': time.getHours(),
    'm+': time.getMinutes(),
    's+': time.getSeconds(),
    'q+': ~~((time.getMonth() + 3) / 3),
    S: time.getMilliseconds(),
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (`${time.getFullYear()}`).substr(4 - RegExp.$1.length),
    )
  }

  for (const k in obj) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? obj[k]
          : (`00${obj[k]}`).substr((`${obj[k]}`).length),
      )
    }
  }

  return fmt
}

/**
 * Check if given object is empty
 * @param obj object to be checked
 * @returns `true` if the object is empty
 */
export const isEmptyObject = (obj: Record<string, any>) => Boolean(Object.keys(obj).length)
