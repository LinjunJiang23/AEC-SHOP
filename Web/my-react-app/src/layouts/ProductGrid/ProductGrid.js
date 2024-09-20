import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// components
import Grid from '../../components/Grid/Grid';

// layouts
import AddToCartButton from '../AddToCartButton';
import ProductRow from '../ProductRow/ProductRow';
import PageDisplay from '../PageDisplay';

// api
import { getProducts } from '../../api/services/productServices';

// styles
import './ProductGrid.css';

const ProductGrid = ({ products, style, paginationStyle, className, ...props }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    getProducts(currentPage, limit)
	.then(results => {
		setProducts(results.products);
		setCurrentPage(results.page);
		setTotalPages(results.totalPages);
		});
  }, [currentPage, limit]);
  
  const handlePageChange = (newPage) => {
	setCurrentPage(newPage);
  };

  return (
	<Grid 
	  className={`product-grid ${className}` }
	  {...props}>
	  <ProductRow products={products} />
	  <PageDisplay 
	    currentPage={currentPage} 
		totalPages={totalPages} 
		onPageChange={handlePageChange} 
      />
	</Grid>
  );
};

ProductGrid.propTypes = {
	limit: PropTypes.number,
	style: PropTypes.oneOfType([
		     PropTypes.object,
			 PropTypes.number,
	]),
	paginationStyle: PropTypes.oneOfType([
		     PropTypes.object,
			 PropTypes.number,
	]),
	products: PropTypes.array.isRequired,
	className: PropTypes.string,
	
};

export default ProductGrid;
