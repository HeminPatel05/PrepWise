import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Alert,
  Paper,
  IconButton,
} from '@mui/material';
import { Calculate } from '@mui/icons-material'; // Import calculator icon
import Navbar from './TestNavbar';
import CalculatorWindow from './TestCalculator';
import TestResult from './TestResult';
import { useParams } from 'react-router-dom'; // Import useParams
import './Test.css';

interface SectionTimes {
  Quant: number;
  Verbal: number;
}

const Test: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the test ID from the URL
  const [test, setTest] = useState<any>(null); // State to store test data
  const [currentSection, setCurrentSection] = useState<number>(0); // Track current section index
  const [currentQuestion, setCurrentQuestion] = useState<number>(0); // Track current question index
  const [answers, setAnswers] = useState<any[]>([]); // Store selected answers
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [results, setResults] = useState<any | null>(null); // Store results after test completion
  const [submitted, setSubmitted] = useState<boolean>(false); // Track whether test is submitted
  const [showCalculatorWindow, setShowCalculatorWindow] = useState<boolean>(false); // Show calculator window state
  const [completedSections, setCompletedSections] = useState<number[]>([]); // Track completed sections
  const [timer, setTimer] = useState<number>(0); // Timer for the test
  const [currentSectionTime] = useState<SectionTimes>({
    Quant: 10, // 10 minutes for Quant section
    Verbal: 10, // 10 minutes for Verbal section
  });
  const [allTestIds, setAllTestIds] = useState<string[]>([]); // Array to store all test IDs

  useEffect(() => {
    fetchAllTestIds(); // Fetch all Object IDs on component mount
  }, []); // Run once when component mounts

  useEffect(() => {
    if (allTestIds.length > 0) {
      fetchTest(); // Fetch test details once IDs are available
    }
  }, [allTestIds]); // Trigger test fetch when allTestIds changes

  useEffect(() => {
    if (test && !submitted) {
      const sectionType = test.sections[currentSection].section as keyof SectionTimes;
      setTimer(currentSectionTime[sectionType]); // Set timer for the section type
    }
  }, [currentSection, test, submitted]); // Re-run when currentSection or test changes

  useEffect(() => {
    if (test && !submitted) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            const currentSectionAnswers = answers.filter(
              (a) => a.sectionType === test.sections[currentSection].section
            );
            setAnswers((prev) => [...prev, ...currentSectionAnswers]);

            if (currentSection < test.sections.length - 1) {
              handleEndSection(); // Move to next section when time is up
            } else {
              handleSubmit(); // Submit test when last section ends
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Clear interval when component unmounts
    }
  }, [currentSection, test, submitted, answers]); // Re-run on section change or test completion

  // Fetch all test IDs from the backend
  const fetchAllTestIds = async () => {
    try {
      const response = await fetch('http://localhost:3000/test'); // Fetch all tests
      if (!response.ok) throw new Error('Failed to fetch tests');
      const data = await response.json();
      const allTestIds: string[] = data.map((test: any) => test._id); // Extract IDs
      console.log('All Test IDs:', allTestIds);
      setAllTestIds(allTestIds); // Store IDs in state
    } catch (err: any) {
      console.error('Error fetching all test IDs:', err.message);
    }
  };

  // Fetch the details of a specific test based on its ID
  const fetchTest = async () => {
    try {
      if (allTestIds.length === 0) {
        throw new Error('Test IDs not available yet');
      }
      const response = await fetch(`http://localhost:3000/test/${allTestIds[0]}`); // Fetch the first test ID
      if (!response.ok) throw new Error('Failed to fetch test');
      const data = await response.json();
      setTest(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle answer selection and store it
  const handleAnswerSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!test) return;

    const currentQuestionData = test.sections[currentSection].questions[currentQuestion];
    const selectedOptionValue = event.target.value;
    const newAnswer = {
      questionID: currentQuestionData.questionID,
      selectedOption: selectedOptionValue,
      sectionType: test.sections[currentSection].section,
    };

    setAnswers((prevAnswers) => {
      const existingIndex = prevAnswers.findIndex((a) => a.questionID === newAnswer.questionID);
      if (existingIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingIndex] = newAnswer;
        return updatedAnswers;
      }
      return [...prevAnswers, newAnswer];
    });
  };

  // Handle test submission
  const handleSubmit = async () => {
    try {
      const finalAnswers = answers;
      const response = await fetch(`http://localhost:3000/test/${allTestIds[0]}/submit`, { // Submit using first ID
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });
      if (!response.ok) throw new Error('Submission failed');
      const data = await response.json();
      setResults(data); // Store test results
      setSubmitted(true); // Mark test as submitted
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Handle the end of a section
  const handleEndSection = () => {
    if (completedSections.indexOf(currentSection) === -1) {
      const currentSectionAnswers = answers.filter(
        (a) => a.sectionType === test.sections[currentSection].section
      );
      setAnswers((prev) => [...prev, ...currentSectionAnswers]);
      setCompletedSections((prev) => [...prev, currentSection]);
    }
    if (currentSection < test.sections.length - 1) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
      const nextSectionType = test.sections[currentSection + 1].section as keyof SectionTimes;
      setTimer(currentSectionTime[nextSectionType]);
    } else {
      handleSubmit();
    }
  };

  // Navigate to previous question
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      console.log('You are at the first question of the section.');
    }
  };

  // Navigate to next question or section
  const handleNext = () => {
    if (currentQuestion < test.sections[currentSection].questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else if (
      currentSection < test.sections.length - 1 &&
      completedSections.indexOf(currentSection + 1) === -1
    ) {
      setCurrentSection((prev) => prev + 1);
      setCurrentQuestion(0);
    }
  };

  // Loading, error, and no test scenarios
  if (loading) return <Container className="loading-container"><CircularProgress /></Container>;
  if (error) return <Container><Alert severity="error">{error}</Alert></Container>;
  if (!test) return <Container><Alert severity="info">No test available</Alert></Container>;

  // Calculate the total number of questions for display
  const totalQuestions = test.sections.reduce((total: number, section: any) => total + section.questions.length, 0);
  const totalQuantQuestions = test.sections.find((s: any) => s.section === 'Quant')?.questions.length || 0;
  const totalVerbalQuestions = test.sections.find((s: any) => s.section === 'Verbal')?.questions.length || 0;

  const currentSectionData = test.sections[currentSection];
  const currentQuestionData = currentSectionData.questions[currentQuestion];
  const currentAnswer = answers.find((a) => a.questionID === currentQuestionData.questionID);

  return (
    <Box className="test-wrapper">
      {submitted ? (
        <TestResult
          results={results}
          totalQuestions={totalQuestions}
          totalQuantQuestions={totalQuantQuestions}
          totalVerbalQuestions={totalVerbalQuestions}
        />
      ) : (
        <>
          <Navbar
            onPrevious={handlePrevious}
            onNext={handleNext}
            onEndSection={handleEndSection}
            onEndTest={handleSubmit}
            timer={timer}
          />
          <Container className="question-container">
            <Box className="section-header">
              <Typography variant="h4">{currentSectionData.section} Section</Typography>
              <IconButton onClick={() => setShowCalculatorWindow((prev) => !prev)}>
                <Calculate />
              </IconButton>
            </Box>
            <Paper elevation={5} className="question-paper">
              <Typography variant="h6">Question {currentQuestion + 1} of {currentSectionData.questions.length}</Typography>
              <Typography variant="body1">{currentQuestionData.questionText}</Typography>
              <RadioGroup
                value={currentAnswer ? currentAnswer.selectedOption : ''}
                onChange={handleAnswerSelect}
              >
                {currentQuestionData.options.map((option: string, index: number) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </Paper>
          </Container>
          {showCalculatorWindow && <CalculatorWindow onClose={() => setShowCalculatorWindow(false)} />}
        </>
      )}
    </Box>
  );
};

export default Test;