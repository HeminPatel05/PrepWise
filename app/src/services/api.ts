import axios from 'axios';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNum: string;
  password: string;
  confirmPassword: string;
}

export const loginUser = (credentials: LoginCredentials) =>
  axios.post('/api/login', credentials);

export const addUser = (data: RegisterData) =>
  axios.post('/api/register', data);