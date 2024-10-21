// src/pages/customerSidePage/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ProductDetail from '../../layouts/productDisplay/ProductDetail';
import AddToCartButton from '../../layouts/AddToCartButton';

import { getOneProduct } from '../../api/services/productServices';

import './styles/ProductDetailPage.css';



const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getOneProduct(id);
		const data = response.data;
        setProduct(data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error: ', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  return (
    <div className="product-detail">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : product ? (
        <>
          <ProductDetail product={product} setQuantity={setQuantity} />
	      <AddToCartButton item={product} quantity={quantity} />
        </>
      ) : (
        <div>No product found</div>
      )}
    </div>
  );
};

export default ProductDetailPage;
