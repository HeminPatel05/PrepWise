import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Box,
  Button,
  Paper,
} from '@mui/material';

// Define the props for the TestResult component
interface TestResultProps {
  results: {
    totalScore: number; // The total score the user achieved in the test
    quantScore: number; // The score for the Quant section
    verbalScore: number; // The score for the Verbal section
  };
  totalQuestions: number; // The total number of questions in the test
  totalQuantQuestions: number; // The total number of Quant questions in the test
  totalVerbalQuestions: number; // The total number of Verbal questions in the test
}

const TestResult: React.FC<TestResultProps> = ({
  results,
  totalQuestions,
  totalQuantQuestions,
  totalVerbalQuestions,
}) => {
  const navigate = useNavigate(); // Hook to navigate to other pages

  // Function to handle the Exit button click, which navigates to the home page
  const handleExit = () => {
    navigate('/'); // This will navigate to HomePage
  };

  return (
    <>
      {/* Exit Navbar Box */}
      <Box className="exit-navbar">
        <Button 
          onClick={handleExit} // Trigger navigate to home page when clicked
          variant="contained" 
          className="exit-button"
          sx={{
            backgroundColor: '#3498db', // Blue color for the button
            '&:hover': {
              backgroundColor: '#5dade2', // Light blue when hovered
            },
          }}
        >
          Exit
        </Button>
      </Box>

      {/* Results Display Section */}
      <Box className="results-container">
        {/* Paper component to wrap the results */}
        <Paper elevation={5} className="results-paper">
          <Typography variant="h6" className="results-title">
            Test Results
          </Typography>
          
          {/* Display total score, quant score, and verbal score */}
          <Typography variant="body1">
            <strong>Total Score:</strong> {results.totalScore} out of {totalQuestions}
          </Typography>
          <Typography variant="body1">
            <strong>Quant Score:</strong> {results.quantScore} out of {totalQuantQuestions}
          </Typography>
          <Typography variant="body1">
            <strong>Verbal Score:</strong> {results.verbalScore} out of {totalVerbalQuestions}
          </Typography>
        </Paper>
      </Box>
    </>
  );
};

export default TestResult;