import express from 'express'
import pool from './db.js'
import cors from 'cors'

const app = express();
const PORT = 5000

app.use(cors());
app.use(express.json());

app.post('/add-supplier', async (req, res) => {
  const {userName, pass, company_id, phone_number, agent_name} = req.body;
  try{
    const result = await pool.query(
      'INSERT INTO suppliers (userName, pass, company_id, phone_number, agent_name) VALUES($1, $2, $3, $4, $5)',
      [userName, pass, company_id, phone_number, agent_name]
    );
    res.status(200).json({message: 'Supplier added successfully!'});
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: 'Error adding supplier to database.' })
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



// 
// function react(req,res){
  // console.log("react has been called");
  // res.send('Hello shulamit!');
// 
// }
// 
// app.get('/', react)
// 
// app.listen(port, () => {
  // console.log(`Example app listening on port ${port}`)
// })