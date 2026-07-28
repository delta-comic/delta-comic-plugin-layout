import type { UniComment, UniItem } from '@delta-comic/model'

export interface CommentProps {
  comment: UniComment
  item: UniItem
  parentComment?: UniComment
  usernameHighlight?: boolean
}

export enum QueryKey {
  MainComment = 'layout::comment',
  ChildrenComment = 'layout::comment::children',
}
export const createChildrenCommentQueryKey = (
  id: string,
  cid: string,
  episode: string,
  cp: string,
) => ({ itemId: id, commentId: cid, contentPage: cp, episode })
export const createMainCommentQueryKey = (id: string, episode: string, cp: string) => ({
  itemId: id,
  contentPage: cp,
  episode,
})