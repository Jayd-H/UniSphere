import axiosInstance from './axiosConfig';

export const fetchEventPosts = async (societyIds: number[]) => {
  try {
    const response = await axiosInstance.get('/api/events-posts', {
      params: {
        societyIds: societyIds.join(','),
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeEventPost = async (eventPostId: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/events-posts/${eventPostId}/like`,
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

export const unlikeEventPost = async (eventPostId: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/events-posts/${eventPostId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEventPostLikes = async (eventPostId: number) => {
  try {
    const response = await axiosInstance.get(`/api/events-posts/${eventPostId}/likes`);
    return response.data.likes;
  } catch (error) {
    throw error;
  }
};