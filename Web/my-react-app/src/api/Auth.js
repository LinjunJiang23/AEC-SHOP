// src/api/Auth.js
import React, { createContext, useState, useEffect } from 'react';

import { createGuest } from './services/guestServices';
import { loginValidate, adminLoginValidate } from './services/authServices';
import { setLocal, removeLocal, getLocal } from './utils/localUtils';
import { errorHandler } from './utils/errorHandler';


const Auth = createContext();

/** 
 * AuthProvider - Context Provider for authentication
 * @param {element} children
 */
const AuthProvider = ({ children }) => {
	//State Management
	const [isLogIn, setLogIn] = useState(false);	
	const [user, setUser] = useState(null);
	const [role, setRole] = useState('');
	const [error, setError] = useState(null);
	
	
	/* Initialize on mount to do the following:
		
	*/
	useEffect(() => {
	  const initAuth = async () => {
		const storedUser = getLocal('username');
		
		if (storedUser && isLogIn) {
			setUser(storedUser);
			setLogIn(true);
			setRole('user');
		} else {
			const guestUser = createGuest();
			setUser(guestUser);
			setRole('guest');
		}	
	  };
	  initAuth();
	  console.log('Auth initialized.');
	}, []);
	
	const logout = () => {
		if (getLocal('username')) {
		  removeLocal('username');
		}
		setUser(null);
		setLogIn(false);
		setError(null);
	};
	
	const login = async ( email, pw ) => {
		try {
			const data = await loginValidate(email, pw);
			//User log in successfully
			await logout(); //Clear all current data

			await setLocal('username', data.username);
			console.log('This is current user: ', user);
			
			setUser(data.username);
			setRole(data.role);
			
			
			setLogIn(true);
			console.log('reached');
			return data;
		} catch (error) {
			logout(); //Clear all current data
			setError(errorHandler(error));
			return errorHandler(error);
		}
	};
	
	useEffect(() => {
		if (user && role) {
		  console.log('This is role:', role);
		  console.log('This is user', user);
		}
	}, [user, role]);
	
	const adminLogin = async ({ accountName, pw }) => {
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
