import axiosInstance from './axiosConfig';

export const createReply = async (postId: number, content: string, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/posts/${postId}/replies`,
      { content },
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

export const likeReply = async (replyId: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/replies/${replyId}/like`,
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

export const unlikeReply = async (replyId: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/replies/${replyId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
