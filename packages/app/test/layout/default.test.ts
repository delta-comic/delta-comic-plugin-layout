import type { UniContentPage, UniItem } from '@delta-comic/model'
import { describe, expect, it } from 'vitest'

import { createPageQueryKey } from '../../src/layout/default'

describe('createPageQueryKey', () => {
  it('includes both the item id and sourced content type', () => {
    const page = {
      contentType: ['reader', 'comic'],
      id: 'item-1',
      thisEp: { id: 'episode-2' },
    } as UniItem

    expect(createPageQueryKey(page)).toEqual({
      contentType: 'reader:comic',
      episode: 'episode-2',
      id: 'item-1',
    })
  })

  it('uses the selected episode for content pages', () => {
    const page = {
      contentType: ['reader', 'comic'],
      ep: 'episode-3',
      id: 'item-1',
    } as UniContentPage

    expect(createPageQueryKey(page)).toEqual({
      contentType: 'reader:comic',
      episode: 'episode-3',
      id: 'item-1',
    })
  })
})