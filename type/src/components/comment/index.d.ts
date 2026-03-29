import { uni } from '@delta-comic/model';
export interface CommentProps {
    comment: uni.comment.Comment;
    parentComment?: uni.comment.Comment;
    usernameHighlight?: boolean;
}
export declare enum QueryKey {
    MainComment = "layout::comment",
    ChildrenComment = "layout::comment::children"
}
export declare const createChildrenCommentQueryKey: (id: string, cid: string, cp: string) => {
    itemId: string;
    commentId: string;
    contentPage: string;
};
export declare const createMainCommentQueryKey: (id: string, cp: string) => {
    itemId: string;
    contentPage: string;
};
