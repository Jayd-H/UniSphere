import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm'
import { Replies } from './Replies'
import { Posts } from './Posts'
import { User } from './User'

@Entity({database: "unisphere",name:"posts"})
export class RepliesUser extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Replies, { cascade: true })
    @JoinColumn({ name: "idreplies" })
    ReplyID: Replies

    @OneToOne(() => Posts, { cascade: true })
    @JoinColumn({ name: "idposts" })
    PostID: number

    @OneToOne(() => User, { cascade: true })
    @JoinColumn({ name: "id"})
    UserID: number
}