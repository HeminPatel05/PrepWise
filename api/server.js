// Import required modules
import dotenv from "dotenv"; // For environment variables
import mongoose from "mongoose"; // For MongoDB connection
import express from "express"; // For creating the server
import cors from "cors"; // For Cross-Origin Resource Sharing
import bodyParser from "body-parser"; // For parsing JSON request bodies
import flashcardRoutes from "./routes/flashcardRoutes.js"; // Flashcard routes
import app from "./app.js"; // Assuming app.js exports your Express app

// Configure environment variables
dotenv.config();

// Set the port for the server
const PORT = process.env.PORT || 3000;

// MongoDB connection string
const mongoURI = process.env.MONGO_URI;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if database connection fails
  }
};

// Call the function to connect to MongoDB
connectDB();

// Middleware configuration
app.use(
  cors({
    origin: "http://localhost:5173", // Frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(bodyParser.json()); // Parse incoming JSON request bodies

// Routes configuration
app.use("/flashcards", flashcardRoutes); // Add flashcard routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log the server URL
});
