import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Assuming the API is running on this port

export const getProducts = async (category, company) => {
    try {
        const response = await axios.get(`${API_URL}/products?category=${category}&company=${company}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};
