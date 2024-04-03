import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { EventReplies } from './EventReplies';

@Entity({ database: "unisphere", name: "user_likes_event_replies" })
export class UserLikesEventReplies extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Users, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => EventReplies, { cascade: true })
  @JoinColumn({ name: "eventReplyId" })
  eventReply: EventReplies;
}