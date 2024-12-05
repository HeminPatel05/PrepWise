import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api'; // Ensure the API service is correctly set up
import './Login.css';

interface Credentials {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>(''); // Error message state
  const navigate = useNavigate(); // React Router hook for navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(''); // Reset error state before submission

    try {
      const response = await loginUser(credentials); // Call login API
      const { token } = response.data; // Extract token from API response

      if (token) {
        localStorage.setItem('authToken', token); // Save token for authentication
        alert('Login successful!');
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Unexpected error. Please try again.'); // Handle unexpected cases
      }
    } catch (err: any) {
      // Handle error response
      if (err.response && err.response.status === 400) {
        setError(err.response.data.message || 'Invalid email or password');
      } else {
        setError('Something went wrong. Please try again later.');
      }
      console.error('Login error:', err);
    }
  };

  const handleRegisterRedirect = (): void => {
    navigate('/register'); // Redirect to Register page
  };

  return (
    <div className="login-container">
      <Box component="form" onSubmit={handleSubmit} className="login-form">
        <Typography variant="h4">Login</Typography>

        {/* Error Message */}
        {error && <Typography color="error">{error}</Typography>}

        {/* Email Input */}
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        {/* Password Input */}
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '1rem' }}
        >
          Login
        </Button>

        {/* Register Redirect */}
        <Typography variant="body2" className="register-link" style={{ marginTop: '1rem' }}>
          Not signed in yet?{' '}
          <span onClick={handleRegisterRedirect} className="register-link-text">
            Register here
          </span>
        </Typography>
      </Box>
    </div>
  );
};

export default Login;