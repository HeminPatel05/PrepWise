import mongoose from 'mongoose'; 
import app from './app.js'; 

const PORT = process.env.PORT || 3000; // Set the port from environment variables, default to 3000 if not defined

// Database connection to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, // Use the new MongoDB connection string parser
    useUnifiedTopology: true // Use the new Server Discover and Monitoring engine
})
.then(() => console.log('Successfully connected to MongoDB')) // Log success message if connection is successful
.catch((error) => console.error('Error connecting to MongoDB:', error)); // Log an error if connection fails

// Start the Express server and listen on the specified port
app.listen(PORT, () => { 
    console.log(`Server is running on http://localhost:${PORT}`); // Log server start message with the port number
});
