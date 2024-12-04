import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/api';
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

  const navigate = useNavigate(); // React Router hook for navigation

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const response = await loginUser(credentials);
      alert('Login successful!');
      console.log(response.data);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Invalid email or password.');
    }
  };

  const handleRegisterRedirect = (): void => {
    navigate('/register'); // Navigate to Register page
  };

  return (
    <div className="login-container">
      <Box component="form" onSubmit={handleSubmit} className="login-form">
        <Typography variant="h4">Login</Typography>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <Button type="submit" className="MuiButton-root" fullWidth>
          Login
        </Button>

        {/* Register Link */}
        <Typography variant="body2" className="register-link">
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