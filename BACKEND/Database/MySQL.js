const mysql = require('mysql2');
const dotenv = require('dotenv');
// Create a connection to the MySQL database

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Connect to the database

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the MySQL database');
});

// Function to insert a new row into the "products" table   

function insertProduct(name, price, quantity) {
  const query = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
  connection.query(query, [name, price, quantity], (err, result) => {
    if (err) throw err;
    console.log(`Inserted product with ID ${result.insertId}`);
  });
}