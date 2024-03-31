import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Users } from './Users'
import { Societies } from './Societies'

@Entity({database: "unisphere",name:"event_posts"})
export class EventPosts extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @Column("varchar", { length: 512 })
  eventPost: string

  @Column("varchar", { length: 64 })
  location: string

  @Column("varchar", { length: 32 })
  timestamp: string

  @Column("varchar", { length: 32 })
  eventTime: string

  @Column("varchar", { length: 32 })
  eventType: string

  @ManyToOne(() => Societies, {cascade: true})
  @JoinColumn({name: "id"})
  societyId: number

  @ManyToOne(() => Users, {cascade: true})
  @JoinColumn({name: "id"})
  userId: number
}