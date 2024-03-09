import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './User'
import {Posts} from './Posts'

@Entity({database: "unisphere",name:"replies"})
export class Replies extends BaseEntity {
    @PrimaryGeneratedColumn()
    idreplies: number

    @Column("varchar", { length: 512 })
    replies: string

    @Column("varchar", { length: 32 })
        timestamp: string

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn({name: "id"})
    UserID: number
    
    @ManyToOne(() => Posts, {cascade: true})
    @JoinColumn({name: "id"})
    PostID: number

}