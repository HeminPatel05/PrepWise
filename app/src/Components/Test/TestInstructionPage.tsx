import React, { useEffect } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const TestInstructionsPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  // Access the currentTestIndex from Redux, with a fallback to avoid errors
  const currentTestIndex = useSelector(
    (state: RootState) => state.test?.currentTestIndex ?? -1
  );

  // Log currentTestIndex to the console for debugging
  useEffect(() => {
    console.log('Current Test Index:', currentTestIndex);
  }, [currentTestIndex]);

  // Function to handle starting the test
  const handleStartTest = () => {
    if (!testId) {
      console.error('Test ID is missing or invalid.');
      return;
    }
    navigate(`/test/${testId}`);
  };

  // Display error message if testId is missing or invalid
  if (!testId) {
    return (
      <Container className="test-wrapper">
        <Typography variant="h5" color="error" align="center">
          Invalid Test ID
        </Typography>
      </Container>
    );
  }

  return (
    <Container className="test-wrapper">
      {/* Instructions container */}
      <Paper elevation={3} className="instructions-container">
        <Typography variant="h4" className="instructions-title" align="center" gutterBottom>
          Instructions for Test {testId}
        </Typography>
        <Typography variant="body1" className="instructions-text" gutterBottom>
          Please carefully read the following instructions:
        </Typography>
        <ul className="instructions-list">
          <li>The Quant section must be completed within 18 minutes.</li>
          <li>The Verbal section must be completed within 12 minutes.</li>
          <li>
            Each question has a specific difficulty level, and scores will be calculated based on
            the correctness of answers.
          </li>
        </ul>
      </Paper>
      {/* Button to start the test */}
      <Box display="flex" justifyContent="center" marginTop={4}>
        <Button
          variant="contained"
          color="primary"
          className="start-test-button"
          onClick={handleStartTest}
        >
          Start Test
        </Button>
      </Box>
    </Container>
  );
};

export default TestInstructionsPage;
