import Test from '../models/testModels.js';
import mongoose from 'mongoose';  // Make sure mongoose is imported here

// Get all tests
export const getAllTests = async () => {
    try {
        // Fetch all tests from the database
        const tests = await Test.find();
        return tests;
    } catch (error) {
        throw new Error(`Error fetching all tests: ${error.message}`);
    }
};

// Get a single test by ID
export const getTestById = async (id) => {
    try {
        // Check if the ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid ID format');
        }

        // Fetch a single test based on the provided ID
        const test = await Test.findById(id);
        if (!test) {
            console.log('Test not found with ID:', id);  // Log the ID if test is not found
            throw new Error('Test not found');
        }
        return test;
    } catch (error) {
        throw new Error(`Error fetching test by ID: ${error.message}`);
    }
};

// Create a new test
export const createTest = async (testData) => {
    try {
        // Create a new test using the provided test data
        const test = new Test(testData);
        const savedTest = await test.save();
        return savedTest;
    } catch (error) {
        throw new Error(`Error creating test: ${error.message}`);
    }
};


import {  Result } from '../models/testModels.js'; // Import both Test and Result models

export const submitTest = async (id, answers) => {
    try {
        // Find the test in the database by ID
        const test = await Test.findById(id);
        if (!test) throw new Error('Test not found');

        // Initialize scores object
        const scores = {
            total: 0,
            Quant: { Easy: 0, Medium: 0, Hard: 0, total: 0 },
            Verbal: { Easy: 0, Medium: 0, Hard: 0, total: 0 },
            topicWise: {}
        };

        // Calculate scores
        test.sections.forEach(section => {
            section.questions.forEach(question => {
                if (question.topic && !scores.topicWise[question.topic]) {
                    scores.topicWise[question.topic] = { questionsAsked: 0, marksScored: 0 };
                }

                if (question.topic) {
                    scores.topicWise[question.topic].questionsAsked++;
                }

                const userAnswer = answers.find(ans => ans.questionID === question.questionID);

                if (userAnswer && userAnswer.selectedOption === question.correctOption) {
                    scores.total++;
                    scores[section.section].total++;
                    scores[section.section][question.difficultyLevel]++;
                    
                    if (question.topic) {
                        scores.topicWise[question.topic].marksScored++;
                    }
                }
            });
        });

        // Create a result object to store the test result
        const result = new Result({
            testID: test._id,  
            testName: test.testName,
            //userID: userID,
            totalScore: scores.total,
            quantScore: scores.Quant.total,
            verbalScore: scores.Verbal.total,
            sectionWiseScores: { Quant: scores.Quant, Verbal: scores.Verbal },
            topicWiseScores: scores.topicWise
        });

        // Save the result in the Result collection
        await result.save();

        // Return result for confirmation
        return {
            totalScore: scores.total,
            quantScore: scores.Quant.total,
            verbalScore: scores.Verbal.total,
            sectionWiseScores: { Quant: scores.Quant, Verbal: scores.Verbal },
            topicWiseScores: scores.topicWise
        };
    } catch (error) {
        throw new Error(`Error submitting test: ${error.message}`);
    }
};


// Update a specific question
export const updateQuestion = async (testID, sectionName, questionID, updatedQuestionData) => {
    try {
        const test = await Test.findById(testID);
        if (!test) throw new Error('Test not found');

        const sectionToUpdate = test.sections.find(sec => sec.section === sectionName);
        if (!sectionToUpdate) throw new Error('Section not found');

        const questionToUpdate = sectionToUpdate.questions.find(q => q.questionID === questionID);
        if (!questionToUpdate) throw new Error('Question not found');

        Object.assign(questionToUpdate, updatedQuestionData);
        await test.save();
        return test;
    } catch (error) {
        throw new Error(`Error updating question: ${error.message}`);
    }
};

  export const fetchAllTests = async () => {
    try {
        const tests = await Test.find(); // Assuming Test is a mongoose model
        if (!tests || tests.length === 0) {
            throw new Error('No tests found');
        }
        return tests; // Return all tests
    } catch (error) {
        console.error(`Error fetching tests: ${error.message}`);
        throw new Error(`Error fetching tests: ${error.message}`);
    }
};

// Service to fetch test IDs only
export const fetchTestIds = async () => {
    try {
        const tests = await Test.find();
        return tests.map(test => test.id); // Only return the IDs of tests
    } catch (error) {
        console.error(`Error fetching test IDs: ${error.message}`);
        throw new Error(`Error fetching test IDs: ${error.message}`);
    }
};
export const fetchResultsByTestID = async (testID) => {
    try {
        const results = await Result.find({ testID }); // Query the database for results with the given testID

        if (!results || results.length === 0) {
            throw new Error('No results found for the given testID');
        }

        return results; // Return the results if found
    } catch (error) {
        console.error(`Error fetching results: ${error.message}`);
        throw new Error(`Error fetching results: ${error.message}`);
    }
};
// Delete an entire test
export const deleteTest = async (id) => {
    try {
        const deletedTest = await Test.findByIdAndDelete(id);
        if (!deletedTest) throw new Error('Test not found');
        return 'Test deleted successfully';
    } catch (error) {
        throw new Error(`Error deleting test: ${error.message}`);
    }
};

// Delete a specific section
export const deleteSection = async (testID, sectionName) => {
    try {
        const test = await Test.findById(testID);
        if (!test) throw new Error('Test not found');

        const sectionIndex = test.sections.findIndex(sec => sec.section === sectionName);
        if (sectionIndex === -1) throw new Error('Section not found');

        test.sections.splice(sectionIndex, 1);
        await test.save();
        return `${sectionName} section deleted successfully`;
    } catch (error) {
        throw new Error(`Error deleting section: ${error.message}`);
    }
};

// Delete a specific question
export const deleteQuestion = async (testID, sectionName, questionID) => {
    try {
        const test = await Test.findById(testID);
        if (!test) throw new Error('Test not found');

        const sectionToUpdate = test.sections.find(sec => sec.section === sectionName);
        if (!sectionToUpdate) throw new Error('Section not found');

        const questionIndex = sectionToUpdate.questions.findIndex(q => q.questionID === questionID);
        if (questionIndex === -1) throw new Error('Question not found');

        sectionToUpdate.questions.splice(questionIndex, 1);
        await test.save();
        return 'Question deleted successfully';
    } catch (error) {
        throw new Error(`Error deleting question: ${error.message}`);
    }
};