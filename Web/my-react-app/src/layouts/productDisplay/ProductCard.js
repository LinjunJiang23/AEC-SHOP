// src/layouts/productDisplay/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

// Component
import Card from '../../components/Card/Card';

// Layout
import AddToCartButton from '../AddToCartButton';

const ProductCard = ({ product }) => {
 
  return (
    <div className='productcard-container'>
     <Link to={`/productdetail/${product.product_id}`}
		style={{ textDecoration: 'none' }} 
	 >
	   <Card 
	     className='product'
		 img_url={product.img_url}
		 item_title={product.product_name}>
		 <span className="summary-price">${product.price}</span>
       </Card>
     </Link>
	 <AddToCartButton item={product} quantity={1} />
  </div>
  );
};

export default ProductCard;