import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Societies } from './Societies';
import { EventReplies } from './EventReplies';
import { UserLikesEventPosts } from './UserLikesEventPosts';

@Entity({ database: "unisphere", name: "event_posts" })
export class EventPosts extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 512 })
  content: string;

  @Column("varchar", { length: 64 })
  location: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @Column("varchar", { length: 32 })
  eventType: string;

  @Column("varchar", { length: 32 })
  eventTime: string;

  @ManyToOne(() => Societies, { cascade: true })
  @JoinColumn({ name: "societyId" })
  society: Societies;

  @ManyToOne(() => Users, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @OneToMany(() => EventReplies, eventReply => eventReply.eventPost)
  eventReplies: EventReplies[];

  @OneToMany(() => UserLikesEventPosts, userLikesEventPosts => userLikesEventPosts.eventPost)
  userLikes: UserLikesEventPosts[];
}