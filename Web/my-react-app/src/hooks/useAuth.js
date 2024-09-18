// src/hooks/useAuth.js
import { useContext } from 'react';
import { Auth } from '../api/Auth';

const useAuth = () => {
	return useContext(Auth);
};

export default useAuth;