import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './Users';
import { Societies } from './Societies';
import { Replies } from './Replies';

@Entity({ database: "unisphere", name: "posts" })
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 512 })
  content: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;

  @ManyToOne(() => Societies, { cascade: true })
  @JoinColumn({ name: "societyId" })
  society: Societies;

  @ManyToOne(() => Users, { cascade: true })
  @JoinColumn({ name: "userId" })
  user: Users;

  @OneToMany(() => Replies, reply => reply.post)
  replies: Replies[];
}