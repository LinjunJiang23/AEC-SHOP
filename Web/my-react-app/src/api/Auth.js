// src/api/Auth.js
import React, { createContext, useState, useEffect } from 'react';


import { loginValidate, adminLoginValidate } from './services/authServices';
import { clearToken, saveToken, getToken, decodeToken } from './utils/tokenUtils';
import { errorHandler } from './utils/errorHandler';
import api from './config/apiConfig';


const Auth = createContext();

/** 
 * AuthProvider - Context Provider for authentication
 * @param {element} children
 */
const AuthProvider = ({ children }) => {
	
	//State Managements
	const [isLogIn, setLogIn] = useState(false);	
	const [user, setUser] = useState(null);
	const [role, setRole] = useState(null);
	const [error, setError] = useState(null);
	
	
	
	//Update fetching process based on changes of ?
	useEffect(() => {
	  const token = getToken();
	  
	  try {
	    if (token) {
	      const decodedUser = decodeToken(token);
		  setRole(decodedUser.role);
		  setLogIn(true);
		  setUser(decodedUser);
	    } else {
		  guestLogin();
	    }
	  } catch (error) {
		console.error(error);
		logout();
		setError(errorHandler(error));
	  }
	  
	}, []);
	
	const saveData = (decodedUser) => {
		localStorage.setItem('user', decodedUser);
		setLogIn(true);
		setUser(decodedUser.user);
		setRole(decodedUser.role);
	};
	
	const logout = () => {
		clearToken();
		localStorage.removeItem('user');
		setUser(null);
		setLogIn(false);
		setError(null);
	};
	
	
	const guestLogin = async () => {
		try {
			const response = await api.get('/products'); // This triggers the middleware
			const token = response.headers.get('Authorization')?.replace('Bearer ', '');
			logout();
			saveToken(token);
			console.log('Token:', token);
			const decodedGuest = await decodeToken(token);
			saveData(decodedGuest);
		} catch (error) {
			console.error('Guest login error:', error);
			setError('Failed to create guest session');
		}
	};
	
	
	
	const userLogin = async (accountName, pw) => {
		try {
			const response = await loginValidate(accountName, pw);
			const userData = response.data;
			
			//User log in successfully
			logout(); //Clear all current data
			saveToken(userData);
			const decodedUser = await decodeToken(userData);
			saveData(decodedUser);
	
			return response; //This should be the account name of current user
		} catch (error) {
			logout(); //Clear all current data
			setError(errorHandler(error));
			console.error('User login error:', error);
		}
	};
	
	
	
	const adminLogin = async (accountName, pw) => {
		try {
			const response = await adminLoginValidate(accountName, pw);
			const adminData = response.data;
			
			logout();
			saveToken(adminData);
			const decodedAdmin = await decodeToken(adminData);
			saveData(decodedAdmin);
			return response;
		} catch (error) {
			logout();
			setError(errorHandler(error));
			console.error('Admin login error: ', error);
		}
	};
	
	
	const contextValue = { 
		user, isLogIn, 
		guestLogin, userLogin, adminLogin,
		error, logout, role 
	};
	
	
	
	return (
	  <Auth.Provider value={contextValue}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };