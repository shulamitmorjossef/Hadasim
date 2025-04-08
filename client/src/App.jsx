

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import './App.css';
import Registration from "./Registration";
import HomePage from "./HomePage";
import Login from "./Login.jsx";

function WelcomePage(){
  return(
    <div>
      <h1>Welcome!</h1>
      <Link to = "/register">
      <button> Registration </button>
      </Link>
      <br/>
      <br/>
      <br/>
      <Link to = "/login">
      <button> Log-in </button>
      </Link>
    </div>
  );
}

function AppContent(){
  return (
    <div>
    <Routes>
      <Route path = "/" element={<WelcomePage />} />
      <Route path = "/register" element={<Registration/>}/>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/homepage" element={<HomePage/>}/>
    </Routes>
    </div>
  );
}

function App(){
  return(
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;