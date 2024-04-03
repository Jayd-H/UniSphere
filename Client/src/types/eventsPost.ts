import { EventsReply } from './eventsReply';

export interface EventsPost {
  eventsPostId: number;
  eventsPostContent: string;
  timestamp: string;
  eventType: string;
  eventLocation: string;
  eventTime: string;
  societyId: number;
  societyName: string;
  user: {
    id: number;
    displayName: string;
  };
  likesCount: number;
  isLiked: boolean;
  replyCount: number;
  replies: EventsReply[];
}