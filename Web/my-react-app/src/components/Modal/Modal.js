// src/components/Modal/Modal.js
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';

import './Modal.css';
/**
 * A modal template that embeds content.
 * @param { string } title - heading of the modal.
 * @param { function } onClose - function to handle modal close.
 * @param { function } onConfirm - function to handle confirm action.
 * @param { function } onCancel - function to handle cancel action.
 * @param { string } confirmBut - label for the confirm button.
 * @param { string } cancelBut - label for the cancel button.
 * @param { string } closeBut - label for the close button.
 */
const Modal = ({ 
  title, className, size, 
  onClose, onConfirm, onCancel,  
  closeBut, confirmBut, cancelBut, 
  children 
}) => {
	
	return (
	  <div className='modal-overlay'>
	    <div className={`modal-container ${size} ${className}`}>
			<div className="modal-header">
			  <h1>{title}</h1>
			  {onClose && (
				<Button onClick={onClose}>
				  {closeBut}
				</Button>
			  )}
			</div>
			<div className='modal-body'>
				{children}
			</div>
			<div className='modal-footer'>
			  {onConfirm && (
				<Button onClick={onConfirm}>
				  {confirmBut}
				</Button>
			  )}
			  {onCancel && (
				<Button onClick={onCancel}>
				  {cancelBut}
				</Button>
			  )}
			</div>
		</div>
	  </div>
	);
};

Modal.propTypes = {
	title: PropTypes.string,
	onClose: PropTypes.func,
	onConfirm: PropTypes.func,
	onCancel: PropTypes.func,
	closeBut: PropTypes.node,
	confirmBut: PropTypes.node,
	cancelBut: PropTypes.node
};

Modal.defaultProps = {
	title: 'Modal',
	closeBut: 'x',
	confirmBut: 'yes',
	cancelBut: 'no'
};

export default React.memo(Modal);