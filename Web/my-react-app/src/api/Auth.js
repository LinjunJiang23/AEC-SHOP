// src/api/Auth.js
import React, { createContext, useState, useEffect } from 'react';

import { createGuest } from './utils/guestUtils';
import { loginValidate, adminLoginValidate } from './services/authServices';
import { setLocal, removeLocal } from './utils/localUtils';
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
	const [role, setRole] = useState('');
	const [error, setError] = useState(null);
	
	
	
	//Update fetching process
	useEffect(() => {
	  const initAuth = async () => {
		if (!isLogIn) {
			const guestUser = createGuest();
			setUser(guestUser);
			setRole('guest');
		}	
	  };
	  initAuth();	
	}, []);
	
	const logout = () => {
		removeLocal('username');
		setUser('guest');
		setLogIn(false);
		setError(null);
	};
	
	
	
	const login = async (email, pw) => {
		try {
			const data = await loginValidate(email, pw);
			//User log in successfully
			logout(); //Clear all current data
			setLocal('username', data.username);
			setLogIn(true);
			setUser(data.username);
			setRole(data.role);
		} catch (error) {
			logout(); //Clear all current data
			setError(errorHandler(error));
			console.error('User login error:', error);
		}
	};
	
	
	
	const adminLogin = async (accountName, pw) => {
		try {
			const response = await adminLoginValidate(accountName, pw);
			logout();
			setLocal('username', response.username);
			setLogIn(true);
			setUser(response.username);
			setRole(response.role);
		} catch (error) {
			logout();
			setError(errorHandler(error));
			console.error('Admin login error: ', error);
		}
	};
	
	
	const contextValue = { 
		user, isLogIn, 
		login, adminLogin,
		error, logout, role 
	};
	
	
	
	return (
	  <Auth.Provider value={contextValue}>
		{children}
	  </Auth.Provider>
	);
};

export { Auth, AuthProvider };