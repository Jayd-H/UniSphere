import axiosInstance from './axiosConfig';

export const createEventsReply = async (postId: number, content: string, token: string) => {
  try {
    const timestamp = new Date().toISOString();
    const response = await axiosInstance.post(
      `/api/eventsPosts/${postId}/replies`,
      { content, timestamp },
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

export const likeEventsReply = async (replyId: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/eventsReplies/${replyId}/like`,
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

export const unlikeEventsReply = async (replyId: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/eventsReplies/${replyId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};