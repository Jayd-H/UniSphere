import apiClient from './apiClient';
import { EventPost } from '../types/EventPost';

export const getEventPosts = async (): Promise<EventPost[]> => {
  try {
    const response = await apiClient.get('/event-posts');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch event posts');
  }
};