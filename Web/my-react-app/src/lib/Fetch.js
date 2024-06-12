import React from 'react';

const Fetch = async (option, userId) => {
  if (option === "product") {
    try {
      const response = await fetch('http://localhost:3001/CustomerRoute/productGeneral', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }
      const data = await response.json();
      console.log('Parsed JSON data:', data);
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  } else if (option === "shoppingcart") {
    try {
      console.log(userId);
      const response = await fetch('http://localhost:3001/CustomerRoute/getShoppingCart', {
        method: 'GET',
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch shopping cart items');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching shopping cart:', error);
      return [];
    }
  } else if (option === "userid") {
	  try {
			const response = await fetch('http://localhost:3001/CustomerRoute/user',{
				method: 'GET',
				credentials: 'include'
			});
			if (!response.ok) {
				return false;
			}
			const data = await response.json();
			console.log("The user id get is:", data);
			const fetchedUserId = data.UserId; // Access UserId from the response JSON
			console.log(fetchedUserId); // Log the user ID
			return fetchedUserId;
		} catch (error) {
			console.error('Error fetching user ID:', error);
			return false;
		}            
  } else if (option === "carttotal") {
	  try {
			const response = await fetch('http://localhost:3001/CustomerRoute/carttotal',{
				method: 'GET',
				credentials: 'include'
			});
			if (!response.ok) {
				return false;
			}
			const data = await response.json();
			console.log("The cart total get is:", data);
			return data;
	  } catch (error) {
			console.error('Error fetching cart total');
			return false;
	  }
  }
}

export default Fetch;
