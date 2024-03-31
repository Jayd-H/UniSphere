import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Users } from './Users';

@Entity({ database: "unisphere", name: "societies" })
export class Societies extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 96 })
  societyName: string;

  @Column("varchar", { length: 512 })
  description: string;

  @Column("varchar", { length: 255 })
  imageURL: string;

  @ManyToMany(() => Users, user => user.societies)
  users: Users[];
}