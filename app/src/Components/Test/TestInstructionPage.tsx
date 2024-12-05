import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const InstructionsPage: React.FC = () => {
  // Extract the testId from the URL parameters using useParams
  const { testId } = useParams<{ testId: string }>();

  // Use navigate hook to programmatically navigate to another route
  const navigate = useNavigate();

  // Function to handle starting the test when the button is clicked
  const handleStartTest = () => {
    // Navigate to the test page with the specific testId
    navigate(`/test/${testId}`);
  };

  return (
    <Container>
      {/* Display the title of the instructions with the testId */}
      <Typography variant="h3" align="center" gutterBottom>
        Instructions for Test {testId}
      </Typography>
      <Box marginY={2}>
        {/* Display the instructions for the test */}
        <Typography variant="body1">
          Please carefully read the following instructions:
          <ul>
            {/* List the important test instructions */}
            <li>The Quant section must be completed within 18 minutes.</li>
            <li>The Verbal section must be completed within 12 minutes.</li>
            <li>Each question has a specific difficulty level, and scores will be calculated based on the correctness of answers.</li>
          </ul>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={3}>
        {/* Button to start the test and navigate to the test page */}
        <Button variant="contained" color="primary" onClick={handleStartTest}>
          Start Test
        </Button>
      </Box>
    </Container>
  );
};

export default InstructionsPage;