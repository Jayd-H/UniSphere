import axiosInstance from './axiosConfig';

export const loginUser = async (userName: string, password: string) => {
  try {
    const response = await axiosInstance.post('/api/auth/login', {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  userName: string,
  password: string,
  displayName: string
) => {
  try {
    const response = await axiosInstance.post('/api/auth/register', {
      userName,
      password,
      displayName,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};