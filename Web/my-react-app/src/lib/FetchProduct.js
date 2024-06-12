import React from 'react';
import axios from 'axios';

const FetchProduct = async (page, limit) => {
	try {
      const response = await axios.get('http://localhost:3001/CustomerRoute/productGeneral', {
        params: { page, limit },
        withCredentials: true
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
	  const results = response.data;
      console.log('Parsed JSON data:', results);
      return results;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
}

export default FetchProduct;