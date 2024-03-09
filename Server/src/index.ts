import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/authRoutes';
import { Database } from './Data/data-source';

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

Database.initialize()
    .then(() => {
        console.log("The database has been initialized!");
    })
    .catch((err: any) => {
        console.error("Error during database initialization.", err);
    });

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
  res.send("Express server is up and running!");
});

export default app;
