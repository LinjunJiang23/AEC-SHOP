// src/api/Auth.js
import React, { createContext, useState } from 'react';
import { loginValidate, adminLoginValidate } from './services/authServices';

const Auth = createContext();

const AuthProvider = ({ children }) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);
	const [user, setUser] = useState(null);
	const [admin, setAdmin] = useState(null);
	const [error, setError] = useState(null);
	
	// Helper Functions
	const handleError = async (error) => {
		if (error.response) {
			if (error.response.status === 401) {
				return 'Invalid credentials, please try again.';
			}
			return 'Server error, please try again later.';
		} else if (error.request) {
			return 'Network error, please check your connection.';
		}
		return 'An expected error occured';
	};
	
	const userLogin = async (accountName, pw) => {
		try {
			const response = await loginValidate(accountName, pw);
			const userData = response.data;
			setLoggedIn(true);
			setUser(userData[0]);
			setError(null);
			return response;
			// Store JWT token in local storage
			//localStorage.setItem('token', userData.token);
		} catch (error) {
			setError(handleError(error));
			setUser(null);
			setLoggedIn(false);
			console.error('User login error:', error);
		}
	};
	
	const logout = () => {
		setUser(null);
		setLoggedIn(false);
		setError(null);
		setAdminLoggedIn(false);
	};
	
	const adminLogin = async (accountName, pw) => {
		try {
			const response = await adminLoginValidate(accountName, pw);
			const adminData = response.data;
			setAdmin(adminData[0]);
			setAdminLoggedIn(true);
			setError(null);
			return response;
		} catch (error) {
			setError(handleError(error));
			setAdmin(null);
			setAdminLoggedIn(false);
			console.error('Admin login error: ', error);
		}
	};
	
	const contextValue = {isLoggedIn, isAdminLoggedIn, user, admin, userLogin, adminLogin, error };
	
	return (
	  <Auth.Provider value={contextValue}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };