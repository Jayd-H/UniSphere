import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Replies } from './Replies';

@Entity({ database: "unisphere", name: "user_likes_replies" })
export class UserLikesReplies extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Users, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Replies, { cascade: true })
  @JoinColumn({ name: "replyId" })
  reply: Replies;
}