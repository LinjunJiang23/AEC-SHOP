import React, { createContext, useState } from 'react';

const Auth = createContext();

const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [UserId, setUserId] = useState();
	
	// Log in function for login validation
	const login = async (accountName, pw) => {
		// Fetch user data to determine whether logged in or not
		try {
			const response = await fetch('http://localhost:3001/CustomerRoute/loginValidate', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ accountName, pw }),
				credentials: 'include'
			});
			if (!response.ok) {
				setAuthenticated(false);
				throw new Error('Login failed');
			}
			else
			{
				setAuthenticated(true);
			}
			// Store JWT token in local storage
		} catch (error) {
			setAuthenticated(false);
			console.error(error);
		}
	};
	
	// Log out function
	const logout = () => {
		setAuthenticated(false);
	};
	
	
	const getUserId = async () => {
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
        setUserId(fetchedUserId); // Update the state with the fetched user ID
        return fetchedUserId;
    } catch (error) {
        console.error('Error fetching user ID:', error);
        return false;
    }            
};
   

	return (
	  <Auth.Provider value={{ authenticated, login, logout, getUserId }}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };