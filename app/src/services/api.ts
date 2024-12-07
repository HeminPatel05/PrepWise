import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3000' });

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

interface UserData {
  user_id: string;
}

export const addUser = async (data: RegisterData) =>
  axios.post('http://localhost:3000/api/register', data);

export const loginUser = (credentials: LoginCredentials) =>
  axios.post('http://localhost:3000/api/login', credentials);

export const getUser = (data: UserData) =>
  axios.get(`/api/users/${data.user_id}`);

export const upgradeToPremium = (data: UserData) =>
  axios.put(`/api/users/${data.user_id}`, { premiumUser: true });