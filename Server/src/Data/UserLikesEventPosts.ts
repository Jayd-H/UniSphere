import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Users } from './Users'
import { EventPosts } from './EventPosts'

@Entity({database: "unisphere",name:"user_likes_event_posts"})
export class UserLikesEventPosts extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @ManyToOne(() => Users, {cascade: true})
  @JoinColumn({name: "id"})
  userId: number

  @ManyToOne(() => EventPosts, {cascade: true})
  @JoinColumn({name: "id"})
  eventPostId: number
}