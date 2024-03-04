import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"replies"})
export class Replies extends BaseEntity {
    @PrimaryGeneratedColumn()
    idreplies: number

    @Column("varchar", { length: 256 })
    replies: string
}