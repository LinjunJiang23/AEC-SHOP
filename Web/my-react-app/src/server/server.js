// src/server/server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const authOrCreateGuest= require('./middleware/authMiddleware');


const app = express();
const port = 3001;

// Set up session
app.use(session({
	secret: 'mayym',
	resave: false,
	saveUninitialized: true,
	cookie: { 
	  secure: false,
	  sameSite: 'none'
	}
}));

app.use(bodyParser.json()); // Parse JSON bodies

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Serve static images
app.use('/uploads', express.static('uploads'));

// Mount routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
