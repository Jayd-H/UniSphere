import "reflect-metadata"
import { DataSource } from "typeorm"

import { User } from './User'

export const Database = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})