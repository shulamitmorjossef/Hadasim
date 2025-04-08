import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login(){

    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [pass, setPass] = useState('');
    const [Error, setError] = useState('');
    const [message, setMessage] = useState('');
    

    const submitLogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/login-supplier', {
                userName,
                pass
            });
            setMessage(response.data.message);
            if(response.data.success){
                localStorage.setItem('userName', userName)
                navigate(`/homepage`);
            }
            else{
                setError('wrong details');
            }
        }

        catch(error){
            setError('Server error');
        }

    };



    return(
        <div>
            <h1>Log-in supplier</h1>
            <form onSubmit={submitLogin}>
                <div>
                    <label> User Name </label>
                    <input 
                    type="text"
                    value={userName}
                    onChange = { (e) => setUserName(e.target.value)}
                     />
                </div>
                <br />
                
                <div>
                <label> Password </label>
                <input 
                type="password"
                value={pass}
                onChange = { (e) => setPass(e.target.value)}
                />
                </div>

                <br />
                <br />

                <button type="submit"> Login supplier </button>
            </form>
            {message ? <p> {message }</p> : null}
        </div>
    );

}

export default Login;