import axiosInstance from './axiosConfig';

export const fetchUserData = async (token: string) => {
  try {
    const response = await axiosInstance.get('/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.success && response.data.user) {
      return response.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch user data');
    }
  } catch (error) {
    throw error;
  }
};

export const fetchUserDisplayName = async (userId: number) => {
  try {
    const response = await axiosInstance.get(`/api/users/${userId}/displayName`);
    return response.data.displayName;
  } catch (error) {
    throw error;
  }
};