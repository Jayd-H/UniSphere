import { DataSource, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm'

@Entity({database: "unisphere", name: "user"})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar", { length: 32 })
    username: string;

    @Column("varchar", { length: 72 })
    hash: string;

    @Column("varchar", { length: 64 })
    displayName: string;

    static async passwordByUsername(dataSource: DataSource, username: string) {
        return dataSource.getRepository(User).findOne({
            select: { hash: true },
            where: { username: username }
        });
    }
}
