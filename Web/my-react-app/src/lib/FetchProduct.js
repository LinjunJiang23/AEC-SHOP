import React from 'react';
import axios from 'axios';

const FetchProduct = async (page, limit) => {
	try {
      const response = await axios.get('http://localhost:3001/CustomerRoute/productGeneral', {
        params: { page, limit },
        withCredentials: true
      });
	  const results = response;
      console.log('Parsed JSON data:', results);
      return results;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
}

export default FetchProduct;