import apiClient from './apiClient';
import { User } from '../types/User';
import { Society } from '../types/Society';

export const getUserProfile = async (token: string): Promise<User> => {
  try {
    const response = await apiClient.get('/api/user/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile');
  }
};

export const getUserSocieties = async (userId: number): Promise<Society[]> => {
  try {
    const response = await apiClient.get(`/users/${userId}/societies`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user societies');
  }
};

export const joinSociety = async (userId: number, societyId: number): Promise<void> => {
  try {
    await apiClient.post(`/users/${userId}/societies/${societyId}`);
  } catch (error) {
    throw new Error('Failed to join society');
  }
};

export const leaveSociety = async (userId: number, societyId: number): Promise<void> => {
  try {
    await apiClient.delete(`/users/${userId}/societies/${societyId}`);
  } catch (error) {
    throw new Error('Failed to leave society');
  }
};