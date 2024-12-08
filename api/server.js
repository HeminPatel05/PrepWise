import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import initialize from "./app.js";

// dotenv configuration
dotenv.config();

// Create an express application
const app = express();

// Database connection to MongoDB (added from file2)
mongoose.connect(process.env.MONGO_URI, { 
  useNewUrlParser: true, // Use the new MongoDB connection string parser
  useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
})
.then(() => console.log('Successfully connected to MongoDB')) // Log success message
.catch((error) => console.error('Error connecting to MongoDB:', error)); // Log an error if connection fails

// Initialize routes and middleware
initialize(app);

// Set the port from environment variables or default to 3000
const port = process.env.PORT || 3000; 

// Start the server
app.listen(port, () => { 
  console.log(`Server is running on http://localhost:${port}`); // Log server start message with the port number
});
