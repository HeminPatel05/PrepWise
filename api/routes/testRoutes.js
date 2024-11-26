import express from 'express';
import {
    getAllTests,
    getTestById,
    createTest,
    submitTest,
    updateTest,
    updateSection,
    updateQuestion,
    deleteTest,
    deleteSection,
    deleteQuestion
} from '../controllers/testController.js';
//import { getAllTests } from '../services/testService.js';

const router = express.Router();

// Routes
router.get('/test', getAllTests);//Get the test
router.get('/test/:id', getTestById);//Get the test by ID
router.post('/test', createTest);// Create a test
router.post('/test/:id/submit', submitTest);//Submit the test
router.put('/test/:id', updateTest);  // Update the entire test
router.put('/test/:testID/section/:section', updateSection); // Update specific section
router.put('/test/:testID/section/:section/question/:questionID', updateQuestion); // Update specific question
router.delete('/test/:id', deleteTest);  // Delete entire test
router.delete('/test/:testID/section/:section', deleteSection); // Delete specific section
router.delete('/test/:testID/section/:section/question/:questionID', deleteQuestion); // Delete specific question

export default router;
