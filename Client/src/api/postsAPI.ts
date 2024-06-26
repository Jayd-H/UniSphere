import axiosInstance from './axiosConfig';

export const createPost = async (content: string, societyId: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      '/api/posts',
      {
        content,
        societyId,
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

export const fetchPosts = async (societyIds: number[], token: string, page: number) => {
  try {
    const response = await axiosInstance.get('/api/posts', {
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

export const likePost = async (postId: number, token: string) => {
  try {
    const response = await axiosInstance.post(
      `/api/posts/${postId}/like`,
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

export const unlikePost = async (postId: number, token: string) => {
  try {
    const response = await axiosInstance.delete(`/api/posts/${postId}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};