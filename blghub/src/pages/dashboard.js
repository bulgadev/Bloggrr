import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();

    //use state
    const [getD, setGetD] = useState(" ");
    const [blogs, setBlogs] = useState([]);
  
    function writer() {
      navigate("/Write");
    }

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
        axios.get('http://localhost:5000/api/blogs', { withCredentials: true })
        //we take our info from flask
        .then(res => {
          if (res.data.blogs) {
            setBlogs(res.data.blogs); // Save the blogs array into state
          } else {
            setBlogs([{ title: res.data.message, content: "" }]); // Handle case where no blogs are returned
          }
            
        })
        //just in case our code goes kaboom
        .catch(err => console.error("Error, dashboard, handleget:", err));
    }

    useEffect(() => {
        handleGet();
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
            <h3>Write a blog</h3>
            <button onClick={writer} className='btn-start'>Write</button>
            <p>Your blogs:</p>
            <ul>
              {/* All that map stuff is just to ensure everything needed is rendered */}
              {blogs.map((blog, index) => (
                <li key={index}>
                  <h3>{blog.title || blog.message}</h3>
                  <p>{blog.content}</p>
                </li>
              ))}
            </ul>
        </header>
      </div>
    );
  }
  
  export default Dashboard;
