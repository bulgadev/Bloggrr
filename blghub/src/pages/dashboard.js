import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();

    //use state
    const [getD, setGetD] = useState(" ");
  

    function handleGet() {
        //calls flask using axios
        axios.get('http://localhost:5000/api/info',)
        //we take our info from flask
        .then(res => {
          setGetD(res.data); //saves the data into a state
        })
        //just in case our code goes kaboom
        .catch(err => console.error("Im sorry for u man, good luck:", err));
  }

    useEffect(() => {
        handleGet();
        console.log(getD); // Debugging line to inspect the response
    }, []);

  
    return (
      <div className="App">
        {/*Nanbar Component*/}
        <Navbar />
        <header className="App-header">
            <p className="app-description">
                {/* this line checks for getD.username if it is none it says loading */}
                Welcome {getD ? getD.username : "Loading..."} {getD ? getD.message : "Loading..."}
            </p>
        </header>
      </div>
    );
  }
  
  export default Dashboard;
