import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToMany, JoinColumn } from 'typeorm'
import { Societies } from './Societies'
import { User } from './User'


@Entity({database: "unisphere",name:"usersocieties"})
export class UserSocieties extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => Societies, { cascade: true })
    @JoinColumn({ name: "id" })
    PostsID: number

    @ManyToMany(() => User, { cascade: true })
    @JoinColumn({ name: "id" })
    UsersID: number
}