import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { Societies } from './Societies'

@Entity({database: "unisphere",name:"eventposts"})
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 512 })
    content: string

    @Column("varchar", { length: 64 })
    location: string

    @Column("varchar", { length: 32 })
    timestamp: string

    @Column("varchar", { length: 32 })
    eventtype: string

    @ManyToOne(() => Societies, {cascade: true})
    @JoinColumn({name: "id"})
    societyId: number

    @ManyToOne(() => User, {cascade: true})
    @JoinColumn({name: "id"})
    userId: number
}