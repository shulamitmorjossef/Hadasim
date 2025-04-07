const express = require('express');
const { Client } = require('pg');
const app = express();
const port = 5000;

const client = new Client({
  user: 'postgres',         
  host: 'localhost',        
  database: 'supermarket',  
  password: '1212',
  port: 5432,               
});


client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/api/data', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM your_table_name');
    res.json(result.rows);  
  } catch (err) {
    console.error('Error executing query', err.stack);
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
