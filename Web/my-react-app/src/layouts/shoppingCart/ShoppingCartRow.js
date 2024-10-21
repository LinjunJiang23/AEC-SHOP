// src/layouts/shoppingCart/ShoppingCartRow.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import Row from '../../components/Row/Row';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

// Layout
import QuantitySelector from '../QuantitySelector';


const ShoppingCartRow = ({ item, onSubtotalChange, onDeleteItem }) => {
	const [quantity, setQuantity] = useState(item.quantity);
    const [subtotal, setSubtotal] = useState(item.price * item.quantity);
	const [showModal, setShowModal] = useState(false);
  
    const handleQuantityChange = (newQuantity) => {
	 setQuantity(newQuantity);
	 const newSubtotal = newQuantity * item.price;
     setSubtotal(newSubtotal);
	 onSubtotalChange(newSubtotal);
	};
	
	const handleDelete = () => {
		setShowModal(true);
	};
	
	const confirmDelete = () => {
		onDeleteItem(item.product_id);
		setShowModal(false);
	};
	
	const cancelDelete = () => {
		setShowModal(false);
	};
	
	return (
	<div>
	  <Link to={`/productdetail/${item.product_id}`} style={{ textDecoration: 'none' }}>
		<Row className={"shoppingcart-item"} img_url={item.img_url} title={item.product_name}>    
            <span className="item-price">${item.price}</span>
        </Row>
	  </Link>
	  <QuantitySelector className={'shoppingcart-item'} item={item} onQuantityChange={handleQuantityChange}/>
	  <div className='sub-total'>
	   <span>Subtotal: $</span>
	   <span>{subtotal.toFixed(2)}</span>
	  </div>
	  <Button
		className='shoppingcart-item'
		onClick={handleDelete}>
		delete
	  </Button>
	  { showModal && 
	    <Modal
		  onClose={() => {setShowModal(false)}}
		  closeBut='x'
		  onConfirm={confirmDelete}
		  confirmBut='Yes'
		  onCancel={cancelDelete}
		  cancelBut='No'
		  title='Delete Item'
		>
		<p>Are you sure you want to delete this item?</p>
	    </Modal>
	  }
	</div>
	);
};

export default React.memo(ShoppingCartRow);