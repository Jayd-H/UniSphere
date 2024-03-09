import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm'
import { Societies } from './Societies'
import { User } from './Users'

@Entity({database: "unisphere",name:"usersocieties"})
export class UserSocieties extends BaseEntity {
    @PrimaryGeneratedColumn("increment")
    id: number

    @ManyToMany(() => User, { cascade: true })
    @JoinColumn({ name: "id" })
    userId: number

    @ManyToMany(() => Societies, { cascade: true })
    @JoinColumn({ name: "id" })
    postId: number
}