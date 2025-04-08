
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:5000/add-supplier', {
        userName,
        pass,
        company_id,
        phone_number,
        agent_name,
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
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div>
          <label>Company ID:</label>
          <input
            type="text"
            value={company_id}
            onChange={(e) => setCompanyId(e.target.value)}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Agent Name:</label>
          <input
            type="text"
            value={agent_name}
            onChange={(e) => setAgentName(e.target.value)}
          />
        </div>
        <button type="submit">
          Register Supplier
        </button>
      </form>
      {message && <p> {message }</p>}
    </div>    
  );
}

export default Registration;
