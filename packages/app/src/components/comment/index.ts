import type { uni } from '@delta-comic/model'

export interface CommentProps {
  comment: uni.comment.Comment
  parentComment?: uni.comment.Comment
  usernameHighlight?: boolean
}

export enum QueryKey {
  MainComment = 'layout::comment',
  ChildrenComment = 'layout::comment::children'
}
export const createChildrenCommentQueryKey = (id: string, cid: string, cp: string) => ({
  itemId: id,
  commentId: cid,
  contentPage: cp
})
export const createMainCommentQueryKey = (id: string, cp: string) => ({
  itemId: id,
  contentPage: cp
})