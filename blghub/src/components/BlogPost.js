import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './navbar';

function BlogPost() {
  //so thats basically a component that shows what should the blog page show, and then when we click a blog it will call this component
  //with the id = the blog we clicked.
  const { id } = useParams(); // Get the blog name from the url
  const [blog, setBlog] = useState(null);
  const [getD, setGetD] = useState(" ");

  function getBlogs() {

    //calls flask using axios
    axios.get(`http://localhost:5000/api/blog/${encodeURIComponent(id)}`, { withCredentials: true })
    //we take our info from flask
    .then(res => {
    if (res.data.blog) {
        setBlog(res.data.blog); // Save the blog array into state
    } else {
        setBlog([{ title: res.data.message, content: "" }]); // Handle case where no blog are returned
    }
        
    })
    //just in case our code goes kaboom
    .catch(err => console.error("Error, dashboard, handleget:", err));
  }

  useEffect(() => {
    getBlogs();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <h1>{blog.title}</h1>
        <div>{blog.content}</div>
      </header>
    </div>
  );
}

export default BlogPost;
