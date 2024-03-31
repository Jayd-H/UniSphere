import { DataSource, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm'

@Entity({name: "users"})
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 32 })
  userName: string;

  @Column("varchar", { length: 72 })
  hash: string;

  @Column("varchar", { length: 64 })
  displayName: string;
}