import React, { useState, useEffect } from 'react';
import { Button, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Define type for a test
interface Test {
  _id: string; 
  testName: string; 
}

const TestList: React.FC = () => {
  const navigate = useNavigate();

  // State variables for tests, loading status, and errors
  const [tests, setTests] = useState<Test[]>([]); // State to store the list of tests
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status
  const [error, setError] = useState<string | null>(null); // State to store any errors

  useEffect(() => {
    // Fetch tests from the backend when the component mounts
    const fetchTests = async () => {
      try {
        const response = await fetch('http://localhost:3000/test'); // API call to fetch the tests
        if (!response.ok) throw new Error('Failed to fetch tests'); // Throw error if the response is not ok
        const data = await response.json(); // Parse the response data
        setTests(data); // Set the fetched data to the state
      } catch (err: any) {
        setError(err.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Set loading state to false after fetching is done
      }
    };

    fetchTests(); // Invoke the function to fetch tests
  }, []); // Empty dependency array means this will run only once when the component mounts

  const handleStartTest = (testId: string) => {
    // Navigate to the specific test page using the test's ObjectId
    navigate(`/test/${testId}`);
  };

  if (loading) return <Typography>Loading tests...</Typography>; // Show loading message while fetching
  if (error) return <Typography color="error">Error: {error}</Typography>; // Show error message if fetching fails

  return (
    <Box sx={{ padding: '2rem' }}>
      <Typography variant="h4" gutterBottom>
        Available Tests
      </Typography>
      <Box>
        {/* Map through the tests and render them */}
        {tests.map((test) => (
          <Paper key={test._id} sx={{ marginBottom: '1rem', padding: '1rem' }}>
            <Typography variant="h6">{test.testName}</Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '0.5rem' }}
              onClick={() => handleStartTest(test._id)} // On click, navigate to the test page
            >
              Start Test
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default TestList;