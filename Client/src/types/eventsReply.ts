export interface EventsReply {
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