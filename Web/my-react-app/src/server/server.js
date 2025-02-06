// src/server/server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require("path");
const cors = require('cors');
const routes = require('./routes');


const app = express();
const port = 3001;

// Set up session
app.use(session({
  secret: 'mayym',
  resave: false,
  saveUninitialized: true,
  cookie: { 
	secure: true,
	sameSite: 'none'
  }
}));

app.use(bodyParser.json()); // Parse JSON bodies

// Enable CORS for all routes
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// Serve static images
app.use('/uploads', express.static(path.join(__dirname, "uploads")));

// Mount routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
