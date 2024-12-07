import axios from "axios";

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

export const loginUser = (credentials: LoginCredentials) =>
  axios.post("/api/login", credentials);

export const addUser = (data: RegisterData) =>
  axios.post("/api/register", data);

export const getUser = (data: UserData) =>
  axios.get(`/api/users/${data.user_id}`);

export const upgradeToPremium = (data: UserData) =>
  axios.put(`/api/users/${data.user_id}`, { premiumUser: true });
