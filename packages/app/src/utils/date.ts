import dayjs, { type ConfigType, type Dayjs } from 'dayjs'

export interface DateFormatLabels {
  differentYearFormat: string
  sameYearFormat: string
  todayFormat: string
  yesterdayFormat: string
}

const defaultLabels: DateFormatLabels = {
  differentYearFormat: 'YYYY年 M月D日 HH:mm',
  sameYearFormat: 'M月D日 HH:mm',
  todayFormat: '今天 HH:mm',
  yesterdayFormat: '昨天 HH:mm',
}

export const createDateString = (
  value: ConfigType | Dayjs = dayjs(),
  labels: DateFormatLabels = defaultLabels,
  now: Dayjs = dayjs(),
) => {
  const date = dayjs(value)
  if (!date.isValid()) return ''

  const dayDifference = now.startOf('day').diff(date.startOf('day'), 'day')
  if (dayDifference === 0) return date.format(labels.todayFormat)
  if (dayDifference === 1) return date.format(labels.yesterdayFormat)
  return date.format(date.isSame(now, 'year') ? labels.sameYearFormat : labels.differentYearFormat)
}