// Importing mongoose to interact with MongoDB
import mongoose from 'mongoose';

// Defining the schema for a question in the test
const questionSchema = new mongoose.Schema({
    // Unique identifier for the question
    questionID: { 
        type: String, 
        required: true 
    },
    // The actual question text
    questionText: { 
        type: String, 
        required: true 
    },
    // An array of possible options for the question
    options: [String],
    // The correct answer option for this question
    correctOption: { 
        type: String, 
        required: true 
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'], 
        required: true
    },
    topic:{
        type: String,
        enum:[
            'Arithmetic',
            'Algebra',
            'Data Analysis',
            'Word Problems',
            'Text Completion',
            'Sentence Equivalence',
            'Reading Comprehension',
            'Critical Reasoning',
            ],
        required: false
    }
});

// Defining the schema for a section within the test
const sectionSchema = new mongoose.Schema({
    section: {
        type: String,
        enum: ['Quant', 'Verbal'], 
        required: true
    },
    // An array of questions associated with this section
    questions: [questionSchema] // The section holds an array of questions defined in the questionSchema
});

// Defining the schema for the test itself
const testSchema = new mongoose.Schema({
    testID: { 
        type: String, 
        required: true 
    },
    testName: { 
        type: String, 
        required: true 
    },
    sections: [sectionSchema] // The test has multiple sections, each section has a set of questions
});
const resultSchema = new mongoose.Schema({
    testID: { type: String, required: true },
    testName: { type: String, required: true },
    userID: { type: String, required: false }, // Assuming each test is tied to a user
    totalScore: { type: Number, required: true },
    quantScore: { type: Number, required: true },
    verbalScore: { type: Number, required: true },
    sectionWiseScores: {
        Quant: {
            Easy: Number,
            Medium: Number,
            Hard: Number,
            total: Number
        },
        Verbal: {
            Easy: Number,
            Medium: Number,
            Hard: Number,
            total: Number
        }
    },
    topicWiseScores: Object, // Flexible object to accommodate topics dynamically
    submittedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Test', testSchema);
export const Result = mongoose.model('Result', resultSchema);