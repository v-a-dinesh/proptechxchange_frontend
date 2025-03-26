// src/api/propertyApi.js

// Base URL for the backend API
const BASE_URL = 'http://localhost:5000/api/properties';

// Function to handle API errors
const handleResponse = (response) => {
  if (!response.ok) {
    return response.json().then((error) => {
      throw new Error(`${error.message || 'API request failed'} with status ${response.status}`);
    });
  }
  return response.json();
};

// Function to get the authentication token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function to create headers based on the request type
const createHeaders = (isFormData) => {
  const headers = new Headers();
  const token = getAuthToken();
  
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  
  if (!isFormData) {
    headers.append('Content-Type', 'application/json');
  }
  
  return headers;
};

/**
 * Add a new property
 * @param {FormData} propertyData - The property data to be added
 * @returns {Promise<Object>} The response from the server
 */
export const addProperty = async (propertyData) => {
  const isFormData = propertyData instanceof FormData;
  const response = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: createHeaders(isFormData),
    body: isFormData ? propertyData : JSON.stringify(propertyData),
  });
  return handleResponse(response);
};

/**
 * Get all properties for a seller
 * @param {string} sellerId - The ID of the seller
 * @returns {Promise<Object>} The response from the server
 */
export const getSellerProperties = async (sellerId) => {
  const response = await fetch(`${BASE_URL}/getall/${sellerId}`, {
    method: 'GET',
    headers: createHeaders(false),
  });
  return handleResponse(response);
};

/**
 * Get a single property
 * @param {string} propertyId - The ID of the property
 * @returns {Promise<Object>} The response from the server
 */
export const getSingleProperty = async (propertyId) => {
  const response = await fetch(`${BASE_URL}/get/${propertyId}`, {
    method: 'GET',
    headers: createHeaders(false),
  });
  return handleResponse(response);
};

/**
 * Update a property
 * @param {string} propertyId - The ID of the property to update
 * @param {Object|FormData} updatedData - The updated property data
 * @returns {Promise<Object>} The response from the server
 */
export const updateProperty = async (propertyId, updatedData) => {
  const isFormData = updatedData instanceof FormData;
  const response = await fetch(`${BASE_URL}/update/${propertyId}`, {
    method: 'PUT',
    headers: createHeaders(isFormData),
    body: isFormData ? updatedData : JSON.stringify(updatedData),
  });
  return handleResponse(response);
};

/**
 * Delete a property
 * @param {string} propertyId - The ID of the property to delete
 * @returns {Promise<Object>} The response from the server
 */
export const deleteProperty = async (propertyId) => {
  const response = await fetch(`${BASE_URL}/delete/${propertyId}`, {
    method: 'DELETE',
    headers: createHeaders(false),
  });
  return handleResponse(response);
};