import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

import { createDateString, type DateFormatLabels } from '../../src/utils/date'

const labels: DateFormatLabels = {
  differentYearFormat: '[different] YYYY-MM-DD HH:mm',
  sameYearFormat: '[same] MM-DD HH:mm',
  todayFormat: '[today] HH:mm',
  yesterdayFormat: '[yesterday] HH:mm',
}
const now = dayjs('2026-01-01T12:00:00')

describe('createDateString', () => {
  it.each([
    ['2026-01-01T08:30:00', 'today 08:30'],
    ['2025-12-31T23:59:00', 'yesterday 23:59'],
    ['2025-12-30T08:30:00', 'different 2025-12-30 08:30'],
    ['2026-02-03T08:30:00', 'same 02-03 08:30'],
  ])('formats %s relative to the supplied clock', (value, expected) => {
    expect(createDateString(value, labels, now)).toBe(expected)
  })

  it('returns an empty string for invalid input', () => {
    expect(createDateString('not-a-date', labels, now)).toBe('')
  })
})