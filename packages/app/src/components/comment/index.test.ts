import { describe, expect, it } from 'vitest'

import { createChildrenCommentQueryKey, createMainCommentQueryKey } from '.'

describe('comment query keys', () => {
  it('separates top-level comments by item and content page implementation', () => {
    expect(createMainCommentQueryKey('item-1', 'episode-3', 'source:comic')).toEqual({
      contentPage: 'source:comic',
      episode: 'episode-3',
      itemId: 'item-1',
    })
  })

  it('also separates reply queries by parent comment', () => {
    expect(
      createChildrenCommentQueryKey('item-1', 'comment-2', 'episode-3', 'source:comic'),
    ).toEqual({
      commentId: 'comment-2',
      contentPage: 'source:comic',
      episode: 'episode-3',
      itemId: 'item-1',
    })
  })
})