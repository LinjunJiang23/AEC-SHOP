import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { Auth } from '../../api/Auth';

import './UserIcon.css';

const UserIcon = () => {
	const { user } = useContext(Auth);
   
	useEffect(() => {
	}, [user]);
	
	return (
	<div className="icon">
	  <Link to="/userdetail">
		<FaRegUser />
	  </Link>
	  {user && <span>Welcome, {user.username}!</span>}
	</div>
	);
};

export default UserIcon;