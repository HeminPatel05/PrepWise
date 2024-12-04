// Import required modules
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express application
const app = express();

// Middleware setup
app.use(
  cors({
    origin: 'http://localhost:5173', // Allow frontend domain
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Allow sending cookies if needed
  })
);
app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection setup
const mongoURI =
  process.env.MONGO_URI ||
  'mongodb+srv://parikhhet:Tejal%40123@prepwise.2k1cd.mongodb.net/flashcards?retryWrites=true&w=majority&appName=PrepWise'; // Default to a hardcoded URI if no env variable is provided
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Flashcard Schema and Model
const flashcardSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number,
});
const Flashcard = mongoose.model('Flashcard', flashcardSchema);

// API Routes for Flashcards
app.get('/flashcards', (req, res) => {
  Flashcard.find()
    .then((flashcards) => {
      res.json(flashcards); // Send the flashcards from the database
    })
    .catch((err) => {
      console.error('Error fetching flashcards:', err);
      res.status(500).send('Error fetching flashcards');
    });
});

// Import additional routes
import testRoutes from './routes/testRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Mount additional routes
app.use('/', testRoutes); // Mount the testRoutes on the root path
app.use('/api/users', userRoutes); // Mount the userRoutes on the '/api/users' path

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export the app for use in other files (e.g., for testing or further integration)
export default app;
