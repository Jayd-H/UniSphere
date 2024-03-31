import axiosInstance from './axiosConfig';

export const fetchUserJoinedSocieties = async (userId: number, token: string) => {
  try {
    const response = await axiosInstance.get(`/api/user/${userId}/societies`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.societies;
  } catch (error) {
    throw error;
  }
};