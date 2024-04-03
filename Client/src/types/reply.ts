export interface Reply {
  replyId: number;
  replyContent: string;
  timestamp: string;
  user: {
    id: number;
    displayName: string;
  };
  likesCount: number;
  isLiked: boolean;
}