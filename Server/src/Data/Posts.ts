import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { Societies } from './Societies'

@Entity({database: "unisphere",name:"posts"})
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    idposts: number

    @Column("varchar", { length: 512 })
    posts: string

    @Column("varchar", { length: 32 })
    timestamp: string

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn({name: "id"})
    UserID: number

    @ManyToOne(() => Societies, {cascade: true})
    @JoinColumn({name: "id"})
    SocietyID: number
}