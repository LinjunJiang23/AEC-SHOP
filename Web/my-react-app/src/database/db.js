const mysql = require('mysql');

// Connect to mysql database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'jiang83635757',
    database: 'E_COM'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

module.exports = connection;
