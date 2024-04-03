import "reflect-metadata"
import dotenv from 'dotenv'
import { DataSource } from "typeorm"
import { Users } from './Users'
import { Posts } from './Posts'
import { Replies } from './Replies'
import { Societies } from "./Societies"
import { UserSocieties } from "./UserSocieties"
import { UserLikesPosts } from "./UserLikesPosts"
import { UserLikesReplies } from "./UserLikesReplies"
import { UserLikesEventPosts } from "./UserLikesEventPosts"
import { EventPosts } from "./EventPosts"
import { EventReplies } from "./EventReplies"
import { UserLikesEventReplies } from "./UserLikesEventReplies"

dotenv.config()

export const Database = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT as unknown) as number || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Users,
    Posts,
    EventPosts,
    Replies,
    EventReplies,
    Societies,
    UserSocieties,
    UserLikesPosts,
    UserLikesReplies,
    UserLikesEventPosts,
    UserLikesEventReplies
  ],
  ssl: false
})