import React, { useEffect, useState } from 'react';
import { Link,  useNavigate } from 'react-router-dom'; // Import Link
import Fetch from '../lib/Fetch';
import AddNewListing from '../Component/AddNewListing';
import './styles/EditListingPage.css';

const updateProduct = async (productId, productName, productPrice, productDesc) => {
  try {
    const response = await fetch(`http://localhost:3001/SellerRoute/updateProduct/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName, productPrice, productDesc })
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    console.log(data); // Log success message or handle response accordingly
  } catch (error) {
    throw new Error(`Error updating product: ${error.message}`);
  }
};


const ListingCard = ({ product }) => {
  // State to manage modal visibility and selected product
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState(product.product_name);
  const [editedDescription, setEditedDescription] = useState(product.description);
  const [editedPrice, setEditedPrice] = useState(product.price);
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
      await updateProduct(selectedProduct.product_id, editedProductName, editedPrice, editedDescription);
      console.log("Success");
      setShowModal(false);
	  nav('/dashboard/edit');
    } catch (error) {
      console.error('Error updating product:', error.message);
      // You can handle error display or logging here
    }
  };

  return (
    <div className="listingcard">
      {/* Open modal on listing click */}
      <div className="listing-summary" onClick={() => handleOpenModal(product)}>
        <img
          className="listing-summary-image"
          src={product.img_url}
          alt={product.product_name}
        />
      </div>
      {/* Render modal if showModal is true */}
      {showModal && (
        <div className="modal">
          {/* Modal content */}
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            {/* Display selected product details here */}
            <h2>{selectedProduct.product_name}</h2>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
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
              <button type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};


const DisplayCurrentListing = ({ products }) => (
  <ul className="summary-product-grid">
    {products.map((product, index) => (
      <li key={index}>
        <ListingCard product={product} />
      </li>
    ))}
    <li>
      <AddNewListing />
    </li>
  </ul>
);




const EditListingPage = () => {
  const [products, setProducts] = useState([]);
  const [showAddNewModal, setShowAddNewModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    Fetch('product').then((data) => setProducts(data));
  }, []);

  return (
    <div className="editlisting">
      <span className="edit-current">Your Current Listing: </span>
      <DisplayCurrentListing products={products} />
	  <button className="add-new" 
	  onClick={() => setShowAddNewModal(true)}
	  >
	    Add New Lisitng
	  </button>
	  {/* Render AddNewListing modal if showAddNewModal is true */}
      {showAddNewModal && <AddNewListing onClose={() => setShowAddNewModal(false)} />}
    </div>
  );
};

export default EditListingPage;
