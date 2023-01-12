/**
 * @file Utils
 * @module utils/index
 */

import dayjs from 'dayjs'

export function formatTime (date: dayjs.ConfigType, {
  isUnix = false,
  format = `YYYY-MM-DD HH:mm:ss`,
} = {}) {
  return isUnix
    ? dayjs.unix(date as number).format(format)
    : dayjs(date).format(format)
}

/**
 * Check if given object is empty
 * @param obj object to be checked
 * @returns `true` if the object is empty
 */
export const isEmptyObject = (obj: Record<string, any>) => Boolean(Object.keys(obj).length)
