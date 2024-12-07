import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  Alert,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentTestIndex } from './redux/testSlice';
import { RootState } from './redux/store';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Test {
  id: number;
  name: string;
  completed: boolean;
  inProgress?: boolean;
}

// Main component for the Home Page
const TestMainPage: React.FC = () => {
  // Initial test data
  const initialTests: Test[] = [
    { id: 1, name: 'Test 1', completed: false },
    { id: 2, name: 'Test 2', completed: false },
    { id: 3, name: 'Test 3', completed: false },
  ];

  const [tests, setTests] = useState<Test[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const currentTestIndex = useSelector((state: RootState) => state.test.currentTestIndex);
  const navigate = useNavigate();

  // Effect to load tests from localStorage or use initial tests
  useEffect(() => {
    const savedTests = localStorage.getItem('tests');
    if (savedTests) {
      try {
        const parsedTests = JSON.parse(savedTests);
        if (Array.isArray(parsedTests) && parsedTests[0]?.id) {
          setTests(parsedTests);
        } else {
          throw new Error();
        }
      } catch {
        setTests(initialTests);
      }
    } else {
      setTests(initialTests);
    }
  }, []);

  // Function to save tests to localStorage
  const saveTestsToLocalStorage = (updatedTests: Test[]) => {
    localStorage.setItem('tests', JSON.stringify(updatedTests));
    setTests(updatedTests);
  };

  // Function to handle starting a test
  const handleTestStart = (testId: number) => {
    if (testId < 1 || testId > tests.length) {
      setError('Invalid test ID.');
      return;
    }

    // Check if previous test is completed
    if (testId > 1 && !tests[testId - 2].completed) {
      setError(`Please complete ${tests[testId - 2].name} before starting this test.`);
      return;
    }

    const testIndex = testId - 1;
    dispatch(setCurrentTestIndex(testIndex));

    // Update test status to in progress
    const updatedTests = tests.map((test) =>
      test.id === testId ? { ...test, inProgress: true } : test
    );
    saveTestsToLocalStorage(updatedTests);

    // Simulate test completion after 1 second
    setTimeout(() => {
      const completedTests = updatedTests.map((test) =>
        test.id === testId ? { ...test, completed: true, inProgress: false } : test
      );
      saveTestsToLocalStorage(completedTests);

      navigate(`/test/instruction/${testId}`);
    }, 1000);
  };

  // Function to handle viewing test results
  const handleViewResults = (testId: number) => {
    navigate(`/test/results/${testId}`);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: 'bold', color: 'primary.main', mb: 4 }}
      >
        Test Dashboard
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={4}>
        {tests.map((test) => (
          <Grid item xs={12} sm={6} key={test.id}>
            <Card
              elevation={3}
              sx={{
                borderRadius: '16px',
                transition: 'transform .3s ease-in-out',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0px 8px 20px rgba(0,0,0,0.15)' },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: test.completed ? 'green' : 'text.primary' }}
                >
                  {test.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={1} mb={2}>
                  {/* Display test status icon and text */}
                  {test.completed ? (
                    <>
                      <CheckCircleOutlineIcon color="success" />
                      <Typography variant="body2" color="text.secondary">
                        Completed
                      </Typography>
                    </>
                  ) : test.inProgress ? (
                    <>
                      <AccessTimeIcon color="warning" />
                      <Typography variant="body2" color="text.secondary">
                        In Progress
                      </Typography>
                    </>
                  ) : (
                    <>
                      <ErrorOutlineIcon color="error" />
                      <Typography variant="body2" color="text.secondary">
                        Not Started
                      </Typography>
                    </>
                  )}
                </Box>
                {/* Progress bar for test completion */}
                <LinearProgress
                  variant="determinate"
                  value={test.completed ? 100 : test.inProgress ? 50 : 0}
                  sx={{
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor:
                        test.completed ? '#4caf50' : test.inProgress ? '#ff9800' : '#f44336',
                    },
                  }}
                />
              </CardContent>
              <CardActions>
                {/* Button to start or retake the test */}
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleTestStart(test.id)}
                  disabled={test.inProgress}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    backgroundColor: test.completed ? '#4caf50' : undefined,
                    '&:hover': { backgroundColor: test.completed ? '#45a049' : undefined },
                  }}
                >
                  {test.completed ? 'Retake Test' : test.inProgress ? 'In Progress' : 'Start Test'}
                </Button>
                {/* Button to view test results */}
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleViewResults(test.id)}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                >
                  View Results
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TestMainPage;