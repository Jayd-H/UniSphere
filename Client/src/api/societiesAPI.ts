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

export const fetchRecommendedSocieties = async (userId: number, token: string) => {
  try {
    const response = await axiosInstance.get('/api/societies/recommended', {
      params: {
        userId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSocietyPosts = async (societyId: number, token: string) => {
  try {
    const response = await axiosInstance.get(`/api/societies/${societyId}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const joinSociety = async (societyId: number, userId: number, token: string) => {
  try {
    const response = await axiosInstance.post(`/api/societies/${societyId}/join`, { userId }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const leaveSociety = async (societyId: number, userId: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/societies/${societyId}/leave`, {
      data: { userId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchSocietyMemberCount = async (societyId: number) => {
  try {
    const response = await axiosInstance.get(`/api/societies/${societyId}/members/count`);
    return response.data.count;
  } catch (error) {
    throw error;
  }
};