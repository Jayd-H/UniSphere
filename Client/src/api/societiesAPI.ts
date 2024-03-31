import axiosInstance from './axiosConfig';

export const fetchAllSocieties = async () => {
  try {
    const response = await axiosInstance.get('/api/societies/all');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSocietiesByIds = async (societyIds: number[]) => {
  try {
    const response = await axiosInstance.get('/api/societies', {
      params: {
        ids: societyIds.join(','),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};