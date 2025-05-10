import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:8000/api';

// Fetch all mechanic shops
export const fetchShops = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shops`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shops:', error);
    throw error;
  }
};

// Fetch detailed information for a specific shop
export const getShopDetails = async (shopId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shops/${shopId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching shop ${shopId} details:`, error);
    throw error;
  }
};

// Fetch tutorials and troubleshooting guides
export const fetchTutorials = async (query = '', category = '') => {
  try {
    const params = {};
    if (query) params.query = query;
    if (category) params.category = category;
    
    const response = await axios.get(`${API_BASE_URL}/tutorials`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching tutorials:', error);
    throw error;
  }
};

// Search for tutorials with a specific query
export const searchTutorials = async (query) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/tutorials/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching tutorials:', error);
    throw error;
  }
};

// Fetch shops for comparison
export const fetchShopsForComparison = async (shopIds = []) => {
  try {
    const params = { ids: shopIds.join(',') };
    const response = await axios.get(`${API_BASE_URL}/shops/compare`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching comparison data:', error);
    throw error;
  }
};

// Add a shop to user's comparison list
export const addShopToComparison = async (shopId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comparison/add`, { shopId });
    return response.data;
  } catch (error) {
    console.error('Error adding shop to comparison:', error);
    throw error;
  }
};

// Remove a shop from user's comparison list
export const removeShopFromComparison = async (shopId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comparison/remove`, { shopId });
    return response.data;
  } catch (error) {
    console.error('Error removing shop from comparison:', error);
    throw error;
  }
};
export const commonServices = [
  'Oil Change',
  'Brake Repair',
  'Tire Replacement',
  'Engine Repair',
  'Transmission',
  'Battery Service',
  'A/C Service',
  'Diagnostics',
];
