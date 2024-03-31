import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Posts } from './Posts';

@Entity({ database: "unisphere", name: "replies" })
export class Replies extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 512 })
  content: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @ManyToOne(() => Users, user => user.replies, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Posts, post => post.replies, { cascade: true })
  @JoinColumn({ name: "postId" })
  post: Posts;
}