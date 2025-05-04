import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();

    //use state
    const [getD, setGetD] = useState(" ");
    const [blogs, setBlogs] = useState(" ");
  

    function handleGet() {
        //calls flask using axios
        axios.get('http://localhost:5000/api/info', { withCredentials: true })
        //we take our info from flask
        .then(res => {
          setGetD(res.data); // Save the data into a state
        })
        //just in case our code goes kaboom
        .catch(err => console.error("Error, dashboard, handleget:", err));
    }

    function handleBlogs() {
        //calls flask using axios
        axios.get('http://localhost:5000/api/info', { withCredentials: true })
        //we take our info from flask
        .then(res => {
            setBlogs(res.data); // Save the data into a state
        })
        //just in case our code goes kaboom
        .catch(err => console.error("Error, dashboard, handleget:", err));
    }

    useEffect(() => {
        handleGet();
        console.log(getD); // Debugging line to inspect the response
        handleBlogs()
    }, []);

  
    return (
      <div className="App">
        {/*Nanbar Component*/}
        <Navbar />
        <header className="App-header">
            <p className="app-description">
                {/* this line checks for getD.username if it is none it says loading */}
                Welcome {getD.username}.
            </p>
            <br></br>
            <p>Your blogs:</p>
            <br></br>
            <p>{blogs.title}</p>
        </header>
      </div>
    );
  }
  
  export default Dashboard;
