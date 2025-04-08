import express from 'express'
import pool from './db.js'
import cors from 'cors'

const app = express();
const PORT = 5000

app.use(cors());
app.use(express.json());


app.post('/registration', async (req, res) => {
  const {userName, pass, company_id, phone_number, agent_name, goods} = req.body;
  try{
    await pool.query(
      'INSERT INTO suppliers (userName, pass, company_id, phone_number, agent_name) VALUES($1, $2, $3, $4, $5)',
      [userName, pass, company_id, phone_number, agent_name]
    );
    if( Array.isArray(goods)){
      for( const product of goods){
        const {product_name, price, min_sum} = product;
        await pool.query(
          'INSERT INTO goods (userName, product_name, price, min_sum) VALUES ($1, $2, $3, $4)',
          [userName, product_name, price, min_sum]
        );
      }
    }

    res.status(200).json({message: 'Supplier and goods added successfully!'});
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: 'Error adding supplier or goods to database.' });
  }
});

app.post('/login-supplier', async (req, res) => {
  const {userName, pass} = req.body;
  try{
    const result = await pool.query(
      'SELECT userName, pass FROM suppliers WHERE userName = $1 and pass = $2', [userName, pass]    );

    if(result.rows.length > 0){
      res.json({success: true, message: 'welcome back!'});
    }
    else{
      res.json({success: false, message: 'User not found' });
      // res.status(500).json({ message: 'User not found' })
    }
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: 'Server error.' })
  }
});

app.post('/add-order', async(req, res) =>{

  const {userName, product_name, count} = req.body;

  try{
    const result = await pool.query('SELECT min_sum FROM goods WHERE userName = $1 and product_name = $2', [userName, product_name]);
    if(result.rows.length === 0){
      console.log('not exist product');
      return res.status(404).json({ message: 'Product not found.' });
    }
    
    const min_sum = result.rows[0].min_sum;

    if(count < min_sum){
      console.log('less then min');
      return res.status(400).json({
        message: `The minimum quantity for ${product_name} is ${min_sum}. You ordered ${count}.`,
      });
    }

    console.log(`min = ${min_sum} , count = ${count}`);
    await pool.query('INSERT INTO orders (userName, product_name, count, stat) VALUES ($1, $2, $3, $4)',
       [userName, product_name, count, 'New']);
       res.status(200).json({message: 'order added successfully!'});
  }

  catch(error){
    console.log(error);
    res.status(500).json({ message: 'Error adding order to database.' });
  }
});

app.patch('/process-order', async (req, res) =>{
  const { userName, product_name} = req.body;

  try{
    await pool.query('UPDATE orders SET stat = $1 WHERE userName = $2 and product_name = $3', 
      ["in-process", userName, product_name]
    );
    
    res.status(200).json({ message: 'Order status updated successfully.' });

  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status.' });
  }
});

app.patch('/confirm-order', async (req, res) =>{
  const { userName, product_name} = req.body;

  try{
    await pool.query('UPDATE orders SET stat = $1 WHERE userName = $2 and product_name = $3', 
      ["completed", userName, product_name]
    );
    
    res.status(200).json({ message: 'Order status updated successfully.' });

  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update order status.' });
  }
});

app.get('/view-orders-supplier/:userName', async (req, res) =>{
  const {userName} = req.params;
  try{
    const result = await pool.query('SELECT * FROM orders WHERE userName = $1', [userName]);
    res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).send('database error');
  }
});

app.get('/view-order-grocer', async (req, res) =>{
  try{
    const result = await pool.query('SELECT * FROM orders');
    res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).send('database error');
  }
});

app.get('/viewGoods', async (req, res) =>{
  try{
    const result = await pool.query('SELECT * FROM goods');
    res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).send('database error');
  }
});

//test
app.get('/suppliers', async (req,res)=>{
  try{
    const result = await pool.query('SELECT * from suppliers');
    res.json(result.rows);
  }
  catch(err){
    console.error(err);
    res.status(500).send('database error');
  }
});


app.listen(PORT, ()=>{
  console.log(`server running on port ${PORT}`)
});
