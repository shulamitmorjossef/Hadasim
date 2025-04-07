// const express = require('express');
// const { Client } = require('pg');
// const app = express();
// const port = 5000;

// const client = new Client({
//   user: 'postgres',         
//   host: 'localhost',        
//   database: 'supermarket',  
//   password: '1212',
//   port: 5432,               
// });


// client.connect()
//   .then(() => console.log('Connected to PostgreSQL'))
//   .catch(err => console.error('Connection error', err.stack));

// app.get('/api/data', async (req, res) => {
//   try {
//     const result = await client.query('SELECT * FROM your_table_name');
//     res.json(result.rows);  
//   } catch (err) {
//     console.error('Error executing query', err.stack);
//     res.status(500).send('Error retrieving data');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });


import pkg from'pg';
const { Pool } = pkg;  

// require('dotenv').config();

const pool = new Pool({

  user: 'postgres',       
  host: 'localhost',
  database: 'super_market',
  password: '1212', 
  port: 5432,
  
  // user: process.env.DB_USER,
  // host: process.env.DB_HOST,
  // database: process.env.DB_NAME,
  // password: process.env.DB_PASSWORD,
  // port: process.env.DB_PORT,
});

export default pool;