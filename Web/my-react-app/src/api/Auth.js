// src/api/Auth.js
import React, { createContext, useState, useEffect } from 'react';


import authServices from './services/authServices';
import localUtils from './utils/localUtils';
import { errorHandler } from './utils/errorHandler';
import api from './config/apiConfig';


const Auth = createContext();
const { loginValidate, adminLoginValidate } = authServices;
const { setLocal, removeLocal } = localUtils;

/** 
 * AuthProvider - Context Provider for authentication
 * @param {element} children
 */
const AuthProvider = ({ children }) => {
	
	//State Managements
	const [isLogIn, setLogIn] = useState(false);	
	const [user, setUser] = useState(null);
	const [role, setRole] = useState('role');
	const [error, setError] = useState(null);
	
	
	
	//Update fetching process based on changes of ?
	useEffect(() => {
	  const token = getToken();
	  
	  try {
	    if (token) {
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
		setLocal('username', decodedUser.username);
		setLogIn(true);
		setUser(decodedUser.username);
		setRole(decodedUser.role);
	};
	
	const logout = () => {
		clearToken();
		removeLocal('username');
		setUser('guest');
		setLogIn(false);
		setError(null);
	};
	
	
	const guestLogin = async () => {
		try {
			const response = await api.get('/products'); // This triggers the middleware
			const token = response.headers.get('Authorization')?.replace('Bearer ', '');
			logout();
			saveData(decodedGuest);
		} catch (error) {
			console.error('Guest login error:', error);
			setError('Failed to create guest session');
		}
	};
	
	
	
	const userLogin = async (email, pw) => {
		try {
			const data = await loginValidate(email, pw);
			
			//User log in successfully
			logout(); //Clear all current data
			saveData(data);
	
		} catch (error) {
			logout(); //Clear all current data
			setError(errorHandler(error));
			console.error('User login error:', error);
		}
	};
	
	
	
	const adminLogin = async (accountName, pw) => {
		try {
			const response = await adminLoginValidate(accountName, pw);
			const adminname = response.data;
			
			logout();
			saveData(adminname);
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