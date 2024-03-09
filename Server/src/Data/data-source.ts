import "reflect-metadata"
import dotenv from 'dotenv'
import { DataSource } from "typeorm"

import { User } from './Users'
import { Posts } from './Posts'
import { Replies } from './Replies'
import { Societies } from "./Societies"
import { UserSocieties } from "./UserSocieties"

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
        Societies,
        UserSocieties
    ],
    ssl: false
})