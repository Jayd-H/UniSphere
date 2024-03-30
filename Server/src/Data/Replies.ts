import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from 'typeorm'
import { User } from './User'
import {Posts} from './Posts'

@Entity({database: "unisphere",name:"replies"})
export class Replies extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 512 })
    content: string

    @Column("varchar", { length: 32 })
    timestamp: string

    @Column("int")
    likesNum: number

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn({name: "id"})
    UserID: number
    
    @ManyToOne(() => Posts, {cascade: true})
    @JoinColumn({name: "id"})
    PostID: number

}