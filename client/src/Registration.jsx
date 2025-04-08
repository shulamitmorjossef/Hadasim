
import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Registration(){

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [pass, setPass] = useState('');
  const [company_id, setCompanyId] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [agent_name, setAgentName] = useState('');
  const [message, setMessage] = useState('');
  const [goods, setGoods] = useState([]);

  const handleAddProduct = () => {
    const updatedProductsArray = [...goods];
  
    const newProduct = {
      product_name: '',
      price: 0,
      min_sum: 0
    };
  
    updatedProductsArray.push(newProduct);
  
    setGoods(updatedProductsArray);
  };

  
  const handleProductChange = (productIndex, fieldName, newValue) => {
    const updatedProductsArray = [...goods];
  
    let processedValue = newValue;
    if (fieldName === 'price' || fieldName === 'min_sum') {
      processedValue = Number(newValue);
    }
  
    updatedProductsArray[productIndex][fieldName] = processedValue;
  
    setGoods(updatedProductsArray);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !pass || !company_id || !phone_number || !agent_name) {
      setMessage('All fields are required.');
      return;
    }

    const invalidProduct = goods.some(product => 
      !product.product_name || product.price <= 0 || product.min_sum <= 0
    );
    
    if (invalidProduct) {
      setMessage('All product fields must be filled out correctly.');
      return; 
    }

    try{
      const response = await axios.post('http://localhost:5000/registration', {
        userName,
        pass,
        company_id,
        phone_number,
        agent_name,
        goods
      });
      setMessage(response.data.message);
      navigate('/homepage')

    }
    catch(error){
      setMessage('Error adding supplier');
    }
  };


  return (
    <div>
      <h1>supplier registration</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label> user Name: </label>
          <input
           type="text"
           value={userName}
           onChange = {(e) => setUserName(e.target.value)} 
           />
        </div>
        <br />
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Company ID:</label>
          <input
            type="text"
            value={company_id}
            onChange={(e) => setCompanyId(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <br />
        <div>
          <label>Agent Name:</label>
          <input
            type="text"
            value={agent_name}
            onChange={(e) => setAgentName(e.target.value)}
          />
        </div>

        <h2>Products</h2>
        {goods.map((product, index) => (
          <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
            <input
              type="text"
              placeholder="Product Name"
              value={product.product_name}
              onChange={(e) => handleProductChange(index, 'product_name', e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={product.price}
              onChange={(e) => handleProductChange(index, 'price', e.target.value)}
            />
            <input
              type="number"
              placeholder="Minimum Quantity"
              value={product.min_sum}
              onChange={(e) => handleProductChange(index, 'min_sum', e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>

        <br /><br />



        <button type="submit">
          Register Supplier
        </button>
      </form>
      {message ? <p> {message }</p> : null}
    </div>    
  );
}

export default Registration;
