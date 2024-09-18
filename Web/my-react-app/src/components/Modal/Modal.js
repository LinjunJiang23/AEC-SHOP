import React from 'react';


/**
 * A modal template that embeds content
 * @param { boolean } showModal - whether modal is showed or not
 * @param { string } title - heading of the modal
 */
const Modal = ({ showModal, title, className, onClose, onOpen, onConfirm, onCancel, size, children }) => {
	
	const handleConfirm = () => {
		onConfirm();
	};
	
	const handleCancel = () => {
		onCancel();
	};
	
	const handleClose = () => {
		onClose();
	};
	
	const handleOpen = () => {
		onOpen();
	};
	
	return (
	  <div className=`modal-${showModal : show : hide}`>
	    <div className="modal-title">
		  <h1>{title}</h1>
		</div>
	    <div className={className}>
			{children}
		</div>
		<div className="button">
		  {onConfirm && (
			<button onClick={handleConfirm}>Confirm</button>
		  )}
		  {onCancel && (
			<button onClick={handleCancel}>Cancel</button>
		  )}
		  {onClose && (
			<button onClick={handleClose}>Close</button>
		  }
		  {onOpen && (
			<button onClick={handleOpen}>Open</button>
		  )}
		</div>
	  </div>
	);
};