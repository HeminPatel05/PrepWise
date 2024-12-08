import mongoose from "mongoose";
import initializeRoutes from "./routes/index.js";
import userRoutes from './routes/userRoutes.js';
import express from "express";
import cors from "cors";
import testRoutes from "./routes/testRoutes.js";
import dotenv from 'dotenv'; // Added from file2

// Load environment variables from .env file (added from file2)
dotenv.config();

const initialize = (app) => {
  // Middleware setup (no need to repeat from file2)
  app.use(cors());
  app.use(express.json());
  app.use('/api', userRoutes); // User routes
  app.use('/', testRoutes); // Mount the testRoutes on the path

  app.use(express.urlencoded());

  // MongoDB connection setup
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

  // Initialize other routes
  initializeRoutes(app);
};

const app = express(); // Express app created here

export default initialize;
export { app }; 
