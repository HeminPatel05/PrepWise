import Test from '../models/testModels.js';

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
        // Fetch a single test based on the provided ID
        const test = await Test.findById(id);
        if (!test) throw new Error('Test not found');
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

// Submit a test and calculate scores
export const submitTest = async (id, answers) => {
    try {
        // Find the test in the database by ID
        const test = await Test.findById(id);
        if (!test) throw new Error('Test not found');

        // Initialize the scores object to track total and section-wise scores
        const scores = {
            total: 0,
            Quant: { Easy: 0, Medium: 0, Hard: 0, total: 0 },
            Verbal: { Easy: 0, Medium: 0, Hard: 0, total: 0 }
        };

        // Iterate through each section in the test
        test.sections.forEach(section => {
            section.questions.forEach(question => {
                // Find the user's answer for the current question
                const userAnswer = answers.find(ans => ans.questionID === question.questionID);

                if (userAnswer && userAnswer.selectedOption === question.correctOption) {
                    // Update scores
                    scores.total++;
                    scores[section.section].total++;
                    scores[section.section][question.difficultyLevel]++;
                }
            });
        });

        return {
            totalScore: scores.total,
            quantScore: scores.Quant.total,
            verbalScore: scores.Verbal.total,
            sectionWiseScores: { 
                Quant: scores.Quant, 
                Verbal: scores.Verbal 
            }
        };
    } catch (error) {
        throw new Error(`Error submitting test: ${error.message}`);
    }
};

// Update an entire test
export const updateTest = async (id, updatedData) => {
    try {
        const updatedTest = await Test.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedTest) throw new Error('Test not found');
        return updatedTest;
    } catch (error) {
        throw new Error(`Error updating test: ${error.message}`);
    }
};

// Update a specific section
export const updateSection = async (testID, sectionName, updatedSectionData) => {
    try {
        const test = await Test.findById(testID);
        if (!test) throw new Error('Test not found');

        const sectionToUpdate = test.sections.find(sec => sec.section === sectionName);
        if (!sectionToUpdate) throw new Error('Section not found');

        Object.assign(sectionToUpdate, updatedSectionData);
        await test.save();
        return test;
    } catch (error) {
        throw new Error(`Error updating section: ${error.message}`);
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
