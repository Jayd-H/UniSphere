import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { Database } from './data-source'

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Column("varchar", { length: 16 })
    username: string

    @Column("varchar", { length: 32 })
    password: string

    @Column("varchar", { length: 255 })
    DisplayName: string
}