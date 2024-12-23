import User from '../models/user.js';

export const getAllUsers = async () => {
  return await User.find();
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const createUser = async (userData) => {
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the user's password before saving it
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  userData.password = hashedPassword;

  const user = new User(userData);
  return await user.save();
};

export const updateUser = async (id, userData) => {
  return await User.findByIdAndUpdate(id, userData, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};