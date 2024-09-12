import axios from 'axios';

const FetchUser = async () => {
	try {
			const response = await axios.get('http://localhost:3001/CustomerRoute/user', {
				withCredentials: true
			});
			const results = response.data;
			console.log("The user get is:", results);
			const fetchedUser = results; 
			return fetchedUser;
		} catch (error) {
			console.error('Error fetching user ID:', error);
			return false;
		}
};

export default FetchUser;