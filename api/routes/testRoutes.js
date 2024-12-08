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
  deleteQuestion,
  getTestIds
} from '../controllers/testController.js';

const router = express.Router();

// Routes
router.get('/test', getAllTests);
router.get('/test/ids', getTestIds);
router.get('/test/:testId', getTestById); // Get a specific test by ID
router.post('/test', createTest); // Create a new test
router.post('/test/:testId/submit', submitTest); // Submit the test and calculate scores (changed to PUT for consistency)
router.put('/test/:testId', updateTest); // Update the entire test
router.put('/test/:testId/section/:section', updateSection); // Update a specific section of a test
router.put('/test/:testId/section/:section/question/:questionId', updateQuestion); // Update a specific question in a section
router.delete('/test/:testId', deleteTest); // Delete an entire test
router.delete('/test/:testId/section/:section', deleteSection); // Delete a specific section of a test
router.delete('/test/:testId/section/:section/question/:questionId', deleteQuestion); // Delete a specific question in a section

export default router;