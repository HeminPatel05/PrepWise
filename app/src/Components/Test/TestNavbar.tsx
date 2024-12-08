import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

// Define the props for the Navbar component
interface NavbarProps {
  onPrevious: () => void; // Function to handle the previous button click
  onNext: () => void; // Function to handle the next button click
  onEndSection: () => void; // Function to handle the end section button click
  onEndTest: () => void; // Function to handle the end test button click
  timer: number; // Timer value for the test countdown
}

const TestNavbar: React.FC<NavbarProps> = ({ onPrevious, onNext, onEndSection, onEndTest, timer }) => {
  // Helper function to format the time in mm:ss format
  const formatTime = (seconds: number): string => {
    if (!seconds || seconds < 0) return "00:00"; // If timer is 0 or less, return 00:00
    const minutes = Math.floor(seconds / 60); // Calculate minutes
    const remainingSeconds = seconds % 60; // Calculate remaining seconds
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`; // Return formatted time
  };

  return (
    <Box
      sx={{
        padding: '10px 20px',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width: '100%', 
        marginTop: '20px', // Add margin-top to space out the navbar from the question card
      }}
    >
      <Typography variant="h6" sx={{ color: 'black', marginTop: '10px' }}>
        Time Remaining: {formatTime(timer)} {/* Display formatted time */}
      </Typography>
      <Box>
        <Button
          onClick={onPrevious} 
          variant="contained"
          sx={{
            backgroundColor: '#3498db', 
            '&:hover': {
              backgroundColor: '#5dade2', 
            },
            marginRight: '10px', 
          }}
        >
          Previous
        </Button>

        <Button
          onClick={onNext} // Call onNext function when clicked
          variant="contained"
          sx={{
            backgroundColor: '#2ecc71',  
            '&:hover': {
              backgroundColor: '#58d68d', 
            },
            marginRight: '10px', 
          }}
        >
          Next
        </Button>

        {/* Button to end the current section */}
        <Button
          onClick={onEndSection} 
          variant="contained"
          sx={{
            backgroundColor: '#e74c3c',
            '&:hover': {
              backgroundColor: '#ec7063', 
            },
            marginRight: '10px', 
          }}
        >
          End Section
        </Button>

        {/* Button to submit the test */}
        <Button
          onClick={onEndTest} 
          variant="contained"
          sx={{
            backgroundColor: '#f39c12', 
            '&:hover': {
              backgroundColor: '#f5b041', 
            },
          }}
        >
          Submit Test
        </Button>
      </Box>
    </Box>
  );
};

export default TestNavbar;
