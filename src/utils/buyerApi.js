// utils/buyerApi.js

// utils/buyerApi.js

const BASE_URL = 'http://localhost:5000/api/buyer';
export const handleResponse = (response) => {
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
const createBuyerHeaders = (isFormData = false) => {
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
 * Get all active auctions
 * @returns {Promise<Object>} The response from the server
 */
export const getAllActiveAuctions = async () => {
  const response = await fetch(`${BASE_URL}/auctions/active`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Get upcoming auctions
 * @returns {Promise<Object>} The response from the server
 */
export const getUpcomingAuctions = async () => {
  const response = await fetch(`${BASE_URL}/auctions/upcoming`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Get single auction details
 * @param {string} auctionId - The ID of the auction
 * @returns {Promise<Object>} The response from the server
 */
export const getSingleAuctionDetails = async (auctionId) => {
  const response = await fetch(`${BASE_URL}/auctions/${auctionId}`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Place a bid on an auction
 * @param {string} auctionId - The ID of the auction
 * @param {number} amount - The bid amount
 * @returns {Promise<Object>} The response from the server
 */
export const placeBid = async (auctionId, amount) => {
  const response = await fetch(`${BASE_URL}/auctions/${auctionId}/bid`, {
    method: 'PUT',
    headers: createBuyerHeaders(),
    body: JSON.stringify({ amount }),
  });
  return handleResponse(response);
};

/**
 * Get won auctions
 * @returns {Promise<Object>} The response from the server
 */
export const getWonAuctions = async () => {
  const response = await fetch(`${BASE_URL}/auctions/won`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Get all properties
 * @returns {Promise<Object>} The response from the server
 */
export const getAllProperties = async () => {
  const response = await fetch(`${BASE_URL}/properties`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Search properties
 * @param {string} keyword - The search keyword
 * @returns {Promise<Object>} The response from the server
 */
export const searchProperties = async (keyword) => {
  const response = await fetch(`${BASE_URL}/properties/search?keyword=${encodeURIComponent(keyword)}`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Filter properties
 * @param {Object} filters - The filter criteria
 * @returns {Promise<Object>} The response from the server
 */
export const filterProperties = async (filters) => {
  const queryParams = new URLSearchParams(filters);
  const response = await fetch(`${BASE_URL}/properties/filter?${queryParams.toString()}`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Get all bids
 * @returns {Promise<Object>} The response from the server
 */
export const getAllBids = async () => {
  const response = await fetch(`${BASE_URL}/bids`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Get a specific bid by ID
 * @param {string} bidId - The ID of the bid
 * @returns {Promise<Object>} The response from the server
 */
export const getBidById = async (bidId) => {
  const response = await fetch(`${BASE_URL}/bids/${bidId}`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Update a bid
 * @param {string} bidId - The ID of the bid to update
 * @param {number} amount - The new bid amount
 * @returns {Promise<Object>} The response from the server
 */
export const updateBid = async (bidId, amount) => {
  const response = await fetch(`${BASE_URL}/bids/${bidId}`, {
    method: 'PUT',
    headers: createBuyerHeaders(),
    body: JSON.stringify({ amount }),
  });
  return handleResponse(response);
};

/**
 * Delete a bid
 * @param {string} bidId - The ID of the bid to delete
 * @returns {Promise<Object>} The response from the server
 */
export const deleteBid = async (bidId) => {
  const response = await fetch(`${BASE_URL}/bids/${bidId}`, {
    method: 'DELETE',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};

/**
 * Get buyer's bid history
 * @returns {Promise<Object>} The response from the server
 */
export const getBidHistory = async () => {
  const response = await fetch(`${BASE_URL}/buyerbidhistory`, {
    method: 'GET',
    headers: createBuyerHeaders(),
  });
  return handleResponse(response);
};