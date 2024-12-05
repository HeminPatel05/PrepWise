import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography, IconButton } from '@mui/material';
import { Close, Minimize, Restore } from '@mui/icons-material';

interface CalculatorProps {
  onClose: () => void;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose }) => {
  const [calculatorValue, setCalculatorValue] = useState<string>(""); // Stores the current calculator input
  const [isMinimized, setIsMinimized] = useState<boolean>(false); // Controls minimized state

  // Handle button click in the calculator
  const handleCalculatorClick = (value: string) => {
    if (value === "=") {
      try {
        // Evaluate the mathematical expression
        setCalculatorValue(eval(calculatorValue).toString());
      } catch (e) {
        setCalculatorValue("Error");
      }
    } else if (value === "C") {
      // Clear the calculator input
      setCalculatorValue("");
    } else {
      // Append the clicked value to the current input
      setCalculatorValue(calculatorValue + value);
    }
  };

  // Toggle between minimized and expanded states
  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <Paper
      sx={{
        width: isMinimized ? "200px" : "400px", // Adjust width based on minimized state
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "16px",
        transition: "width 0.3s",
        zIndex: 1000,
      }}
    >
      {/* Header with title and control buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Calculator</Typography>
        <Box>
          {/* Minimize/Restore Button */}
          <IconButton onClick={toggleMinimize}>
            {isMinimized ? <Restore /> : <Minimize />}
          </IconButton>
          {/* Close Button */}
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </Box>

      {/* Calculator body (hidden when minimized) */}
      {!isMinimized && (
        <>
          {/* Display current calculator value */}
          <Typography
            variant="h4"
            align="center"
            sx={{ marginBottom: '16px', backgroundColor: '#f4f4f4', padding: '8px', borderRadius: '4px' }}
          >
            {calculatorValue || "0"}
          </Typography>
          {/* Calculator Buttons */}
          <Grid container spacing={1}>
            {['7', '8', '9', '/'].map((value) => (
              <Grid item xs={3} key={value}>
                <Button variant="contained" fullWidth onClick={() => handleCalculatorClick(value)}>
                  {value}
                </Button>
              </Grid>
            ))}
            {['4', '5', '6', '*'].map((value) => (
              <Grid item xs={3} key={value}>
                <Button variant="contained" fullWidth onClick={() => handleCalculatorClick(value)}>
                  {value}
                </Button>
              </Grid>
            ))}
            {['1', '2', '3', '-'].map((value) => (
              <Grid item xs={3} key={value}>
                <Button variant="contained" fullWidth onClick={() => handleCalculatorClick(value)}>
                  {value}
                </Button>
              </Grid>
            ))}
            {['C', '0', '=', '+'].map((value) => (
              <Grid item xs={3} key={value}>
                <Button variant="contained" fullWidth onClick={() => handleCalculatorClick(value)}>
                  {value}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Paper>
  );
};

export default Calculator;