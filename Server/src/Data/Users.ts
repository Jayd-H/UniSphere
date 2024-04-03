import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Societies } from './Societies';
import { Replies } from './Replies';
import { EventReplies } from './EventReplies';
import { UserSocieties } from './UserSocieties';

@Entity({ name: "users" })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 32 })
  userName: string;

  @Column("varchar", { length: 72 })
  hash: string;

  @Column("varchar", { length: 64 })
  displayName: string;

  @ManyToMany(() => Societies, society => society.users)
  @JoinTable({
    name: "user_societies",
    joinColumn: { name: "userId", referencedColumnName: "id" },
    inverseJoinColumn: { name: "societyId", referencedColumnName: "id" }
  })
  societies: Societies[];

  @OneToMany(() => Replies, reply => reply.user)
  replies: Replies[];

  @OneToMany(() => EventReplies, eventReply => eventReply.user)
  eventReplies: EventReplies[];

  @OneToMany(() => UserSocieties, userSociety => userSociety.userId)
  userSocieties: UserSocieties[];
}