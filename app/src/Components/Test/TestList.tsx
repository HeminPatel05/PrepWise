import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper, Stack, Alert, CircularProgress } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

interface Test {
  _id: string;
  testName: string;
  isCompleted: boolean;
}

// Main component for displaying the list of available tests
const TestList: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch tests and their completion status
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);

        // Fetch all tests
        const response = await fetch('http://localhost:3000/test');
        if (!response.ok) throw new Error('Failed to fetch tests');
        const data: Test[] = await response.json();

        // Fetch status for each test
        const testsWithStatus = await Promise.allSettled(
          data.map(async (test) => {
            try {
              const statusResponse = await fetch(`http://localhost:3000/test/${test._id}/status`);
              if (!statusResponse.ok) throw new Error('Failed to fetch status');
              const statusData = await statusResponse.json();
              return { ...test, isCompleted: statusData.isCompleted };
            } catch {
              return { ...test, isCompleted: false }; // Default to false if status fetch fails
            }
          })
        );

        // Process the results of status fetching
        const validTests = testsWithStatus.map((result, index) => {
          if (result.status === 'fulfilled') {
            return result.value;
          } else {
            console.warn(`Failed to fetch status for test ${data[index]._id}`);
            return { ...data[index], isCompleted: false };
          }
        });

        setTests(validTests);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [location]);

  // Handle starting a test
  const handleStartTest = (index: number) => {
    if (index > 0 && !tests[index - 1]?.isCompleted) {
      setError(`Please complete ${tests[index - 1]?.testName} before starting this test.`);
      return;
    }

    navigate(`/test/${tests[index]._id}`);
  };

  // Display loading spinner while fetching data
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  // Display error message if fetch failed
  if (error) {
    return (
      <Box sx={{ padding: '2rem' }}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Available Tests
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {tests.length === 0 ? (
        <Typography>No tests available at the moment.</Typography>
      ) : (
        <Box>
          {tests.map((test, index) => (
            <Paper
              key={test._id}
              sx={{
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Typography variant="h6" sx={{ marginBottom: '0.5rem' }}>
                {test.testName}
              </Typography>
              <Stack direction="row" spacing={2}>
                {/* Button to start or view completed test */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartTest(index)}
                  disabled={index > 0 && !tests[index - 1]?.isCompleted}
                >
                  {test.isCompleted ? 'Completed' : 'Start Test'}
                </Button>
                {/* Button to view test results */}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate(`/results/${test._id}`)}
                >
                  View Results
                </Button>
              </Stack>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TestList;