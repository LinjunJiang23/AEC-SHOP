import React from 'react';
import { FaBars } from "react-icons/fa6";
import './SectionBar.css';


 /**
   SectionBarLayout that includes all the navigation menus
   @param {}
 */
const SectionBar = () => {
	
	return (
	  <div className="sectionbar">
	    <div className="sectionbar-section sidebar">
		  <div className="sectionbar-section-nav border category">
		    <a>All</a>
		    <FaBars />
		  </div>
	    </div>
		<div className="sectionbar-section midleft">
		  <div className="sectionbar-section-nav border onsale">
			<a>On Sale</a>
		  </div>
		  <div className="sectionbar-section-nav border browsestore">
			<a>Browse Stores</a>
		  </div>
		</div>
		<div className="sectionbar-section right">
		  <div className="sectionbar-section-nav border sellerpage">
			<a>See Our Seller Central Page!</a>
		  </div>
		</div>
	  </div>
	);
};

export default SectionBar;