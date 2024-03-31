import { Society } from './society';
import { Reply } from './reply';

export interface Post {
  id: number;
  postContent: string;
  timestamp: string;
  societyId: number;
  userId: number;
  society: Society;
  user: {
    id: number;
    displayName: string;
  };
  likesCount: number;
  replyCount: number;
  replies: Reply[];
}