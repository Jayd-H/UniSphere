import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Users } from './Users'
import { Posts } from './Posts'

@Entity({database: "unisphere",name:"user_likes_posts"})
export class UserLikesPosts extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @ManyToOne(() => Users, {cascade: true})
  @JoinColumn({name: "id"})
  userId: number

  @ManyToOne(() => Posts, {cascade: true})
  @JoinColumn({name: "id"})
  postId: number
}