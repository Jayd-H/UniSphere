import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './Routes/authRoutes';
import societyRoutes from './Routes/societyRoutes';
import { Database } from './Data/data-source';
import postRoutes from './Routes/postRoutes';
import userRoutes from './Routes/userRoutes';
dotenv.config();

const app = express();

async function startServer() {
  (async () => {
  try {
    await Database.initialize();
    console.log("The database has been initialized!");

    app.use(cors());
    app.use(express.json());

    app.use('/api/auth', authRoutes);
    app.use('/api/societies', societyRoutes);
    app.use('/api', postRoutes);
    app.use('/api/user', userRoutes);

    app.get("/", (req, res) => {
      res.send("Express server is up and running!");
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Error during database initialization.", err);
  }
})();
}

startServer();

export default app;
