import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/authRoutes';
import societyRoutes from './Routes/societyRoutes';
import { Database } from './Data/data-source';
import postRoutes from './Routes/postRoutes';
dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

// The main function to start the server only after database initialization
async function startServer() {
  try {
    await Database.initialize();
    console.log("The database has been initialized!");

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/societies', societyRoutes);
    app.use('/api/posts', postRoutes);
    app.get("/", (req, res) => {
      res.send("Express server is up and running!");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error during database initialization.", err);
  }
}

startServer();

export default app;
