import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store'; // Import RootState for useSelector

// Component for displaying test instructions
const TestInstructionsPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();

  // Access the currentTestIndex from Redux
  const currentTestIndex = useSelector((state: RootState) => state.test.currentTestIndex);

  // Log currentTestIndex to the console on every render
  useEffect(() => {
    console.log('currentTestId:', currentTestIndex);
  }, [currentTestIndex]);

  // Function to handle starting the test
  const handleStartTest = () => {
    if (!testId) {
      console.error('Test ID is missing or invalid.');
      return;
    }
    navigate(`/test/${testId}`);
  };

  // Display error message if testId is missing
  if (!testId) {
    return (
      <Container>
        <Typography variant="h5" color="error" align="center">
          Invalid Test ID
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Instructions for Test {testId}
      </Typography>
      <Box marginY={2}>
        <Typography variant="body1">
          Please carefully read the following instructions:
        </Typography>
        <ul>
          <li>The Quant section must be completed within 18 minutes.</li>
          <li>The Verbal section must be completed within 12 minutes.</li>
          <li>
            Each question has a specific difficulty level, and scores will be
            calculated based on the correctness of answers.
          </li>
        </ul>
      </Box>
      {/* Button to start the test */}
      <Box display="flex" justifyContent="center" marginTop={3}>
        <Button variant="contained" color="primary" onClick={handleStartTest}>
          Start Test
        </Button>
      </Box>
    </Container>
  );
};

export default TestInstructionsPage;