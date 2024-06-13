import React, { useState, useEffect } from 'react';

// Component
import AddToCartButton from './AddToCartButton';
import ProductRow from './ProductRow';
import PageDisplay from './PageDisplay';

// Function
import FetchProduct from '../lib/FetchProduct';

// Styles
import './styles/ProductGrid.css';

const ProductGrid = ({ section, limit, style, paginationStyle }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    FetchProduct(currentPage, limit)
	.then(results => {
		setProducts(results.data);
		setCurrentPage(results.page);
		setTotalPages(results.totalPages);
		});
  }, [currentPage, limit]);
  
  const handlePageChange = (newPage) => {
	setCurrentPage(newPage);
  };

  return (
	<div className="container-product-grid">
	  <ProductRow products={products} />
	  <PageDisplay 
	    currentPage={currentPage} 
		totalPages={totalPages} 
		onPageChange={handlePageChange} 
      />
	</div>
  );
};

export default ProductGrid;
