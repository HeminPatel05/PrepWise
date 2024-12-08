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
  CircularProgress,
  Grid,
  Avatar,
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

const TestMainPage: React.FC = () => {
  const initialTests: Test[] = [
    { id: 1, name: 'Test 1', completed: false },
    { id: 2, name: 'Test 2', completed: false },
    { id: 3, name: 'Test 3', completed: false },
  ];

  const [tests, setTests] = useState<Test[]>([]);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const currentTestIndex = useSelector(
    (state: RootState) => state.test?.currentTestIndex ?? 0
  ); // Safeguard against undefined state
  const navigate = useNavigate();

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

    // Initialize Redux state if saved in localStorage
    const savedIndex = localStorage.getItem('currentTestIndex');
    if (savedIndex) {
      dispatch(setCurrentTestIndex(parseInt(savedIndex, 10)));
    }
  }, [dispatch]);

  const saveTestsToLocalStorage = (updatedTests: Test[]) => {
    localStorage.setItem('tests', JSON.stringify(updatedTests));
    setTests(updatedTests);
  };

  const handleTestStart = (testId: number) => {
    if (testId < 1 || testId > tests.length) {
      setError('Invalid test ID.');
      return;
    }

    if (testId > 1 && !tests[testId - 2].completed) {
      setError(`Please complete ${tests[testId - 2].name} before starting this test.`);
      return;
    }

    const testIndex = testId - 1;
    dispatch(setCurrentTestIndex(testIndex));
    localStorage.setItem('currentTestIndex', testIndex.toString());

    const updatedTests = tests.map((test) =>
      test.id === testId ? { ...test, inProgress: true } : test
    );
    saveTestsToLocalStorage(updatedTests);

    setTimeout(() => {
      const completedTests = updatedTests.map((test) =>
        test.id === testId ? { ...test, completed: true, inProgress: false } : test
      );
      saveTestsToLocalStorage(completedTests);

      navigate(`/test/instruction/${testId}`);
    }, 1000);
  };

  const handleViewResults = (testId: number) => {
    navigate(`/test/results/${testId}`);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 4 }}>
        Your Tests
      </Typography>
      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      <Grid container spacing={3}>
        {tests.map((test) => (
          <Grid item xs={12} key={test.id}>
            <Card
              sx={{
                borderRadius: 2,
                p: 2,
                backgroundColor: test.completed
                  ? '#e8f5e9'
                  : test.inProgress
                  ? '#fff8e1'
                  : '#ffebee',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    backgroundColor: test.completed
                      ? '#4caf50'
                      : test.inProgress
                      ? '#ff9800'
                      : '#f44336',
                    mr: 2,
                  }}
                >
                  {test.completed ? (
                    <CheckCircleOutlineIcon />
                  ) : test.inProgress ? (
                    <AccessTimeIcon />
                  ) : (
                    <ErrorOutlineIcon />
                  )}
                </Avatar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  {test.name}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <Box>
                  <Typography
                    variant="body2"
                    sx={{ color: test.completed ? 'green' : 'text.secondary' }}
                  >
                    {test.completed
                      ? 'Completed'
                      : test.inProgress
                      ? 'In Progress'
                      : 'Not Started'}
                  </Typography>
                </Box>
                <CircularProgress
                  variant="determinate"
                  value={test.completed ? 100 : test.inProgress ? 50 : 0}
                  size={40}
                  sx={{
                    color: test.completed ? '#4caf50' : test.inProgress ? '#ff9800' : '#f44336',
                  }}
                />
              </Box>
              <CardActions sx={{ justifyContent: 'space-between', mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleTestStart(test.id)}
                  disabled={test.inProgress}
                  sx={{
                    backgroundColor: test.completed ? '#4caf50' : undefined,
                    '&:hover': { backgroundColor: test.completed ? '#45a049' : undefined },
                  }}
                >
                  {test.completed ? 'Retake Test' : 'Start Test'}
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleViewResults(test.id)}
                  sx={{ textTransform: 'none' }}
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
