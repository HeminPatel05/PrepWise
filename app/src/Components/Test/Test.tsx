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
import { useNavigate } from 'react-router-dom';


import { Calculate } from '@mui/icons-material';
import Navbar from './TestNavbar';
import CalculatorWindow from './TestCalculator';
import TestResult from './TestResult';
import { useParams } from 'react-router-dom';
import './Test.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Test/redux/store'; 
interface SectionTimes {
  Quant: number;
  Verbal: number;
}

const Test: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentTestIndex = useSelector((state: RootState) => state.test.currentTestIndex);

  const { id } = useParams<{ id: string }>();
  const [test, setTest] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showCalculatorWindow, setShowCalculatorWindow] = useState<boolean>(false);
  const [completedSections, setCompletedSections] = useState<number[]>([]);
  const [timer, setTimer] = useState<number>(0);
  const { testId } = useParams<{ testId: string }>();

  const [currentSectionTime] = useState<SectionTimes>({
    Quant: 10,
    Verbal: 10,
  });
  const [allTestIds, setAllTestIds] = useState<string[]>([]);

  useEffect(() => {
    fetchAllTestIds();
  }, []);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        if (currentTestIndex === null) {
          throw new Error('Test index is not set');
        }

        const selectedTestId = allTestIds[currentTestIndex];
        if (!selectedTestId) {
          throw new Error('Test ID is not available');
        }

        const response = await fetch(`http://localhost:3000/test/${selectedTestId}`);
        if (!response.ok) throw new Error('Failed to fetch test');

        const data = await response.json();
        setTest(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (allTestIds.length > 0) {
      fetchTest();
    }
  }, [currentTestIndex, allTestIds]);

  useEffect(() => {
    const submitTest = async () => {
      try {
        if (!answers || answers.length === 0) {
          throw new Error('No answers selected');
        }
  
        // Ensure the test ID is valid
        if (currentTestIndex === null) {
          throw new Error('Test index is not set');
        }
  
        const selectedTestId = allTestIds[currentTestIndex];
        if (!selectedTestId) {
          throw new Error('Test ID is not available');
        }
  
        // Prepare the payload to send to the server
        const payload = {
          testId: selectedTestId,
          answers: answers,
          completedAt: new Date().toISOString(), // Optional: timestamp when the test is submitted
        };
  
        // Send the answers to the server
        const response = await fetch(`http://localhost:3000/test/${allTestIds[currentTestIndex]}/submit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
  
        // Handle the response from the server
        if (!response.ok) {
          throw new Error('Failed to submit the test');
        }
  
        const result = await response.json();
        setResults(result); // Set the result if the submission was successful
        setSubmitted(true); // Mark the test as submitted
      } catch (err: any) {
        setError(err.message); // Set the error message if something went wrong
      } finally {
        setLoading(false); // Set loading to false after the submission attempt
      }
    };
  
    if (submitted) {
      submitTest(); // Submit the test if it's marked as submitted
    }
  }, [submitted, answers, currentTestIndex, allTestIds]);
  
  useEffect(() => {
    if (test && !submitted) {
      const sectionType = test.sections[currentSection].section as keyof SectionTimes;
      setTimer(currentSectionTime[sectionType]);
    }
  }, [currentSection, test, submitted]);

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
              handleEndSection();
            } else {
              handleSubmit();
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentSection, test, submitted, answers]);


  
  const handleStartTest = async (testIndex: number) => {
    try {
      if (allTestIds.length === 0) throw new Error('No test IDs available');
      const selectedTestId = allTestIds[testIndex];
      navigate(`/test/${selectedTestId}`); // Use React Router navigation
      const response = await fetch(`http://localhost:3000/test/${selectedTestId}`);
      if (!response.ok) throw new Error('Failed to fetch selected test');
  
      const data = await response.json();
      setTest(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchTest1 = async (testIndex: number) => {
    try {
      if (allTestIds.length === 0) throw new Error('No test IDs available');
      const selectedTestId = allTestIds[testIndex];
      window.history.pushState({}, '', `/test/${selectedTestId}`);
      const response = await fetch(`http://localhost:3000/test/${allTestIds[0]}`);
      if (!response.ok) throw new Error('Failed to fetch selected test');
      const data = await response.json();
      setTest(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  

  const fetchAllTestIds = async () => {
    try {
      const response = await fetch('http://localhost:3000/test');
      if (!response.ok) throw new Error('Failed to fetch tests');
      const data = await response.json();
      setAllTestIds(data.map((test: any) => test._id));
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchTest = async (currentTestIndex: number) => {
    try {
      if (allTestIds.length === 0) throw new Error('Test IDs not available yet');
      if (currentTestIndex < 0 || currentTestIndex >= allTestIds.length) throw new Error('Invalid current test index');
  
      const response = await fetch(`http://localhost:3000/test/${allTestIds[currentTestIndex]}`);
      if (!response.ok) throw new Error('Failed to fetch test');
  
      const data = await response.json();
      setTest(data);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };
  

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

  const handleSubmit = async () => {
    try {
      if (currentTestIndex === null || allTestIds.length === 0) {
        throw new Error('Test index or test IDs are not set');
      }
  
      const selectedTestId = allTestIds[currentTestIndex];
      if (!selectedTestId) {
        throw new Error('Selected Test ID is not valid');
      }
  
      const finalAnswers = answers;
  
      // API call using currentTestIndex to dynamically fetch the test ID
      const response = await fetch(`http://localhost:3000/test/${selectedTestId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: finalAnswers }),
      });
  
      if (!response.ok) throw new Error('Submission failed');
      
      const data = await response.json();
      setResults(data);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message);
    }
  };
  

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

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    } else {
      console.log('You are at the first question of the section.');
    }
  };

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

  if (loading) return <Container className="loading-container"><CircularProgress /></Container>;
  if (error) return <Container><Alert severity="error">{error}</Alert></Container>;
  if (!test) return <Container><Alert severity="info">No test available</Alert></Container>;

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
                  <FormControlLabel key={index} value={option} control={<Radio />} label={option} />
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