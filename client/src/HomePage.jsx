import React, { useEffect, useState } from "react";
import axios, { spread } from "axios";
import "./App.css";

function HomePage(){
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () =>{
        try{
            const userName = localStorage.getItem('userName');
            console.log(userName);
            const response = await axios.get(`http://localhost:5000/view-orders-supplier/${userName}`);
            setOrders(response.data);
        } 
        catch(error){
          console.error("Error fetching orders", error);
        }
    };

    const handleProcessOrder = async (order) =>{
        try{
            const userName = localStorage.getItem('userName');
            const response = await axios.patch(`http://localhost:5000/process-order`, {
                userName,
                product_name: order.product_name
            });
            
            alert (response.data.message);
            const updatedOrders = orders.map(o=>{
                if(o.userName === order.userName && o.product_name === order.product_name) {
                    return {...o, stat: 'processed'};
                }
                else{
                    return o;
                }
            });
                // o.id === order.id ? {...o, stat: 'Processed'} : o
            // );
            setOrders(updatedOrders);
        }
        catch(error){
            console.error("error processing order", error);
        }
    };

    useEffect(() =>{
        fetchOrders();
    }, []);


    return(
        <div>
        <h1>Your orders</h1>
        {orders.length === 0 ? (
            <p>There is no orders</p>
        ) : (
            <table border="1">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Count</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.product_name}</td>
                            <td>{order.count}</td>
                            <td>{order.stat}</td>
                            <td>
                                {order.stat === "New" ?(
                                    <button onClick={()=> handleProcessOrder(order)}>
                                        Accept order
                                    </button>
                                ):(
                                <span> Order Processed</span>
                                                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
        </div>
    );
}

export default HomePage;