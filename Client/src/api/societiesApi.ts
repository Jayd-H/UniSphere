import apiClient from './apiClient';
import { User } from '../types/User';

export const getSocietyMembers = async (societyId: number): Promise<User[]> => {
  try {
    const response = await apiClient.get(`/societies/${societyId}/members`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch society members');
  }
};
