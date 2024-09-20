// src/layouts/UserIcon/UserIcon.js
import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
// src/layouts/UserIcon/UserIcon.js
import { FaRegUser } from "react-icons/fa";

//Component
import NavigateIcon from '../../components/NavigateIcon/NavigateIcon';

//API
import { Auth } from '../../api/Auth';

//Style
import './UserIcon.css';


/**
 * UserIcon - A Component that displays the UserIcon
 */
const UserIcon = () => {
	const { user } = useContext(Auth);
   
	useEffect(() => {
	}, [user]);
	
	return (
	<div className="icon">
	  <NavigateIcon linkTo={"/"}>
		<FaRegUser />
	  </NavigateIcon>
	  {user ? <span>Welcome, {user.username}!</span> : ''}
	</div>
	);
};

export default UserIcon;