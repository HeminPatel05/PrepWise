import React, { useState } from 'react';
import { Button, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface StartTestButtonProps {
  testId: string;
  isCompleted: boolean;
}

const TestStartButton: React.FC<StartTestButtonProps> = ({ testId, isCompleted }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle navigation to start test
  const handleStartTest = () => {
    if (!testId) {
      setError("Invalid test ID");
      return;
    }
    navigate(`/test/${testId}`);
  };

  // Handle navigation to view results
  const handleViewResult = () => {
    if (!testId) {
      setError("Invalid test ID");
      return;
    }
    navigate(`/test/results/${testId}`);
  };

  return (
    <div>
      {error && <Alert severity="error">{error}</Alert>}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color={isCompleted ? "secondary" : "primary"}
          onClick={handleStartTest}
          disabled={isCompleted}
          title={isCompleted ? "Test is completed. You cannot start it again." : "Click to start the test"}
        >
          {isCompleted ? "Test Completed" : "Start Test"}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleViewResult}
          disabled={!isCompleted}
          title={!isCompleted ? "You need to complete the test first to view results." : "View Results"}
        >
          View Results
        </Button>
      </Stack>
    </div>
  );
};

export default TestStartButton;