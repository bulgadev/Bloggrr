import './App.css';
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from './components/navbar';
import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();

    const [getD, setGetD] = useState(null);

  useEffect(() => {
    handleGet()
  }, [])

  function handleGet() {
    //calls flask using axios
    axios.get('https://bloggrr.onrender.com/api/info', { withCredentials: true })
    //we take our info from flask
    .then(res => {
      setGetD(res.data); // Save the data into a state
    })
    //just in case our code goes kaboom
    .catch(err => console.error("Error, dashboard, handleget:", err));

    const msg = getD

    if (msg == "sessioned") {
      navigate("/dashboard");
    }
  }

  function LoginR() {
    navigate("/login");
  }

  function RegisterR() {
    navigate("/register");
  }

  
  function blogsr() {
    navigate("/blogs");
  }

  return (
    <div className="App">
      {/*Nanbar Component*/}
      <Navbar />
      <header className="App-header">
        <p className="app-description">Bloggr is a platform for sharing your stories, ideas, and blogs. Click start to begin your journey!</p>
        <button type="button" onClick={LoginR} className="btn-start">Start</button>
        <p className='app-description'>Or click here to see other people's stories</p>
        <button type="button" onClick={blogsr} className="btn-start">Blogs</button>
      </header>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
