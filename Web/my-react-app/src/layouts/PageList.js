import React from 'react';
import Button from './Button';

const PageList = ({ className, currentPage, totalPages, onPageChange, pageListStyle }) => {
    const generatePageNumbers = () => {
		const pageNumbers = [];
		const maxVisiblePages = 5;
		const buffer = Math.floor(maxVisiblePages / 2);
		
		if (totalPages <= maxVisiblePages + 2) {
			for (let i = 1; i <= totalPages; i++) {
				pageNumbers.push(i);
			}
		} else {
			pageNumbers.push(1);
			//Not sure about the logic of this part
			  const startPage = Math.max(currentPage - buffer, 2);
			  if (startPage > 2) {
				pageNumbers.push('...');
			  }
			  for (let i = startPage; i < currentPage; i++) {
				pageNumbers.push(i);
			  }
			
			  pageNumbers.push(currentPage);
			
			  const endPage = Math.min(currentPage + buffer, totalPages - 1);
			  for (let i = currentPage + 1; i <= endPage; i++) {
				pageNumbers.push(i);
			  }
			
			if (endPage < totalPages - 1) {
				pageNumbers.push('...');
			}
			
			pageNumbers.push(totalPages);
		}
		
		return pageNumbers;
	};
	
	const pageNumbers = generatePageNumbers();
	
	return (
		<div className={className}>
		  {pageNumbers.map((page,index) => (
			<Button
				key={index}
				onClick={()=> onPageChange(page)}
				disabled={page === currentPage}
			>
				{page}
			</Button>
		  ))}
		</div>
	);
};

export default PageList;