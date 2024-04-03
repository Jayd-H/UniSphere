import axiosInstance from './axiosConfig';

export const createEventsPost = async (
  content: string,
  societyId: number,
  eventType: string,
  eventLocation: string,
  eventTime: string,
  token: string,
  timestamp: string
) => {
  try {
    const response = await axiosInstance.post(
      '/api/eventsPosts',
      {
        content,
        societyId,
        eventType,
        eventLocation,
        eventTime,
        timestamp,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEventPosts = async (societyIds: number[], token: string, page: number) => {
  try {
    const response = await axiosInstance.get('/api/eventsPosts', {
      params: {
        societyIds: societyIds.join(','),
        page,
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

export const likeEventPost = async (postId: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/eventsPosts/${postId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeEventPost = async (postId: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/eventsPosts/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};