import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"posts"})
export class Posts extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    idposts: number

    @Column("varchar", { length: 256 })
    posts: string
}