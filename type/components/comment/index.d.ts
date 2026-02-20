import { uni } from '@delta-comic/model'
export interface CommentProps {
  comment: uni.comment.Comment
  parentComment?: uni.comment.Comment
  usernameHighlight?: boolean
}