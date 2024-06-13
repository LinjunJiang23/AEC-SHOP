import React, { useEffect, useState, memo } from 'react';
import { Link,  useNavigate } from 'react-router-dom';
import Fetch from '../../lib/FetchProduct';

import './styles/EditListingPage.css';


//Front end function to update product information
const updateProduct = async (productId, formData) => {
  try {
    const response = await fetch(`http://localhost:3001/SellerRoute/updateProduct/${productId}`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      throw new Error(Response.error());
    }
    const data = await response.json();
    console.log(data); // Log success message or handle response accordingly
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};


//Showcase all the listings 
const ListingCard = ({ product }) => {
	
  // State to manage modal visibility and selected product
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState(product.product_name);
  const [editedDescription, setEditedDescription] = useState(product.description);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedImage, setEditedImage] = useState();
  const nav = useNavigate();

  // Function to handle opening the modal and setting the selected product
  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
	try {
      // Send a request to update the product details
	  let formData = new FormData();
	  let fileInput = editedImage;
	  formData.append('image', fileInput);
	  console.log("Image:", fileInput);
	  formData.append('productName', editedProductName);
	  formData.append('description', editedDescription);
	  formData.append('price', editedPrice);
      await updateProduct(selectedProduct.product_id, formData);
      console.log("Success");
      setShowModal(false);
	  nav('/dashboard/edit');
    } catch (error) {
      console.error('Error updating product:', error.message);
      // You can handle error display or logging here
    }
  };

	/*
		This function should delete the whole listing; 
		Delete the listing from user's shopping cart;
		Update shopping cart's total and quantity.
	*/
    const deleteListing = async (productId) => {
	  
	
	};
	
	/*
     	The API should be able to:
		1) change the listing's status to inactive,
		2) and blur out the product in users' shopping cart and change its status to inactive
		3) update shopping cart's total and quantity
	*/

  return (
    <div className="listingcard">
      {/* Open modal on listing click */}
      <div className="listing-summary" onClick={() => handleOpenModal(product)}>
        <span>Product Name:</span>
		<span>{product.product_name}</span>
		<img
          className="listing-summary-image"
          src={product.img_url}
          alt={product.product_name}
        />
		<span>Price:</span>
		<span>${product.price}</span>
		<span>Description:</span>
		<span>{product.description}</span>
		<button>Delete</button>
      </div>
      {/* Render modal if showModal is true */}
      {showModal && (
        <div className="modal">
          {/* Modal content */}
          <div className="modal-content">
            <button className="close" onClick={() => setShowModal(false)}>&times;</button>
            {/* Display selected product details here */}
            <h2>{selectedProduct.product_name}</h2>
            <h2>Edit Product</h2>
            <form  encType="multipart/form-data" onSubmit={handleSubmit}>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                value={editedProductName}
                onChange={(e) => setEditedProductName(e.target.value)}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
              />
              <input
                type="text"
                id="price"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
			  <label htmlFor="imageFile">Upload Image:</label>
			  <input 
			  type="file" 
			  name="imageFile" 
			  id="imageFile" 
			  accept="image/*"
			  onChange={(e) => setEditedImage(e.target.files[0])}
			/>
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const MemoListingCard = memo(ListingCard);


//Display the product by mapping, could change to something else if possible
const DisplayCurrentListing = ({ products }) => (
  <ul className="summary-product-grid">
    {products.map((product, index) => (
      <li key={index}>
        <MemoListingCard product={product} />
      </li>
    ))}
    <li>
    </li>
  </ul>
);

const MemoCurrentListing = memo(DisplayCurrentListing);


//The main page
const EditListingPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Fetch('product').then((data) => setProducts(data));
  }, [products]);

  return (
    <div className="editlisting">
      <span className="edit-current">Your Current Listing: </span>
      <MemoCurrentListing products={products} />
	  <Link to="/dashboard/addnewlisting">
	    <button className="add-new">
	      Add New Lisitng
	    </button>
	  </Link>
    </div>
  );
};

export default EditListingPage;
