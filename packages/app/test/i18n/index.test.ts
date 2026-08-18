import { describe, expect, it, vi } from 'vitest'

vi.mock('@delta-comic/plugin', () => ({ pluginI18n: { translate: vi.fn((key: string) => key) } }))

import { pluginI18n } from '@delta-comic/plugin'

import { layoutMessages, translate } from '../../src/i18n'

describe('layout locale messages', () => {
  it('registers only simplified Chinese messages', () => {
    expect(Object.keys(layoutMessages)).toEqual(['zh-CN'])
  })

  it('delegates runtime translation to the host locale registry', () => {
    expect(translate('layout.actions.confirm', { count: 2 })).toBe('layout.actions.confirm')
    expect(pluginI18n.translate).toHaveBeenCalledWith('layout.actions.confirm', { count: 2 })
  })
})