import "reflect-metadata"
import dotenv from 'dotenv'
import { DataSource } from "typeorm"

import { User } from './User'
import { Posts } from './Posts'
import { Replies } from './Replies'
import { RepliesUser } from './RepliesUser'
import { UserPosts } from "./UserPosts"
import { Societies } from "./Societies"

dotenv.config()

export const Database = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: (process.env.DB_PORT as unknown) as number || 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [
        User,
        Posts,
        Replies,
        RepliesUser,
        UserPosts,
        Societies
    ],
    ssl: false
})