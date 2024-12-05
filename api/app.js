import mongoose from "mongoose";
import initializeRoutes from "./routes/index.js";
import userRoutes from './routes/userRoutes.js';
import express from "express";
import cors from "cors";

const initialize = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use('/api', userRoutes);
  app.use(express.urlencoded());
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

  initializeRoutes(app);
};

export default initialize;
