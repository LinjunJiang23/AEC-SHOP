import React from 'react';
import axios from 'axios';

const FetchUser = async () => {
	try {
			const response = await axios.get('http://localhost:3001/CustomerRoute/user',{
				withCredentials: true
			});
			const results = response.data;
			console.log("The user id get is:", results);
			const fetchedUserId = results.UserId; // Access UserId from the response JSON
			console.log(fetchedUserId); // Log the user ID
			return fetchedUserId;
		} catch (error) {
			console.error('Error fetching user ID:', error);
			return false;
		}
};

export default FetchUser;