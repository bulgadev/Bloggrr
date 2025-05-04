import '../App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";


function Navbar() {
    const navigate = useNavigate();

    //setstat
    const [getD, setGetD] = useState(null);

    function handleGet() {
      //calls flask using axios
      axios.get('http://localhost:5000/api/login')
      //we take our info from flask
      .then(res => {
        setGetD(res.getD); //saves the data into a state
      })
      //just in case our code goes kaboom
      .catch(err => console.error("Im sorry for u man, good luck:", err));
    } 

    function LoginR() {
        navigate("/login");
      }
    
      function RegisterR() {
        navigate("/register");
      }

    return (
      <div>
      <nav className="navbar">
      <a href="/">
        <img src="/favicon.png" alt="Logo" className="navbar-logo" />
      </a>
      <Link to="/">Bloggr</Link>
      {/* The navbar div */}
      <div className="nav-links">
        <button type="button" onClick={LoginR} className="btn-login">Login</button>
        <button type="button" onClick={RegisterR} className="btn-register">Register</button>
      </div>
      </nav>
      </div>
    );
}

export default Navbar;