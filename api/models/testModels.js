import mongoose from 'mongoose';

// Define the schema for a question
const questionSchema = new mongoose.Schema({
    questionID: String, // Unique identifier for the question
    questionText: String, // The text of the question
    options: [String], // Array of possible answer
    correctOption: String, // The correct answer for the question
    difficultyLevel: { 
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], // Must be one of these values
        required: true, // This field is mandatory
    },
});

// Define the schema for a section, which includes multiple questions
const sectionSchema = new mongoose.Schema({
    section: { // The ntype of the section
        type: String,
        enum: ['Quant', 'Verbal'], // Must be 'Quant' or 'Verbal'
        required: true,  
    },
    questions: [questionSchema], // Array of questions in the section
    score: { type: Number, default: 0 }, // The score for the section, default is 0
});

// Define the schema for scores based on difficulty level
const scoreSchema = new mongoose.Schema({
    difficultyLevel: { // Difficulty level of the questions for this score
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], 
        required: true, 
    },
    score: { // The score achieved for this difficulty level
        type: Number,
        required: true,  
    },
}, { _id: false }); // Disable _id for this subdocument as it's not necessary

// Define the main schema for the test
const testSchema = new mongoose.Schema({
    testID: { type: String, unique: true, required: true }, // Unique identifier for the test
    testName: { type: String, required: true }, 
    description: { type: String }, 
    sections: [sectionSchema], // Array of sections, each with its own questions and score
    scoresByDifficulty: [scoreSchema], // Array of scores, grouped by difficulty level
});

// Create the Test model from the schema
const Test = mongoose.model('Test', testSchema);

export default Test; // Export the model for use in other parts of the application
