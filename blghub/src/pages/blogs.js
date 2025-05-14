import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import Navbar from '../components/navbar';
import axios from 'axios';

function Blogs() {
    const navigate = useNavigate();

        const [msg, setMsg] = useState(null);
        const [getD, setGetD] = useState(" ");
        const [blogs, setBlogs] = useState([]);

        function handleBlogs() {
            //calls flask using axios
            axios.get('https://bloggrr.onrender.com/api/blogsPage', { withCredentials: true })
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
            handleBlogs()
        }, []);


    return (
      <div className="App">
        {/*Nanbar Component*/}
        <Navbar />
        <header className="App-header">
            <br></br>
            <br></br>
            {msg ? (
                <div>
                    <p>{msg}</p>
                </div>
            ) : null} 
            {blogs.map((blog, index) => (
                <li key={index}>
                    <Link to={`/blog/${blog.title}`}>
                        <h3>{blog.title}</h3>
                    </Link>
                </li>
            ))}
        </header>
      </div>
    );
  }
  
  export default Blogs;
