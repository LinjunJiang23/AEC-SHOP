const express = require('express');

const connection = require('../db');

const router = express.Router();

// Define route to handle adding a product
router.post('/addProduct', (req, res) => {
    const { productName, imgURL, productPrice, productDesc } = req.body;
    const sql = 'INSERT INTO product (product_name, product_url, price, description) VALUES (?, ?, ?, ?)';
    connection.query(sql, [productName, imgURL, productPrice, productDesc], (err, result) => {
        if (err) {
            console.error("Error adding data to database", err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log("Data added successfully");
        res.status(201).json({ message: 'Data added successfully' });
    });
});

// Define route to handle deleting a product
router.post('/deleteProduct/:id', (req, res) => {
	const { productId } = req.body;
	const sql = 'DELETE FROM Product WHERE product_id == (?)';
	connection.query(sql, [productId], (err, result) => {
		if (err) {
			console.error("Error adding data to database", err);
			res.status(500).json({ error: 'Internal server error' });
		}
		console.log("Data deleted successfully");
	res.status(201).json({ message: 'Data deleted successfully' });
	});

});

// Define route to handle updating a product
router.post('/updateProduct/:id', (req, res) => {
	const { productName, imgURL, productPrice, productDesc } = req.body;
	const sql = 'UPDATE Product SET product_name = (?), product_url = (?), price = (?), description = (?)';
	connection.query(sql, [productName, imgURL, productPrice, productDesc], (err, result) => {
		if (err) {
			console.error("Error adding data to database", err);
			res.status(500).json({ error: 'Internal server error' });
			return;
		}
		console.log("Data added successfully");
		res.status(201).json({ message: 'Data added successfully' });
	});
});

module.exports = router;
