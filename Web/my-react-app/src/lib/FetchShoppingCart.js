import React from 'react';
import axios from 'axios';


const FetchShoppingCart = async (data) => {
    try {
      console.log(data);
      const response = await axios.get('http://localhost:3001/CustomerRoute/getShoppingCart', {
        params: { data },
        withCredentials: true
      });
      const results = await response.data;
      return results;
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
      return;
    }
}

export default FetchShoppingCart;
