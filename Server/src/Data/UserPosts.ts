import { BaseEntity, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { Posts } from './Posts'
import { User } from './User'

@Entity({database: "unisphere",name:"posts"})
export class UserPosts extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Posts, { cascade: true })
    @JoinColumn({ name: "idposts" })
    PostsID: number

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({ name: "id" })
    UsersID: number
}