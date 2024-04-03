import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { EventPosts } from './EventPosts';
import { UserLikesEventReplies } from './UserLikesEventReplies';

@Entity({ database: "unisphere", name: "event_replies" })
export class EventReplies extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 512 })
  content: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @ManyToOne(() => Users, user => user.eventReplies, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => EventPosts, eventPost => eventPost.eventReplies, { cascade: true })
  @JoinColumn({ name: "postId" })
  eventPost: EventPosts;

  @OneToMany(() => UserLikesEventReplies, userLikesEventReplies => userLikesEventReplies.eventReply)
  userLikes: UserLikesEventReplies[];
}