import Test from '../models/testModels.js';

// Get all tests
export const getAllTests = async () => {
    try {
        // Fetch all tests from the database
        const tests = await Test.find();
        return tests;
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
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
        // If an error occurs, throw it with a message
        throw new Error(error.message);
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
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Submit a test and calculate scores
export const submitTest = async (id, answers) => {
    try {
        // Fetch the test by ID
        const test = await Test.findById(id);
        if (!test) throw new Error('Test not found');

        // Initialize scores and data
        let totalScore = 0;
        let verbalScore = 0;
        let quantScore = 0;
        const scoresByDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
        const incorrectQuestions = [];

        // Loop through each section and question to calculate scores
        test.sections.forEach((section) => {
            section.questions.forEach((question) => {
                const userAnswer = answers.find(ans => ans.questionID === question.questionID);

                if (userAnswer && userAnswer.selectedOption === question.correctOption) {
                    totalScore++;
                    if (scoresByDifficulty[question.difficultyLevel] !== undefined) {
                        scoresByDifficulty[question.difficultyLevel]++;
                    }
                    if (section.section === 'Verbal') verbalScore++;
                    if (section.section === 'Quant') quantScore++;
                } else {
                    // Track incorrect answers
                    incorrectQuestions.push({
                        questionID: question.questionID,
                        questionText: question.questionText,
                        selectedOption: userAnswer ? userAnswer.selectedOption : 'Not Answered',
                        correctOption: question.correctOption,
                        section: section.section,
                        difficultyLevel: question.difficultyLevel,
                    });
                }
            });
        });

        // Calculate the total number of questions in the test
        const totalMarks = test.sections.reduce((sum, section) => {
            return sum + section.questions.length;
        }, 0);

        return { totalScore, verbalScore, quantScore, scoresByDifficulty, totalMarks, incorrectQuestions, incorrectCount: incorrectQuestions.length };
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Update Entire Test
export const updateTest = async (id, updateData) => {
    try {
        // Find and update the test by ID
        const updatedTest = await Test.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true
        });
        if (!updatedTest) throw new Error('Test not found');
        return updatedTest;
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Update Specific Section
export const updateSection = async (testID, section, questions) => {
    try {
        // Find the test by ID and update the specific section
        const test = await Test.findOne({ testID });
        if (!test) throw new Error('Test not found');

        const sectionToUpdate = test.sections.find(sec => sec.section === section);
        if (!sectionToUpdate) throw new Error('Section not found');

        // Update the questions in the specified section
        sectionToUpdate.questions = questions;
        await test.save();
        return test;
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Update Specific Question
export const updateQuestion = async (testID, section, questionID, updatedQuestionData) => {
    try {
        // Find the test by ID and update a specific question
        const test = await Test.findOne({ testID });
        if (!test) throw new Error('Test not found');

        const sectionToUpdate = test.sections.find(sec => sec.section === section);
        if (!sectionToUpdate) throw new Error('Section not found');

        const questionToUpdate = sectionToUpdate.questions.find(q => q.questionID === questionID);
        if (!questionToUpdate) throw new Error('Question not found');

        // Update the question with the provided data
        Object.assign(questionToUpdate, updatedQuestionData);
        await test.save();
        return test;
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Delete Entire Test
export const deleteTest = async (id) => {
    try {
        // Find and delete the test by ID
        const deletedTest = await Test.findByIdAndDelete(id);
        if (!deletedTest) throw new Error('Test not found');
        return 'Test deleted successfully';
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Delete Specific Section
export const deleteSection = async (testID, section) => {
    try {
        // Find the test by ID and delete the specific section
        const test = await Test.findOne({ testID });
        if (!test) throw new Error('Test not found');

        const sectionIndex = test.sections.findIndex(sec => sec.section === section);
        if (sectionIndex === -1) throw new Error('Section not found');

        // Remove the section from the test
        test.sections.splice(sectionIndex, 1);
        await test.save();
        return `${section} section deleted successfully`;
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};

// Delete Specific Question
export const deleteQuestion = async (testID, section, questionID) => {
    try {
        // Find the test by ID and delete a specific question
        const test = await Test.findOne({ testID });
        if (!test) throw new Error('Test not found');

        const sectionToUpdate = test.sections.find(sec => sec.section === section);
        if (!sectionToUpdate) throw new Error('Section not found');

        const questionIndex = sectionToUpdate.questions.findIndex(q => q.questionID === questionID);
        if (questionIndex === -1) throw new Error('Question not found');

        // Remove the question from the section
        sectionToUpdate.questions.splice(questionIndex, 1);
        await test.save();
        return 'Question deleted successfully';
    } catch (error) {
        // If an error occurs, throw it with a message
        throw new Error(error.message);
    }
};
