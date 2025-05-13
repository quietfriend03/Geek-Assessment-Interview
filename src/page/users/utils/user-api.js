import { userAPI } from "../../../config/service/axios";

export const fetchUsers = async () => {
  try {
    const data = await userAPI('users');
    return data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};