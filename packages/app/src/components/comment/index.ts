import type { UniComment, UniItem } from '@delta-comic/model'
import type { Component } from 'vue'

declare module '@delta-comic/ui' {
  export interface GlobalEnvironments {
    'layout::components::comment::comment-row.userExtra': Component<CommentProps>
    'layout::components::comment::comment-row.action': Component<CommentProps>
    'layout::components::comment::comment-row.description': Component<CommentProps>
    'layout::components::comment::comment-row.reply': Component<CommentProps>
    'layout::components::comment::comment-row.avatar': Component<CommentProps>
  }
}

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