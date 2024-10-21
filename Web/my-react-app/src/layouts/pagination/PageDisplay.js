// src/layouts/pagination/PageDisplay.js
import React from 'react';

import Button from '../../components/Button/Button';
import PageList from './PageList';

const PageDisplay = ({ className, currentPage, totalPages, onPageChange, paginationStyle }) => {
	
	const handlePrevious = () => {
		(currentPage > 1) ? onPageChange(currentPage - 1) : onPageChange(currentPage); 
	};
	
	const handleNext = () => {
		(currentPage < totalPages) ? onPageChange(currentPage + 1) : onPageChange(currentPage);
	};
	
	return (
	  <div className={`pagination ${className}`}>
		<Button onClick={handlePrevious} disabled={currentPage === 1}>
			Previous Page
		</Button>
		<PageList 
		  currentPage={currentPage} 
		  totalPages={totalPages} 
		  onPageChange={onPageChange}
		/>
		<Button onClick={handleNext} disabled={currentPage === totalPages}>
			Next Page
		</Button>
	  </div>
	);
};

export default PageDisplay;