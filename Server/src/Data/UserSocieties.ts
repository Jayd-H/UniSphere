import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ database: "unisphere", name: "user_societies" })
export class UserSocieties extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("int")
  userId: number;

  @Column("int")
  societyId: number;
}