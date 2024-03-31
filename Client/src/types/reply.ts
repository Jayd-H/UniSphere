export interface Reply {
  replyId: number;
  replyContent: string;
  timestamp: string;
  userId?: number;
  postId?: number;
  eventPostId?: number;
  displayName?: string;
  user?: {
    id: number;
    displayName: string;
  };
  likesCount: number;
  isLiked?: boolean;
}