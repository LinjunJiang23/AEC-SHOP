import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUser } from "react-icons/fa";

import './styles/UserIcon.css';

const UserIcon = () => (
	<div className="icon">
	  <Link to="/userdetail">
		<FaRegUser />
	  </Link>
	</div>
);

export default UserIcon;