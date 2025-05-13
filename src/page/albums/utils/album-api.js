import { userAPI } from '../../../config/service/axios';

export const fetchAlbums = async () => {
  try {
    const albums = await userAPI('albums');
    
    const users = await userAPI('users');
    
    const usersMap = {};
    users.forEach(user => {
      usersMap[user.id] = user;
    });
    
    return { albums, users: usersMap };
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw error;
  }
};