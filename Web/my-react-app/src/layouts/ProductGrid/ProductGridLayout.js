import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import Grid from '../../components/Grid/Grid';


// layouts
import AddToCartButtonLayout from '../AddToCartButtonLayout/AddToCartButtonLayout';
import ProductRowLayout from '../ProductRowLayout/ProductRowLayout';
import PaginationLayout from '../PaginationLayout/PaginationLayout';

// functions
import fetchProducts from '../api/services/fetchProducts';

// styles
import './ProductGridLayout.css';

const ProductGridLayout = ({ limit, style, paginationStyle }) => {
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
	<Grid className={`product-grid ${className}` {...props}}>
	  <ProductRow products={products} />
	  <PageDisplay 
	    currentPage={currentPage} 
		totalPages={totalPages} 
		onPageChange={handlePageChange} 
      />
	</Grid>
  );
};

ProductGridLayout.propTypes = {
	products: PropTypes.array.isRequired,
	className: PropTypes.string,
};

export default ProductGrid;
