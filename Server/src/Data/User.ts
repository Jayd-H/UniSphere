import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({database: "unisphere",name:"user"})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 16 })
    username: string

    @Column("varchar", { length: 32 })
    password: string

    @Column("varchar", { length: 255 })
    DisplayName: string

    static passwordByUsername(username: string) {
        return this.find({
            select: { password: true },
            where: { username: username }
        })
    }
}