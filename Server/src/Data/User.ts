import { DataSource, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm'

@Entity({name: "user"})
export class User extends BaseEntity{
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar", { length: 32 })
    username: string;

    @Column("varchar", { length: 72 })
    hash: string;

    @Column("varchar", { length: 64 })
    displayName: string;
}
