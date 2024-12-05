import React from 'react';
import { useNavigate } from 'react-router-dom';

const StartTestButton: React.FC<{ testId: number }> = ({ testId }) => {
  const navigate = useNavigate();

  // Function to handle the click event when the "Start Test" button is clicked
  const handleStartTest = () => {
    // Navigate to the test page with the specific testId
    navigate(`/test/${testId}`);
  };

  return (
    <button onClick={handleStartTest}>Start Test</button>
  );
};

export default StartTestButton;