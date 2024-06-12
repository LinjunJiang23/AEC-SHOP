import React, { createContext, useState } from 'react';

// function
import Fetch from './Fetch';

const Auth = createContext();

const AuthProvider = ({ children }) => {
	const [authenticated, setAuthenticated] = useState(false);
	const [adminauth, setAdminAuth] = useState(false);
	const [User, setUser] = useState();
	const [Admin, setAdmin] = useState();
	
	// Functions
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
				setUser();
				setAuthenticated(false);
				throw new Error('Invalid password or account name.');
			} else {
				const data = await response.json();
				setAuthenticated(true);
				setUser(data[0]);
			}
			// Store JWT token in local storage
		} catch (error) {
			setUser();
			setAuthenticated(false);
			console.error(error);
			throw new Error('Login failed');
		}
	};
	
	const logout = () => {
		setUser();
		setAuthenticated(false);
	};
	
	const adminlogin = async (accountName, pw) => {
		try {
			console.log(accountName);
			console.log(pw);
			const response = await fetch('http://localhost:3001/SellerRoute/loginVal', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ accountName, pw }),
				credentials: 'include'
			});
			const data = await response.json();
			if (!response.ok) {
				setAdmin();
				setAdminAuth(false);
				throw new Error("Invalid password or account name.");
			} else {
				setAdmin(data);
				setAdminAuth(true);
			}
		} catch (err) {
			setAdmin();
			setAdminAuth(false);
			console.error(err);
			throw new Error("Login failed");
		}
	};
	
	const adminlogout = () => {
		setAdmin();
		setAdminAuth(false);
	};
	
	const getUserId = async () => {
		const userId = await Fetch("userid");   
		return userId;
	};
   
	const getAdminId = async () => {
	   const adminId = await Fetch("adminid");
	   return adminId;
	};
	
	return (
	  <Auth.Provider value={{ authenticated, adminauth, User, Admin, login, logout, adminlogin, adminlogout, getUserId, getAdminId }}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };