import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
/*import app from './app.js';*/
import initialize from "./app.js";

//dotenv config
dotenv.config();

//rest object
const app = express();
const port = process.env.PORT;
initialize(app);

app.listen(port, () => {
  console.log(`connected to PORT: ${port}`);
});
