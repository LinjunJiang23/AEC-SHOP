import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";
import { Auth } from '../lib/Auth';

import './styles/UserIcon.css';

const UserIcon = () => {
	const { User } = useContext(Auth);
    const [user, setUser] = useState();
   
	useEffect(() => {
      setUser(User);
	}, []);
	
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