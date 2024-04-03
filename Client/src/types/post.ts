import { Reply } from './reply';

export interface Post {
  postId: number;
  postContent: string;
  timestamp: string;
  societyId: number;
  societyName: string;
  user: {
    id: number;
    displayName: string;
  };
  likesCount: number;
  isLiked: boolean;
  replyCount: number;
  replies: Reply[];
}