import express from "express";
import dotenv from "dotenv";
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
