import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm'
import { Societies } from './Societies'
import { Users } from './Users'

@Entity({database: "unisphere",name:"user_societies"})
export class UserSocieties extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number

  @ManyToMany(() => Users, { cascade: true })
  @JoinColumn({ name: "id" })
  userId: number

  @ManyToMany(() => Societies, { cascade: true })
  @JoinColumn({ name: "id" })
  societyId: number
}