import React, { createContext, useState } from 'react';
import axios from 'axios';

// function
import FetchUser from './FetchUser';
import FetchAdmin from './FetchAdmin';

const Auth = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isAdmin, setAdminAuth] = useState(false);
	const [user, setUser] = useState();
	const [admin, setAdmin] = useState();
	
	// Functions
	const login = async (accountName, pw) => {
		{ /* Fetch user data to determine whether logged in or not */ }
		try {
			const response = await axios.post('http://localhost:3001/CustomerRoute/loginValidate',
				{ accountName, pw },
				{
					headers: {
					  'Content-Type': 'application/json'
				    },
					withCredentials: true,
				}
			);
			if (response.status !== 200) {
				setUser(null);
				setLoggedIn(false);
				throw new Error('Invalid password or account name.');
			} else {
				const data = response.data;
				setLoggedIn(true);
				setUser(data[0]);
			}
			// Store JWT token in local storage
		} catch (error) {
			setUser(null);
			setLoggedIn(false);
			console.error(error);
			throw new Error('Login failed');
		}
	};
	
	const logout = () => {
		setUser(null);
		setLoggedIn(false);
		setAdminAuth(false);
	};
	
	const adminlogin = async (accountName, pw) => {
		try {
			const response = await axios.post('http://localhost:3001/SellerRoute/loginVal',
				{ accountName, pw },
				{
				  headers: {
					'Content-Type': 'application/json'
				  },
				  withCredentials: true
				}
			);
			const data = response.data;
			if (response.status !== 200) {
				setAdmin(null);
				setAdminAuth(false);
				throw new Error("Invalid password or account name.");
			} else {
				setAdmin(data);
				setAdminAuth(true);
			}
		} catch (error) {
			setAdmin(null);
			setAdminAuth(false);
			console.error(error);
			throw new Error("Login failed");
		}
	};
	
	const getUser = async () => {
		const user = await FetchUser();   
		return user;
	};
   
    { /*const getAdminId = async () => {
	   const adminId = await FetchAdmin();
	   return adminId;
	}; */ }
	
	return (
	  <Auth.Provider value={{ isLoggedIn, isAdmin, user, admin, login, logout, adminlogin, getUser }}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };