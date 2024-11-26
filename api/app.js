import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import testRoutes from './routes/testRoutes.js'; 

// Load environment variables from .env file
dotenv.config();

const app = express(); // Initializing an Express application

// Middleware setup
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(express.json()); // Parse incoming JSON requests and make data available in req.body

// API Routes setup
app.use('/', testRoutes); // Mount the testRoutes on the '/api' path

export default app; // Export the app for use in other files (e.g., for starting the server)
