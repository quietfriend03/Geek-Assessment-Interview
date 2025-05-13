import { userAPI } from '../../../config/service/axios';

export const fetchUserById = async (id) => {
  try {
    const data = await userAPI(`users/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const fetchUserAlbums = async (userId) => {
  try {
    const data = await userAPI(`albums?userId=${userId}`);
    return data;
  } catch (error) {
    console.error(`Error fetching albums for user ID ${userId}:`, error);
    throw error;
  }
};