import React, { useState, ChangeEvent, FormEvent } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { addUser } from '../../services/api';
import './Register.css';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNum: string;
  password: string;
  confirmPassword: string;
}

interface ValidationErrors {
  email?: string;
  mobileNum?: string;
  password?: string;
  confirmPassword?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobileNum: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (mobileNum: string): boolean => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobileNum);
  };

  const validatePassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear specific error when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Reset errors
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Mobile number validation
    if (!validateMobileNumber(formData.mobileNum)) {
      newErrors.mobileNum = 'Mobile number must be 10 digits';
    }

    // Password matching validation
    if (!validatePassword(formData.password, formData.confirmPassword)) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Password strength validation (optional but recommended)
    if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // If there are any errors, set them and prevent submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await addUser(formData);
      alert('User registered successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <Box component="form" onSubmit={handleSubmit} className="register-form">
        <Typography variant="h4">Register</Typography>
        <TextField
          label="First Name"
          name="firstName"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <TextField
          label="Mobile Number"
          name="mobileNum"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!errors.mobileNum}
          helperText={errors.mobileNum}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!errors.password}
          helperText={errors.password}
          required
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          required
        />
        <Button type="submit" className="MuiButton-root" fullWidth>
          Register
        </Button>
      </Box>
    </div>
  );
};

export default Register;