import axios from 'axios';

const API_1 = "https://jsonplaceholder.typicode.com/"
const API_2 = "https://ui-avatars.com/api/"

export const albumAPI = async (endpoint = '', body = {}) => {
    const apiRoute = API_1 + endpoint;
    try {
        const response = await axios.post(apiRoute, body);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const userAPI = async (endpoint = '', body = {}) => {
    const apiRoute = API_2 + endpoint;
    try {
        const response = await axios.post(apiRoute, body);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}