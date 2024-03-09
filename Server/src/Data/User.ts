import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"user"})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 32 })
    username: string

    @Column("varchar", { length: 72 })
    hash: string

    @Column("varchar", { length: 64 })
    displayName: string

    static passwordByUsername(username: string) {
        return this.find({
            select: { hash: true },
            where: { username: username }
        })
    }
}