import axiosInstance from './axiosConfig';

export const fetchUserDetails = async (token: string) => {
  try {
    const response = await axiosInstance.get('/api/settings/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const changeUsername = async (newUsername: string, password: string, token: string) => {
  try {
    const response = await axiosInstance.put(
      '/api/settings/username',
      { newUsername, password },
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

export const changeDisplayName = async (newDisplayName: string, password: string, token: string) => {
  try {
    const response = await axiosInstance.put(
      '/api/settings/displayname',
      { newDisplayName, password },
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

export const changePassword = async (currentPassword: string, newPassword: string, token: string) => {
  try {
    const response = await axiosInstance.put(
      '/api/settings/password',
      { currentPassword, newPassword },
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

export const deleteAccount = async (password: string, token: string) => {
  try {
    const response = await axiosInstance.delete('/api/settings/account', {
      data: { password },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};