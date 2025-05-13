import axios from 'axios';

const API_ROUTE = "https://jsonplaceholder.typicode.com/"

export const userAPI = async (endpoint = '') => {
    const apiRoute = API_ROUTE + endpoint;
    try {
        const response = await axios.get(apiRoute);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

