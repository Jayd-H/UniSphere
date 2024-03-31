import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Users } from './Users'
import { Posts } from './Posts'

@Entity({database: "unisphere",name:"replies"})
export class Replies extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column("varchar", { length: 512 })
  content: string

  @Column("varchar", { length: 32 })
  timestamp: string

  @ManyToOne(() => Users, {cascade: true})
  @JoinColumn({name: "id"})
  userId: number

  @ManyToOne(() => Posts, {cascade: true})
  @JoinColumn({name: "id"})
  postId: number
}