const express = require('express');
const cors = require('cors');
const connection = require('../db');
const multer = require('multer');


const app = express();
const router = express.Router();

app.use(cors({ origin: 'http://localhost:3001' }));

//Storage for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });




// Route to handle adding a product
router.post('/addProduct', upload.single('image'), (req, res) => {
    const name = req.file.filename; // Assuming multer saves the file path
    const imagePath = `http://localhost:3001/uploads/${name}`;
    
    
    const { productName, description, price } = req.body;

    // Insert image URL and product details into the database
    const sql = 'INSERT INTO Product (img_url, product_name, price, description) VALUES (?, ?, ?, ?)';
    connection.query(sql, [imagePath, productName, price, description], (err, result) => {
        if (err) {
            console.error("Error adding data to database", err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        console.log("Data added successfully");
        res.status(201).json({ message: 'Data added successfully' });
    });
});

// Route to handle deleting a product
router.post('/deleteProduct/:id', (req, res) => {
	const productId = req.params.id;
	const sql = 'DELETE FROM Product WHERE product_id = (?)';
	connection.query(sql, [productId], (err, result) => {
		if (err) {
			console.error("Error adding data to database", err);
			res.status(500).json({ error: 'Internal server error' });
		}
		console.log("Data deleted successfully");
	res.status(201).json({ message: 'Data deleted successfully' });
	});

});

// Route to handle updating a product
router.post('/updateProduct/:id', upload.single('image'), (req, res) => {
	const productId = req.params.id;
	const name = req.file.filename; // Assuming multer saves the file path
    const imagePath = `http://localhost:3001/uploads/${name}`;
	const { productName, description, price } = req.body;
	const sql = 'UPDATE Product SET product_name = ?, price = ?, description = ?, img_url = ? WHERE product_id = ?';
	connection.query(sql, [productName, price, description, imagePath, productId], (err, result) => {
		if (err) {
			console.error("Error updating product in database:", err);
			res.status(500).json({ error: 'Internal server error' });
			return;
		}
		console.log("Product updated successfully");
		res.status(200).json({ message: 'Product updated successfully' });
	});
});


// Route to handle admin validation
router.post('/loginVal', (req, res) => {
	const { accountName, pw } = req.body;
	console.log(accountName);
	console.log(pw);
	connection.query(
		'SELECT * FROM Employee WHERE username = ? AND hashed_password = ?',
		[accountName, pw],
		(err, results, fields) => {
			if (err) {
				console.error(err);
				return res.status(500).json({ error: 'Internal server error' });
			} else {
				console.log(results);
				if (results.length !== 0) {
					console.log('Admin login successfully.');
					req.session.AdminId = results[0].emply_id;
					console.log("req.session data:", req.session.AdminId);
					console.log("result is:", results);
					res.status(200).json(results);
				} else {
					console.log("Admin name or password are wrong, try again");
					res.status(401).json({ error: "Admin name or password are wrong, try again"});
				}
			}
		}
	);
});

module.exports = router;
