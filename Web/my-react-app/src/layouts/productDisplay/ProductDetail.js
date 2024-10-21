import React from 'react';


const ProductDetail = ({ product, setQuantity }) => {

   if (!product) {
    return <div>No product available</div>;
   }

  return (
    <div className="product-detail">
          <img 
		    className="detail-image" 
            src={product.img_url} 
            alt={product.product_name}
          />
          <span className="detail-title">{product.product_name}</span>
          <span className="detail-price">${product.price}</span>
          <span className="detail-description-text">Description:</span>
          <span className="detail-description">{product.description}</span>
          <input 
            type="number" 
            className="detail-quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
    </div>
   );
};


export default React.memo(ProductDetail);