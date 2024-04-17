import React from 'react';


// Styles
import { GiShoppingBag } from "react-icons/gi";
import { RiProfileFill } from "react-icons/ri";
import '../styles/UserDetailPage.css';


const UserDetailPage = () => (
  <div className="container-userdetail">
    <div className="row-table">
		<div className="box">
			<GiShoppingBag />
			<span>View your order history here</span>
		</div>
		<div className="box">
			<RiProfileFill />
			<span>View your user profile here</span>
		</div>
	</div>
  </div>
);

export default UserDetailPage;