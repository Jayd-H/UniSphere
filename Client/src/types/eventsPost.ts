export interface EventsPost {
  id: number;
  userId: number;
  societyId: number;
  timestamp: string;
  content: string;
  eventType: string;
  eventLocation: string;
  eventTime: string;
}