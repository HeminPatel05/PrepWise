import React, { useState } from 'react';
import { Container, Typography, Button, Box, Alert, Paper } from '@mui/material';

interface Test {
  id: number;
  name: string;
  completed: boolean;
  score?: number;
}

const HomePage: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([
    { id: 1, name: 'Test 1', completed: false },
    { id: 2, name: 'Test 2', completed: false },
    { id: 3, name: 'Test 3', completed: false },
  ]);

  const [error, setError] = useState<string | null>(null);

  const handleTestStart = (testId: number) => {
    if (testId > 1 && !tests[testId - 2].completed) {
      setError(`Please complete ${tests[testId - 2].name} before starting this test.`);
      return;
    }
    window.location.href = `/instructions/${testId}`;
  };

  const handleViewResults = (testId: number) => {
    window.location.href = `/results/${testId}`;
  };

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Tests Dashboard
      </Typography>
      {error && <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>}
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        {tests.map((test) => (
          <Paper key={test.id} elevation={3} style={{ padding: '1rem', width: '80%' }}>
            <Typography variant="h5">{test.name}</Typography>
            <Box display="flex" justifyContent="space-between" marginTop={1}>
              <Button
                variant="contained"
                color="primary"
                disabled={test.completed}
                onClick={() => handleTestStart(test.id)}
              >
                {test.completed ? 'Completed' : 'Start Test'}
              </Button>
              {test.completed && (
                <Button variant="outlined" onClick={() => handleViewResults(test.id)}>
                  View Results
                </Button>
              )}
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default HomePage;