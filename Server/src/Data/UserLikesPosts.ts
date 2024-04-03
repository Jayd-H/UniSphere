import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './Users';
import { Posts } from './Posts';

@Entity({ database: "unisphere", name: "user_likes_posts" })
export class UserLikesPosts extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Users, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @ManyToOne(() => Posts, { cascade: true })
  @JoinColumn({ name: "postId" })
  post: Posts;
}