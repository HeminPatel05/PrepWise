// Import all methods from the testService module
import * as testService from '../services/testService.js';

// Get all tests
// This function retrieves all tests from the database and returns them as a JSON response


// Get a single test by ID
// This function retrieves a specific test based on the provided ID from the request parameters
// testController.js


export const getTestById = async (req, res) => {
    try {
        // Extract the id from the URL parameter, it should match ':testId' in the route
        const { testId } = req.params;
        console.log(`Fetching test with ID: ${testId}`);  // Log the testId to verify it's being passed correctly

        // Now call the service function with the extracted testId
        const test = await testService.getTestById(testId);  
        res.status(200).json(test);  // Respond with the test data if found
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(404).json({ error: error.message });
    }
};


export const getResultsByTestID = async (req, res) => {
    try {
        // Extract testID from the URL parameters
        const { testID } = req.params;
        console.log(`Fetching results for testID: ${testID}`); // Log the testID

        // Call the service function to fetch results
        const results = await testService.fetchResultsByTestID(testID);

        res.status(200).json(results); // Respond with the results
    } catch (error) {
        console.error(`Error fetching results: ${error.message}`);
        res.status(404).json({ error: error.message }); // Return an error if results aren't found
    }
};
// async function getAllTests(req, res) {
//     try {
//       const tests = await testService.getAllTests();
//       res.json(tests); // Send all tests in response
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to fetch tests' });
//     }
//   }
  
//   // Controller for getting test IDs
//   async function getTestIds(req, res) {
//     try {
//       const testIds = await testService.getTestIds();
//       res.json(testIds); // Send only the IDs in response
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to fetch test IDs' });
//     }
//   }

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
        const { testId } = req.params;
        const { answers } = req.body;
        console.log(`Fetching test with ID: ${testId}`);  // Log the testId to verify it's being passed correctly

        const result = await testService.submitTest(testId, answers);
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

// Controller to fetch all tests
export const getAllTests = async (req, res) => {
    try {
        const tests = await testService.fetchAllTests(); // Call the service
        res.json(tests); // Send the response as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch tests' });
    }
};

// Controller to fetch test IDs only
export const getTestIds = async (req, res) => {
    try {
        const testIds = await testService.fetchTestIds(); // Call the service
        res.json(testIds); // Send the response as JSON
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch test IDs' });
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