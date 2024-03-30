import apiClient from './apiClient';
import { Reply } from '../types/Reply';

export const getPostReplies = async (postId: number): Promise<Reply[]> => {
  try {
    const response = await apiClient.get(`/posts/${postId}/replies`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch post replies');
  }
};