import { userAPI } from '../../../config/service/axios';

export const fetchAlbumDetails = async (albumId) => {
  try {
    // Fetch the album data
    const album = await userAPI(`albums/${albumId}`);
    
    // Fetch the user data for this album
    const user = await userAPI(`users/${album.userId}`);
    
    return { album, user };
  } catch (error) {
    console.error(`Error fetching album details for ID ${albumId}:`, error);
    throw error;
  }
};

export const fetchAlbumPhotos = async (albumId) => {
  try {
    const photos = await userAPI(`photos?albumId=${albumId}`);
    return photos;
  } catch (error) {
    console.error(`Error fetching photos for album ID ${albumId}:`, error);
    throw error;
  }
};