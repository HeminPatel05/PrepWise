// Import all methods from the testService module
import * as testService from '../services/testService.js';

// Get all tests
// This function retrieves all tests from the database and returns them as a JSON response
export const getAllTests = async (req, res) => {
    try {
        const tests = await testService.getAllTests();
        res.status(200).json(tests); // Responds with status 200 and the list of tests
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handles server errors with status 500
    }
};

// Get a single test by ID
// This function retrieves a specific test based on the provided ID from the request parameters
export const getTestById = async (req, res) => {
    try {
        const { id } = req.params;
        const test = await testService.getTestById(id);
        res.status(200).json(test); // Responds with status 200 and the test data
    } catch (error) {
        res.status(404).json({ error: error.message }); // Handles errors with status 404 if test is not found
    }
};

// Create a new test
// This function creates a new test with the provided request body data and saves it in the database
export const createTest = async (req, res) => {
    try {
        const savedTest = await testService.createTest(req.body);
        res.status(201).json(savedTest); // Responds with status 201 and the saved test
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handles client errors with status 400
    }
};

// Submit a test and calculate scores
// This function handles test submission, evaluates the answers, and returns the result
export const submitTest = async (req, res) => {
    try {
        const { id } = req.params;
        const { answers } = req.body;
        const result = await testService.submitTest(id, answers);
        res.status(200).json(result); // Responds with status 200 and the result of the test
    } catch (error) {
        res.status(500).json({ error: error.message }); // Handles server errors with status 500
    }
};

// Update entire test
// This function updates the entire test object with the provided data in the request body
export const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTest = await testService.updateTest(id, req.body);
        res.status(200).json(updatedTest); // Responds with status 200 and the updated test
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handles client errors with status 400
    }
};

// Update a specific section of the test
// This function updates a specific section of the test with new questions
export const updateSection = async (req, res) => {
    try {
        const { testID, section } = req.params;
        const { questions } = req.body;
        const updatedTest = await testService.updateSection(testID, section, questions);
        res.status(200).json(updatedTest); // Responds with status 200 and the updated section
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handles client errors with status 400
    }
};

// Update a specific question within a section of the test
// This function updates a specific question in a specified section with new data
export const updateQuestion = async (req, res) => {
    try {
        const { testID, section, questionID } = req.params;
        const updatedTest = await testService.updateQuestion(testID, section, questionID, req.body);
        res.status(200).json(updatedTest); // Responds with status 200 and the updated question
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handles client errors with status 400
    }
};

// Delete an entire test
// This function deletes a test from the database based on the provided ID
export const deleteTest = async (req, res) => {
    try {
        const { id } = req.params;
        const message = await testService.deleteTest(id);
        res.status(200).json({ message }); // Responds with status 200 and a success message
    } catch (error) {
        res.status(404).json({ error: error.message }); // Handles errors with status 404 if test is not found
    }
};

// Delete a specific section of the test
// This function deletes a specific section from a test based on the provided test ID and section name
export const deleteSection = async (req, res) => {
    try {
        const { testID, section } = req.params;
        const message = await testService.deleteSection(testID, section);
        res.status(200).json({ message }); // Responds with status 200 and a success message
    } catch (error) {
        res.status(404).json({ error: error.message }); // Handles errors with status 404 if section is not found
    }
};

// Delete a specific question within a section of the test
// This function deletes a specific question from a section based on the provided IDs
export const deleteQuestion = async (req, res) => {
    try {
        const { testID, section, questionID } = req.params;
        const message = await testService.deleteQuestion(testID, section, questionID);
        res.status(200).json({ message }); // Responds with status 200 and a success message
    } catch (error) {
        res.status(404).json({ error: error.message }); // Handles errors with status 404 if question is not found
    }
};
