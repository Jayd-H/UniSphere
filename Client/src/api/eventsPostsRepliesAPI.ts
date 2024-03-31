import axiosInstance from './axiosConfig';

export const fetchEventPostReplies = async (eventPostId: number) => {
  try {
    const response = await axiosInstance.get(`/api/events-posts/${eventPostId}/replies`);
    return response.data;
  } catch (error) {
    throw error;
  }
};