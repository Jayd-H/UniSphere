import axiosInstance from './axiosConfig';

export const fetchAllSocieties = async () => {
  try {
    const response = await axiosInstance.get('/api/societies/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};