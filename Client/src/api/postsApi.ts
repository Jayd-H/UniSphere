import apiClient from './apiClient';
import { Post } from '../types/Post';

export const getUserPosts = async (userId: number): Promise<Post[]> => {
  try {
    const response = await apiClient.get(`/users/${userId}/posts`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user posts');
  }
};

export const createPost = async (content: string, societyId: number, token: string): Promise<Post> => {
  try {
    const response = await apiClient.post(
      '/api/posts',
      { content, societyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};